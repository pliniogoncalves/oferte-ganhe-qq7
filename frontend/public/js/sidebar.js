function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const overlay = document.getElementById("overlay");
  
    // Alterna a classe active no sidebar
    sidebar.classList.toggle("active");
  
    // Se o sidebar estiver ativo
    if (sidebar.classList.contains("active")) {
      mainContent.classList.add("active");
      overlay.style.display = "block"; // Mostra o overlay
    } else {
      mainContent.classList.remove("active");
      overlay.style.display = "none"; // Esconde o overlay
    }
  }
  
  // Fechar o sidebar quando clicar fora dele
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("overlay");
  
    // Verifica se o clique foi fora do sidebar e do hamburger
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(event.target) && // Se o clique não for no sidebar
      !hamburger.contains(event.target) // Se o clique não for no botão de hambúrguer
    ) {
      // Recolhe o sidebar e ajusta o conteúdo
      sidebar.classList.remove("active");
      mainContent.classList.remove("active");
      overlay.style.display = "none"; // Esconde o overlay
    }
  });
  
  // Função para fechar o sidebar ao clicar no botão "X"
  function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const overlay = document.getElementById("overlay");
  
    sidebar.classList.remove("active");
    mainContent.classList.remove("active");
    overlay.style.display = "none";
  }
  
  function setActiveButton(activeSection) {
    const buttons = document.querySelectorAll(".nav-item .btn-custom");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  
    const bottomButtons = document.querySelectorAll(
      ".bottom-links .btn-custom, .bottom-links .btn-danger"
    );
    bottomButtons.forEach((button) => {
      button.classList.remove("active");
    });
  
    const activeButton = [...buttons, ...bottomButtons].find(
      (button) => button.textContent.trim() === activeSection
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
  