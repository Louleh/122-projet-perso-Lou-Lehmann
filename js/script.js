"use strict";

// Données initiales
let courses = [
    {
        id: 1,
        name: "Golf Club Crans-sur-Sierre",
        location: "Crans-Montana",
        region: "Valais",
        holes: 18,
        par: 70,
        rating: 5,
        yearFounded: 1906,
        image: "assets/img/GC_Crans-Montana.jpg",
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
        image: "assets/img/GC_Sion.jpg",
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
        image: "assets/img/GC_Lausanne.jpg",
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
        image: "assets/img/GC_Montreux.webp",
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
        image: "assets/img/GC_Geneve.webp",
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
        image: "assets/img/GC_Bonmont.jpg",
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
        image: "assets/img/GC_Zurich.jpg",
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
        image: "assets/img/GC_Domat.jpg",
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
        image: "assets/img/GC_Lugano.jpg",
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
        image: "assets/img/GC_Interlaken.webp",
        credit: "https://www.interlakengolf.ch/"
    }

];

const listElement = document.querySelector("#list");
const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");

let sortAsc = false;

// Initialisation des écouteurs d'événements globaux
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
            <article class="golf-card" data-id="${course.id}">
                <img src="${course.image}" alt="Photo du ${course.name}">
                <a href="${course.credit}">Credit</a>
                <div class="card-content">
                    <h3>${course.name}</h3>
                    <p><strong>Lieu :</strong> ${course.location} (${course.region})</p>
                    <p><strong>Parcours :</strong> ${course.holes} trous — Par ${course.par}</p>
                    <p><strong>Fondation :</strong> ${course.yearFounded}</p>
                    <p><strong>Rating :</strong> ${course.rating}</p>
                    <div class="card-actions">
                        <button class="btn-edit-course">Modifier</button>
                        <button class="btn-remove-course">Supprimer</button>
                    </div>
                </div>
            </article>
        `;
    }

    listElement.innerHTML = html;
}

function refresh() {
    // Nettoyage de la saisie utilisateur
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

// --- GESTION DE L'AJOUT ---
const formAddCourse = document.getElementById("form-add-course");
const inputCourseName = document.getElementById("input-course-name");
const inputCourseLocation = document.getElementById("input-course-location");
const inputCourseRegion = document.getElementById("input-course-region");
const inputCourseHoles = document.getElementById("input-course-holes");
const inputCoursePar = document.getElementById("input-course-par");
const inputCourseYearFounded = document.getElementById("input-course-year");
const inputCourseRating = document.getElementById("input-course-rating");

const currentYear = new Date().getFullYear();
if (inputCourseYearFounded) inputCourseYearFounded.max = currentYear;
const editCourseYear = document.getElementById("edit-course-year");
if (editCourseYear) editCourseYear.max = currentYear;

if (formAddCourse) {
    formAddCourse.addEventListener("submit", (e) => {
        e.preventDefault();

        const year = Number(inputCourseYearFounded.value);
        if (year < 1 || year > currentYear || !Number.isInteger(year)) {
            alert(`Veuillez entrer une année valide (entre 1 et ${currentYear}).`);
            return;
        }

        const newCourse = {
            id: Date.now(),
            name: inputCourseName.value.trim(),
            location: inputCourseLocation.value.trim(),
            region: inputCourseRegion.value,
            holes: Number(inputCourseHoles.value),
            par: Number(inputCoursePar.value),
            rating: Number(inputCourseRating.value),
            yearFounded: Number(inputCourseYearFounded.value),
            image: `https://placehold.co/600x400/2e8b57/white?text=${encodeURIComponent(inputCourseName.value.trim())}`,
            credit: "#"
        };

        courses.push(newCourse);
        refresh();
        formAddCourse.reset();
    });
}

// --- GESTION DE LA MODIFICATION ET SUPPRESSION ---
listElement.addEventListener("click", (e) => {
    // Traitement de l'action "Modifier"
    const editBtn = e.target.closest(".btn-edit-course");
    if (editBtn) {
        const articleCard = editBtn.closest(".golf-card");
        const courseId = Number(articleCard.dataset.id);

        // Récupération et pré-remplissage des données
        const courseToEdit = courses.find(c => c.id === courseId);
        if (courseToEdit) {
            document.getElementById("edit-course-id").value = courseToEdit.id;
            document.getElementById("edit-course-name").value = courseToEdit.name;
            document.getElementById("edit-course-location").value = courseToEdit.location;
            document.getElementById("edit-course-holes").value = courseToEdit.holes;
            document.getElementById("edit-course-par").value = courseToEdit.par;
            document.getElementById("edit-course-year").value = courseToEdit.yearFounded;
            document.getElementById("edit-course-rating").value = courseToEdit.rating;

            // Affichage de la fenêtre modale
            document.getElementById("edit-modal").classList.remove("hidden");
        }
        return; // Arrêt de l'exécution pour ne pas déclencher d'autres actions
    }

    // Traitement de l'action "Supprimer"
    const deleteBtn = e.target.closest(".btn-remove-course");
    if (deleteBtn) {
        const articleCard = deleteBtn.closest(".golf-card");
        const courseId = Number(articleCard.dataset.id);

        if (confirm("Voulez-vous vraiment supprimer ce parcours ?")) {
            // Mise à jour de la liste sans l'élément supprimé
            courses = courses.filter(course => course.id !== courseId);
            refresh();
        }
    }
});

// --- GESTION DE LA FENÊTRE MODALE ---
const editModal = document.getElementById("edit-modal");
const closeModal = document.getElementById("close-modal");
const formEditCourse = document.getElementById("form-edit-course");

// Fermeture via le bouton X
closeModal.addEventListener("click", () => {
    editModal.classList.add("hidden");
});

// Fermeture via un clic à l'extérieur
window.addEventListener("click", (e) => {
    if (e.target === editModal) {
        editModal.classList.add("hidden");
    }
});

// Traitement de la sauvegarde des modifications
formEditCourse.addEventListener("submit", (e) => {
    e.preventDefault();

    const year = Number(document.getElementById("edit-course-year").value);
    if (year < 1 || year > currentYear || !Number.isInteger(year)) {
        alert(`Veuillez entrer une année valide (entre 1 et ${currentYear}).`);
        return;
    }

    const idToUpdate = Number(document.getElementById("edit-course-id").value);
    const index = courses.findIndex(c => c.id === idToUpdate);

    if (index !== -1) {
        const newName = document.getElementById("edit-course-name").value.trim();

        courses[index].name = newName;
        courses[index].location = document.getElementById("edit-course-location").value.trim();
        courses[index].holes = Number(document.getElementById("edit-course-holes").value);
        courses[index].par = Number(document.getElementById("edit-course-par").value);
        courses[index].yearFounded = Number(document.getElementById("edit-course-year").value);
        courses[index].rating = Number(document.getElementById("edit-course-rating").value);

        // Rafraîchissement conditionnel de l'image de remplacement
        if (courses[index].image.includes("placehold.co")) {
            courses[index].image = `https://placehold.co/600x400/2e8b57/white?text=${encodeURIComponent(newName)}`;
        }

        refresh();
        editModal.classList.add("hidden");
    }
});