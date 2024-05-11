// script.js

// Fetch product data from the server
fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });

    // Add event listeners for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  })
  .catch(error => console.error('Error fetching products:', error));

// Fetch healthcare worker spotlight data from the server
fetch('/api/healthcare-workers')
  .then(response => response.json())
  .then(workers => {
    const heroSpotlight = document.querySelector('.hero-spotlight');
    const worker = workers[Math.floor(Math.random() * workers.length)]; // Select a random worker
    heroSpotlight.innerHTML = `
      <img src="${worker.photo}" alt="${worker.name}">
      <h3>${worker.name}</h3>
      <p>${worker.role}</p>
      <blockquote>${worker.quote}</blockquote>
    `;
  })
  .catch(error => console.error('Error fetching healthcare workers:', error));

// Guestbook functionality
const guestbookForm = document.getElementById('guestbook-form');
const guestbookEntries = document.getElementById('guestbook-entries');

guestbookForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  // Send guestbook entry to the server
  fetch('/api/guestbook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, message })
  })
    .then(response => response.json())
    .then(entry => {
      const entryElement = document.createElement('div');
      entryElement.classList.add('guestbook-entry');
      entryElement.innerHTML = `
        <h4>${entry.name}</h4>
        <p>${entry.message}</p>
      `;
      guestbookEntries.appendChild(entryElement);
      guestbookForm.reset();
    })
    .catch(error => console.error('Error submitting guestbook entry:', error));
});

// Photo/Video upload functionality
const fileInput = document.getElementById('file-input');
const uploadedFiles = document.getElementById('uploaded-files');

fileInput.addEventListener('change', e => {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileUrl = URL.createObjectURL(file);
    const fileElement = document.createElement('div');
    fileElement.classList.add('uploaded-file');
    if (file.type.startsWith('image/')) {
      fileElement.innerHTML = `<img src="${fileUrl}" alt="${file.name}">`;
    } else if (file.type.startsWith('video/')) {
      fileElement.innerHTML = `<video src="${fileUrl}" controls></video>`;
    }
    uploadedFiles.appendChild(fileElement);

    // Upload file to the server
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log('File uploaded:', data))
      .catch(error => console.error('Error uploading file:', error));
  }
});

// Cart functionality
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
let cart = [];

function addToCart(event) {
  const productId = event.target.dataset.productId;
  // Add product to cart and update cart count
  // ...
}

cartIcon.addEventListener('click', () => {
  // Show cart modal or navigate to cart page
  // ...
});

// Embed social media feed
const socialFeed = document.querySelector('.social-feed');
// Embed code for social media feed (e.g., Twitter, Instagram)
