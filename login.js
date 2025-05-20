// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const messageElement = document.getElementById("loginMessage")
  const backendUrl = "http://localhost:3000"

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value
    messageElement.textContent = ""

    // Validaciones mejoradas
    if (!username || !password) {
      messageElement.textContent = "Por favor llenen todos los campos."
      return
    }

    // Validar longitud del nombre de usuario
    if (username.length < 3) {
      messageElement.textContent = "El nombre de usuario debe tener al menos 3 caracteres."
      return
    }

    // Validar que el nombre de usuario solo contenga caracteres permitidos
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      messageElement.textContent = "El nombre de usuario solo puede contener letras, números y guiones bajos."
      return
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
      messageElement.textContent = "La contraseña debe tener al menos 6 caracteres."
      return
    }

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json() // Esperamos JSON

      if (response.ok) {
        // Login exitoso (200 OK)
        // Guardar el ID y username en localStorage
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("username", username) // Guardamos el username también

        // Redirigir a la página de perfil
        window.location.href = "profile.html"
      } else {
        // Error (401, 500...)
        messageElement.textContent = `Error: ${data.error || "Usuario o contraseña inválidos"}`
        localStorage.removeItem("userId") // Asegurar que no quede nada si falla
        localStorage.removeItem("username")
      }
    } catch (error) {
      console.error("Error de login:", error)
      messageElement.textContent = "Login falló. Problema de red o del servidor. Revisen la consola."
      localStorage.removeItem("userId")
      localStorage.removeItem("username")
    }
  })
})
