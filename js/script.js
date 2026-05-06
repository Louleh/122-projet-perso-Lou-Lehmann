"use strict";

// Tableau de données — à générer avec Copilot / une IA
const courses = [
    {
        id: 1,
        name: "Golf Club Crans-sur-Sierre",
        location: "Crans-Montana",
        region: "Valais",
        holes: 18,
        par: 70,
        rating: 5,
        yearFounded: 1906,
        image: "/assets/img/GC_Crans-Montana.jpg",
        credit: "https://www.crans-montana.ch/"
    },
    {
        id: 2,
        name: "Golf Club de Sion",
        location: "Sion",
        region: "Valais",
        holes: 18,
        par: 72,
        rating: 4,
        yearFounded: 1995,
        image:"/assets/img/GC_Sion.jpg",
        credit: "https://www.golfsion.ch/"
    },
    {
        id: 3,
        name: "Golf Club Lausanne",
        location: "Lausanne",
        region: "Vaud",
        holes: 18,
        par: 71,
        rating: 5,
        yearFounded: 1921,
        image:"/assets/img/GC_Lausanne.jpg",
        credit: "https://golflausanne.ch/"
    },
    {
        id: 4,
        name: "Golf Club Montreux",
        location: "Aigle",
        region: "Vaud",
        holes: 18,
        par: 72,
        rating: 4,
        yearFounded: 1900,
        image: "/assets/img/GC_Montreux.webp",
        credit: "https://www.golfmontreux.ch/"
    },
    {
        id: 5,
        name: "Golf Club de Geneve",
        location: "Vandoeuvres",
        region: "Geneve",
        holes: 18,
        par: 72,
        rating: 5,
        yearFounded: 1922,
        image: "/assets/img/GC_Geneve.webp",
        credit: "https://golfgeneve.ch/"
    },
    {
        id: 6,
        name: "Golf Club de Bonmont",
        location: "Cheserex",
        region: "Vaud",
        holes: 18,
        par: 72,
        rating: 3,
        yearFounded: 1982,
        image: "/assets/img/GC_Bonmont.jpg",
        credit: "https://www.bonmont.com/"
    },
    {
        id: 7,
        name: "Golf Club Zurich-Zumikon",
        location: "Zumikon",
        region: "Zurich",
        holes: 18,
        par: 72,
        rating: 4,
        yearFounded: 1932,
        image: "/assets/img/GC_Zurich.jpg",
        credit: "https://www.gccz.ch/"
    },
    {
        id: 8,
        name: "Golf Club Domat-Ems",
        location: "Domat-Ems",
        region: "Grisons",
        holes: 18,
        par: 70,
        rating: 3,
        yearFounded: 2007,
        image: "/assets/img/GC_Domat.jpg",
        credit: "https://www.golfdomatems.ch/golf/"
    },
    {
        id: 9,
        name: "Golf Club Lugano",
        location: "Magliaso",
        region: "Tessin",
        holes: 18,
        par: 70,
        rating: 4,
        yearFounded: 1923,
        image: "/assets/img/GC_Lugano.jpg",
        credit: "https://www.golflugano.ch/"
    },
    {
        id: 10,
        name: "Golf Club Interlaken-Unterseen",
        location: "Unterseen",
        region: "Berne",
        holes: 18,
        par: 69,
        rating: 2,
        yearFounded: 1963,
        image: "/assets/img/GC_Interlaken.webp",
        credit : "https://www.interlakengolf.ch/"
    }

];

const listElement = document.querySelector("#list");
const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");

let sortAsc = false;

// Events listeners
searchInput.addEventListener("input", refresh);

btnSort.addEventListener("click", () => {
    sortAsc = !sortAsc;
    btnSort.textContent = sortAsc ? "Trier par note ↑" : "Trier par note ↓";
    refresh();
});

function afficherRessources(dataToDisplay) {
    let html = "";

    if (dataToDisplay.length === 0) {
        listElement.innerHTML = "<p>Aucun parcours trouvé.</p>";
        return;
    }

    for (const course of dataToDisplay) {
        html += `
            <article class="golf-card">
                <img src="${course.image}" alt="Photo du ${course.name}">
                <a href="${course.credit}">Credit</a>
                <div class="card-content">
                    <h3>${course.name}</h3>
                    <p><strong>Lieu :</strong> ${course.location} (${course.region})</p>
                    <p><strong>Parcours :</strong> ${course.holes} trous — Par ${course.par}</p>
                    <p><strong>Fondation :</strong> ${course.yearFounded}</p>
                    <p><strong>Rating :</strong> ${course.rating}</p>
                </div>
            </article>
        `;
    }

    listElement.innerHTML = html;
}

function refresh() {
    // Remove spaces
    const query = searchInput.value.trim().toLowerCase();

    let result = courses.filter(course =>
        course.name.toLowerCase().includes(query)
    );

    result = [...result].sort((a, b) =>
        sortAsc ? a.rating - b.rating : b.rating - a.rating
    );

    afficherRessources(result);
}

refresh();