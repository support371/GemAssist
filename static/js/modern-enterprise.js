/**
 * GEM Enterprise - Modern Interactive Features
 * Advanced animations and interactions for enterprise website
 */

class ModernEnterpriseFeatures {
    constructor() {
        this.initializeOnLoad();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupInteractiveElements();
        this.setupParallaxEffects();
    }

    initializeOnLoad() {
        // Initialize all features when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.animateHeroElements();
            this.setupIntersectionObserver();
            this.initializeDashboardInteractions();
        });
    }

    // Hero Animation Sequence
    animateHeroElements() {
        const heroElements = [
            '.hero-badge-container',
            '.hero-title-modern .title-line-1',
            '.hero-title-modern .title-line-2', 
            '.hero-title-modern .title-line-3',
            '.hero-description-modern',
            '.hero-metrics-grid',
            '.hero-cta-section'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200 + 500);
            }
        });

        // Dashboard slide-in animation
        const dashboard = document.querySelector('.dashboard-container');
        if (dashboard) {
            dashboard.style.opacity = '0';
            dashboard.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                dashboard.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                dashboard.style.opacity = '1';
                dashboard.style.transform = 'translateX(0)';
            }, 1000);
        }
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card-modern').forEach(card => {
            observer.observe(card);
        });

        // Observe metric cards
        document.querySelectorAll('.metric-card').forEach(card => {
            observer.observe(card);
        });

        // Observe dashboard cards
        document.querySelectorAll('.dashboard-card').forEach(card => {
            observer.observe(card);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('animate-in');
    }

    // Counter Animations
    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-animate="counter"]');
        
        const animateCounter = (element) => {
            const countElement = element.querySelector('[data-count]');
            if (!countElement) return;

            const targetValue = parseFloat(countElement.dataset.count);
            const duration = 2000; // 2 seconds
            const stepTime = 50; // Update every 50ms
            const steps = duration / stepTime;
            const increment = targetValue / steps;
            
            let currentValue = 0;
            const timer = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                
                // Format number based on type
                if (targetValue < 10) {
                    countElement.textContent = currentValue.toFixed(1);
                } else {
                    countElement.textContent = Math.floor(currentValue).toLocaleString();
                }
            }, stepTime);
        };

        // Setup intersection observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Dashboard control buttons
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Add visual feedback
                this.createRippleEffect(e.target, e);
            });
        });

        // Service card hover effects
        document.querySelectorAll('.service-card-modern').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
        });

        // Metric card interactions
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', () => {
                this.pulseMetricCard(card);
            });
        });

        // CTA button effects
        document.querySelectorAll('.cta-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createButtonWave(e.target, e);
            });
        });
    }

    enhanceCardHover(card) {
        const icon = card.querySelector('.service-icon-modern');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        const features = card.querySelectorAll('.feature-tag');
        features.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-2px)';
                tag.style.transition = 'all 0.2s ease';
            }, index * 50);
        });
    }

    resetCardHover(card) {
        const icon = card.querySelector('.service-icon-modern');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }

        const features = card.querySelectorAll('.feature-tag');
        features.forEach(tag => {
            tag.style.transform = 'translateY(0)';
        });
    }

    pulseMetricCard(card) {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }

    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = x - 10 + 'px';
        ripple.style.top = y - 10 + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createButtonWave(button, event) {
        const wave = button.querySelector('::before');
        if (wave) {
            // Trigger the wave animation
            button.style.setProperty('--wave-x', event.offsetX + 'px');
            button.style.setProperty('--wave-y', event.offsetY + 'px');
        }
    }

    // Parallax Effects
    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            // Hero background elements
            const particles = document.querySelector('.floating-particles');
            const orbs = document.querySelector('.gradient-orbs');
            
            if (particles) {
                particles.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
            
            if (orbs) {
                orbs.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
            
            // Dashboard elements
            const dashboard = document.querySelector('.dashboard-container');
            if (dashboard) {
                const rect = dashboard.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                    dashboard.style.transform = `translateY(${Math.max(0, (1 - progress) * 50)}px)`;
                }
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    // Dashboard Interactions
    initializeDashboardInteractions() {
        // Animate chart bars
        this.animateChartBars();
        
        // Animate network nodes
        this.animateNetworkTopology();
        
        // Animate progress circle
        this.animateProgressCircle();
        
        // Live data simulation
        this.simulateLiveData();
    }

    animateChartBars() {
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach((bar, index) => {
            const value = bar.dataset.value;
            bar.style.height = '0%';
            bar.style.transition = 'height 1s ease-out';
            
            setTimeout(() => {
                bar.style.height = value + '%';
            }, index * 200 + 500);
        });
    }

    animateNetworkTopology() {
        const connections = document.querySelectorAll('.connection');
        connections.forEach((connection, index) => {
            connection.style.width = '0%';
            connection.style.transition = 'width 0.8s ease-out';
            
            setTimeout(() => {
                const originalWidth = connection.style.width || '25%';
                connection.style.width = originalWidth;
            }, index * 300 + 1000);
        });
    }

    animateProgressCircle() {
        const circle = document.querySelector('.circle');
        if (circle) {
            const percent = document.querySelector('.progress-circle').dataset.percent || 98.7;
            circle.style.strokeDasharray = `0, 100`;
            circle.style.transition = 'stroke-dasharray 2s ease-out';
            
            setTimeout(() => {
                circle.style.strokeDasharray = `${percent}, 100`;
            }, 1500);
        }
    }

    simulateLiveData() {
        // Simulate live threat counter
        const threatCounter = document.querySelector('.threat-stats strong[data-count="1247"]');
        if (threatCounter) {
            setInterval(() => {
                const currentValue = parseInt(threatCounter.textContent.replace(',', ''));
                const newValue = currentValue + Math.floor(Math.random() * 3);
                threatCounter.textContent = newValue.toLocaleString();
            }, 5000);
        }

        // Pulse live indicator
        const pulseIndicator = document.querySelector('.pulse-dot');
        if (pulseIndicator) {
            setInterval(() => {
                pulseIndicator.style.animation = 'none';
                setTimeout(() => {
                    pulseIndicator.style.animation = 'pulse-dot 2s ease-in-out infinite';
                }, 10);
            }, 3000);
        }

        // Update network stats
        const latencyElement = document.querySelector('.network-stats .text-success');
        if (latencyElement) {
            const updateNetworkStats = () => {
                const latency = Math.floor(Math.random() * 10) + 8; // 8-18ms
                latencyElement.textContent = latency + 'ms';
            };
            
            setInterval(updateNetworkStats, 4000);
        }
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const sections = document.querySelectorAll('.modern-services-section, .dashboard-container');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate');
                    
                    // Stagger child animations
                    const children = entry.target.querySelectorAll('.service-card-modern, .dashboard-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            scrollObserver.observe(section);
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    static trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            
            // Show warning for slow loads
            if (loadTime > 3000) {
                console.warn('Slow page load detected');
            }
        });
    }

    static optimizeAnimations() {
        // Reduce animations on low-end devices
        const isLowEnd = navigator.hardwareConcurrency < 4 || 
                         navigator.deviceMemory < 4 ||
                         /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEnd) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            document.documentElement.classList.add('reduced-motion');
        }
    }

    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    if (PerformanceMonitor.prefersReducedMotion()) {
        document.documentElement.classList.add('reduced-motion');
        return;
    }
    
    // Initialize performance monitoring
    PerformanceMonitor.trackPageLoad();
    PerformanceMonitor.optimizeAnimations();
    
    // Initialize modern features
    window.modernFeatures = new ModernEnterpriseFeatures();
});

// Add ripple animation CSS dynamically
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

.scroll-animate {
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);