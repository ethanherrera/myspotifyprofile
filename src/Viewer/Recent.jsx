import React, { useState, useEffect } from "react";
import * as Spotify from "../SpotifyAPI";
import { BsPlayCircle } from "react-icons/bs";
import axios from "axios";

function Recent() {
  const [recentTracksData, setRecentTracksData] = useState({});
  const [currentAudioSource, setcurrentAudioSource] = useState([]);

  useEffect(() => {
    if (window.location.hash) {
      Spotify.handleRedirect();
      window.history.pushState("", "", Spotify.homepage + "/recent");
    }
  });
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => setRecentTracksData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
  }, []);

  return (
    <>
      <div id="art" className=" h-12 bg-black"></div>
      <div className="w-screen bg-black p-2">
        {recentTracksData?.items
          ? recentTracksData.items.map((track, index) => (
              <Track
                key={index}
                track={track.track}
                time={track.played_at}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
      </div>
      <div className="h-16 w-screen bg-black"></div>
    </>
  );
}

function Track({ track, time, currentAudioSource, setcurrentAudioSource }) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const name = track.name;
  const albumImg = track.album.images[0].url;
  const artistName = track.artists[0].name;
  const previewSource = track.preview_url;
  const formattedDate = time.substring(5, 10);
  const formattedTime = time.substring(11, 16);

  function playAudio() {
    const audioTag = document.getElementById("track-audio-" + name);
    if (currentAudioSource.length !== 0) {
      globalPauseAudio();
    }
    if (audioTag.src) {
      audioTag.play();
    }
    console.log(audioTag.src);
    setAudioPlaying(true);
    setcurrentAudioSource([audioTag, setAudioPlaying]);
  }

  function pauseAudio() {
    const audioTag = document.getElementById("track-audio-" + name);
    audioTag.pause();
    setAudioPlaying(false);
  }

  function globalPauseAudio() {
    currentAudioSource[0].pause();
    currentAudioSource[1](false);
    setcurrentAudioSource([]);
  }

  return (
    <>
      <div
        className={`group flex flex-row justify-left align-middle border-gray-400 border h-30 hover:scale-y-105 hover:border-green-400 hover:border-y-4 ${
          audioPlaying ? "bg-green-800" : "bg-black"
        } transition-all duration-150 ease-linear`}
        onClick={audioPlaying ? pauseAudio : playAudio}
      >
        <div id="imageContainer" className="relative">
          <img src={albumImg} alt="Album Cover" className="h-20 w-20 m-2" />
          <div className=" flex flex-row justify-center align-middle absolute top-0 left-0 h-20 w-20 m-2 z-10 group-hover:bg-gray-400 group-hover:opacity-20">
            <BsPlayCircle className="hidden group-hover:block " size="40px" />
          </div>
        </div>
        <div className="ml-6">
          <p className="text-white">{name}</p>
          <p className="text-gray-400">{artistName}</p>
        </div>
        <p className="text-white ml-auto mr-2">
          {formattedDate} <br /> {formattedTime}
        </p>
        <audio id={"track-audio-" + name} src={previewSource}></audio>
      </div>
    </>
  );
}

export default Recent;
