// Sample products
const products = [
  { id: 1, name: "Nutella Brownie", price: 150, image: "images/nutella.jpg", description: "Delicious Nutella brownie." },
  { id: 2, name: "Choco Chip Brownie", price: 120, image: "images/choco.jpg", description: "Tasty Choco Chip brownie." },
  { id: 3, name: "Oreo Brownie", price: 130, image: "images/oreo.jpg", description: "Yummy Oreo brownie." }
];

// Cart stored in localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Render products on homepage or products page
const productsContainer = document.getElementById("products-container");
if (productsContainer) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <a href="product.html?id=${product.id}" class="btn">View Details</a>
    `;
    productsContainer.appendChild(card);
  });
}

// Add product to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  const countElements = document.querySelectorAll("#cart-count");
  countElements.forEach(el => el.innerText = cart.length);
}

// Render product detail page
const productDetailContainer = document.getElementById("product-detail");
if (productDetailContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find(p => p.id === id);
  if (product) {
    productDetailContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="250">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
  } else {
    productDetailContainer.innerHTML = "<p>Product not found.</p>";
  }
}

// Render cart page
const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
if (cartContainer && cartTotal) {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "";
  } else {
    let total = 0;
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(div);
    });
    cartTotal.innerText = `Total: ₹${total}`;
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

