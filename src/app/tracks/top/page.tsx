"use client";

import { useSpotify } from "@/lib/Spotify";
import {
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Track, Tracks } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

function Page() {
  const { api } = useSpotify();

  const [tracksShortTerm, setTracksShortTerm] = useState<null | Track[]>(null);
  const [tracksMediumTerm, settracksMediumTerm] = useState<null | Track[]>(
    null
  );
  const [tracksLongTerm, settracksLongTerm] = useState<null | Track[]>(null);

  useEffect(() => {
    api.currentUser.topItems("tracks", "short_term").then((tracks) => {
      setTracksShortTerm(tracks.items);
    });
    api.currentUser.topItems("tracks", "medium_term").then((tracks) => {
      settracksMediumTerm(tracks.items);
    });
    api.currentUser.topItems("tracks", "long_term").then((tracks) => {
      settracksLongTerm(tracks.items);
    });
    return () => {};
  }, []);

  return (
    <Tabs
      className="text-text bg-background mt-16"
      color="success"
      variant="underlined"
    >
      <Tab key="4Weeks" title="4 Weeks">
        {tracksShortTerm ? (
          <StatTab tracks={tracksShortTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </Tab>
      <Tab key="6Months" title="6 Months">
        {tracksMediumTerm && <StatTab tracks={tracksMediumTerm} />}
      </Tab>
      <Tab key="Allltime" title="All Time">
        {tracksLongTerm && <StatTab tracks={tracksLongTerm} />}
      </Tab>
    </Tabs>
  );
}

const StatTab = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div className="overflow-hidden bg-background aboslute h-min">
      {tracks &&
        tracks?.map((track, index) => {
          return (
            <Card
              className="m-2 rounded-md border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
              isBlurred
              key={track.id}
            >
              <CardBody>
                <div className="flex gap-2 items-center">
                  <h1 className="text-white p-2 mr-2 font-semibold">
                    {index + 1}.
                  </h1>
                  <img
                    alt="cover"
                    height={60}
                    width={60}
                    className="rounded-md object-contain"
                    src={track.album.images[0].url}
                  />
                  <div className="flex text-white flex-col">
                    <h1 className="text-xs">{track.name}</h1>
                    <h2 className="text-[10px]">
                      {track.artists.map((a) => a.name).join(", ")}
                    </h2>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
};

export default Page;
