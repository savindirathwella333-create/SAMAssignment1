// ========================================
// Contact Form Validation & Handling
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // ========================================
    // Form Validation Functions
    // ========================================
    
    // Validate name field
    function validateName(name) {
        const trimmedName = name.trim();
        if (trimmedName.length === 0) {
            return { valid: false, message: 'Please enter your name.' };
        }
        if (trimmedName.length < 2) {
            return { valid: false, message: 'Name must be at least 2 characters long.' };
        }
        if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
            return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes.' };
        }
        return { valid: true, message: '' };
    }
    
    // Validate email field
    function validateEmail(email) {
        const trimmedEmail = email.trim();
        if (trimmedEmail.length === 0) {
            return { valid: false, message: 'Please enter your email address.' };
        }
        
        // Comprehensive email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmedEmail)) {
            return { valid: false, message: 'Please enter a valid email address.' };
        }
        
        return { valid: true, message: '' };
    }
    
    // Validate subject field
    function validateSubject(subject) {
        const trimmedSubject = subject.trim();
        if (trimmedSubject.length === 0) {
            return { valid: false, message: 'Please enter a subject.' };
        }
        if (trimmedSubject.length < 3) {
            return { valid: false, message: 'Subject must be at least 3 characters long.' };
        }
        return { valid: true, message: '' };
    }
    
    // Validate message field
    function validateMessage(message) {
        const trimmedMessage = message.trim();
        if (trimmedMessage.length === 0) {
            return { valid: false, message: 'Please enter your message.' };
        }
        if (trimmedMessage.length < 10) {
            return { valid: false, message: 'Message must be at least 10 characters long.' };
        }
        if (trimmedMessage.length > 1000) {
            return { valid: false, message: 'Message must not exceed 1000 characters.' };
        }
        return { valid: true, message: '' };
    }
    
    // ========================================
    // Real-time Validation
    // ========================================
    
    // Validate field on blur
    function validateField(input, validator) {
        const validation = validator(input.value);
        const feedbackElement = input.nextElementSibling;
        
        if (validation.valid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = '';
            }
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = validation.message;
            }
        }
        
        return validation.valid;
    }
    
    // Add blur event listeners for real-time validation
    nameInput.addEventListener('blur', function() {
        validateField(this, validateName);
    });
    
    emailInput.addEventListener('blur', function() {
        validateField(this, validateEmail);
    });
    
    subjectInput.addEventListener('blur', function() {
        validateField(this, validateSubject);
    });
    
    messageInput.addEventListener('blur', function() {
        validateField(this, validateMessage);
    });
    
    // Remove validation styling on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                this.classList.remove('is-invalid', 'is-valid');
            }
        });
    });
    
    // ========================================
    // Form Submit Handler
    // ========================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Validate all fields
        const nameValid = validateField(nameInput, validateName);
        const emailValid = validateField(emailInput, validateEmail);
        const subjectValid = validateField(subjectInput, validateSubject);
        const messageValid = validateField(messageInput, validateMessage);
        
        // Check if all fields are valid
        const formValid = nameValid && emailValid && subjectValid && messageValid;
        
        if (!formValid) {
            // Scroll to first invalid field
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
            return;
        }
        
        // Show loading state
        btnText.classList.add('d-none');
        btnLoader.classList.remove('d-none');
        contactForm.querySelector('button[type="submit"]').disabled = true;
        
        // Simulate form submission (replace with actual API call)
        simulateFormSubmission()
            .then(response => {
                // Show success message
                successMessage.classList.remove('d-none');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form
                contactForm.reset();
                
                // Remove validation classes
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                
                // Log form data (for development)
                console.log('Form submitted successfully:', response);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            })
            .catch(error => {
                // Show error message
                errorMessage.classList.remove('d-none');
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                console.error('Form submission error:', error);
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorMessage.classList.add('d-none');
                }, 5000);
            })
            .finally(() => {
                // Reset button state
                btnText.classList.remove('d-none');
                btnLoader.classList.add('d-none');
                contactForm.querySelector('button[type="submit"]').disabled = false;
            });
    });
    
    // ========================================
    // Simulate Form Submission
    // ========================================
    
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Simulate network delay (1.5 seconds)
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({
                        success: true,
                        message: 'Message sent successfully',
                        data: formData
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Network error occurred'
                    });
                }
            }, 1500);
        });
    }
    
    // ========================================
    // Skills Progress Bar Animation
    // ========================================
    
    // Animate progress bars on scroll
    const skillProgressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset width for animation
                progressBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                // Stop observing after animation
                progressObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all progress bars
    skillProgressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // ========================================
    // Project Card Animations
    // ========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
    
    // ========================================
    // Character Counter for Message Field
    // ========================================
    
    const maxChars = 1000;
    const charCounter = document.createElement('small');
    charCounter.className = 'text-muted d-block mt-1';
    charCounter.textContent = `0 / ${maxChars} characters`;
    messageInput.parentNode.appendChild(charCounter);
    
    messageInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength} / ${maxChars} characters`;
        
        if (currentLength > maxChars) {
            charCounter.classList.add('text-danger');
            charCounter.classList.remove('text-muted');
        } else {
            charCounter.classList.add('text-muted');
            charCounter.classList.remove('text-danger');
        }
    });
    
    // ========================================
    // Console Log for Development
    // ========================================
    
    console.log('Contact form initialized successfully!');
    console.log('Form validation enabled');
    console.log('Total project cards:', projectCards.length);
    console.log('Total skill progress bars:', skillProgressBars.length);
});

// ========================================
// Utility Functions
// ========================================

// Function to get form data
function getFormData() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    return {
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        subject: subjectInput ? subjectInput.value.trim() : '',
        message: messageInput ? messageInput.value.trim() : ''
    };
}

// Function to reset form manually
function resetContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        console.log('Contact form reset');
    }
}

// Function to show success message manually
function showSuccessMessage(message = null) {
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        if (message) {
            const messageText = successMsg.querySelector('strong').nextSibling;
            messageText.textContent = ' ' + message;
        }
        successMsg.classList.remove('d-none');
    }
}

// Function to show error message manually
function showErrorMessage(message = null) {
    const errorMsg = document.getElementById('errorMessage');
    if (errorMsg) {
        if (message) {
            const messageText = errorMsg.querySelector('strong').nextSibling;
            messageText.textContent = ' ' + message;
        }
        errorMsg.classList.remove('d-none');
    }
}

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getFormData,
        resetContactForm,
        showSuccessMessage,
        showErrorMessage
    };
}