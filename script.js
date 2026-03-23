
// PRODUCT DATA
const products = [
    {
        id: 1,
        name: "Laptop Pro",
        price: 400.0,
        category: "Electronics",
        description: "High performance laptop with 16GB RAM",
        image:"images/laptop.jpg"
    },
    {
        id: 2,
        name: "Smartphone X",
        price: 90000,
        category: "Electronics",
        description: "Latest smartphone with advanced features",
        image:"images/phone.jpg"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        category: "Electronics",
        description: "Premium noise-cancelling headphones",
        image: "images/headphones.jpg"
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 129.99,
        category: "Fashion",
        description: "Comfortable athletic shoes",
        image: "images/shoes.jpg"
    },
    {
        id: 5,
        name: "Designer T-Shirt",
        price: 49.99,
        category: "Fashion",
        description: "Premium quality casual t-shirt",
        image: "images/tshirt.jpg"
    },
    {
        id: 6,
        name: "It ends with us",
        price: 39.99,
        category: "Books",
        description: "fiction novel",
        image: "images/novel.jpg"
    },
    {
        id: 7,
        name: "Web Development",
        price: 44.99,
        category: "Books",
        description: "Learn modern web development techniques",
        image: "images/codingbook.jpg"
    },
    {
        id: 8,
        name: "Smart Watch",
        price: 299.99,
        category: "Electronics",
        description: "Advanced fitness tracking smartwatch",
        image: "images/watch.jpg"
    },
    { id:9,
    name:"trouser",
    price:788.89,
    category: "Fashion",
     description: "finest jean trouser",
    image: "images/trouser.jpg"
   
},
   {
    id:10,
    name:"new book",
    price:567.98,
    category: "Books",
     description: "how to choose yourself",
    image: "images/newboook.jpg"
}



];

// CART MANAGEMENT

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Update cart count badge
function updateCartBadge() {
    try {
        const badges = document.querySelectorAll('#cartBadge');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    } catch (error) {
        console.error('Error updating cart badge:', error);
    }
}

// DISPLAY PRODUCTS (HOME PAGE)
function displayProducts(productsToShow = products) {
    try {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (productsToShow.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
            return;
        }

        productsToShow.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error displaying products:', error);
    }
}

// ADD TO CART
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existing = cart.find(item => item.id === productId);

        if (existing) {
            existing.quantity += 2;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        saveCart();
        updateCartBadge();
        alert(product.name + ' added to cart!');
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}
// SEARCH FUNCTIONALITY
function setupSearch() {
    try {
        const btn = document.getElementById('searchBtn');
        const input = document.getElementById('searchBox');

        if (!btn) return;

        btn.addEventListener('click', performSearch);

        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') performSearch();
            });
        }
    } catch (error) {
        console.error('Error setting up search:', error);
    }
}

function performSearch() {
    try {
        const input = document.getElementById('searchBox');
        const term = input.value.toLowerCase().trim();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        displayProducts(filtered);
    } catch (error) {
        console.error('Error performing search:', error);
    }
}
// FILTER BY CATEGORY
function setupFilter() {
    try {
        const filter = document.getElementById('categoryFilter');
        if (!filter) return;

        filter.addEventListener('change', function() {
            const category = this.value;
            const filtered = category ? products.filter(p => p.category === category) : products;
            displayProducts(filtered);
        });
    } catch (error) {
        console.error('Error setting up filter:', error);
    }
}


// DISPLAY CART PAGE
function displayCart() {
    try {
        const tbody = document.getElementById('cartTableBody');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.getElementById('cartContent');

        if (!tbody) return;

        tbody.innerHTML = '';

        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartContent.style.display = 'block';

        cart.forEach(item => {
            const total = (item.price * item.quantity).toFixed(2);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td>$${total}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
            `;
            tbody.appendChild(row);
        });

        updateCartSummary();
    } catch (error) {
        console.error('Error displaying cart:', error);
    }
}
// CART OPERATIONS
function changeQuantity(productId, change) {
    try {
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartBadge();
            displayCart();
        }
    } catch (error) {
        console.error('Error changing quantity:', error);
    }
}

function removeFromCart(productId) {
    try {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartBadge();
        displayCart();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

function updateCartSummary() {
    try {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        const subtotalEl = document.getElementById('subtotalAmount');
        const taxEl = document.getElementById('taxAmount');
        const totalEl = document.getElementById('totalAmount');

        if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
        if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
        if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
    } catch (error) {
        console.error('Error updating cart summary:', error);
    }
}


// CHECKOUT PAGE

function displayCheckoutSummary() {
    try {
        const container = document.getElementById('orderItems');
        if (!container) return;

        container.innerHTML = '';

        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'order-item';
            div.innerHTML = `
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            container.appendChild(div);
        });

        updateCheckoutSummary();
    } catch (error) {
        console.error('Error displaying checkout summary:', error);
    }
}

function updateCheckoutSummary() {
    try {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        const subtotalEl = document.getElementById('orderSubtotal');
        const taxEl = document.getElementById('orderTax');
        const totalEl = document.getElementById('orderTotal');

        if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
        if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
        if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
    } catch (error) {
        console.error('Error updating checkout summary:', error);
    }
}

function setupCheckoutForm() {
    try {
        const form = document.getElementById('checkoutForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCheckout();
        });
    } catch (error) {
        console.error('Error setting up checkout form:', error);
    }
}

function submitCheckout() {
    try {
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        const errors = validateCheckout(name, email, phone, address);

        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        // Order successful
        cart = [];
        saveCart();
        updateCartBadge();

        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('errorMessages').style.display = 'none';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        console.error('Error submitting checkout:', error);
        alert('An error occurred. Please try again.');
    }
}

function validateCheckout(name, email, phone, address) {
    const errors = [];

    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address');
    }

    if (!phone || !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
        errors.push('Phone number must have at least 10 digits');
    }

    if (!address || address.length < 5) {
        errors.push('Address must be at least 5 characters');
    }

    if (cart.length === 0) {
        errors.push('Your cart is empty');
    }

    return errors;
}

function showErrors(errors) {
    try {
        const errorDiv = document.getElementById('errorMessages');
        const errorList = document.getElementById('errorList');

        errorList.innerHTML = '';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });

        errorDiv.style.display = 'block';
    } catch (error) {
        console.error('Error showing errors:', error);
    }
}


// INITIALIZATION

function initializeApp() {
    try {
        updateCartBadge();

        const page = window.location.pathname.split('/').pop();

        if (page === 'index.html' || page === '') {
            displayProducts();
            setupSearch();
            setupFilter();
        } else if (page === 'cart.html') {
            displayCart();
        } else if (page === 'checkout.html') {
            displayCheckoutSummary();
            setupCheckoutForm();
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Wait for page to load
document.addEventListener('DOMContentLoaded', initializeApp);
