"use strict";

// VARIABLES D'ÉTAT ET DONNÉES

let sortAsc = false;
const currentYear = new Date().getFullYear();

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

// SÉLECTION DES ÉLÉMENTS DU DOM

// Interface principale
const listElement = document.getElementById("list");
const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");

// Modales et boutons
const addModal = document.getElementById("add-modal");
const editModal = document.getElementById("edit-modal");
const btnShowAddModal = document.getElementById("btn-show-add-modal");
const closeAddModalBtn = document.getElementById("close-add-modal");
const closeEditModalBtn = document.getElementById("close-modal");

// Formulaires
const formAddCourse = document.getElementById("form-add-course");
const formEditCourse = document.getElementById("form-edit-course");

// FONCTIONS PRINCIPALES

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

    // Ajout du html généré dans le conteneur
    listElement.innerHTML = html;
}

function refresh() {
    const query = searchInput.value.trim().toLowerCase();

    let result = courses.filter(course =>
        course.name.toLowerCase().includes(query)
    );

    result = [...result].sort((a, b) =>
        sortAsc ? a.rating - b.rating : b.rating - a.rating
    );

    afficherRessources(result);
}

// FONCTIONS DE VALIDATION

function clearErrors(prefix) {
    const fields = ["name", "location", "par", "year", "rating"];
    fields.forEach(field => {
        const input = document.getElementById(`${prefix}-course-${field}`);
        const errorSpan = document.getElementById(`error-${prefix}-${field}`);
        if (input) input.classList.remove("input-error");
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.classList.remove("visible");
        }
    });
}

function validateCourseForm(prefix) {
    let isValid = true;

    const setError = (field, msg) => {
        const input = document.getElementById(`${prefix}-course-${field}`);
        const errorSpan = document.getElementById(`error-${prefix}-${field}`);
        if (!input || !errorSpan) return;
        input.classList.add("input-error");
        errorSpan.textContent = msg;
        errorSpan.classList.add("visible");
        isValid = false;
    };

    clearErrors(prefix);

    const nameInput = document.getElementById(`${prefix}-course-name`);
    const locationInput = document.getElementById(`${prefix}-course-location`);
    const parInput = document.getElementById(`${prefix}-course-par`);
    const yearInput = document.getElementById(`${prefix}-course-year`);
    const ratingInput = document.getElementById(`${prefix}-course-rating`);

    if (!nameInput.value.trim()) {
        setError("name", "Le nom est obligatoire.");
    }

    if (!locationInput.value.trim()) {
        setError("location", "Le lieu est obligatoire.");
    }

    if (parInput.value.trim() === "") {
        setError("par", "Le par est obligatoire.");
    } else {
        const parVal = Number(parInput.value);
        if (parVal <= 0 || !Number.isInteger(parVal)) {
            setError("par", "Doit être un entier positif.");
        }
    }

    if (yearInput.value.trim() === "") {
        setError("year", "L'année est obligatoire.");
    } else {
        const yearVal = Number(yearInput.value);
        if (yearVal < 1 || yearVal > currentYear || !Number.isInteger(yearVal)) {
            setError("year", `Année invalide (1 - ${currentYear}).`);
        }
    }

    if (ratingInput.value.trim() === "") {
        setError("rating", "La note est obligatoire.");
    } else {
        const ratingVal = Number(ratingInput.value);
        if (ratingVal < 1 || ratingVal > 5 || !Number.isInteger(ratingVal)) {
            setError("rating", "Note entre 1 et 5.");
        }
    }

    return isValid;
}

// ÉCOUTEURS D'ÉVÉNEMENTS

// Barre de recherche et tri
if (searchInput) {
    searchInput.addEventListener("input", refresh);
}

if (btnSort) {
    btnSort.addEventListener("click", () => {
        sortAsc = !sortAsc;
        btnSort.textContent = sortAsc ? "Trier par note ↑" : "Trier par note ↓";
        refresh();
    });
}

// Modales : Ouvertures et fermetures
if (btnShowAddModal && addModal) {
    btnShowAddModal.addEventListener("click", () => {
        clearErrors("input");
        addModal.classList.remove("hidden");
    });
}

if (closeEditModalBtn && editModal) {
    closeEditModalBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
    });
}

