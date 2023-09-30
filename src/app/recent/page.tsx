"use client";
import { useSpotify } from "@/lib/Spotify";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { PlayHistory } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { api } = useSpotify();

  const [recents, setRecents] = useState<PlayHistory[] | null>(null);

  useEffect(() => {
    api.player.getRecentlyPlayedTracks().then((recent) => {
      setRecents(recent.items);
    });
    return () => {};
  }, []);

  return (
    <main className="text-text mt-14 bg-background">
      <div className="flex flex-col p-4 w-full gap-2 overflow-hidden">
        {recents ? (
          recents.map((recent) => {
            return (
              <div className="h-fit rounded-md w-full">
                <BasicCard recent={recent} />
              </div>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
}

function BasicCard({ recent }: { recent: PlayHistory }) {
  return (
    <Card
      className="border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
      isBlurred
      key={recent.track.id}
    >
      <CardBody>
        <div className="flex gap-4 items-center">
          <h3 className="text-white w-20">
            {GetDatediffString(recent.played_at)} ago
          </h3>
          <img
            alt="cover"
            height={60}
            width={60}
            className="rounded-md object-contain"
            src={recent.track.album.images[0].url}
          />
          <div className="flex text-white flex-col">
            <h1 className="text-sm font-semibold">{recent.track.name}</h1>
            <h2>{recent.track.artists.map((a) => a.name).join(", ")}</h2>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function GetDatediffString(dateString: string): string {
  let difInMin: number = DateDiff.inMinutes(
    new Date(dateString),
    new Date(Date.now())
  );

  if (difInMin < 60) {
    return `${difInMin}min`;
  } else {
    return `${DateDiff.inHours(new Date(dateString), new Date(Date.now()))}h`;
  }
}

var DateDiff = {
  inMinutes: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (60 * 1000));
  },

  inHours: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (3600 * 1000));
  },

  inDays: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return (t2 - t1) / (24 * 3600 * 1000 * 7);
  },

  inMonths: function (d1: Date, d2: Date) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1: Date, d2: Date) {
    return d2.getFullYear() - d1.getFullYear();
  },
};
