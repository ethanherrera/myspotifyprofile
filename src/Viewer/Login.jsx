import React from "react";
import { useEffect } from "react";
import * as Spotify from "../SpotifyAPI";

function Login() {
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = window.location.href + "profile";
    } else {
      Spotify.authReq;
    }
  }, []);
  return <div></div>;
}

export default Login;
