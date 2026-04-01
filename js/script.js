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
        image: "https://placehold.co/400x300/c0392b/white?text=Golf+Club+Crans-sur-Sierre"
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
        image: "https://placehold.co/400x300/c0392b/white?text=Golf+Club+de+Sion"
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
        image: "https://placehold.co/400x300/2980b9/white?text=Golf+Club+Lausanne"
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
        image: "https://placehold.co/400x300/2980b9/white?text=Golf+Club+Montreux"
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
        image: "https://placehold.co/400x300/8e44ad/white?text=Golf+Club+de+Geneve"
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
        image: "https://placehold.co/400x300/2980b9/white?text=Golf+Club+de+Bonmont"
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
        image: "https://placehold.co/400x300/16a085/white?text=Golf+Club+Zurich-Zumikon"
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
        image: "https://placehold.co/400x300/f39c12/white?text=Golf+Club+Domat-Ems"
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
        image: "https://placehold.co/400x300/2c3e50/white?text=Golf+Club+Lugano"
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
        image: "https://placehold.co/400x300/27ae60/white?text=Golf+Club+Interlaken-Unterseen"
    }

];

const listElement = document.querySelector("#list");

function afficherRessources() {
    let html = "";

    for (const course of courses) {
        html += `
            <article class="golf-card">
                <img src="${course.image}" alt="Photo du ${course.name}">
                <div class="card-content">
                    <h3>${course.name}</h3>
                    <p><strong>Lieu :</strong> ${course.location} (${course.region})</p>
                    <p><strong>Parcours :</strong> ${course.holes} trous — Par ${course.par}</p>
                    <p><strong>Fondation :</strong> ${course.yearFounded}</p>
                </div>
            </article>
        `;
    }

    listElement.innerHTML = html;
}

afficherRessources();