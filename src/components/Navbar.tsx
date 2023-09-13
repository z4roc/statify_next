"use client";
import { useSpotify } from "@/lib/Spotify";
import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import React, { useState } from "react";
import Image from 'next/image'

export default function StatifyNavbar({ user }: { user: UserProfile | null }) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const { api } = useSpotify();

  const signIn = () => api.authenticate();

  const menuItems = ["Artists", "Tracks", "Recent"];

  return (
    <Navbar
      className="bg-background sticky border-b-[0.2px] border-gray-500"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle className="md:hidden"></NavbarMenuToggle>
        <NavbarBrand>
          <Link href="/" className="font-semibold text-2xl text-inherit p-1 flex gap-2">
            
          <Image src="/Icon.png" alt="Icon" width={25} height={25}/>
            Statify
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-10" justify="center">
        <NavbarItem>
          <Link className="text-text font-semibold" href="/tracks/top">
            Tracks
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/artists/top"
            className="text-text font-semibold"
            aria-current="page"
          >
            Artists
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-text font-semibold" href="/recent">
            Recent
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!user ? (
          <Button className="bg-secondary text-text" onClick={signIn}>
            Sign in
          </Button>
        ) : (
          <Link href={"/profile"}>
            <Avatar
              isBordered
              src={user?.images[0].url}
              color="success"
              size="sm"
            />
          </Link>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item != "Recent" ? (
              <Link className="w-full" href={`/${item.toLowerCase()}/top`}>
                {item}
              </Link>
            ) : (
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
