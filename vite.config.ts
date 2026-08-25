import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { seoConfig } from './src/config/seo';

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function seoMetadataPlugin() {
  return {
    name: 'cassie-seo-metadata',
    transformIndexHtml(html: string) {
      const replacements: Record<string, string> = {
        SEO_TITLE: seoConfig.title,
        SEO_DESCRIPTION: seoConfig.description,
        SEO_CANONICAL_URL: seoConfig.canonicalUrl,
        SEO_IMAGE_URL: seoConfig.imageUrl,
        SEO_IMAGE_ALT: seoConfig.imageAlt,
        SEO_IMAGE_TYPE: seoConfig.imageType,
        SEO_IMAGE_WIDTH: String(seoConfig.imageWidth),
        SEO_IMAGE_HEIGHT: String(seoConfig.imageHeight),
        SEO_ICON_PATH: seoConfig.iconPath,
        SEO_THEME_COLOR: seoConfig.themeColor,
      };

      return Object.entries(replacements).reduce(
        (result, [key, value]) =>
          result.replaceAll(`__${key}__`, escapeHtmlAttribute(value)),
        html,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), seoMetadataPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 5000,
    allowedHosts: true,
  },
});
