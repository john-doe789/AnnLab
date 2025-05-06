// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Publications page filtering
    const pubYearSelect = document.getElementById('pub-year');
    const pubTypeSelect = document.getElementById('pub-type');
    
    if (pubYearSelect && pubTypeSelect) {
        pubYearSelect.addEventListener('change', filterPublications);
        pubTypeSelect.addEventListener('change', filterPublications);
        
        function filterPublications() {
            const selectedYear = pubYearSelect.value;
            const selectedType = pubTypeSelect.value;
            
            // Get all publication items
            const pubYears = document.querySelectorAll('.pub-year');
            const pubItems = document.querySelectorAll('.pub-item');
            
            // Filter by year
            if (selectedYear === 'all') {
                pubYears.forEach(yearSection => {
                    yearSection.style.display = 'block';
                });
            } else {
                pubYears.forEach(yearSection => {
                    if (yearSection.id === 'year-' + selectedYear) {
                        yearSection.style.display = 'block';
                    } else {
                        yearSection.style.display = 'none';
                    }
                });
            }
            
            // Filter by type
            if (selectedType !== 'all') {
                pubItems.forEach(item => {
                    if (item.parentElement.style.display !== 'none') {
                        if (item.classList.contains(selectedType)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            } else {
                pubItems.forEach(item => {
                    if (item.parentElement.style.display !== 'none') {
                        item.style.display = 'block';
                    }
                });
            }
        }
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('请填写所有必填字段');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的电子邮件地址');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('感谢您的留言！我们会尽快回复。');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Simple image gallery for events (if needed)
    const eventImages = document.querySelectorAll('.past-event img');
    
    eventImages.forEach(img => {
        img.addEventListener('click', function() {
            // For a simple lightbox effect
            if (this.classList.contains('expanded')) {
                this.classList.remove('expanded');
                this.style.cursor = 'zoom-in';
            } else {
                this.classList.add('expanded');
                this.style.cursor = 'zoom-out';
            }
        });
    });
    
    // Add a custom style for expanded images
    const style = document.createElement('style');
    style.textContent = `
        .past-event img.expanded {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            max-height: 90%;
            width: auto;
            height: auto;
            z-index: 1000;
            cursor: zoom-out;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
        }
    `;
    document.head.appendChild(style);
    
    // Close expanded image when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.past-event img')) {
            const expandedImage = document.querySelector('.past-event img.expanded');
            if (expandedImage) {
                expandedImage.classList.remove('expanded');
                expandedImage.style.cursor = 'zoom-in';
            }
        }
    });
}); 