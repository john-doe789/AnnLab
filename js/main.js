// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for fade-in effect
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 150);
    
    // Add animation to sections as they come into view
    const animateSections = function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize section animations
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on page load
    setTimeout(animateSections, 300);

    // Run animation on scroll
    window.addEventListener('scroll', animateSections);
    
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
                    setTimeout(() => {
                        yearSection.style.opacity = '1';
                    }, 50);
                });
            } else {
                pubYears.forEach(yearSection => {
                    if (yearSection.id === 'year-' + selectedYear) {
                        yearSection.style.display = 'block';
                        setTimeout(() => {
                            yearSection.style.opacity = '1';
                        }, 50);
                    } else {
                        yearSection.style.opacity = '0';
                        setTimeout(() => {
                            yearSection.style.display = 'none';
                        }, 300);
                    }
                });
            }
            
            // Filter by type
            if (selectedType !== 'all') {
                pubItems.forEach(item => {
                    if (item.parentElement.style.display !== 'none') {
                        if (item.classList.contains(selectedType)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(10px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            } else {
                pubItems.forEach(item => {
                    if (item.parentElement.style.display !== 'none') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }
                });
            }
        }
    }
    
    // Contact form handling with enhanced feedback
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            if (name === '') {
                document.getElementById('name').classList.add('error');
                createToast('请填写姓名', 'error');
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('email').classList.add('error');
                createToast('请填写邮箱', 'error');
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('message').classList.add('error');
                createToast('请填写留言内容', 'error');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email').classList.add('error');
                createToast('请输入有效的电子邮件地址', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // Simulate form submission with timeout
            setTimeout(function() {
                createToast('感谢您的留言！我们会尽快回复。', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Create toast notification function
    function createToast(message, type = 'info') {
        // Check if toast container exists, if not create it
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Add style for toast container
            const style = document.createElement('style');
            style.textContent = `
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                .toast {
                    padding: 12px 20px;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: white;
                    transform: translateX(120%);
                    transition: transform 0.3s ease;
                    animation: slideIn 0.3s forwards, fadeOut 0.3s 3.7s forwards;
                }
                .toast.info {
                    background-color: #3498db;
                }
                .toast.success {
                    background-color: #2ecc71;
                }
                .toast.error {
                    background-color: #e74c3c;
                }
                .toast.warning {
                    background-color: #f39c12;
                }
                .toast-icon {
                    margin-right: 10px;
                    font-size: 20px;
                }
                @keyframes slideIn {
                    to { transform: translateX(0); }
                }
                @keyframes fadeOut {
                    to { opacity: 0; }
                }
                .form-group input.error,
                .form-group textarea.error {
                    border-color: #e74c3c;
                    background-color: rgba(231, 76, 60, 0.05);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Set icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '✓';
                break;
            case 'error':
                icon = '✗';
                break;
            case 'warning':
                icon = '⚠';
                break;
            default:
                icon = 'ℹ';
        }
        
        toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
        toastContainer.appendChild(toast);
        
        // Remove toast after animation completes
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
    
    // Smooth scrolling for anchor links with improved animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate distance to scroll
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 80;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                // Easing function for smoother animation
                function easeInOutQuad(t) {
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                }
                
                // Animation function
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    const easedPercentage = easeInOutQuad(percentage);
                    
                    window.scrollTo(0, startPosition + distance * easedPercentage);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
    
    // Add active class to current navigation item with transition
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Add hover effect for navigation
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
        
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Enhanced image gallery for events
    const eventImages = document.querySelectorAll('.past-event img');
    
    eventImages.forEach(img => {
        img.addEventListener('click', function() {
            if (this.classList.contains('expanded')) {
                this.classList.remove('expanded');
                this.style.cursor = 'zoom-in';
                document.body.style.overflow = '';
            } else {
                this.classList.add('expanded');
                this.style.cursor = 'zoom-out';
                document.body.style.overflow = 'hidden';
                
                // Add click event to close on background click
                setTimeout(() => {
                    document.addEventListener('click', closeExpandedImage);
                }, 10);
            }
        });
    });
    
    function closeExpandedImage(e) {
        if (!e.target.closest('.past-event img.expanded')) {
            const expandedImage = document.querySelector('.past-event img.expanded');
            if (expandedImage) {
                expandedImage.classList.remove('expanded');
                expandedImage.style.cursor = 'zoom-in';
                document.body.style.overflow = '';
                document.removeEventListener('click', closeExpandedImage);
            }
        }
    }
    
    // Add a custom style for expanded images with improved animation
    const style = document.createElement('style');
    style.textContent = `
        .past-event img {
            cursor: zoom-in;
            transition: transform 0.3s ease;
        }
        .past-event img:hover {
            transform: scale(1.03);
        }
        .past-event img.expanded {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            max-width: 90%;
            max-height: 90%;
            width: auto;
            height: auto;
            z-index: 1000;
            cursor: zoom-out;
            animation: zoomIn 0.3s ease;
        }
        .past-event img.expanded:before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: -1;
        }
        @keyframes zoomIn {
            from { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        body:after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        body:has(.past-event img.expanded):after {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .event-register, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Parallax effect for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}); 