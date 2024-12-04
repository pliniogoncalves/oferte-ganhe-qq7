document.querySelectorAll('.load-content').forEach(button => {
  button.addEventListener('click', function () {
    
    document.querySelectorAll('.load-content').forEach(btn => btn.classList.remove('active'));

    this.classList.add('active');
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

document.addEventListener('click', function(event) {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector('.hamburger');

  if(!sidebar.contains(event.target) && !hamburger.contains(event.target)){
    closeSidebar();
  }
});