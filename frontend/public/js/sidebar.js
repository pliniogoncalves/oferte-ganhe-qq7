document.querySelectorAll('.load-content').forEach(button => {
  button.addEventListener('click', function () {
    
    document.querySelectorAll('.load-content').forEach(btn => btn.classList.remove('active'));

    this.classList.add('active');
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
}