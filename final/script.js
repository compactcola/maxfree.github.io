const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

navToggle.addEventListener("click", ()=>{
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("show");
});

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
    window.scrollTo({top:0, behavior:"smooth"});
});

/* dark mode stuff */
const darkMode = document.getElementById("darkMode");
const status = document.getElementById("status");
const clearStatus = document.getElementById("clearStatus");

const savedMode = localStorage.getItem("dark-mode");
if (savedMode === "enabled"){
    body.classList.add("dark-mode");
}

/* click event listener set dark mode */
darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    /* saving to local storage yipeee*/
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }

    status.textContent = "Preference saved!";
    status.style.display = "block";

    setTimeout(() => {
        status.style.display = "none";
    }, 3000);
});

clearStatus.addEventListener("click", () => {
    localStorage.clear();
    body.classList.remove("dark-mode");
});

navToggle.addEventListener("keyup", (e) => {
if (e.key === "Enter" || e.key === " ") {
    navToggle.click();
}
});

// Save language choice
function setLanguage(lang) {
    localStorage.setItem('userLanguage', lang);
    // Update page content based on language
}
// Load on page visit
const userLang = localStorage.getItem('userLanguage') || 'en';

// make sure every link opens a new tab
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

document.querySelectorAll(".box-header").forEach(btn => {
    btn.setAttribute("tabindex", "0");

    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.classList.remove("open");
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
        }
    });

    btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const content = btn.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove("open");
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("open");
            }
        }
    });
});

/////  search bar things
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("search-results");

// gather the links inside all of the boxes
const allLinks = [...document.querySelectorAll(".box a")].map(a => ({
    text: a.innerText.trim(),
    url: a.href
}));

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < 1) return;

    const matches = allLinks.filter(link =>
        link.text.toLowerCase().includes(query)
    )

    if (matches.length === 0) {
        resultsContainer.innerHTML = `<p>No results found</p>`;
        return;
    }

    matches.forEach(link => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.textContent = link.text;

        item.addEventListener("click", () => {
            window.location.href = link.url;
        })
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                window.location.href = link.url;
            }
        })
        resultsContainer.appendChild(item);
    });
})
