function updateWidget() {
    const startDate = new Date("2024-02-15T20:07:55");
    const currentDate = new Date();
    const timeElapsed = currentDate - startDate;

    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

    const timeElapsedElement = document.getElementById('timeElapsed');
    timeElapsedElement.innerHTML = `Time Elapsed: <br> ${days} days 
  <br>   ${hours} hours
   <br>   ${minutes} minutes
     <br>  ${seconds} seconds`;
}

setInterval(updateWidget, 1000);

updateWidget();




//darkmode
document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});






//music
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');






const playlist = [
    {
        src: 'clairo - bags ( speed up ).mp3',
        title: 'clairo - bags ( speed up )',
        artist: 'I love Aya'
    },
    {
        src: 'i_know_you_faye_webster_I_ll_quiet_down_if_it_s_what_you_want_sped.mp3',
        title: 'i know you faye webster Ill quiet down if its what you want sped',
        artist: 'Meow Meow'
    },
   
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    songTitle.textContent = track.title;
    artistName.textContent = track.artist;
    playPauseButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
        </svg>`;
    updateSeekBar();
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateSeekBar() {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateSeekBar);

seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
</svg>
`;

        
    }
     else {
        audio.pause();
        playPauseButton.innerHTML =`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
        </svg>`;


    }
});


stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
</svg>
`;
    updateSeekBar();
});

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
</svg>
`;
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
</svg>
`;
});

// Load the first track
loadTrack(currentTrackIndex);


//random button 
const words = ["play minecraft", "watch a manga", "watch anime JJK", "watch anime JOJO", "play Genshin Impact", "30min Duolingo", "Just Chat"
              , "learn something/study"];

document.getElementById('generateButton').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    document.getElementById('randomWord').textContent = randomWord;
});
