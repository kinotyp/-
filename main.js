let cart = [];
let purchased = [];

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartIcon();
  showToast(`✅ Додано «${name}» до кошика!`);
}

function updateCartIcon() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cartTotal = document.getElementById("cart-total");
  if (cartTotal) {
    cartTotal.innerText = `${total}₴`;
  }
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  const isOpen = modal.style.display === "block";
  modal.style.display = isOpen ? "none" : "block";
  if (!isOpen) showCart();
}

function showCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!cartItems || !totalEl) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Кошик порожній.</li>";
    totalEl.innerText = "Разом: 0₴";
    return;
  }

  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price}₴`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  totalEl.innerText = `Разом: ${sum}₴`;
}

function checkout() {
  if (cart.length === 0) {
    showToast("⚠️ Ваш кошик порожній!");
    return;
  }

  purchased = [...purchased, ...cart];
  localStorage.setItem("purchased", JSON.stringify(purchased));

  showToast("🎉 Дякуємо за покупку!");
  cart = [];
  saveCart();
  updateCartIcon();
  toggleCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) cart = JSON.parse(saved);

  const bought = localStorage.getItem("purchased");
  if (bought) purchased = JSON.parse(bought);

  updateCartIcon();
}


function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener('DOMContentLoaded', loadCart);


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('review-form');
  const btn = document.getElementById('add-review-btn');
  const container = document.getElementById('reviews-container');

  
  btn.addEventListener('click', () => {
    form.classList.toggle('hidden');
  });

  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const text = this.querySelector('textarea').value;
    const name = this.querySelector('input').value;
    
    if (text && name) {
      
      const review = document.createElement('div');
      review.className = 'review-card';
      review.innerHTML = `
        <blockquote>"${text}"</blockquote>
        <cite>— ${name}</cite>
      `;
      
      
      container.insertBefore(review, container.firstChild);
      
      
      setTimeout(() => {
        review.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
     
      this.reset();
      form.classList.add('hidden');
    }
  });
});
