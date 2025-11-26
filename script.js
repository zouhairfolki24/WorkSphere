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