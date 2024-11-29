document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });

        if (response.ok) {
            window.location.href = '/login';
        } else {
            alert('Logout failed.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred.');
    }
});
