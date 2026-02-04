"use client";

import dynamic from "next/dynamic";

// Dynamically import the optimized page component
const OptimizedPage = dynamic(() => import("@/components/OptimizedPage"), {
  ssr: true, // Enable SSR for better SEO and performance
});

const Home = () => {
  return <OptimizedPage />;
};

export default Home;
