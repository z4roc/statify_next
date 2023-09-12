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

export default function StatifyNavbar({ user }: { user: UserProfile | null }) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const { api } = useSpotify();

  const signIn = () => api.authenticate();

  const menuItems = ["Artists", "Albums", "Tracks", "Genres"];

  return (
    <Navbar
      className="bg-background sticky border-b-[0.2px] border-gray-500"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle className="md:hidden"></NavbarMenuToggle>
        <NavbarBrand>
          <Link href="/" className="font-semibold text-2xl text-inherit p-1">
            Statify
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
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
            <Link className="w-full" href={`/${item.toLowerCase()}/top`}>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
