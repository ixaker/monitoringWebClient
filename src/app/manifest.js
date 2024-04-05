export default function manifest() {
    return {
      name: 'Monitoring',
      short_name: 'Monitoring',
      description: 'Monitoring',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: 'icon-24x24.png',
          sizes: '24x24',
          type: 'image/png',
        },
      ],
    }
  }