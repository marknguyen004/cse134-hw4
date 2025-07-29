const form = document.querySelector(".contact-form form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const phonenumber = document.getElementById("phonenumber");
const phoneError = document.getElementById("phone-error");
const comments = document.getElementById("comments");
const commentsCt = document.getElementById("comments-counter");
const logInput = document.getElementById("form-errors");

let form_errors = [];

function logError(field, msg, value) {
    form_errors.push({
        field,
        error: msg,
        value,
        time: new Date().toISOString()
    });
    logInput.value = JSON.stringify(form_errors);
}

function flash(field, span, msg) {
    field.classList.add("flash");
    span.textContent = msg;
    span.classList.add("active");
    setTimeout(() => {
        field.classList.remove("flash");
        span.classList.remove("active");
        span.textContent = "";
    }, 1200);
}

firstname.addEventListener("input", (event) => {
    firstname.setCustomValidity("");
    if (firstname.validity.valueMissing) {
        const m = "Please enter your first name.";
        firstname.setCustomValidity(m);
        logError("firstname", m, "");
    }
});

lastname.addEventListener("input", (event) => {
    lastname.setCustomValidity("");
    if (lastname.validity.valueMissing) {
        const m = "Please enter your last name.";
        lastname.setCustomValidity(m);
        logError("lastname", m, "");
    }
});

const emailMask = /^[A-Za-z0-9@.\-_]$/;
email.addEventListener("keypress", (event) => {
    if (!emailMask.test(event.key)) {
        event.preventDefault();
        const m = "Illegal character";
        flash(email, emailError, m);
        logError("email", m, email.value + event.key);
    }
});

email.addEventListener("input", (event) => {
    email.setCustomValidity("");
    if (email.validity.valueMissing) {
        const m = "Email is required.";
        email.setCustomValidity(m);
        logError("email", m, "");
        emailError.textContent = m;
        emailError.classList.add("active");
        setTimeout(() => {
            emailError.classList.remove("active");
            emailError.textContent = "";
        }, 2000);
    } else if (email.validity.typeMismatch) {
        const m = "Invalid email format.";
        email.setCustomValidity(m);
        logError("email", m, email.value);
        emailError.textContent = m;
        emailError.classList.add("active");
        setTimeout(() => {
            emailError.classList.remove("active");
            emailError.textContent = "";
        }, 2000);
    }
});

const phoneMask = /^[0-9\-]$/;
phonenumber.addEventListener("keypress", (event) => {
    if (!phoneMask.test(event.key)) {
        event.preventDefault();
        const m = "Only digits & hyphens allowed.";
        flash(phonenumber, phoneError, m);
        logError("phonenumber", m, phonenumber.value + event.key);
    }
});

phonenumber.addEventListener("input", (event) => {
    phonenumber.setCustomValidity("");
    if (phonenumber.value && phonenumber.validity.patternMismatch) {
        const m = "Phone must match 123-456-7890";
        phonenumber.setCustomValidity(m);
        logError("phonenumber", m, phonenumber.value);
        phoneError.textContent = m;
        phoneError.classList.add("active");
        setTimeout(() => {
            phoneError.classList.remove("active");
            phoneError.textContent = "";
        }, 2000);
    }
});

const maxLen = +comments.maxLength;
comments.addEventListener("input", (event) => {
    const left = maxLen - comments.value.length;
    commentsCt.textContent = `${left} characters left`;
    commentsCt.classList.toggle("warn", left <= 20);
});

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
    }
});
