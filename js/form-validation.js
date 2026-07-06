/* ============================================
   FORM VALIDATION AND HANDLING
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

// Initialize form validation
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        setupRealTimeValidation(contactForm);
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

// Setup real-time validation
function setupRealTimeValidation(form) {
    const formFields = form.querySelectorAll('input, textarea, select');

    formFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', function() {
            validateField(this);
        });

        // Validate on change
        field.addEventListener('change', function() {
            validateField(this);
        });

        // Validate on input (for real-time feedback)
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(fieldName) {
        case 'name':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (fieldValue.length < 3) {
                isValid = false;
                errorMessage = 'Name must be at least 3 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(fieldValue)) {
                isValid = false;
                errorMessage = 'Name can only contain letters and spaces';
            }
            break;

        case 'email':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'phone':
            if (fieldValue !== '') {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(fieldValue) || fieldValue.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }
            break;

        case 'service':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Please select a service';
            }
            break;

        case 'message':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (fieldValue.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;

        case 'privacy':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'You must agree to the privacy policy';
            }
            break;
    }

    // Update field styles and error message
    updateFieldValidation(field, isValid, errorMessage);
    return isValid;
}

// Update field validation styles
function updateFieldValidation(field, isValid, errorMessage) {
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.textContent = errorMessage;
        }
    }
}

// Validate entire form
function validateForm(form) {
    let isFormValid = true;
    const formFields = form.querySelectorAll('input[required], textarea[required], select[required]');

    formFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    // Check privacy checkbox
    const privacyCheckbox = form.querySelector('input[name="privacy"]');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        if (!validateField(privacyCheckbox)) {
            isFormValid = false;
        }
    }

    return isFormValid;
}

// Handle contact form submission
function handleContactFormSubmission(form) {
    // Clear previous messages
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';

    // Validate form
    if (!validateForm(form)) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        service: formData.get('service'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    // Send form data to backend
    sendContactForm(data)
        .then(response => {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Clear validation states
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });

            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('errorMessage').style.display = 'block';
        })
        .finally(() => {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
}

// Send contact form data to backend (Mocked for static site success)
function sendContactForm(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data submitted (Mock):', data);
            resolve({ success: true, message: "we will reach you soon" });
        }, 1000); // 1 second delay to simulate sending animation
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear all field validation states
function clearFormValidation(form) {
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.classList.remove('is-valid', 'is-invalid');
    });

    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
}

// Format phone number on input
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        const value = this.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            if (value.length <= 3) {
                formattedValue = value;
            } else if (value.length <= 6) {
                formattedValue = `(${value.substring(0, 3)}) ${value.substring(3)}`;
            } else {
                formattedValue = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
            }
        }

        this.value = formattedValue;
    });
}

// Character counter for message textarea
const messageTextarea = document.querySelector('textarea[name="message"]');
if (messageTextarea) {
    let charCountDiv = messageTextarea.nextElementSibling;
    // Create character counter element if it doesn't exist
    if (!charCountDiv || !charCountDiv.classList.contains('char-count')) {
        charCountDiv = document.createElement('div');
        charCountDiv.className = 'char-count text-muted small mt-1';
        messageTextarea.parentNode.insertBefore(charCountDiv, messageTextarea.nextSibling);
    }
    charCountDiv.textContent = `${messageTextarea.value.length} characters`;

    messageTextarea.addEventListener('input', function() {
        charCountDiv.textContent = `${this.value.length} characters`;
    });
}

console.log('Form validation initialized successfully!');
