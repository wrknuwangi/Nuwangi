
const form = document.getElementById("searchSong");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const lyrics = document.getElementById("lyrics");
const apiURL = "https://api.lyrics.ovh";

// Search form submit
form.addEventListener("submit", e => {
  e.preventDefault();
  const term = input.value.trim();
  if (!term) return;
  searchSongs(term);
});

// Search songs
async function searchSongs(term) {
  results.innerHTML = "<li>Loading...</li>";
  try {
    const res = await fetch(`${apiURL}/suggest/${encodeURIComponent(term)}`);
    const data = await res.json();
    showData(data);
  } catch (err) {
    results.innerHTML = `<li>Error: ${err}</li>`;
  }
}

// Show songs list
function showData(data) {
  if (!data.data.length) {
    results.innerHTML = "<li>No results found</li>";
    return;
  }

  results.innerHTML = data.data.map(song => `
    <li>
      <strong>${song.artist.name}</strong> - ${song.title}
      <button class="btn btn-primary mt-2" onclick="getLyrics('${song.artist.name}', '${song.title}')">View Lyrics</button>
    </li>
  `).join('');
}

// Get lyrics
async function getLyrics(artist, title) {
  lyrics.innerHTML = `<li>Loading lyrics for ${title}...</li>`;
  try {
    const res = await fetch(`${apiURL}/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const data = await res.json();
    if (data.lyrics) {
      lyrics.innerHTML = `
        <li><strong>${artist} - ${title}</strong></li>
        <li><pre>${data.lyrics}</pre></li>
        <li><button class="btn btn-primary" onclick="searchSongs('${title}')">Back</button></li>
      `;
    } else {
      lyrics.innerHTML = `<li>Lyrics not found</li>`;
    }
  } catch (err) {
    lyrics.innerHTML = `<li>Error: ${err}</li>`;
  }
}
