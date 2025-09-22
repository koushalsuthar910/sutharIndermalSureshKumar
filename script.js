// Ecommerce Website JavaScript - Suthar Indermal Suresh Kumar

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    name: "Asian Paints Royale Luxury Emulsion",
    category: "Color Paints",
    price: 4500,
    originalPrice: 5000,
    image: "1.png",
    description: "Premium interior paint with rich finish",
    brand: "Asian Paints",
    size: "1 Litre",
    discount: 10
  },
  {
    id: 2,
    name: "Berger Silk Luxury Emulsion",
    category: "Color Paints",
    price: 3200,
    originalPrice: 3800,
    image: "2.png",
    description: "Luxurious silk finish paint",
    brand: "Berger",
    size: "1 Litre",
    discount: 16
  },
  {
    id: 3,
    name: "Dulux Velvet Touch",
    category: "Color Paints",
    price: 2800,
    originalPrice: 3200,
    image: "1.png",
    description: "Smooth velvet finish paint",
    brand: "Dulux",
    size: "1 Litre",
    discount: 13
  },
  {
    id: 4,
    name: "Hindware Ceramic Wash Basin",
    category: "Sanitary Items",
    price: 8500,
    originalPrice: 9500,
    image: "2.png",
    description: "Premium ceramic wash basin",
    brand: "Hindware",
    size: "Standard",
    discount: 11
  },
  {
    id: 5,
    name: "Jaquar Single Lever Mixer",
    category: "Sanitary Items",
    price: 4200,
    originalPrice: 4800,
    image: "1.png",
    description: "Single lever bathroom mixer",
    brand: "Jaquar",
    size: "Standard",
    discount: 13
  },
  {
    id: 6,
    name: "Kohler Shower Panel",
    category: "Sanitary Items",
    price: 12500,
    originalPrice: 15000,
    image: "2.png",
    description: "Luxury shower panel system",
    brand: "Kohler",
    size: "Standard",
    discount: 17
  },
  {
    id: 7,
    name: "Professional Paint Brush Set",
    category: "Tools & Brushes",
    price: 850,
    originalPrice: 1200,
    image: "1.png",
    description: "Set of 5 professional paint brushes",
    brand: "Generic",
    size: "Assorted",
    discount: 29
  },
  {
    id: 8,
    name: "Paint Roller with Tray",
    category: "Tools & Brushes",
    price: 450,
    originalPrice: 600,
    image: "2.png",
    description: "9 inch paint roller with tray",
    brand: "Generic",
    size: "9 inch",
    discount: 25
  }
];

// Cart Management
class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.updateCartDisplay();
  }

  addItem(productId, quantity = 1) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.items.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.updateCartDisplay();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsSection = document.getElementById('cart-items');

    if (cartCount) {
      cartCount.textContent = this.getItemCount();
    }

    if (cartItems && cartEmpty && cartItemsSection) {
      if (this.items.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartItemsSection.classList.add('hidden');
      } else {
        cartEmpty.classList.add('hidden');
        cartItemsSection.classList.remove('hidden');

        cartItems.innerHTML = this.items.map(item => `
          <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
              <h4 class="font-semibold">${item.name}</h4>
              <p class="text-gray-600 text-sm">${item.brand} - ${item.size}</p>
              <p class="text-yellow-600 font-semibold">₹${item.price}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" class="bg-gray-200 px-2 py-1 rounded">-</button>
              <span class="w-8 text-center">${item.quantity}</span>
              <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})" class="bg-gray-200 px-2 py-1 rounded">+</button>
            </div>
            <button onclick="cartManager.removeItem(${item.id})" class="text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        `).join('');

        // Update totals
        const subtotal = this.getTotal();
        const deliveryFee = subtotal > 1000 ? 0 : 100;
        const tax = subtotal * 0.18;
        const total = subtotal + deliveryFee + tax;

        document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById('delivery-fee').textContent = `₹${deliveryFee.toFixed(2)}`;
        document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
      }
    }
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Paint Calculator
class PaintCalculator {
  constructor() {
    this.initializeCalculator();
  }

  initializeCalculator() {
    const calculateBtn = document.getElementById('calculate-paint');
    const lengthInput = document.getElementById('room-length');
    const widthInput = document.getElementById('room-width');
    const heightInput = document.getElementById('room-height');
    const coatsInput = document.getElementById('paint-coats');
    const resultDiv = document.getElementById('paint-result');

    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);
        const height = parseFloat(heightInput.value);
        const coats = parseInt(coatsInput.value);

