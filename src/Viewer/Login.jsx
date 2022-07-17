import React from "react";
import { useEffect } from "react";
import * as Spotify from "../SpotifyAPI";

function Login() {
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = window.location.href + "profile";
    }
  }, []);
  return (
    <div>
      <button onClick={Spotify.authReq}>Login</button>
    </div>
  );
}

export default Login;
