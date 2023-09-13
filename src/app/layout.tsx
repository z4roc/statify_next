"use client";

import "./globals.css";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";
import StatifyNavbar from "@/components/Navbar";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { useSpotify } from "@/lib/Spotify";
import Head from "next/head";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { api, setUser } = useSpotify();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    if (api.currentUser)
      api.currentUser.profile().then((profile) => {
        setuser(profile);
      });

    return () => {
      setIsLoading(false);
      setUser(user);
    };
  }, []);

  const [user, setuser] = useState<null | UserProfile>(null);

  return (
    <html lang="en">
      <Head>
        <title>Statify</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <body className={nunito.className}>
        <StatifyNavbar user={user} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
