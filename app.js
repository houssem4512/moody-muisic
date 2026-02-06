const API_KEY = "AIzaSyBZ-SAFj2mF8IQ1XMWlDgbNGJYeHlVY0hw"; // <-- Replace with your API key

const searchBtn = document.getElementById("searchBtn");
const moodInput = document.getElementById("moodInput");
const resultsDiv = document.getElementById("results");
const playerContainer = document.getElementById("playerContainer");
const youtubePlayer = document.getElementById("youtubePlayer");

searchBtn.addEventListener("click", () => {
  const mood = moodInput.value.trim();
  if (!mood) {
    alert("Please enter a mood!");
    return;
  }
  searchYouTube(mood);
});

function searchYouTube(query) {
  resultsDiv.innerHTML = "Loading...";
  playerContainer.classList.add("hidden");
  youtubePlayer.src = "";

  // Search playlists & videos related to mood
  // We search for playlists first (type=playlist), fallback to videos if none
  const maxResults = 8;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}+playlist&type=playlist&key=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items || data.items.length === 0) {
        // No playlists found, try videos search fallback
        return searchVideos(query, maxResults);
      }
      displayResults(data.items, "playlist");
    })
    .catch((err) => {
      console.error(err);
      resultsDiv.innerHTML = "Error loading results.";
    });
}

function searchVideos(query, maxResults) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items || data.items.length === 0) {
        resultsDiv.innerHTML = "No results found.";
        return;
      }
      displayResults(data.items, "video");
    })
    .catch((err) => {
      console.error(err);
      resultsDiv.innerHTML = "Error loading results.";
    });
}

function displayResults(items, kind) {
  resultsDiv.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "result-item";

    let thumbnail = "";
    let title = "";
    let videoId = "";
    let playlistId = "";

    if (kind === "playlist") {
      thumbnail = item.snippet.thumbnails.medium.url;
      title = item.snippet.title;
      playlistId = item.id.playlistId;
    } else {
      thumbnail = item.snippet.thumbnails.medium.url;
      title = item.snippet.title;
      videoId = item.id.videoId;
    }

    div.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <p>${title}</p>
    `;

    div.onclick = () => {
      if (kind === "playlist" && playlistId) {
        // Embed playlist
        youtubePlayer.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`;
      } else if (kind === "video" && videoId) {
        // Embed single video
        youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      playerContainer.classList.remove("hidden");
      playerContainer.scrollIntoView({ behavior: "smooth" });
    };

    resultsDiv.appendChild(div);
  });
}

