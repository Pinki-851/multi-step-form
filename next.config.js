/** @type {import('next').NextConfig} */

const customCookie = [
  {
    type: 'cookie',
    key: 'multi-step_next-auth.session-token',
  },
];

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/flow',
        permanent: false,
        destination: '/flow/login',
      },
      // {
      //   source: '/flow/login',
      //   permanent: false,
      //   destination: '/flow/login',
      // },
      {
        source: '/flow/signup',
        permanent: false,
        destination: '/',
        has: [...customCookie],
      },
      {
        source: '/flow',
        permanent: false,
        destination: '/',
        has: [...customCookie],
      },
      {
        source: '/flow/login',
        permanent: false,
        destination: '/',
        has: [...customCookie],
      },
    ];
  },
};

module.exports = nextConfig;
