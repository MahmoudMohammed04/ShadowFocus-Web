
let player;
const progressBar = document.getElementById("progress");
const titleEl = document.getElementById("title");
const thumbEl = document.getElementById("thumbnail");
const playBtn = document.querySelector("#audio-player button");
const ytInput = document.getElementById("yt-link");

/* -----------------------------------------
   Extract YouTube Video ID
------------------------------------------ */
function getVideoId(url) {
    let match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&\n?#]+)/);
    if (match) return match[1];

    match = url.match(/youtube\.com\/live\/([^?&]+)/);
    if (match) return match[1];

    return null;
}

/* -----------------------------------------
   Load video + metadata
------------------------------------------ */
async function loadVideo() {
    const url = ytInput.value.trim();
    const id = getVideoId(url);
    if (!id) return alert("Invalid YouTube Link");

    if (player && player.loadVideoById) {
        player.loadVideoById(id);
        // Ensure it plays after loading
        setTimeout(() => player.playVideo(), 500);
    }

    try {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        const data = await res.json();
        titleEl.textContent = data.title;
        thumbEl.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        thumbEl.onerror = () => thumbEl.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    } catch (err) {
        console.error("Failed to load video metadata", err);
    }
}


/* -----------------------------------------
   Initialize hidden player
------------------------------------------ */
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "0",
        width: "0",
        videoId: "",
        playerVars: { autoplay: 0, controls: 0 },
        events: { onReady: () => setInterval(updateProgress, 200) }
    });
}

/* -----------------------------------------
   Play / Pause toggle
------------------------------------------ */
function togglePlay() {
    if (!player || !player.getPlayerState) return;

    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        player.playVideo();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
}

/* -----------------------------------------
   Update progress bar
------------------------------------------ */
function updateProgress() {
    if (!player || !player.getDuration) return;

    const duration = player.getDuration();
    if (!duration) return;

    const current = player.getCurrentTime();
    const percent = (current / duration) * 100;

    progressBar.value = percent;
    progressBar.style.setProperty("--progress", percent + "%");
}

/* -----------------------------------------
   Seek video when user drags bar
------------------------------------------ */
progressBar.addEventListener("input", () => {
    if (!player || !player.getDuration) return;

    const duration = player.getDuration();
    player.seekTo((progressBar.value / 100) * duration, true);
});

/* -----------------------------------------
   Load video on Enter key press
------------------------------------------ */
ytInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
     loadVideo();
    
    }
});

function OpenAudioPlayer(event) {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.setAttribute("visible", "true");
    if (event) event.stopPropagation(); // prevent document click from hiding it immediately
}

// Prevent clicks inside player from hiding it
const audioPlayer = document.getElementById("audio-player");
audioPlayer.addEventListener("click", (e) => {
    e.stopPropagation();
});


document.addEventListener("click", function(event) {
    const audioPlayer = document.getElementById("audio-player");
    const audioButton = document.getElementById("audio-button");
    const isClickInsidePlayer = audioPlayer.contains(event.target);
    const isClickOnButton = audioButton.contains(event.target);

    if (!isClickInsidePlayer && !isClickOnButton) {
        audioPlayer.setAttribute("visible", "false");
    }

    
});