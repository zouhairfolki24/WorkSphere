document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("openEmployeeModal");
    const modalOverlay = document.getElementById("employeeModal");
    const closeModalBtn = document.getElementById("closeEmployeeModal");
    const cancelModalBtn = document.getElementById("cancelEmployeeModal");
    const employeeForm = document.getElementById("employeeForm");
    const staffList = document.querySelector(".staff-list");
    const addExperienceBtn = document.getElementById("addExperience");
    const experiencesContainer = document.getElementById("experiencesContainer");

    function openModal() {
        modalOverlay.classList.add("is-open");
    }

    function closeModal() {
        modalOverlay.classList.remove("is-open");
        employeeForm.reset();
        experiencesContainer.innerHTML = "";
        addExperienceField();
    }

    // Ajouter un champ d'expérience dynamique
    function addExperienceField() {
        const item = document.createElement("div");
        item.className = "experience-item";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ex : 3 ans en sécurité, 2 ans en réception...";
        input.name = "experiences[]";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "experience-remove";
        removeBtn.textContent = "Supprimer";

        removeBtn.addEventListener("click", () => {
            item.remove();
        });

        item.appendChild(input);
        item.appendChild(removeBtn);
        experiencesContainer.appendChild(item);
    }

    // ouvrir modal
    openModalBtn.addEventListener("click", openModal);

    // fermer modal (croix + annuler)
    closeModalBtn.addEventListener("click", closeModal);
    cancelModalBtn.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // bouton "Ajouter une expérience"
    addExperienceBtn.addEventListener("click", () => {
        addExperienceField();
    });

    // créer au moins 1 champ expérience au chargement
    addExperienceField();

    // Submit formulaire
    employeeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("employeeName").value.trim();
        const role = document.getElementById("employeeRole").value.trim();
        const photoUrl = document.getElementById("employeePhoto").value.trim();
        const email = document.getElementById("employeeEmail").value.trim();
        const phone = document.getElementById("employeePhone").value.trim();

        const experienceInputs = experiencesContainer.querySelectorAll("input");
        const experiences = [];
        experienceInputs.forEach((input) => {
            const val = input.value.trim();
            if (val !== "") {
                experiences.push(val);
            }
        });

        if (!name || !role) {
            alert("Nom et rôle sont obligatoires.");
            return;
        }

        const placeholder = staffList.querySelector(".placeholder");
        if (placeholder) {
            placeholder.remove();
        }

        const li = document.createElement("li");
        li.className = "staff-card";

        const avatarSrc = photoUrl || "https://via.placeholder.com/80";

        li.innerHTML = `
            <div class="staff-header-row">
                <img class="staff-avatar" src="${avatarSrc}" alt="${name}">
                <div>
                    <p class="staff-name">${name}</p>
                    <p class="staff-role">${role}</p>
                </div>
            </div>
            <div class="staff-contact">
                ${email ? `<a href="mailto:${email}">${email}</a>` : ""}
                ${phone ? `<span>${phone}</span>` : ""}
            </div>
            ${
                experiences.length
                    ? `<ul class="staff-experiences">
                        ${experiences.map((exp) => `<li>${exp}</li>`).join("")}
                       </ul>`
                    : ""
            }
        `;

        staffList.appendChild(li);

        closeModal();
    });
});

