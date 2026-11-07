import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { site } from "./site";

export type CommandCooldown =
  | number
  | { default?: number; subcommands?: Record<string, number> };

export interface CommandEntry {
  name: string;
  description: string;
  usage: string;
  aliases?: readonly string[];
  permission?: string | null;
  slash?: boolean;
  prefix?: boolean;
  cooldown?: CommandCooldown;
  ownerOnly?: boolean;
  serverOwnerOnly?: boolean;
  trustedAdministrator?: boolean;
  userPerms?: readonly string[];
  botPerms?: readonly string[];
  commandOptions?: Record<string, unknown>;
  slashCommand?: Record<string, unknown>;
}

export interface CatalogCategory {
  name: string;
  icon: React.ElementType;
  commands: CommandEntry[];
}

export function getUniqueCommandCount(categories: CatalogCategory[]): number {
  return new Set(
    categories.flatMap((category) =>
      category.commands.map((command) =>
        command.name.trim().replace(/^[$/]/, "").split(/\s+/)[0].toLowerCase(),
      ),
    ),
  ).size;
}

interface WebsiteCommandSnapshot {
  updatedAt: number;
  commands: Array<{
    name: string;
    category: string;
    description: string;
    usage: string;
    prefix: boolean;
    slash: boolean;
    aliases: string[];
    permission: string | null;
    cooldown: CommandCooldown;
    ownerOnly: boolean;
    serverOwnerOnly: boolean;
    trustedAdministrator: boolean;
    userPerms: string[];
    botPerms: string[];
    commandOptions: Record<string, unknown>;
    slashCommand?: Record<string, unknown>;
  }>;
}

const CLIENT_CACHE_MS = 5 * 60_000;
let cachedCategories: CatalogCategory[] | undefined;
let cacheExpiresAt = 0;
let pendingRequest: Promise<CatalogCategory[]> | undefined;

function normalizeCategory(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function fallbackCategories(): CatalogCategory[] {
  return site.commandCategories as unknown as CatalogCategory[];
}

function categoriesFromSnapshot(snapshot: WebsiteCommandSnapshot): CatalogCategory[] {
  const fallback = fallbackCategories();
  const knownCategories = new Map(
    fallback.map((category, index) => [
      normalizeCategory(category.name),
      { name: category.name, icon: category.icon, index },
    ]),
  );
  const grouped = new Map<string, CommandEntry[]>();

  for (const command of snapshot.commands) {
    if (
      typeof command.name !== "string" ||
      typeof command.category !== "string" ||
      typeof command.description !== "string" ||
      typeof command.usage !== "string"
    ) {
      throw new Error("The command catalog response contains an invalid command.");
    }

    const key = normalizeCategory(command.category);
    const commands = grouped.get(key) ?? [];
    commands.push(command);
    grouped.set(key, commands);
  }

  return [...grouped.entries()]
    .map(([key, commands]) => {
      const known = knownCategories.get(key);
      const fallbackName = key.replace(/([a-z])([A-Z])/g, "$1 $2");
      const name =
        known?.name ??
        fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
      return {
        name,
        icon: known?.icon ?? MoreHorizontal,
        commands,
        order: known?.index ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
    .map(({ order: _order, ...category }) => category);
}

async function loadCommandCatalog(): Promise<CatalogCategory[]> {
  if (cachedCategories && Date.now() < cacheExpiresAt) return cachedCategories;
  if (pendingRequest) return pendingRequest;

  pendingRequest = (async () => {
    try {
      const response = await fetch("/api/commands", {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Command catalog request failed with HTTP ${response.status}.`);
      }

      const snapshot = (await response.json()) as WebsiteCommandSnapshot;
      if (!snapshot || !Number.isFinite(snapshot.updatedAt) || !Array.isArray(snapshot.commands)) {
        throw new Error("The command catalog response has an invalid shape.");
      }

      cachedCategories = categoriesFromSnapshot(snapshot);
      cacheExpiresAt = Date.now() + CLIENT_CACHE_MS;
      return cachedCategories;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[COMMAND CATALOG] Using the bundled catalog: ${message}`);
      cachedCategories ??= fallbackCategories();
      cacheExpiresAt = Date.now() + 30_000;
      return cachedCategories;
    } finally {
      pendingRequest = undefined;
    }
  })();

  return pendingRequest;
}

export function useCommandCatalog(): CatalogCategory[] {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    let active = true;
    const refresh = () => {
      void loadCommandCatalog().then((next) => {
        if (active) setCategories(next);
      });
    };

    refresh();
    const interval = window.setInterval(refresh, CLIENT_CACHE_MS);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return categories;
}
