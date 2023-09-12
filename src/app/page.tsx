"use client";

import { /*SpotifyContext, useAuthState,*/ useSpotify } from "@/lib/Spotify";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  //const user = useContext(SpotifyContext);
  //const { userProfile, signIn, setClient } = useAuthState();
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const { api, user, setUser } = useSpotify();
  const signIn = () => {
    api.authenticate().then((res) => {
      const auth = api.currentUser
        .profile()
        .then((profile) => setUser(profile));
    });
  };

  const menuItems = ["Artists", "Albums", "Tracks", "Genres"];

  return (
    <div className="h-screen font-inter">
      <Navbar
        className="bg-background fixed"
        isBordered
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle className="md:hidden"></NavbarMenuToggle>
          <NavbarBrand>
            <p className="font-semibold text-2xl text-inherit p-1">Statify</p>
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
                src={user.images[0].url}
                color="success"
                size="sm"
              />
            </Link>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <main className="flex h-full overflow-hidden items-center justify-center">
        {user ? <Dashboard /> : <HeroSection />}
      </main>
    </div>
  );
}
const HeroSection = () => {
  return (
    <div className=" flex-col flex">
      <h1 className="text-2xl font-bold text-center p-5">
        Watch your Top tracks, artists and albums!
      </h1>
      <Button className="bg-primary text-text m-5 rounded-md font-semibold">
        Sign in with Spotify
      </Button>
    </div>
  );
};

function Dashboard() {
  const { user } = useSpotify();
  return (
    <>
      <h1>hi</h1>
      <div>{user?.display_name}</div>
    </>
  );
}
