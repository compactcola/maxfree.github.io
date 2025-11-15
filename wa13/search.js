const results = document.getElementById("results");
const title = document.getElementById("results-title");

let games = [];

window.addEventListener("load", () => {
    runSearch();
});

async function runSearch(){
    const query = (localStorage.getItem("searchQuery") || "").toLowerCase();
    const genreTag = localStorage.getItem("searchGenre") || null;

    const response = await fetch("games.json");
    games = await response.json();

    let filtered = games;

    // nav bar tags
    if (genreTag) {
        filtered = filtered.filter(g => {
            if (Array.isArray(g.genre)) {
                return g.genre.some(tag => tag.toLowerCase() === genreTag.toLowerCase());
            }
            return g.genre.toLowerCase() === genreTag.toLowerCase();
        });
        localStorage.removeItem("searchGenre");
    }
    // search bar
    if (query) {
        filtered = filtered.filter(g =>
            g.title.toLowerCase().includes(query) ||
            g.genre.some(tag => tag.toLowerCase().includes(query)) ||
            (g.category && g.category.toLowerCase().includes(query))
        );
        localStorage.removeItem("searchQuery");
    }

    displayResults(filtered);
}

function displayResults(list) {
    results.innerHTML = "";

    if (list.length === 0) {
        results.innerHTML = "<p>No games found.</p>";
        return;
    }

    list.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.innerHTML = `<img src="${game.thumbnail}" alt="${game.title}"><h3>${game.title}</h3>`;

        card.addEventListener("click", () => {
            window.open(game.url, "_blank");
        })

        results.appendChild(card);
    })
}
