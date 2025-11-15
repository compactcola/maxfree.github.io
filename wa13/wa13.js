const track = document.querySelector('.track');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const clearBtn = document.querySelector("#clear-storage")
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
clearBtn.addEventListener("click", clearLocalStorage);

let visibleCards = 7;

function updateVisibleCards(){
    const width = window.innerWidth;
    const widthMuliplier = 10

    if (width <= 768) {
        visibleCards = 3;
        const widthMuliplier = 12
    } else if (width <= 1024) {
        visibleCards = 5;
        const widthMuliplier = 10
    } else if (width >= 1024) {
        visibleCards = 7;
        widthMuliplier = 4;
    } else if (width > 1200) {
        widthMuliplier = 1;
    }

    const cardWidth = track.offsetWidth / visibleCards - widthMuliplier;
    document.querySelectorAll(".game-card").forEach(card => {
        card.style.width = `${cardWidth}px`;
    });

    updateCarousel();
}

window.addEventListener("load", async () => {
    await getGames();
    updateVisibleCards();
})

window.addEventListener("load", updateVisibleCards);
window.addEventListener("resize", updateVisibleCards);

let index = 0;
let games = [];
let recommendations = [];

// fake API
async function getGames() {
    try {
        const response = await fetch("games.json");
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();
        games = json;

        populateCarousel();
    } catch (err) {
        console.error("Error loading games:", err);
        // console.log("Attempted fetch URL:", new URL("games.json", window.location.href).href);
        alert("Didn't load games");
    }
}

// unfortunately complex recommendation and storage system
function savePlayedGame(game){
    let played = JSON.parse(localStorage.getItem("playedGames")) || [];

    let existing = played.find(g => g.title === game.title);

    if (existing) {
        existing.playCount++;
    } else {
        played.push({
            title: game.title,
            genre: game.genre,
            difficulty: game.difficulty,
            playCount: 1
        });
    }

    localStorage.setItem("playedGames", JSON.stringify(played));
}

function clearLocalStorage(){
    localStorage.clear();
    populateCarousel()
}

function getRecomendations() {
    const played = JSON.parse(localStorage.getItem("playedGames")) || [];
    if (played.length === 0){
        recommendations = games.slice(0, 15);
        return recommendations;
    }

    const genreScores = {};
    played.forEach(g=> {
        const genres = Array.isArray(g.genre) ? g.genre : [g.genre];
        genres.forEach(tag => {
            genreScores[tag] = (genreScores[tag] || 0) + g.playCount;
        });
    })

    const favoriteGenre = Object.entries(genreScores)
        .sort((a,b) => b[1] - a[1])[0][0];

    recommendations = games
        .filter(g => g.genre.includes(favoriteGenre))
        .sort(() => Math.random() - 0.5);

    if (recommendations.length < 3) {
        const randomFill = games.sort(() => Math.random() -0.5)
        recommendations = [...recommendations, ...randomFill]
    }

    return recommendations.slice(0, 15);
}

// show the games onto the website like one would
function populateCarousel() {
    track.innerHTML = "";

    recommendations = getRecomendations();

    recommendations.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.setAttribute("tabindex", "0"); // so that you can actually tab into the games
        card.innerHTML = `<img src="${game.thumbnail}" alt "${game.title}"><h3>${game.title}</h3>`;

        // heres where game gets opened
        card.addEventListener("click", () => {
            savePlayedGame(game);
            index = 0;
            populateCarousel();
            window.open(game.url, "_blank");
        });
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                savePlayedGame(game);
                index = 0;
                populateCarousel();
                window.open(game.url, "_blank");
            }
        });
        track.appendChild(card);
    });

    updateCarousel();
}

function updateCarousel() {
    const cardWidth = track.querySelector(".game-card").offsetWidth +20;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
}


function nextSlide() {
    if (index < recommendations.length -visibleCards){
        index++
    }
    updateCarousel()
}

function prevSlide() {
    if (index > 0){
        index--
    }
    updateCarousel()
}
