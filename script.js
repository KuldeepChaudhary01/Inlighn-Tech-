 // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Initialize particles
        createParticles();

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const program = formData.get('program');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const button = this.querySelector('.cta-button');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                button.textContent = originalText;
                button.style.opacity = '1';
            }, 2000);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 1s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all program cards and stat items
        document.querySelectorAll('.program-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });

        // Add hover effects to floating cubes
        document.querySelectorAll('.floating-cube').forEach(cube => {
            cube.addEventListener('mouseenter', () => {
                cube.style.transform += ' scale(1.2)';
                cube.style.filter = 'brightness(1.3)';
            });
            
            cube.addEventListener('mouseleave', () => {
                cube.style.transform = cube.style.transform.replace(' scale(1.2)', '');
                cube.style.filter = 'brightness(1)';
            });
        });

        // Dynamic typing effect for hero title
        function typeWriter(element, text, delay = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            setTimeout(() => {
                typeWriter(heroTitle, 'Transform Your Career', 80);
            }, 1000);
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Counter animation for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start) + (target >= 100 ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + (target >= 100 && target < 1000 ? '%' : '+');
                }
            }
            
            updateCounter();
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    const targets = [1000, 500, 95, 50];
                    
                    numbers.forEach((number, index) => {
                        setTimeout(() => {
                            animateCounter(number, targets[index]);
                        }, index * 200);
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Add glitch effect to logo on hover
        const logo = document.querySelector('.logo');
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'glitch 0.5s ease-in-out';
        });

        logo.addEventListener('animationend', () => {
            logo.style.animation = '';
        });

        // Add CSS for glitch effect
        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
            @keyframes glitch {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-2px); }
                40% { transform: translateX(2px); }
                60% { transform: translateX(-1px); }
                80% { transform: translateX(1px); }
            }
        `;
        document.head.appendChild(glitchStyle);

        // Add magnetic effect to CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        // Add ripple effect to buttons
        function createRipple(event) {
            const button = event.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = diameter + 'px';
            circle.style.left = event.clientX - button.offsetLeft - radius + 'px';
            circle.style.top = event.clientY - button.offsetTop - radius + 'px';
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
        }

        // Add ripple CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Apply ripple effect to all buttons
        document.querySelectorAll('.cta-button, button').forEach(button => {
            button.addEventListener('click', createRipple);
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
        });

        // Add scroll-triggered animations for program cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.program-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.9)';
            cardObserver.observe(card);
        });

        // Add cursor trail effect
        let mouseTrail = [];
        const trailLength = 6;

        function createTrailDot(x, y) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, var(--accent-cyan), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${x - 4}px;
                top: ${y - 4}px;
                transition: all 0.3s ease;
                opacity: 0.8;
            `;
            document.body.appendChild(dot);
            
            mouseTrail.push(dot);
            
            if (mouseTrail.length > trailLength) {
                const oldDot = mouseTrail.shift();
                oldDot.remove();
            }
            
            // Fade out trail dots
            mouseTrail.forEach((trailDot, index) => {
                const opacity = (index + 1) / trailLength * 0.8;
                const scale = (index + 1) / trailLength;
                trailDot.style.opacity = opacity;
                trailDot.style.transform = `scale(${scale})`;
            });
        }

        document.addEventListener('mousemove', (e) => {
            createTrailDot(e.clientX, e.clientY);
        });

        // Clean up trail when mouse leaves window
        document.addEventListener('mouseleave', () => {
            mouseTrail.forEach(dot => dot.remove());
            mouseTrail = [];
        });

        // Add page transition effects
        window.addEventListener('beforeunload', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
        });

        // Initialize all animations and effects
        function initializeEffects() {
            // Add loading animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        }

        // Initialize 3D Hero Scene with Three.js
        function init3DHeroScene() {
            const canvas = document.getElementById('hero-3d-canvas');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0); // Transparent background
            
            // Create holographic tech dashboard
            const group = new THREE.Group();
            
            // Main central sphere (tech core)
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x0A7CFF,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            group.add(sphere);
            
            // Rotating rings around the sphere
            const ringGeometry = new THREE.RingGeometry(1.5, 1.7, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x00D4FF,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            });
            
            // Create multiple rings at different angles
            for (let i = 0; i < 3; i++) {
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = (Math.PI / 3) * i;
                ring.rotation.z = (Math.PI / 4) * i;
                group.add(ring);
            }
            
            // Add floating data points around the core
            const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const pointMaterial = new THREE.MeshBasicMaterial({
                color: 0x00FF88,
                transparent: true,
                opacity: 0.8
            });
            
            const dataPoints = [];
            for (let i = 0; i < 20; i++) {
                const point = new THREE.Mesh(pointGeometry, pointMaterial);
                const radius = 3 + Math.random() * 2;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                point.position.x = radius * Math.sin(phi) * Math.cos(theta);
                point.position.y = radius * Math.sin(phi) * Math.sin(theta);
                point.position.z = radius * Math.cos(phi);
                
                dataPoints.push(point);
                group.add(point);
            }
            
            // Add holographic grid planes
            const gridSize = 4;
            const gridHelper1 = new THREE.GridHelper(gridSize, 20, 0x0A7CFF, 0x0A7CFF);
            gridHelper1.material.transparent = true;
            gridHelper1.material.opacity = 0.2;
            gridHelper1.position.y = -2;
            group.add(gridHelper1);
            
            const gridHelper2 = new THREE.GridHelper(gridSize, 20, 0x00D4FF, 0x00D4FF);
            gridHelper2.material.transparent = true;
            gridHelper2.material.opacity = 0.15;
            gridHelper2.rotation.z = Math.PI / 2;
            gridHelper2.position.x = -2;
            group.add(gridHelper2);
            
            scene.add(group);
            camera.position.z = 8;
            camera.position.y = 1;
            
            // Animation function
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate the main sphere
                sphere.rotation.x += 0.005;
                sphere.rotation.y += 0.01;
                
                // Rotate rings at different speeds
                group.children.forEach((child, index) => {
                    if (child.geometry && child.geometry.type === 'RingGeometry') {
                        child.rotation.x += 0.008 * (index + 1);
                        child.rotation.z += 0.005 * (index + 1);
                    }
                });
                
                // Animate data points
                dataPoints.forEach((point, index) => {
                    const time = Date.now() * 0.001;
                    point.position.y += Math.sin(time + index) * 0.002;
                    point.material.opacity = 0.5 + Math.sin(time + index) * 0.3;
                });
                
                // Subtle camera movement
                const time = Date.now() * 0.0005;
                camera.position.x = Math.sin(time) * 0.5;
                camera.position.y = 1 + Math.cos(time * 0.7) * 0.3;
                camera.lookAt(scene.position);
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            // Mouse interaction
            let mouseX = 0, mouseY = 0;
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                
                // Rotate group based on mouse position
                group.rotation.y = mouseX * 0.2;
                group.rotation.x = mouseY * 0.1;
            });
            
            // Scroll interaction - scale the 3D object
            window.addEventListener('scroll', () => {
                const scrollPercent = window.pageYOffset / window.innerHeight;
                const scale = Math.max(0.5, 1 - scrollPercent * 0.5);
                group.scale.set(scale, scale, scale);
                group.rotation.z = scrollPercent * 0.5;
            });
        }

        // Call initialization when DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeEffects();
                // Initialize 3D scene after a short delay to ensure Three.js is loaded
                setTimeout(init3DHeroScene, 100);
            });
        } else {
            initializeEffects();
            setTimeout(init3DHeroScene, 100);
        }



        // Dummy certificate IDs
