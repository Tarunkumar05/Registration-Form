document.addEventListener('DOMContentLoaded', function () {
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const progressBar = document.querySelectorAll('#progress-bar .step');
    const form = document.getElementById('registration-form');
    const summary = document.getElementById('summary');
    const summaryContent = document.getElementById('summary-content');
    let currentStep = 0;

    function showStep(step) {
        formSteps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
            progressBar[index].classList.toggle('active', index === step);
        });
    }

    nextBtns.forEach((button) => {
        button.addEventListener('click', function () {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach((button) => {
        button.addEventListener('click', function () {
            currentStep--;
            showStep(currentStep);
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateStep(currentStep)) {
            displaySummary();
            form.style.display = 'none';
            summary.style.display = 'block';
        }
    });

    function validateStep(step) {
        let valid = true;
        const inputs = formSteps[step].querySelectorAll('input');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.reportValidity();
            }
        });
        if (step === 2) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                valid = false;
                alert('Passwords do not match');
            }
        }
        return valid;
    }

    function displaySummary() {
        summaryContent.innerHTML = `
            <p><strong>First Name:</strong> ${document.getElementById('first-name').value}</p>
            <p><strong>Last Name:</strong> ${document.getElementById('last-name').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Address:</strong> ${document.getElementById('address').value}</p>
            <p><strong>City:</strong> ${document.getElementById('city').value}</p>
            <p><strong>State:</strong> ${document.getElementById('state').value}</p>
            <p><strong>Zip Code:</strong> ${document.getElementById('zip').value}</p>
            <p><strong>Username:</strong> ${document.getElementById('username').value}</p>
        `;
    }

    showStep(currentStep);
});
