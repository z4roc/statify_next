"use client";

import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface Spotify {
  api: SpotifyApi;
  user: null | UserProfile;
  setUser: any;
}

export const useSpotify = create<Spotify>((set) => ({
  api: SpotifyApi.withUserAuthorization(
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
  user: null,
  setUser: (user: UserProfile) => set({ user }),
}));

/*const session = useLocalStorage();

let Spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
  "93c2de56590146b5a254e0e18e5d4b57",
  "http://localhost:3000",
  [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ]
);

type SpotifyAccount = {
  Api: SpotifyApi;
  User: UserProfile | null;
};

export const SpotifyContext = createContext<SpotifyAccount>({
  Api: Spotify,
  User: null,
});

export const useAuthState = () => {
  const [userProfile, setUserProfile] = useState<null | UserProfile>(null);
  const session = useLocalStorage();

  const signIn = () => {
    Spotify.authenticate().then((res) => {
      Spotify.currentUser.profile().then((user) => {
        setUserProfile(user);
        session.setItem("auth", JSON.stringify(res.accessToken));
      });
    });
  };

  const setClient = () => {
    Spotify = SpotifyApi.withAccessToken(
      "93c2de56590146b5a254e0e18e5d4b57",
      JSON.parse(session.getItem("auth"))
    );
    Spotify.currentUser.profile().then((user) => {
      setUserProfile(user);
    });
  };

  return {
    userProfile,
    signIn,
    setClient,
  };
};

export const useAuth = () => {
  return useContext(SpotifyContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuthState();

  console.log(userProfile);

  return (
    <SpotifyContext.Provider value={{ Api: Spotify, User: userProfile }}>
      {children}
    </SpotifyContext.Provider>
  );
}
*/
