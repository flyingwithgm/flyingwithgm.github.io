// ===== Main Application Module =====
import { init3DBackground } from './modules/3d-background.js';
import { initFlightTracker } from './modules/flight-tracker.js';
import { initNNPlayground } from './modules/nn-playground.js';
import { initTypewriter } from './modules/typewriter.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initContactForm } from './modules/contact-form.js';

class GM73App {
  constructor() {
    this.initModules();
    this.registerServiceWorker();
    this.setupGlobalEvents();
  }

  initModules() {
    // Initialize all application modules
    init3DBackground();
    initTypewriter();
    initThemeToggle();
    initContactForm();
    
    // Page-specific modules
    if (document.querySelector('#flightTrackerMap')) {
      initFlightTracker();
    }
    
    if (document.querySelector('#nnPlayground')) {
      initNNPlayground();
    }
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }

  setupGlobalEvents() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .slide-in').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GM73App();
});

// ===== 3D Background Module =====
export function init3DBackground() {
  const bgContainer = document.getElementById('threejs-bg');
  if (!bgContainer) return;

  import('three').then(THREE => {
    // 3D scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    bgContainer.appendChild(renderer.domElement);

    // Add 3D objects
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x64ffda,
      wireframe: true 
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 3;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    
    animate();

    // Responsive handling
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
}

// ===== Typewriter Effect Module =====
export function initTypewriter() {
  const elements = document.querySelectorAll('.typewriter');
  if (!elements.length) return;

  elements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  });
}

// ===== Theme Toggle Module =====
export function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.documentElement.setAttribute(
      'data-theme',
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    toggle.querySelector('i').classList.toggle('fa-moon');
    toggle.querySelector('i').classList.toggle('fa-sun');
  });
}
