const lightModeSongs = [
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

const darkModeSongs = [
    {
        name: "Princess",
        artist: "Lingling Kwong",
        src: "media/princess.mp3",
        img: "media/princess icon.jpeg"
    },
    {
        name: "Yesterday Once More",
        artist: "Lingling Kwong",
        src: "media/yesterday once more.mp3",
        img: "media/yesterday icon.jpeg"
    },
    {
        name: "Like You",
        artist: "Lingling Kwong",
        src: "media/like you.mp3",
        img: "media/like you icon.jpeg"
    }
];

let currentSongIndex = 0;
let currentSongs = lightModeSongs;
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.querySelector('h1');
let songArtist = document.querySelector('p');
let songImg = document.querySelector('.song-img');
let songList = document.getElementById('songList');

const circle = document.querySelector('.circle');
circle.addEventListener('click', () => {
    circle.classList.toggle('open')
});

function loadSong(index) {
    const songData = currentSongs[index];
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
    currentSongIndex = (currentSongIndex + 1) % currentSongs.length;
    loadSong(currentSongIndex);
    playPause();
}

// Skip to previous song
function skipBackward(){
    currentSongIndex = (currentSongIndex - 1 + currentSongs.length) % currentSongs.length;
    loadSong(currentSongIndex);
    playPause();
}

// populate the dropdown with songs
function populateSongList() {
    songList.innerHTML = '';
    currentSongs.forEach((songData, index) => {
        let li = document.createElement('li');
        li.textContent = `${songData.name}`;
        li.onclick = () => selectSong(index);
        songList.appendChild(li);
    })
}

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

// toggle the visibility of the dropdown menu
function toggleDropdown() {
    const songList = document.getElementById('songList');
    
    songList.classList.toggle('show-dropdown');
}

// initialize theme on page load
window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
    updateIcons();
    loadSong(currentSongIndex);
}

// toggle light mode
function toggleLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    updateIcons();
    switchSongList();
}

// toggle dark mode
function toggleDarkMode() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateIcons();
    switchSongList();
}

// function to update visibility of the icons
function updateIcons() {
    const lightModeToggle = document.getElementById('lightModeToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (document.body.classList.contains('dark-mode')) {
        lightModeToggle.style.display = 'block';
        darkModeToggle.style.display = 'none';
    } else {
        lightModeToggle.style.display = 'none';
        darkModeToggle.style.display = 'block';
    }
}

// function to switch song list based on dark mode
function switchSongList() {
    if (document.body.classList.contains('dark-mode')) {
        currentSongs = darkModeSongs; // switch to dark mode songs
    } else {
        currentSongs = lightModeSongs; // switch to light mode songs
    }
    currentSongIndex = 0;
    loadSong(currentSongIndex);
    populateSongList();
}

// Load first song initially
loadSong(currentSongIndex);
populateSongList();