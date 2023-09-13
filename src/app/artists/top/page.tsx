"use client";
import { useSpotify } from "@/lib/Spotify";
import { Card, CardBody, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Artist } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { api } = useSpotify();

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

  return (
    <main className="mt-14">
      <Tabs
        className="text-text bg-background  h-min max-h-screen flex justify-center"
        color="success"
        variant="underlined"
      >
        <Tab key="4Weeks" title="4 Weeks">
          {artistsShortTerm ? (
            <StatTab artists={artistsShortTerm} />
          ) : (
            <div className="flex w-full h-screen items-center justify-center">
              <Spinner size="lg" />
            </div>
          )}
        </Tab>
        <Tab key="6Months" title="6 Months">
          {artistsMediumTerm && <StatTab artists={artistsMediumTerm} />}
        </Tab>
        <Tab key="Allltime" title="All Time">
          {artistsLongTerm && <StatTab artists={artistsLongTerm} />}
        </Tab>
      </Tabs>
    </main>
  );
}

function StatTab({ artists }: { artists: Artist[] }) {
  return (
    <div className="overflow-hidden bg-background aboslute h-min">
      {artists &&
        artists?.map((artist, index) => {
          return (
            <Card
              className="m-2 rounded-md border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
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
