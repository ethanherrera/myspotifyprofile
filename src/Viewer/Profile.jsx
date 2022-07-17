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
    function handleProfileRes() {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        setProfileData(data);
      } else if (this.status === 401) {
        // Spotify.refreshAccessToken();
        Spotify.authReq();
      } else {
        console.log(this.responseText);
        alert(this.responseText);
      }
    }
    Spotify.callApi(
      "GET",
      "https://api.spotify.com/v1/me",
      null,
      handleProfileRes
    );
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
