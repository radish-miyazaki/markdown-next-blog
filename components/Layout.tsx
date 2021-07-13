import React from 'react';
import Head from "next/head";
import Header from "@/components/Header";

const Layout = ({title, keywords, description,children}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.icon"/>
      </Head>
      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'development, coding, programming',
  description: 'The best info and news in development',
}