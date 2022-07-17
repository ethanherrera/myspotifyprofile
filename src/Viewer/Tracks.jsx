import React, { useState, useEffect } from "react";
import * as Spotify from "../SpotifyAPI";
import { BsPlayCircle } from "react-icons/bs";
import axios from "axios";

function Tracks() {
  const [tracksShortData, setTracksShortData] = useState({});
  const [tracksData, setTracksData] = useState({});
  const [tracksLongData, setTracksLongData] = useState({});
  const [currentAudioSource, setcurrentAudioSource] = useState([]);
  useEffect(() => {
    if (window.location.hash) {
      Spotify.handleRedirect();
      window.history.pushState("", "", Spotify.homepage + "/tracks");
    }
  });

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    };
    axios
      .get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
        { headers: headers }
      )
      .then((res) => setTracksShortData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
    axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
        headers: headers,
      })
      .then((res) => setTracksData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
    axios
      .get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
        { headers: headers }
      )
      .then((res) => setTracksLongData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
  }, []);
  const [selectedTracks, setSelectedTracks] = useState("short");
  const trackRanges = ["short", "medium", "long"];
  function changeTracksRange(e) {
    setSelectedTracks(e.target.value);
    window.scrollTo(0, 0);
    setcurrentAudioSource([]);
  }

  return (
    <div>
      <div id="header" className=" bg-white z-10">
        <label htmlFor="selector" className="fixed top-1 left-1 z-10 bg-white">
          Time Range:
        </label>
        <select
          id="selector"
          className="fixed top-1 left-24  z-10"
          value={selectedTracks}
          onChange={changeTracksRange}
        >
          {trackRanges.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div id="art" className=" h-12 bg-black"></div>
      <div className="w-screen bg-black p-2">
        {selectedTracks === "short" && tracksShortData?.items
          ? tracksShortData.items.map((track, index) => (
              <Track
                key={index}
                track={track}
                rank={index + 1}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
        {selectedTracks === "medium" && tracksData?.items
          ? tracksData.items.map((track, index) => (
              <Track
                key={index}
                track={track}
                rank={index + 1}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
        {selectedTracks === "long" && tracksLongData?.items
          ? tracksLongData.items.map((track, index) => (
              <Track
                key={index}
                track={track}
                rank={index + 1}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
      </div>
      <div className="h-16 w-screen bg-black"></div>
    </div>
  );
}

function Track({ track, rank, currentAudioSource, setcurrentAudioSource }) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const name = track.name;
  const albumImg = track.album.images[0].url;
  const artistName = track.artists[0].name;
  const previewSource = track.preview_url;

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
        <p className="text-white ml-auto mr-2">{rank}</p>
        <audio id={"track-audio-" + name} src={previewSource}></audio>
      </div>
    </>
  );
}

export default Tracks;
