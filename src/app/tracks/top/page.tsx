"use client";

import { useSpotify } from "@/lib/Spotify";
import { Card, CardBody, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Track } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

type tracksDef = {
  short_term: null | Track[];
  medium_term: null | Track[];
  long_term: null | Track[];
};

type kvp = {
  label: string;
  value: string;
};

function Page() {
  const { api } = useSpotify();

  const [currentTab, setCurrentTab] = useState({
    label: "4 weeks",
    value: "short_term",
  });

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
  }, []);

  const ranges = [
    { label: "4 weeks", value: "short_term" },
    { label: "6 Months", value: "medium_term" },
    { label: "All time", value: "long_term" },
  ];

  return (
    <main className="mt-20 -z-1">
      <div className="w-full flex flex-col items-center justify-center outline-none">
        <div className="cursor-pointer flex transition-all ease-in-out items-center bg-primary-foreground gap-4 p-2 pl-4 pr-4 rounded-xl">
          {ranges.map((range) => {
            return (
              <div
                key={range.value}
                onClick={() =>
                  setCurrentTab({ value: range.value, label: range.label })
                }
                className={
                  currentTab.value == range.value
                    ? "bg-white text-black p-2 rounded-xl"
                    : "p-2"
                }
              >
                <p>{range.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={currentTab.value == "short_term" ? "block" : "hidden"}>
        {tracksShortTerm ? (
          <StatTab tracks={tracksShortTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
      <div className={currentTab.value == "medium_term" ? "block" : "hidden"}>
        {tracksMediumTerm ? (
          <StatTab tracks={tracksMediumTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
      <div className={currentTab.value == "long_term" ? "block" : "hidden"}>
        {tracksLongTerm ? (
          <StatTab tracks={tracksLongTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </main>
    /*<Tabs
        className="text-text bg-background z-50 justify-center flex"
        color="success"
        aria-label="Select"
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
      */
    /*<Tabs
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
    </Tabs>*/
  );
}

const StatTab = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div className="overflow-hidden rounded-md bg-background aboslute h-min">
      {tracks &&
        tracks?.map((track, index) => {
          return (
            <Card
              className="m-2 bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
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
