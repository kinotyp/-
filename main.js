let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  document.getElementById('cart-total').innerText = total + '₴';
  renderCart();
  alert(`Додано "${name}" до кошика!`);
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  cartItems.innerHTML = '';
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}₴`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  totalDisplay.textContent = `Разом: ${sum}₴`;
}

function checkout() {
  if (cart.length === 0) {
    alert('Ваш кошик порожній!');
    return;
  }
  alert('Дякуємо за покупку! Ваш сюрприз вже в дорозі 🎉');
  cart = [];
  total = 0;
  document.getElementById('cart-total').innerText = '0₴';
  renderCart();
  toggleCart(false);
}


function toggleCart(show) {
  const cartSection = document.getElementById('cart-section');
  if (show === false) {
    cartSection.style.display = 'none';
  } else {
    cartSection.style.display = (cartSection.style.display === 'none') ? 'block' : 'none';
  }
}

function searchBoxes() {
  const searchValue = document.getElementById('searchBox').value.toLowerCase();
  const boxes = document.querySelectorAll('.box-item');
  boxes.forEach(box => {
    const title = box.querySelector('h3').innerText.toLowerCase();
    if (title.includes(searchValue)) {
      box.style.display = 'flex';
    } else {
      box.style.display = 'none';
    }
  });
}