        if (length && width && height && coats) {
          const wallArea = 2 * (length + width) * height;
          const paintNeeded = (wallArea * coats) / 100; // Litres needed

          resultDiv.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 class="font-semibold text-yellow-800 mb-2">Paint Calculation Result:</h4>
              <p class="text-gray-700">Room Area: ${wallArea.toFixed(2)} sq ft</p>
              <p class="text-gray-700">Paint Needed: ${paintNeeded.toFixed(2)} litres</p>
              <p class="text-gray-700">Recommended: ${Math.ceil(paintNeeded)} litres</p>
              <p class="text-yellow-600 font-semibold mt-2">Estimated Cost: ₹${(Math.ceil(paintNeeded) * 3500).toLocaleString()}</p>
            </div>
          `;
        } else {
          resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-red-700">Please fill in all fields correctly.</p>
            </div>
          `;
        }
      });
    }
  }
}

// Search Functionality
class SearchManager {
  constructor() {
    this.initializeSearch();
  }

  initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.performSearch(searchInput.value);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch(searchInput.value);
        }
      });
    }
  }

  performSearch(query) {
    if (!query.trim()) return;

    const filteredProducts = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    this.displaySearchResults(filteredProducts, query);
  }

  displaySearchResults(products, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (products.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600 mb-4">No products found for "${query}"</p>
          <a href="products.html" class="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500">
            View All Products
          </a>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">Search Results for "${query}"</h3>
          <p class="text-gray-600">${products.length} products found</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${products.map(product => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
              <div class="p-4">
                <h4 class="font-semibold text-lg mb-2">${product.name}</h4>
                <p class="text-gray-600 text-sm mb-2">${product.brand}</p>
                <p class="text-yellow-600 font-bold text-xl">₹${product.price}</p>
                <p class="text-gray-500 text-sm line-through">₹${product.originalPrice}</p>
                <button onclick="cartManager.addItem(${product.id})"
                        class="w-full mt-4 bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500">
                  Add to Cart
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }
}

// Form Validation
class FormValidator {
  constructor() {
    this.initializeValidation();
  }

  initializeValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateContactForm();
      });
    }
  }

  validateContactForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;

    let isValid = true;
    const errors = [];

    if (!name.trim()) {
      errors.push('Name is required');
      isValid = false;
    }

    if (!email.trim()) {
      errors.push('Email is required');
      isValid = false;
    } else if (!this.isValidEmail(email)) {
      errors.push('Please enter a valid email address');
      isValid = false;
    }

    if (!phone.trim()) {
      errors.push('Phone number is required');
      isValid = false;
    } else if (!this.isValidPhone(phone)) {
      errors.push('Please enter a valid phone number');
      isValid = false;
    }

    if (!message.trim()) {
      errors.push('Message is required');
      isValid = false;
    }

    if (isValid) {
      this.showSuccessMessage();
      document.getElementById('contact-form').reset();
    } else {
      this.showErrorMessage(errors);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  showSuccessMessage() {
    const messageDiv = document.getElementById('form-message');
    messageDiv.innerHTML = `
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-green-700">Thank you for your message! We'll get back to you soon.</p>
      </div>
    `;
    setTimeout(() => messageDiv.innerHTML = '', 5000);
  }

  showErrorMessage(errors) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <ul class="text-red-700">
          ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
      </div>
    `;
    setTimeout(() => messageDiv.innerHTML = '', 5000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  window.cartManager = new CartManager();
  new PaintCalculator();
  new SearchManager();
  new FormValidator();

  // Add cart count to navigation
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const cartLink = document.createElement('a');
    cartLink.href = 'cart.html';
    cartLink.className = 'font-semibold hover:text-yellow-400 relative';
    cartLink.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      <span id="cart-count" class="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
    `;
    navLinks.appendChild(cartLink);
  }

  // Add click handlers for "Add to Cart" buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
      const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
      const productId = parseInt(button.dataset.productId);
      if (productId && window.cartManager) {
        window.cartManager.addItem(productId);
      }
    }
  });

  // Add click handler for clear cart button
  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        window.cartManager.clearCart();
      }
    });
  }

  // Add click handler for checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (window.cartManager.getItemCount() > 0) {
        alert('Checkout functionality would be implemented here. Thank you for shopping with us!');
      }
    });
  }
});
