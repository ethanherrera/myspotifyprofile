import React, { useState, useEffect } from "react";
import * as Spotify from "../SpotifyAPI";
import axios from "axios";
function Artists() {
  const [artistsShortData, setArtistsShortData] = useState({});
  const [artistsData, setArtistsData] = useState({});
  const [artistsLongData, setArtistsLongData] = useState({});
  const [currentAudioSource, setcurrentAudioSource] = useState([]);

  useEffect(() => {
    if (window.location.hash) {
      Spotify.handleRedirect();
      window.history.pushState("", "", Spotify.homepage + "/artists");
    }
  });

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    };
    axios
      .get(
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
        { headers: headers }
      )
      .then((res) => setArtistsShortData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
    axios
      .get("https://api.spotify.com/v1/me/top/artists?limit=50", {
        headers: headers,
      })
      .then((res) => setArtistsData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
    axios
      .get(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
        { headers: headers }
      )
      .then((res) => setArtistsLongData(res.data))
      .catch((err) => {
        if (err.response.status === 401) Spotify.authReq();
      });
  }, []);
  const [selectedArtists, setSelectedArtists] = useState("short");
  const artistRanges = ["short", "medium", "long"];
  function changeArtistsRange(e) {
    setSelectedArtists(e.target.value);
    window.scrollTo(0, 0);
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
          value={selectedArtists}
          onChange={changeArtistsRange}
        >
          {artistRanges.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div id="art" className=" h-12 bg-black"></div>
      <div className="w-screen bg-black p-2">
        {selectedArtists === "short" && artistsShortData?.items
          ? artistsShortData.items.map((artist, index) => (
              <Artist
                key={index}
                artist={artist}
                rank={index + 1}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
        {selectedArtists === "medium" && artistsData?.items
          ? artistsData.items.map((artist, index) => (
              <Artist
                key={index}
                artist={artist}
                rank={index + 1}
                currentAudioSource={currentAudioSource}
                setcurrentAudioSource={setcurrentAudioSource}
              />
            ))
          : null}
        {selectedArtists === "long" && artistsLongData?.items
          ? artistsLongData.items.map((artist, index) => (
              <Artist
                key={index}
                artist={artist}
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

function Artist({ artist, rank, currentAudioSource, setcurrentAudioSource }) {
  const name = artist.name;
  const artistImg = artist.images[0].url;
  const genre = artist.genres[0];
  // const previewSource = artist
  const [audioPlaying, setAudioPlaying] = useState(false);

  function playAudio() {
    const audioTag = document.getElementById("artist-audio-" + name);
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
    const audioTag = document.getElementById("artist-audio-" + name);
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
        <img
          src={artistImg}
          alt={name + " Profile Picture"}
          className="h-20 w-20 m-2"
        />
        <div className="ml-6">
          <p className="text-white">{name}</p>
          <p className="text-gray-400">{genre}</p>
        </div>
        <p className="text-white ml-auto mr-2">{rank}</p>
        {/* <audio id={"artist-audio-" + name} src={previewSource}></audio> */}
      </div>
    </>
  );
}

export default Artists;
