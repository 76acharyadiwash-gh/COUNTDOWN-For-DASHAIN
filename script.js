/* =========================================================
   DASHain 2083 COUNTDOWN
   Vijaya Dashami: October 21, 2026
   Nepal Time: UTC +05:45
========================================================= */

const targetDate = new Date("2026-10-21T00:00:00+05:45");

const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const currentTimeEl = document.getElementById("currentTime");

let countdownTimer;


/* =========================================================
   CALENDAR ACCURATE COUNTDOWN
========================================================= */

function getCalendarDifference(start, end) {

    let cursor = new Date(start);

    let months = 0;

    /*
        Count complete calendar months first.
        This avoids the inaccurate:
        30 days = 1 month
        approach.
    */

    while (true) {

        const next = new Date(cursor);

        next.setMonth(next.getMonth() + 1);

        if (next <= end) {
            cursor = next;
            months++;
        } else {
            break;
        }
    }

    const remaining = end - cursor;

    const days = Math.floor(
        remaining / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (remaining / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (remaining / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (remaining / 1000) % 60
    );

    return {
        months,
        days,
        hours,
        minutes,
        seconds
    };
}


/* =========================================================
   UPDATE COUNTDOWN
========================================================= */

function updateCountdown() {

    const now = new Date();

    if (now >= targetDate) {

        document.querySelector(".countdown-card").innerHTML = `
            <div class="celebration">
                🎉
                <br>
                <strong>Happy Dashain!</strong>
                <br>
                <span>विजया दशमी २०८३</span>
            </div>
        `;

        clearInterval(countdownTimer);

        launchConfetti();

        return;
    }

    const time = getCalendarDifference(
        now,
        targetDate
    );

    monthsEl.textContent = String(time.months).padStart(2, "0");

    daysEl.textContent = String(time.days).padStart(2, "0");

    hoursEl.textContent = String(time.hours).padStart(2, "0");

    minutesEl.textContent = String(time.minutes).padStart(2, "0");

    secondsEl.textContent = String(time.seconds).padStart(2, "0");
}


/* Initial update */

updateCountdown();


/* Update every second */

countdownTimer = setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   CURRENT TIME
========================================================= */

function showCurrentTime() {

    const now = new Date();

    currentTimeEl.textContent =
        "Nepal Time • " +
        now.toLocaleString(
            "en-NP",
            {
                dateStyle: "medium",
                timeStyle: "medium",
                timeZone: "Asia/Kathmandu"
            }
        );
}

showCurrentTime();

setInterval(
    showCurrentTime,
    1000
);


/* =========================================================
   YOUTUBE MUSIC
========================================================= */

/*
    PUT YOUR YOUTUBE VIDEO ID HERE.

    Example:

    YouTube URL:
    https://www.youtube.com/watch?v=ABC123xyz

    Video ID:
    ABC123xyz
*/

const YOUTUBE_VIDEO_ID = "YOUR_VIDEO_ID";

let youtubePlayer;

let musicPlaying = false;

function onYouTubeIframeAPIReady() {

    youtubePlayer = new YT.Player(
        "youtubePlayer",
        {
            height: "1",
            width: "1",

            videoId: YOUTUBE_VIDEO_ID,

            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,

                /*
                    playlist is required for
                    seamless looping.
                */
                loop: 1,
                playlist: YOUTUBE_VIDEO_ID
            },

            events: {
                onReady: () => {
                    console.log("YouTube music ready.");
                }
            }
        }
    );
}


/* Music button */

const musicBtn = document.getElementById("musicBtn");

const musicText = document.getElementById("musicText");

musicBtn.addEventListener(
    "click",
    () => {

        if (
            !youtubePlayer ||
            typeof youtubePlayer.playVideo !== "function"
        ) {
            alert(
                "Music is still loading. Please try again."
            );

            return;
        }

        if (!musicPlaying) {

            youtubePlayer.playVideo();

            musicPlaying = true;

            musicText.textContent =
                "Pause Dashain Music";

            musicBtn.querySelector(".music-icon")
                .textContent = "Ⅱ";

            launchConfetti();

        } else {

            youtubePlayer.pauseVideo();

            musicPlaying = false;

            musicText.textContent =
                "Play Dashain Music";

            musicBtn.querySelector(".music-icon")
                .textContent = "♫";
        }
    }
);


/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti() {

    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 90,
        spread: 100,
        startVelocity: 25,
        origin: {
            y: 0.65
        }
    });
}


/* =========================================================
   MINIMAL SPARKS
========================================================= */

const sparksContainer =
    document.getElementById("sparks");

const sparkCount =
    window.innerWidth < 600 ? 18 : 30;

for (let i = 0; i < sparkCount; i++) {

    const spark =
        document.createElement("span");

    spark.className = "spark";

    spark.style.left =
        Math.random() * 100 + "vw";

    spark.style.top =
        Math.random() * 100 + "vh";

    const size =
        Math.random() * 2 + 2;

    spark.style.width =
        size + "px";

    spark.style.height =
        size + "px";

    spark.style.animationDuration =
        4 + Math.random() * 6 + "s";

    spark.style.animationDelay =
        Math.random() * 5 + "s";

    sparksContainer.appendChild(spark);
}