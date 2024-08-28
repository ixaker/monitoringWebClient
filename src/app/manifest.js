export default function manifest() {
  return {
    name: 'Monitoring QPart',
    short_name: 'Monitoring QPart',
    description: 'App for monitoring devices',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4285F4', // Наприклад, синій колір теми
    icons: [
      {
        src: 'icon-24x24.png',
        sizes: '24x24',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
