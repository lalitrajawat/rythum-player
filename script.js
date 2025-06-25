const songs = [
    { name: "Chill Vibes", path: "songs/song1.mp3" },
    { name: "Night Drive", path: "songs/song2.mp3" },
    { name: "Shadow’s Groove", path: "songs/song3.mp3" }
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const progress = document.getElementById("progress");
const playlistEl = document.getElementById("playlist");

function loadSong(index) {
    audio.src = songs[index].path;
    title.textContent = songs[index].name;
}

function playPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

audio.onplay = () => isPlaying = true;
audio.onpause = () => isPlaying = false;

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
});

function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function initPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.name;
        li.onclick = () => {
            currentIndex = index;
            loadSong(currentIndex);
            audio.play();
        };
        playlistEl.appendChild(li);
    });
}

loadSong(currentIndex);
initPlaylist();