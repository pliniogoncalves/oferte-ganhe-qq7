document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const matricula = document.getElementById('matricula').value;
  const senha = document.getElementById('senha').value;

  try {
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricula, senha })
      });

      if (response.ok) {
          window.location.href = '/main';
      } else {
          const data = await response.json();
          alert(data.message || 'Failed to login.');
      }
  } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred.');
  }
});
