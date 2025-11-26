const openBtn = document.getElementById("openForm");
    const closeBtn = document.getElementById("closeForm");
    const popup = document.getElementById("popup");

    openBtn.onclick = () => popup.classList.remove("hidden");
    closeBtn.onclick = () => {
      popup.classList.add("hidden");
      document.querySelector("form");
      document.getElementById("experienceList").innerHTML = "";
    };
    
    
    
    const experienceList = document.getElementById("experienceList");
    const addExperienceBtn = document.getElementById("addExperience");

    addExperienceBtn.onclick = () => {
      const expDiv = document.createElement("div");
      expDiv.className = "bg-zinc-600 p-4 rounded-md flex flex-col gap-3";

      expDiv.innerHTML = `
        <input type="text" placeholder="Titre" class="w-full px-3 py-2 rounded bg-zinc-500 text-white exp-title">
        <div class="flex gap-3">
          <div class="w-1/2">
            <label class="text-white text-sm">Début</label>
            <input type="date" class="w-full px-3 py-2 rounded bg-zinc-500 text-white exp-start">
          </div>
          <div class="w-1/2">
            <label class="text-white text-sm">Fin</label>
            <input type="date" class="w-full px-3 py-2 rounded bg-zinc-500 text-white exp-end">
          </div>
        </div>
        <button type="button" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded removeExp">
          Supprimer
        </button>
      `;

      expDiv.querySelector(".removeExp").onclick = () => expDiv.remove();
      experienceList.appendChild(expDiv);
    };

    let employees = JSON.parse(localStorage.getItem("employees") || "[]");
    let rooms = JSON.parse(localStorage.getItem("rooms") || "{}");

    const profileContainer = document.getElementById("profileContainer");
  
    function renderEmployee(emp) {
      const card = document.createElement("div");
      card.className = "bg-zinc-700 text-white p-4 rounded flex items-center gap-3 shadow cursor-pointer hover:bg-zinc-600";

      card.innerHTML = `
        <img src="${emp.pic || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(emp.name)}"
             class="w-12 h-12 rounded-full object-cover">
        <div>
          <h3 class="font-bold text-lg">${emp.name}</h3>
          <p class="text-sm opacity-80">${emp.role}</p>
        </div>
      `;

      profileContainer.appendChild(card);
    }

    function refreshEmployeeList() {
      profileContainer.innerHTML = "";
      employees.forEach(renderEmployee);
    }

    refreshEmployeeList();

    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();

      const experienceBlocks = document.querySelectorAll("#experienceList > div");
      const experiences = [...experienceBlocks].map(exp => ({
        titre: exp.querySelector(".exp-title").value,
        debut: exp.querySelector(".exp-start").value,
        fin: exp.querySelector(".exp-end").value,
      }));

      const employee = {
        id: Date.now(),
        name: document.getElementById("name").value,
        role: document.getElementById("room").value,
        pic: document.getElementById("pic").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("tele").value,
        experiences
      };

      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));

      refreshEmployeeList();

      popup.classList.add("hidden");
      this.reset();
      experienceList.innerHTML = "";
    });


    function canEnter(role, room) {
      const r = role.toLowerCase();

      if (r === "manager") return true;
      if (r === "nettoyage" && room === "archive") return false;
      if (r === "nettoyage") return true;

      const rules = {
        "reception": ["manager","receptionnistes"],
        "serveurs": ["manager","techniciens"],
        "security": ["manager","securite"],
        "conference": ["manager", "nettoyage", "invite"],
        "personel": ["manager", "nettoyage", "invite"],
        "archive": ["manager"]
      };

      if (!rules[room]) return true;
      return rules[room].includes(r);
    }

    