// Main App Logic for Premium Zara/H&M Style UI

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMenuFunc() {
    mobileMenu.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  hamburger.addEventListener('click', openMenu);
  closeMenu.addEventListener('click', closeMenuFunc);
  overlay.addEventListener('click', closeMenuFunc);

  // Close mobile menu when a link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenuFunc);
  });

  // Simple Cart interaction mock
  const cartBtns = document.querySelectorAll('.quick-add');
  const cartBadge = document.getElementById('cartBadge');
  let cartCount = 0;

  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent triggering parent links if any
      cartCount++;
      cartBadge.textContent = cartCount;
      
      // Visual feedback
      const icon = btn.querySelector('i');
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-check');
      btn.style.background = '#4caf50';
      btn.style.color = 'white';
      
      setTimeout(() => {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-plus');
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);
    });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });
});