const validCertificates = ["1234", "ABCD", "INDIA"];

function verifyCertificate() {
    const input = document.getElementById("certificateInput").value.trim();
    const message = document.getElementById("verifyMessage");

    if (validCertificates.includes(input)) {
        message.textContent = "✅ Certificate Verified Successfully!";
        message.style.color = "lightgreen";

        // Confetti celebration
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Optional: Change Lottie animation to "success"
        const player = document.getElementById("verifyAnimation");
        player.load("https://assets6.lottiefiles.com/packages/lf20_jbrw3hcz.json"); // success stamp
    } else {
        message.textContent = "❌ Invalid Certificate ID. Please try again.";
        message.style.color = "salmon";

        const player = document.getElementById("verifyAnimation");
        player.load("https://assets6.lottiefiles.com/packages/lf20_4kx2q32n.json"); // default animation
    }
}

        document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll(".nav-links a");

            window.addEventListener("scroll", () => {
                let currentSectionId = "";

                sections.forEach((section) => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.offsetHeight;

                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        currentSectionId = section.getAttribute("id");
                    }
                });

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").includes(currentSectionId)) {
                        link.classList.add("active");
                    }
                });
            });
        });


                        const programData = [
                    {
                        title: "Cybersecurity",
                        description: "Protect systems and networks through hands-on threat detection, security assessments, and ethical hacking.",
                        details: [
                        "Duration: 6 Weeks",
                        "Tools: Wireshark, Burp Suite, Kali Linux",
                        "Price: ₹1999"
                        ]
                    },
                    {
                        title: "Full Stack Development",
                        description: "Build complete web applications with frontend and backend frameworks, databases, and deployment.",
                        details: [
                        "Duration: 8 Weeks",
                        "Tools: React, Node.js, MongoDB",
                        "Price: ₹2499"
                        ]
                    },
                    {
                        title: "Data Science",
                        description: "Perform predictive modeling and machine learning using real-world datasets and visualizations.",
                        details: [
                        "Duration: 10 Weeks",
                        "Tools: Python, Pandas, Scikit-learn",
                        "Price: ₹2999"
                        ]
                    },
                    {
                        title: "Data Analysis",
                        description: "Master data cleaning, visualization and BI tools to interpret large datasets and derive insights.",
                        details: [
                        "Duration: 6 Weeks",
                        "Tools: Excel, Power BI, SQL",
                        "Price: ₹1999"
                        ]
                    }
                    ];

                    function openModal(index) {
                    const modal = document.getElementById("programModal");
                    document.getElementById("modalTitle").textContent = programData[index].title;
                    document.getElementById("modalDescription").textContent = programData[index].description;

                    // Force cursor visibility after modal opens
                    document.querySelector(".cursor-dot").style.display = "block";
                    document.querySelector(".cursor-ring").style.display = "block";




                    const detailList = document.getElementById("modalDetails");
                    detailList.innerHTML = "";
                    programData[index].details.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = item;
                        detailList.appendChild(li);
                    });

                    modal.style.display = "block";

                    document.querySelector(".cursor-dot").style.display = "block";
                    document.querySelector(".cursor-ring").style.display = "block";

                    }

                    function closeModal() {
                    document.getElementById("programModal").style.display = "none";

                    document.querySelector(".cursor-dot").style.display = "block";
                    document.querySelector(".cursor-ring").style.display = "block";

                    }

                    // Close modal on outside click
                    window.onclick = function(event) {
                    const modal = document.getElementById("programModal");
                    if (event.target === modal) {
                        closeModal();
                    }
                    }

                    function enrollNow() {
                    closeModal(); // Close the modal first

                    // Scroll to contact section smoothly
                    const contactSection = document.querySelector("#contact");
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    }
                


            const dot = document.querySelector(".cursor-dot");
            const ring = document.querySelector(".cursor-ring");

            let mouse = { x: 0, y: 0 };
            let ringPos = { x: 0, y: 0 };
            let speed = 0.2;

            document.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            dot.style.left = mouse.x + "px";
            dot.style.top = mouse.y + "px";
            });

            function animate() {
            ringPos.x += (mouse.x - ringPos.x) * speed;
            ringPos.y += (mouse.y - ringPos.y) * speed;

            ring.style.left = ringPos.x + "px";
            ring.style.top = ringPos.y + "px";

            requestAnimationFrame(animate);
            }

            animate();


            //optional

            const hoverTargets = document.querySelectorAll("a, button, .cta-button");

            hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                ring.style.transform = "translate(-50%, -50%) scale(1.8)";
                ring.style.background = "rgba(0, 212, 255, 0.15)";
            });

            el.addEventListener("mouseleave", () => {
                ring.style.transform = "translate(-50%, -50%) scale(1)";
                ring.style.background = "rgba(0, 212, 255, 0.05)";
            });
            });


            let trailCount = 10; // number of trail dots
            let trailDots = [];

            for (let i = 0; i < trailCount; i++) {
            let dot = document.createElement("div");
            dot.classList.add("cursor-trail");
            document.body.appendChild(dot);
            trailDots.push({ el: dot, x: 0, y: 0 });
            }

            let mouseTrailX = 0;
            let mouseTrailY = 0;

            document.addEventListener("mousemove", (e) => {
            mouseTrailX = e.clientX;
            mouseTrailY = e.clientY;
            });

            function animateTrail() {
            let x = mouseTrailX;
            let y = mouseTrailY;

            trailDots.forEach((dot, index) => {
                dot.x += (x - dot.x) * 0.25;
                dot.y += (y - dot.y) * 0.25;

                dot.el.style.left = dot.x + "px";
                dot.el.style.top = dot.y + "px";
                dot.el.style.transform = `translate(-50%, -50%) scale(${1 - index / trailCount})`;
                dot.el.style.opacity = `${0.7 - index * 0.06}`;

                x = dot.x;
                y = dot.y;
            });

            requestAnimationFrame(animateTrail);
            }

            animateTrail();




            document.addEventListener("click", () => {
            document.querySelector(".cursor-dot").style.display = "block";
            document.querySelector(".cursor-ring").style.display = "block";
            });



            document.addEventListener("click", () => {
            document.querySelector(".cursor-dot").style.display = "block";
            document.querySelector(".cursor-ring").style.display = "block";
            });



            function openLogin() {
            document.getElementById("loginModal").style.display = "flex";
            }

            function closeLogin() {
            document.getElementById("loginModal").style.display = "none";
            }

            document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const msg = document.getElementById("loginMessage");

            // Dummy check
            if (email === "frontend@gmail.com" && password === "123456") {
                msg.textContent = "Login successful!";
                msg.style.color = "lime";
                setTimeout(() => {
                closeLogin();
                msg.textContent = "";
                }, 1500);
            } else {
                msg.textContent = "Invalid credentials!";
                msg.style.color = "red";
            }
            });


            const chatToggle = document.getElementById("chatbot-toggle");
            const chatBox = document.getElementById("chatbot-box");
            const chatClose = document.getElementById("chat-close");
            const chatForm = document.getElementById("chat-form");
            const chatInput = document.getElementById("chat-input");
            const chatMessages = document.getElementById("chat-messages");

            chatToggle.addEventListener("click", () => {
                chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
            });

            chatClose.addEventListener("click", () => {
                chatBox.style.display = "none";
            });

            chatForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const userMsg = chatInput.value.trim();
                if (!userMsg) return;

                addMessage(userMsg, "user");
                chatInput.value = "";

                setTimeout(() => {
                const botResponse = getBotResponse(userMsg);
                addMessage(botResponse, "bot");
                }, 600);
            });

            function addMessage(text, sender) {
                const msg = document.createElement("div");
                msg.classList.add(sender + "-message");
                msg.textContent = text;
                chatMessages.appendChild(msg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function getBotResponse(input) {
                input = input.toLowerCase();
                if (input.includes("certificate")) return "You can verify your certificate in the Verify section!";
                if (input.includes("program")) return "We offer Cybersecurity, Full Stack, Data Science & more!";
                if (input.includes("contact")) return "You can reach us via the Contact section!";
                if (input.includes("hi")) return "Hello Sir";
                if (input.includes("hello")) return "Hello Sir";
                if (input.includes("hii")) return "Hello Sir";
                if (input.includes("hiii")) return "Hello Sir";
                if (input.includes("Hi")) return "Hello Sir";
                if (input.includes("Hii")) return "Hello Sir";
                return "I'm still learning 🧠. Please try something else!";
            }



            function toggleFaq(element) {
            const item = element.parentElement;
            item.classList.toggle("active");
            }

