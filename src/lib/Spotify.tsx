"use client";

import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";
import { useLocalStorage } from "./hooks";

interface Spotify {
  api: SpotifyApi;
  user: null | UserProfile;
  setUser: any;
  setApi: any;
}

let callbackURL = "";

if (process.env.NODE_ENV == "development") {
  callbackURL = "http://localhost:3000";
} else if (process.env.NODE_ENV == "production") {
  callbackURL = "https://statify.zaroc.de";
}

const storage = useLocalStorage();

const cookie = storage.getItem("auth")
  ? JSON.parse(storage.getItem("auth"))
  : null;

console.log(cookie);

export const useSpotify = create<Spotify>((set) => ({
  api: !cookie
    ? SpotifyApi.withUserAuthorization(
        "93c2de56590146b5a254e0e18e5d4b57",
        callbackURL,
        [
          "user-read-private",
          "user-read-email",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
          "user-top-read",
          "user-read-recently-played",
          "user-library-read",
        ]
      )
    : SpotifyApi.withUserAuthorization(
        "93c2de56590146b5a254e0e18e5d4b57",
        cookie
      ),
  user: null,
  setUser: (user: UserProfile) => set({ user }),
  setApi: (api: SpotifyApi) => set({ api }),
}));

const session = useLocalStorage();

type SpotifyAccount = {
  Api: SpotifyApi;
  User: UserProfile | null;
};

export const SpotifyContext = createContext<SpotifyAccount>({
  Api: SpotifyApi.withUserAuthorization(
    "93c2de56590146b5a254e0e18e5d4b57",
    "http://localhost:3000",
    [
      "user-read-private",
      "user-read-email",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
    ]
  ),
  User: null,
});

export const useAuthState = () => {
  const [userProfile, setUserProfile] = useState<null | UserProfile>(null);
  const { Api } = useContext(SpotifyContext);
  const storage = useLocalStorage();

  const signIn = () => {
    Api.authenticate().then((res) => {
      storage.setItem("auth", JSON.stringify(res.accessToken));
      Api.currentUser.profile().then((user) => {
        setUserProfile(user);
        console.log(user);
      });
    });
  };

  return {
    userProfile,
    setUserProfile,
    signIn,
    Api,
  };
};

export const useAuth = () => {
  return useContext(SpotifyContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuthState();

  return (
    <SpotifyContext.Provider
      value={{
        Api: SpotifyApi.withUserAuthorization(
          "93c2de56590146b5a254e0e18e5d4b57",
          "http://localhost:3000",
          [
            "user-read-private",
            "user-read-email",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
          ]
        ),
        User: userProfile,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
