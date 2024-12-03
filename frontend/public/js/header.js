function mostrarNotificacao() {
    const count = document.getElementById("notificationCount");
    count.style.display = "block";
    count.textContent = parseInt(count.textContent) + 1;
  }