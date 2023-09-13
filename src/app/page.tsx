"use client";

import DotsLoader from "@/components/DotsLoader";
import { useSpotify } from "@/lib/Spotify";
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import {
  PlaybackState,
  Playlist,
  SpotifyApi,
  Track,
  UserProfile,
} from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setuser] = useState<null | UserProfile>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { api, setUser } = useSpotify();

  useEffect(() => {
    api.currentUser.profile().then((profile) => {
      setuser(profile);
      setIsLoading(false);
    });
    return () => setUser(user);
  }, []);

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
  const [track, setTrack] = useState<Track | null>(null);
  const [playlist, setplaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    api.player.getPlaybackState().then((state) => {
      api.tracks.get(state.item.id).then(setTrack);
      setPlayback(state);

      let arr = state.context?.uri?.split("/") ?? [];
      let playlistString = arr[arr?.length - 1].split(":");

      let playlistID = playlistString[playlistString.length - 1];

      api.playlists.getPlaylist(playlistID).then(setplaylist);
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
    <div className="flex h-1/2 w-full gap-10 flex-col md:flex-row items-stretch md:items-center p-10 justify-evenly md:justify-center">
      <div className="flex items-start md:items-center">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-wider">
          Welcome <p className="shine">{user?.display_name}</p>
        </h1>
      </div>
      <Card className="border-[.5px] w-fit border-opacity-10 md:max-h-[fit-content] border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20">
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
              className="rounded-md object-contain"
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

          <a className="text-xs sm:text-lg text-white p-2" href={playlist?.uri}>
            from Playlist {playlist?.name}
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
