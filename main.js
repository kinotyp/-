let cart = [];
let purchased = [];

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartIcon();
  alert(`Додано "${name}" до кошика!`);
}

function updateCartIcon() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").innerText = `${total}₴`;
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  if (modal.style.display === "none" || modal.style.display === "") {
    showCart();
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

function showCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
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
    alert("Ваш кошик порожній!");
    return;
  }

  purchased = purchased.concat(cart);
  localStorage.setItem("purchased", JSON.stringify(purchased));

  alert("Дякуємо за покупку!");
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

function searchBoxes() {
  const searchValue = document.getElementById('searchBox').value.toLowerCase();
  const boxes = document.querySelectorAll('.box-item');
  boxes.forEach(box => {
    const title = box.querySelector('h3').innerText.toLowerCase();
    box.style.display = title.includes(searchValue) ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadCart();

  const section = document.querySelector('.about-section');
  if (section) {
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.classList.add('particle');
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.width = (Math.random() * 4 + 2) + 'px';
      dot.style.height = dot.style.width;
      section.appendChild(dot);
    }
  }
});
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
