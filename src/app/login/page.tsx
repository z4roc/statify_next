"use client";

import { useSpotify } from "@/lib/Spotify";
import React from "react";

export default function Page() {
  const { api, user, setUser } = useSpotify();

  api.authenticate().then((res) => {
    const auth = api.currentUser.profile().then((profile) => setUser(profile));
  });

  return <div>Sign In</div>;
}
