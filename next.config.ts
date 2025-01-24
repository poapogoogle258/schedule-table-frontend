import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // create member
      {
        source: '/calendars/[calid]/members/create',
        destination: '/calendars/[calid]/members',
        permanent: true,
      },

    ]
  },
};

export default nextConfig;
