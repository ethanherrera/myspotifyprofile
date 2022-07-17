import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Spotify from "../SpotifyAPI";
import TopTracksPlaylist from "./Creations/TopTracksPlaylist";

function Create() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (window.location.hash) {
      Spotify.handleRedirect();
      window.history.pushState("", "", Spotify.homepage + "/create");
    }
  });

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUserId(res.data.id))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
  });

  return (
    <>
      <div>
        <TopTracksPlaylist userId={userId} />
      </div>
    </>
  );
}

export default Create;
