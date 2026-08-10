/**
 * Public link-preview configuration.
 *
 * `imageUrl` must be a direct, publicly reachable image URL. It cannot be a
 * Discord attachment page, a local path, or a URL that requires JavaScript.
 * For the best Discord large preview, use a JPG/PNG around 1200x630.
 */
export const seoConfig = {
  title: 'Levitate — Your server, elevated.',
  description: 'A little more order, a little more levitation.',
  canonicalUrl: 'https://levitate-web.vercel.app/',
  // Replace this one value with any direct, public JPG/PNG/WebP image URL.
  imageUrl: 'https://i.ibb.co/0pTLB0zQ/59813501297914334.jpg',
  imageAlt: 'Levitate — Discord Bot',
  imageType: 'image/jpeg',
  imageWidth: 735,
  imageHeight: 245,
  iconPath: '/favicon.png',
  themeColor: '#09090b',
} as const;