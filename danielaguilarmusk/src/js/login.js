import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset Error
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        // Set Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Accediendo...';

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/admin/dashboard.html';
        } catch (err) {
            console.error(err);
            errorMessage.textContent = 'Credenciales incorrectas o error de conexión.';
            errorMessage.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Entrar';
        }
    });
});
