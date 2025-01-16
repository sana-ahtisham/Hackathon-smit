document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cardWidth = 300;
    let currentIndex = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
});
// Cart Array
let cart = [];

// DOM Elements
const cartCounter = document.getElementById('cart-counter');
const cartModal = document.getElementById('cart-modal');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add to Cart Functionality
addToCartButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const productName = this.getAttribute('data-name');
    const productPrice = parseFloat(this.getAttribute('data-price'));
    const productImage = this.getAttribute('data-image');

    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    updateCartUI();
  });
});

// Update Cart UI
function updateCartUI() {
  // Update Cart Counter
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = totalItems;

  // Generate Cart Modal Content
  let modalContent = `<div class="modal-dialog"><div class="modal-content">
    <div class="modal-header"><h5 class="modal-title">Your Cart</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div><div class="modal-body">`;

  if (cart.length === 0) {
    modalContent += '<p>Your cart is empty!</p>';
  } else {
    cart.forEach((item, index) => {
      modalContent += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
          <p>${item.name}</p>
          <p>Price: Rs. ${item.price.toFixed(2)}</p>
          <p>Quantity: 
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 'decrement')">-</button>
            ${item.quantity}
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 'increment')">+</button>
          </p>
          <p>Subtotal: Rs. ${(item.quantity * item.price).toFixed(2)}</p>
        </div><hr>`;
    });
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);
    modalContent += `<h5>Total Price: Rs. ${totalPrice.toFixed(2)}</h5>`;
  }

  modalContent += `</div></div></div>`;
  cartModal.innerHTML = modalContent;
}

// Update Quantity
function updateQuantity(index, action) {
  if (action === 'increment') {
    cart[index].quantity += 1;
  } else if (action === 'decrement') {
    cart[index].quantity -= 1;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
}


