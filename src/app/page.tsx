"use client";

import DotsLoader from "@/components/DotsLoader";
import StatifyNavbar from "@/components/Navbar";
import { useSpotify } from "@/lib/Spotify";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import {
  PlaybackState,
  SpotifyApi,
  Track,
  UserProfile,
} from "@spotify/web-api-ts-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  //const { userProfile, signIn } = useAuthState();
  const [user, setuser] = useState<null | UserProfile>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const { api, setUser } = useSpotify();

  useEffect(() => {
    api.currentUser.profile().then((profile) => {
      setuser(profile);
      setIsLoading(false);
    });
    return () => setUser(user);
  }, []);

  const signIn = () => {
    api.authenticate().then();
  };
  //api.currentUser.profile().then((profile) => setUser);
  //const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  /*useEffect(() => {
    if (cookies.auth) {
      console.log(cookies.auth);
      //setClient(cookies.auth);
    }
  }, []);
*/
  const menuItems = ["Artists", "Albums", "Tracks", "Genres"];

  return !isLoading ? (
    <div className="h-screen font-inter text-text">
      <main className="flex bg-gradient-to-tr text-text from-background from-0% via-10% to-accent/5 h-full overflow-hidden items-center justify-center">
        {user ? <Dashboard user={user} api={api} /> : <HeroSection />}
      </main>
    </div>
  ) : (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" />
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

function Dashboard({
  api,
  user,
}: {
  api: SpotifyApi;
  user: UserProfile;
}): JSX.Element {
  const [playback, setPlayback] = useState<PlaybackState | null>(null);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    api.player.getPlaybackState().then((state) => {
      api.tracks.get(state.item.id).then(setTrack);
      setPlayback(state);
    });

    const id = setInterval(redo, 5000);

    return () => clearInterval(id);
  }, []);

  const redo = () => {
    api.player.getPlaybackState().then((state) => {
      api.tracks.get(state.item.id).then(setTrack);
      setPlayback(state);
    });
  };

  return (
    <div className="flex h-1/2 w-full flex-col items-stretch p-10 justify-evenly ">
      <div className="flex items-start">
        <h1 className="text-3xl font-semibold">Welcome {user?.display_name}</h1>
      </div>
      <Card className="border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20">
        <CardHeader className="flex justify-between">
          <span className="text-white text-xl font-extralight tracking-wide">
            Playing on {playback?.device.name}
          </span>
          <DotsLoader />
        </CardHeader>
        <CardBody className="">
          <div className="flex gap-6">
            <img
              alt="cover"
              src={track?.album.images[0].url}
              height={100}
              width={100}
            />
            <div className="text-text flex flex-col justify-evenly w-fit max-w-[50%]">
              <h3 className="font-semibold text-lg">{track?.name}</h3>
              <p className="font-normal">
                {track?.artists.map((e) => e.name).join(", ")}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
