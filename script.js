document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Hide all sections
            document.querySelectorAll('main > section').forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            targetSection.classList.add('active-section');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Show home section by default
    document.querySelector('#home').classList.add('active-section');
    document.querySelector('.nav-links a[href="#home"]').parentElement.classList.add('active');

    // Portfolio filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class on buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter portfolio items
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if(filter === 'all') {
                    item.style.display = 'block';
                } else if(item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // HIRE ME button functionality (mailto)
    const hireMeBtn = document.getElementById('hireMeBtn');
    if(hireMeBtn) {
        hireMeBtn.addEventListener('click', function() {
            // Open Gmail with pre-filled email
            window.location.href = 'mailto:abpanganiban1@gmail.com';
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            for(let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // For demonstration, log the form data and show success message
            console.log('Form submission:', formValues);
            
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.color = '#ffc107';
            successMessage.style.marginTop = '15px';
            successMessage.style.fontWeight = '500';
            
            this.appendChild(successMessage);
            
            // Reset form after submission
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
});



const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.innerHTML = "Submit";
            }, 2000);
        });
});