if (closeAddModalBtn && addModal) {
    closeAddModalBtn.addEventListener("click", () => {
        addModal.classList.add("hidden");
    });
}

window.addEventListener("click", (e) => {
    if (editModal && e.target === editModal) {
        editModal.classList.add("hidden");
    }
    if (addModal && e.target === addModal) {
        addModal.classList.add("hidden");
    }
});

// Formulaire : Ajout d'un parcours
if (formAddCourse) {
    formAddCourse.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateCourseForm("input")) {
            return;
        }

        const inputName = document.getElementById("input-course-name").value.trim();

        const newCourse = {
            id: Date.now(),
            name: inputName,
            location: document.getElementById("input-course-location").value.trim(),
            region: document.getElementById("input-course-region").value,
            holes: Number(document.getElementById("input-course-holes").value),
            par: Number(document.getElementById("input-course-par").value),
            rating: Number(document.getElementById("input-course-rating").value),
            yearFounded: Number(document.getElementById("input-course-year").value),
            image: `https://placehold.co/600x400/2e8b57/white?text=${encodeURIComponent(inputName)}`,
            credit: "#"
        };

        courses.push(newCourse);
        refresh();
        formAddCourse.reset();

        if (addModal) {
            addModal.classList.add("hidden");
        }
    });
}

// Formulaire : Modification d'un parcours
if (formEditCourse) {
    formEditCourse.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateCourseForm("edit")) {
            return;
        }

        const idToUpdate = Number(document.getElementById("edit-course-id").value);
        const index = courses.findIndex(c => c.id === idToUpdate);

        if (index !== -1) {
            const newName = document.getElementById("edit-course-name").value.trim();

            courses[index].name = newName;
            courses[index].location = document.getElementById("edit-course-location").value.trim();
            courses[index].region = document.getElementById("edit-course-region").value;
            courses[index].holes = Number(document.getElementById("edit-course-holes").value);
            courses[index].par = Number(document.getElementById("edit-course-par").value);
            courses[index].yearFounded = Number(document.getElementById("edit-course-year").value);
            courses[index].rating = Number(document.getElementById("edit-course-rating").value);

            // Mise à jour conditionnelle de l'image (si c'est un placeholder)
            if (courses[index].image.includes("placehold.co")) {
                courses[index].image = `https://placehold.co/600x400/2e8b57/white?text=${encodeURIComponent(newName)}`;
            }

            refresh();
            if (editModal) {
                editModal.classList.add("hidden");
            }
        }
    });
}

// Liste : Délégation d'événements
if (listElement) {
    listElement.addEventListener("click", (e) => {

        // Modification
        const editBtn = e.target.closest(".btn-edit-course");
        if (editBtn) {
            const articleCard = editBtn.closest(".golf-card");
            const courseId = Number(articleCard.dataset.id);

            const courseToEdit = courses.find(c => c.id === courseId);
            if (courseToEdit) {
                document.getElementById("edit-course-id").value = courseToEdit.id;
                document.getElementById("edit-course-name").value = courseToEdit.name;
                document.getElementById("edit-course-location").value = courseToEdit.location;
                document.getElementById("edit-course-region").value = courseToEdit.region;
                document.getElementById("edit-course-holes").value = courseToEdit.holes;
                document.getElementById("edit-course-par").value = courseToEdit.par;
                document.getElementById("edit-course-year").value = courseToEdit.yearFounded;
                document.getElementById("edit-course-rating").value = courseToEdit.rating;

                clearErrors("edit");
                if (editModal) {
                    editModal.classList.remove("hidden");
                }
            }
            return;
        }

        // Suppression
        const deleteBtn = e.target.closest(".btn-remove-course");
        if (deleteBtn) {
            const articleCard = deleteBtn.closest(".golf-card");
            const courseId = Number(articleCard.dataset.id);

            if (confirm("Voulez-vous vraiment supprimer ce parcours ?")) {
                courses = courses.filter(course => course.id !== courseId);
                refresh();
            }
        }
    });
}

// INITIALISATION DE L'APPLICATION
// Injection des limites dynamiques sur les dates

const inputCourseYear = document.getElementById("input-course-year");
const editCourseYearInit = document.getElementById("edit-course-year");
if (inputCourseYear) inputCourseYear.max = currentYear;
if (editCourseYearInit) editCourseYearInit.max = currentYear;

// Premier affichage
refresh();