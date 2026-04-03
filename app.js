/* ============================================================
   SAINI COLLECTION — Main App JS
   Handles: Cart, Wishlist, Navbar, Popup, Countdown, Animations
   ============================================================ */

/* ——— CART STATE ——— */
let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('sc_wishlist') || '[]');

/* ——— HELPERS ——— */
function saveCart() { localStorage.setItem('sc_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('sc_wishlist', JSON.stringify(wishlist)); }

function showToast(msg, icon = '✅') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = `${icon} ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ——— CART ——— */
function addToCart(name, price, img) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`${name} added to cart!`, '🛒');
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  renderCart();
  updateCartBadge();
}

function changeQty(idx, delta) {
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart();
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    if (el.id === 'cartBadge') el.textContent = total;
    else el.textContent = `(${total})`;
  });
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  const waBtn = document.getElementById('waCheckoutBtn');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="fa fa-bag-shopping"></i><p>Your cart is empty.<br/>Start adding some fire fits!</p></div>`;
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = 'block';

  let html = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    html += `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"/></div>
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <p>Unit Price: ₹${item.price.toLocaleString('en-IN')}</p>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <div class="quantity-control">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${idx})"><i class="fa fa-trash"></i></button>
      </div>`;
  });
  container.innerHTML = html;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

  // Build WhatsApp message
  if (waBtn) {
    let msg = '🛍️ *New Order — Saini Collection*\n\n';
    cart.forEach(i => { msg += `• ${i.name} × ${i.qty} = ₹${(i.price*i.qty).toLocaleString('en-IN')}\n`; });
    msg += `\n*Total: ₹${total.toLocaleString('en-IN')}*\n\nPlease confirm my order. Thank you!`;
    waBtn.href = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  }
}

function openCart() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutWhatsApp() {
  const waBtn = document.getElementById('waCheckoutBtn');
  if (waBtn && waBtn.href && waBtn.href !== '#') {
    window.open(waBtn.href, '_blank');
  }
}

/* ——— WISHLIST ——— */
function toggleWishlist(btn, name) {
  const idx = wishlist.indexOf(name);
  if (idx === -1) {
    wishlist.push(name);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fa fa-heart"></i>';
    showToast(`${name} added to wishlist!`, '❤️');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast(`${name} removed from wishlist`, '🤍');
  }
  saveWishlist();
}

/* ——— NAVBAR ——— */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ——— MOBILE MENU ——— */
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.add('open');
  document.getElementById('menuOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('mobileMenuClose')?.addEventListener('click', closeMobileMenu);
document.getElementById('menuOverlay')?.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('menuOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ——— CART BUTTON ——— */
document.getElementById('cartNavBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

/* ——— DISCOUNT POPUP ——— */
function openPopup() {
  document.getElementById('discountPopup')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  document.getElementById('discountPopup')?.classList.remove('open');
  document.body.style.overflow = '';
  localStorage.setItem('sc_popup_seen', '1');
}
function claimDiscount() {
  const email = document.getElementById('popupEmail')?.value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email.', '⚠️');
    return;
  }
  showToast('🎉 Code FIRST10 applied! 10% off your order.', '🎁');
  closePopup();
}
document.getElementById('popupClose')?.addEventListener('click', closePopup);
document.getElementById('popupSkip')?.addEventListener('click', closePopup);

// Show popup after 4s if not seen before
if (!localStorage.getItem('sc_popup_seen')) {
  setTimeout(openPopup, 4000);
}

/* ——— COUNTDOWN TIMER ——— */
function startCountdown() {
  const endKey = 'sc_countdown_end';
  let endTime = localStorage.getItem(endKey);
  if (!endTime || Date.now() > parseInt(endTime)) {
    // Set 8 hours from now
    endTime = Date.now() + 8 * 60 * 60 * 1000;
    localStorage.setItem(endKey, endTime);
  }
  const h = document.getElementById('countH');
  const m = document.getElementById('countM');
  const s = document.getElementById('countS');
  if (!h) return;

  function update() {
    const diff = Math.max(0, parseInt(endTime) - Date.now());
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    h.textContent = String(hrs).padStart(2, '0');
    m.textContent = String(mins).padStart(2, '0');
    s.textContent = String(secs).padStart(2, '0');
    if (diff > 0) requestAnimationFrame(update);
  }
  update();
}
startCountdown();

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

/* ——— SMOOTH SCROLL FOR ANCHORS ——— */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    }
  });
});

/* ——— CATEGORY FILTER HELPER ——— */
function filterAndGoToTrending(type) {
  document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
}

/* ——— INIT ——— */
updateCartBadge();
renderCart();

// Restore wishlist state on product cards
document.querySelectorAll('.wish-restore').forEach(btn => {
  const name = btn.dataset.name;
  if (wishlist.includes(name)) {
    btn.classList.add('active');
    btn.innerHTML = '<i class="fa fa-heart"></i>';
  }
});
