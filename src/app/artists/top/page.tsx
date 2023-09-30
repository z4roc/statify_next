"use client";
import { useSpotify } from "@/lib/Spotify";
import { Card, CardBody, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Artist } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { api } = useSpotify();

  const [currentTab, setCurrentTab] = useState({
    value: "short_term",
    label: "4 Weeks",
  });

  const [artistsShortTerm, setartistsShortTerm] = useState<null | Artist[]>(
    null
  );
  const [artistsMediumTerm, setartistsMediumTerm] = useState<null | Artist[]>(
    null
  );
  const [artistsLongTerm, setartistsLongTerm] = useState<null | Artist[]>(null);

  useEffect(() => {
    api.currentUser.topItems("artists", "short_term").then((artists) => {
      setartistsShortTerm(artists.items);
    });
    api.currentUser.topItems("artists", "medium_term").then((artists) => {
      setartistsMediumTerm(artists.items);
    });
    api.currentUser.topItems("artists", "long_term").then((artists) => {
      setartistsLongTerm(artists.items);
    });
    return () => {};
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
        {artistsShortTerm ? (
          <StatTab artists={artistsShortTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
      <div className={currentTab.value == "medium_term" ? "block" : "hidden"}>
        {artistsMediumTerm ? (
          <StatTab artists={artistsMediumTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
      <div className={currentTab.value == "long_term" ? "block" : "hidden"}>
        {artistsLongTerm ? (
          <StatTab artists={artistsLongTerm} />
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </main>
  );
}

function StatTab({ artists }: { artists: Artist[] }) {
  return (
    <div className="overflow-hidden bg-background aboslute h-min rounded-md">
      {artists &&
        artists?.map((artist, index) => {
          return (
            <Card
              className="m-2 border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
              isBlurred
              key={artist.id}
            >
              <CardBody>
                <div className="flex gap-4 items-center">
                  <h1 className="text-white p-2 mr-2 font-semibold">
                    {index + 1}.
                  </h1>
                  <img
                    alt="cover"
                    height={60}
                    width={60}
                    className="rounded-md object-contain"
                    src={artist.images[0].url}
                  />
                  <div className="flex text-white flex-col">
                    <h1 className="text-sm font-semibold">{artist.name}</h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
