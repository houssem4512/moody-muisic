const generateBtn = document.getElementById('generateBtn');
const loader = document.getElementById('loader');
const resultArea = document.getElementById('resultArea');
const playlistContainer = document.getElementById('playlistContainer');
const artContainer = document.getElementById('artContainer');

generateBtn.addEventListener('click', async () => {
  const mood = document.getElementById('moodSelect').value.trim();
  const genre = document.getElementById('genreSelect').value.trim();
  const vibe = document.getElementById('vibeSelect').value.trim();

  if (!mood && !genre && !vibe) {
    alert("Please select at least one option!");
    return;
  }

  const query = [mood, genre, vibe].filter(Boolean).join(' ');
  loader.classList.remove('hidden');
  resultArea.classList.add('hidden');
  playlistContainer.innerHTML = '';
  artContainer.innerHTML = '';

  try {
    // YouTube Playlist embed example based on search query (fake playlist for demo)
    // Ideally you call your backend or YouTube Data API to get real playlist id.
    // Here we simulate by searching YouTube and embedding first video playlist:
    // For demo, just search query in playlist url:
    const ytPlaylistUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query + " playlist")}`;

    const iframe = document.createElement('iframe');
    iframe.src = ytPlaylistUrl;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    playlistContainer.appendChild(iframe);

    // AI Art generation simulation:
    // Replace below URL with your real API call and fetched image URL.
    const dummyArtUrl = "https://source.unsplash.com/800x450/?abstract," + encodeURIComponent(mood);

    const img = document.createElement('img');
    img.src = dummyArtUrl;
    img.alt = `AI generated art for mood ${mood}`;
    artContainer.appendChild(img);

    loader.classList.add('hidden');
    resultArea.classList.remove('hidden');
  } catch (err) {
    alert("Error generating content: " + err.message);
    loader.classList.add('hidden');
  }
});
