const songs = [
  {title: "Dreamscape", src: "song1.mp3", cover: "cover1.jpg"},
  {title: "Starlit Vibes", src: "song2.mp3", cover: "cover2.jpg"},
  {title: "Neon Nights", src: "song3.mp3", cover: "cover3.jpg"}
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const cover = document.getElementById("cover");
const albumArt = document.getElementById("album-art");
const playlist = document.getElementById("playlist");

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.src;
  cover.src = song.cover;
  updatePlaylist();
}

function playSong() {
  audio.play();
  playBtn.textContent = "?";
  albumArt.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "?";
  albumArt.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

function updatePlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = song.title;
    if (index === songIndex) div.classList.add("active");
    div.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlist.appendChild(div);
  });
}

loadSong(songs[songIndex]);