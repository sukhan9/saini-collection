/* ============================================================
   PRODUCT PAGE – Specific JS
   ============================================================ */

/* ——— GALLERY THUMBS ——— */
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', function() {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const src = this.dataset.src;
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
      mainImg.style.opacity = '0';
      mainImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 200);
    }
  });
});

// Image transition styles
const mainImg = document.getElementById('mainImg');
if (mainImg) {
  mainImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
}

/* ——— SIZE SELECTION ——— */
let selectedSize = 'L';
function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
  // Update WhatsApp buy now link AND the add-to-cart button
  updateWaLink();
  updateAddToCartBtn();
}

/* ——— UPDATE ADD TO CART BUTTON ——— */
function updateAddToCartBtn() {
  const addBtn = document.getElementById('pdpAddToCartBtn');
  const mobileBtn = document.getElementById('pdpMobileAddBtn');
  if (addBtn) {
    addBtn.onclick = function() {
      addToCart('Black Oversized Tee ('+selectedSize+')', 549, 'tshirt.png');
      openCart();
    };
  }
  if (mobileBtn) {
    mobileBtn.onclick = function(e) {
      e.preventDefault();
      addToCart('Black Oversized Tee ('+selectedSize+')', 549, 'tshirt.png');
      openCart();
    };
  }
}

/* ——— WHATSAPP BUY NOW ——— */
function updateWaLink() {
  const msg = `🛍️ I want to buy:\n\n*Black Oversized Tee*\nSize: ${selectedSize}\nPrice: ₹549\n\nPlease confirm my order!`;
  const btn = document.getElementById('pdpWaBtn');
  if (btn) btn.href = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
}
updateWaLink(); // init
updateAddToCartBtn(); // init

/* ——— WISHLIST ON PDP ——— */
function toggleWishlistPdp(btn) {
  const wishlist = JSON.parse(localStorage.getItem('sc_wishlist') || '[]');
  const name = 'Black Oversized Tee';
  const icon = document.getElementById('pdpWishIcon');
  const text = document.getElementById('pdpWishText');
  const idx = wishlist.indexOf(name);
  if (idx === -1) {
    wishlist.push(name);
    btn.classList.add('active');
    if (icon) icon.className = 'fa fa-heart';
    if (text) text.textContent = 'Wishlisted';
    showToast('Added to wishlist!', '❤️');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('active');
    if (icon) icon.className = 'fa-regular fa-heart';
    if (text) text.textContent = 'Add to Wishlist';
    showToast('Removed from wishlist', '🤍');
  }
  localStorage.setItem('sc_wishlist', JSON.stringify(wishlist));
}

// Init wishlist state
(function() {
  const wl = JSON.parse(localStorage.getItem('sc_wishlist') || '[]');
  if (wl.includes('Black Oversized Tee')) {
    const btn = document.querySelector('.wishlist-btn-pdp');
    const icon = document.getElementById('pdpWishIcon');
    const text = document.getElementById('pdpWishText');
    if (btn) btn.classList.add('active');
    if (icon) icon.className = 'fa fa-heart';
    if (text) text.textContent = 'Wishlisted';
  }
})();

/* ——— ACCORDION ——— */
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ——— SCROLL FADE-IN ——— */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));
