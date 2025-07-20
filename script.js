document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".ramo");

  // Restaurar progreso
  botones.forEach(boton => {
    const id = boton.dataset.id;
    if (localStorage.getItem(id) === "completed") {
      boton.classList.add("completed");
    }
  });

  function actualizarBloqueos() {
    botones.forEach(boton => {
      if (boton.classList.contains("completed")) return;

      const prereqs = boton.dataset.prereq;
      if (!prereqs) {
        boton.classList.remove("locked");
        return;
      }

      const requisitos = prereqs.split(",");
      const cumple = requisitos.every(pr => {
        const r = document.querySelector(`[data-id="${pr.trim()}"]`);
        return r && r.classList.contains("completed");
      });

      if (cumple) {
        boton.classList.remove("locked");
      } else {
        boton.classList.add("locked");
      }
    });
  }

  actualizarBloqueos();

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      if (boton.classList.contains("locked")) return;

      boton.classList.toggle("completed");
      const id = boton.dataset.id;
      const estado = boton.classList.contains("completed") ? "completed" : "";
      localStorage.setItem(id, estado);
      actualizarBloqueos();
    });
  });
});
