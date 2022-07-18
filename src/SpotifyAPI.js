export const homepageLocal = "http://localhost:3000";
export const homepage = "https://myspotifyprofile.com";
const redirectUrl = homepage + "/profile";
const clientId = "9d241ca5d04e44c8ab7326cd3d68718b";
const authUrl = "https://accounts.spotify.com/authorize";
export function authReq() {
  let url = authUrl;
  url += "?client_id=" + clientId;
  url += "&response_type=token";
  url += "&redirect_uri=" + encodeURI(redirectUrl);
  url += "&show_dialog=false";
  url +=
    "&scope=user-read-private user-top-read user-read-recently-played playlist-modify-public playlist-modify-private";
  window.location.href = url;
}

export function handleRedirect() {
  const { access_token, expires_in, token_type } = getAccessToken(
    window.location.hash
  );
  localStorage.clear();
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("expiresIn", expires_in);
  localStorage.setItem("tokenType", token_type);
}

function getAccessToken(hash) {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  return paramsSplitUp;
}

export function callApi(method, url, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send(body);
  xhr.onload = callback;
}
