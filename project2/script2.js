const form = document.getElementById("searchSong");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

function showData(data) {
  results.innerHTML = `
    <ul class = "songs"
    ${data.data
      .map(
        (
          song
        ) => `<li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">View</button>
    </li>`
      )
      .join('')}
</ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `
            ${
              data.prev
                ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
                : ''
            }
            ${
              data.next
                ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
                : ''
            }
        `;
  } else {
    more.innerHTML = '';
  }
}

async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}


results.addEventListener('click', e => {
    const clickedE1 = e.target;

    if(clickedE1.tagName === 'BUTTON') {
        const artist = clickedE1.getAttribute('data-artist');
        const songTitle = clickedE1.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }

});

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    if (data.error) {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        results.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>`;
    }

    more.innerHTML = '';
}