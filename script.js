const songs = [
    {
        name: "Please Please Please",
        artist: "Orm Kornnaphat",
        src: "media/Please Please Please.mp3",
        img: "media/please icon.jpeg"
    },
    {
        name: "Espresso",
        artist: "Orm Kornnaphat",
        src: "media/Espresso.mp3",
        img: "media/espresso icon.jpeg"
    },
    {
        name: "Make It Hot",
        artist: "Orm Kornnaphat",
        src: "media/Make It Hot.mp3",
        img: "media/make it hot icon.jpeg"
    }
];

let currentSongIndex = 0;
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.querySelector('h1');
let songArtist = document.querySelector('p');
let songImg = document.querySelector('.song-img');

function loadSong(index) {
    const songData = songs[index];
    song.src = songData.src;
    songTitle.textContent = songData.name;
    songArtist.textContent = songData.artist;
    songImg.src = songData.img;
    song.load();
    // playPause();
}

// Play or Pause the song
function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

// Skip to next song
function skipNext(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Skip to previous song
function skipBackward(){
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Populate dropdown with songs
const songList = document.getElementById('songList');
songs.forEach((songData, index) => {
    let li = document.createElement('li');
    li.textContent = `${songData.name}`;
    li.onclick = () => selectSong(index);
    songList.appendChild(li);
});

// Function to load and play selected song from dropdown
function selectSong(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    playPause();
}

// Progress bar update
song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
})

// Update progress based on user input
progress.onchange = function(){
    song.currentTime = progress.value;
}

// Automatically play next song when current ends
song.onended = function() {
    skipNext();
}

// Load first song initially
loadSong(currentSongIndex);

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
    const songList = document.getElementById('songList');
    if (songList.style.display === 'block') {
        songList.style.display = 'none';
    } else {
        songList.style.display = 'block';
    }
}