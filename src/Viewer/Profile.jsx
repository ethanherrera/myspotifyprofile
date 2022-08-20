import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Spotify from "../SpotifyAPI";

function Profile() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (window.location.hash) {
      Spotify.handleRedirect();
      window.history.pushState("", "", Spotify.homepage + "/profile");
    }
  });

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    };
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: headers,
      })
      .then((res) => setProfileData(res.data));
  }, []);

  return (
    <div>
      {profileData ? <h1>{profileData.display_name}</h1> : null}
      {profileData?.images ? (
        <img src={profileData.images[0].url} alt="Profile" />
      ) : null}
      {profileData?.product ? (
        <p>You are a {profileData.product} user!</p>
      ) : null}
    </div>
  );
}

export default Profile;
