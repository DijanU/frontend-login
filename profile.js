document.addEventListener('DOMContentLoaded', async () => {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userIdDisplay = document.getElementById('userIdDisplay');
    const logoutButton = document.getElementById('logoutButton');
    const backendUrl = 'http://localhost:3000';

    // Obtener datos del localStorage
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem("token");

    console.log('Token en profile.js (al inicio):', token); // Debug

    // Verificar si hay token o userId
    if (!userId || !token) {
        alert('No han iniciado sesión. Redirigiendo a login...');
        window.location.href = 'index.html';
        return;
    }

    // Mostrar datos locales
    userIdDisplay.textContent = userId;
    usernameDisplay.textContent = username || 'Usuario';

    // Verificar con el backend usando el token
    try {
        const response = await fetch(`${backendUrl}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al verificar sesión con el backend');
        }

        const userData = await response.json();
        usernameDisplay.textContent = userData.username;
        console.log('Datos del perfil del backend:', userData);

    } catch (error) {
        console.error('Error verificando usuario:', error);
        alert('Error al verificar sesión. Redirigiendo a login.');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
        return;
    }

    // Botón de logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        alert('Sesión cerrada.');
        window.location.href = 'index.html';
    });
});

