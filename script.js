
const form = document.getElementById("registrationForm");
const error = document.getElementById("error");
const successBox = document.getElementById("successBox");
const successMessage = document.getElementById("successMessage");

// Show or hide password
document.querySelectorAll(".toggle-password").forEach(function(button) {
    button.addEventListener("click", function() {
        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "🙈";
            button.setAttribute("aria-label", "Hide password");
        } else {
            input.type = "password";
            button.textContent = "👁";
            button.setAttribute("aria-label", "Show password");
        }
    });
});

// Form submission and validation
form.addEventListener("submit", function(event) {
    event.preventDefault();

    error.textContent = "";
    error.style.color = "#d93652";

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;
    const fileInput = document.getElementById("file");
    const terms = document.getElementById("terms").checked;

    // Required fields
    if (!name || !roll || !email || !course ||
        !password || !confirmPassword || !fileInput.files.length) {
        error.textContent = "Please fill in all required fields.";
        return;
    }

    // Name validation
    if (!/^[\p{L} .'-]+$/u.test(name)) {
        error.textContent =
            "Name should contain only letters, spaces, dots, apostrophes or hyphens.";
        return;
    }

    // Roll number validation
    if (!/^[A-Za-z0-9/-]+$/.test(roll)) {
        error.textContent =
            "Enter a valid roll number using letters and numbers.";
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        error.textContent = "Please enter a valid email address.";
        return;
    }

    // Password strength validation
    const strongPassword =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);

    if (!strongPassword) {
        error.textContent =
            "Password needs at least 8 characters, an uppercase letter, a lowercase letter and a number.";
        return;
    }

    // Confirm password
    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        return;
    }

    // File validation
    const file = fileInput.files[0];
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];
    const allowedExtensions = /\.(pdf|jpe?g|png)$/i;
    const maxSize = 5 * 1024 * 1024;

    if (!allowedExtensions.test(file.name) ||
        !allowedTypes.includes(file.type)) {
        error.textContent =
            "Upload only a PDF, JPG, JPEG or PNG file.";
        return;
    }

    if (file.size > maxSize) {
        error.textContent =
            "File size must not exceed 5 MB.";
        return;
    }

    // Terms confirmation
    if (!terms) {
        error.textContent =
            "Please confirm that the information is correct.";
        return;
    }

    // Show success message
    form.hidden = true;
    successBox.hidden = false;

    successMessage.textContent =
        "Welcome, " + name + "! Your form passed all validations.";

    successBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Reset form for another student
document.getElementById("resetBtn").addEventListener("click", function() {
    form.reset();
    form.hidden = false;
    successBox.hidden = true;
    error.textContent = "";

    document.querySelectorAll(".toggle-password").forEach(function(button) {
        button.textContent = "👁";
        button.setAttribute("aria-label", "Show password");
    });

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Login link demonstration
document.getElementById("loginLink").addEventListener("click", function(event) {
    event.preventDefault();
    error.style.color = "#7952d6";
    error.textContent =
        "Login functionality can be added as a separate page.";
});
