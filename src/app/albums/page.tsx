"use client";
import { useSpotify } from "@/lib/Spotify";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { SavedAlbum } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { api } = useSpotify();

  const [albums, setAlbums] = useState<SavedAlbum[] | null>(null);

  useEffect(() => {
    api.currentUser.albums.savedAlbums().then((albums) => {
      setAlbums(albums.items);
    });
    return () => {};
  }, []);

  return (
    <div className="text-text bg-background h-min max-h-screen flex justify-center">
      <h1>PAGE</h1>
      {albums ? (
        albums.map((album) => {
          return <BasicCard album={album} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}

function BasicCard({ album }: { album: SavedAlbum }) {
  return (
    <Card
      className="m-2 rounded-md border-[.5px] border-opacity-10 border-gray-400 backdrop-blur-sm bg-opacity-5 bg-gradient-to-tr from-[#08252b]/30 to-[#28c890]/20"
      isBlurred
      key={album.album.id}
    >
      <CardBody>
        <div className="flex gap-4 items-center">
          <img
            alt="cover"
            height={60}
            width={60}
            className="rounded-md object-contain"
            src={album.album.images[0].url}
          />
          <div className="flex text-white flex-col">
            <h1 className="text-sm font-semibold">{album.album.name}</h1>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
