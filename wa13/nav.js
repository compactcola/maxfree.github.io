const genreLinks = document.querySelectorAll(".nav-links a");
const searchInput = document.querySelector("#search");

genreLinks.forEach(link => {
    link.setAttribute("tabindex", "0")
    link.addEventListener("click", ()=> {
        const genre = link.dataset.genre;
        localStorage.setItem("searchGenre", genre);
        window.location.href = "search.html";
    })
    link.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const genre = link.dataset.genre;
            localStorage.setItem("searchGenre", genre);
            window.location.href = "search.html";
        }
    });
})

if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            localStorage.setItem("searchQuery", query);
            window.location.href = "search.html";
        }
    });
}