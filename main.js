let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total');
  cartItems.innerHTML = '';
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}₽`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  total.textContent = `Итого: ${sum}₽`;
}

function checkout() {
  if (cart.length === 0) {
    alert('Ваша корзина пуста!');
    return;
  }
  alert('Спасибо за покупку! Сюрприз скоро у вас! 🎉');
  cart = [];
  renderCart();
}
let total = 0;

function addToCart(name, price) {
  total += price;
  document.getElementById('cart-total').innerText = total + '₽';
  alert(`Вы добавили ${name} в корзину!`);
}

function searchBoxes() {
  const searchValue = document.getElementById('searchBox').value.toLowerCase();
  const boxes = document.querySelectorAll('.box-item');
  boxes.forEach(box => {
    const title = box.querySelector('.box-info h3').innerText.toLowerCase();
    if (title.includes(searchValue)) {
      box.style.display = 'flex';
    } else {
      box.style.display = 'none';
    }
  });
}
