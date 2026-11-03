const products = [
    { id : 1, name: "RYWD Circle Tshirt", price: 35, image: "./assets/product-1.jpg" ,category: "Unisex Tshirts", description: "'Remember You Will Die' brown tshirt for men and women", rating: 4 },
    { id : 2, name: "Los Angeles Tshit", price: 30, image: "./assets/product-10.jpg",category: "Tshirts for men", description: "Blue 'Los Angeles' Tshirt for Men", rating: 4.5 },
    { id : 3, name: "'MOOD' Tshirt", price: 45, image: "./assets/product-7.jpg",category: "Tshirts for women", description: "'MOOD' Beige Tshirt For Women", rating: 3 },
    { id : 4, name: "Simple White Hoodie", price: 50, image: "./assets/product-11.jpg",category: "Unisex Hoodies", description: "Simple White hoodie for men and women", rating: 5 },
    { id : 5, name: "Collusion Tshirt", price: 85, image: "./assets/product-5.jpg",category: "Unisex Tshirts", description: "White Collision Oversized Tshirts for Men and Women", rating: 4 },
    { id : 6, name: "Jubilee Oversized Pullover", price: 100, image: "./assets/product-14.jpg",category: "Hoodies for women", description: "Jubilee Oversized Pullover in colors Coffee Brown, Creme and Dark Blue", rating: 4.5 },
    { id : 7, name: "Black Tshirt", price: 35, image: "./assets/product-9.jpg",category: "Tshirts for men", description: "Simple Black Tshirt for men", rating: 4.5 },
    { id : 8, name: "Approval Tshirt", price: 45, image: "./assets/product-3.jpg",category: "Unisex Tshirts", description: "'THE ONLY APPROVAL YOU NEED IS YOUR OWN' White Tshirt for men and women", rating: 5 },
    { id : 9, name: "Jubilee Hoodie", price: 85, image: "./assets/product-15.jpg",category: "Hoodies for women", description: "Cropped olive green hoodie by Jubilee", rating: 4.6 },
    { id : 10, name: "'Love Hurts' Tshirt", price: 30, image: "./assets/product-6.png",category: "Unisex Tshirts", description: "'Love Hurts' lavender tshirt for men and women", rating: 4 },
    { id : 11, name: "'YELLOWSTONE' Sweatshirt", price: 60, image: "./assets/product-17.jpg",category: "Hoodies for men", description: "Casual 'YELLOWSTONE' Brown Sweatshirt", rating: 4.5 },
    { id : 12, name: "'Valiri Hoodie'", price: 99, image: "./assets/product-12.jpg",category: "Unisex Hoodies", description: "Dark Grey Valiri Hoodie For Men and Women", rating: 4.5 },
    { id : 13, name: "Panda Tshirt", price: 20, image: "./assets/product-8.jpg",category: "Tshirts for women", description: "White Oversized Tshirt for women", rating: 3.7 },
    { id : 14, name: "Blessed Hoodie", price: 75, image: "./assets/product-13.jpg",category: "Unisex Hoodies", description: "Beige 'BLESSED' oversized hoodie", rating: 4.5 },
    { id : 14, name: "Manfinity Tshirt", price: 75, image: "./assets/product-4.jpg",category: "Unisex Tshirts", description: "Manfinity Black Ovsersized Tshirt", rating: 4.3 },
    { id : 15, name: "Glacier Hoodie", price: 80, image: "./assets/product-16.jpg",category: "Hoodies for men", description: "Washed Green Glacier Hoodie for men", rating: 4.5 },
    { id : 16, name: "RYWD Cross Tshirt", price: 35, image: "./assets/product-2.jpg",category: "Unisex Tshirts", description: "'Remember You Will Die' black tshirt for men and women", rating: 4.5 },
    { id : 17, name: "Marine Yellow Sweatshirt", price: 60, image: "./assets/product-23.jpg",category: "Hoodies for women", description: "Marine Mustard Yellow Overesized Sweatshirt for women", rating: 4.75 },
    { id : 18, name: "'DON'T GIVE UP' tshirt", price: 60, image: "./assets/product-18.jpg",category: "Tshirts for men", description: "'DON'T GIVE UP ' Oversized white tshirt", rating: 4.7 },
    { id : 19, name: "Jubilee Fleece Hoodie", price: 80, image: "./assets/product-24.jpg",category: "Unisex hoodies", description: "Chocolate brown oversized hoodie  for both men and women", rating: 5 },
    { id : 20, name: "'BROKEN HEART CLUB' Tshirt", price: 45, image: "./assets/product-21.jpg", category: "Tshirts for women", description: "'BROKEN HEART CLUB' White Oversized Tshirt for women", rating: 4.5 },
]; 
let currentPage = 1;
const productsPerPage = 12;

function displayProducts(products, page = 1) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = page * productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
        productList.innerHTML = '<p>No products found</p>';
        return;
    }

    paginatedProducts.forEach(product => {
        const productCard = `
            <div class="col-4">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="overlay">
                            <h4>${product.name}</h4>
                            <p>$${product.price}</p>
                            <button class="view-details-btn" data-id="${product.id}">View Details</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    updatePaginationControls(products.length, page);
}


document.getElementById('sort-products').addEventListener('change', function() {
    const value = this.value;
    let sortedProducts;
    if (value === 'price-asc') {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (value === 'name-asc') {
        sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'name-desc') {
        sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
    } else if (value === 'rating-asc') {
        sortedProducts = [...products].sort((a, b) => a.rating- b.rating);
    } else if (value === 'rating-desc') {
        sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    } else {
        sortedProducts = products;
    }
    displayProducts(sortedProducts);
});

document.getElementById('filter-price-btn').addEventListener('click', function() {
    const maxPrice = document.getElementById('price-range').value;
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    displayProducts(filteredProducts);
});

document.getElementById('filter-category-btn').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
});

const priceRange = document.getElementById('price-range');
const selectedPrice = document.getElementById('selected-price');

priceRange.addEventListener('input', function() {
    selectedPrice.textContent = this.value;
});

document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)); 
    currentPage = 1;
    displayProducts(filteredProducts,currentPage);
});

document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details-btn')) {
        const productId = e.target.getAttribute('data-id');
        window.location.href = `product-details.html?id=${productId}`;
    }
});

function updatePaginationControls(totalProducts, page) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    document.getElementById('page-info').innerText = `Page ${page}`;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = page === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(products, currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(products, currentPage);
    }
});

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    currentPage = 1; // Reset to first page
    displayProducts(filteredProducts, currentPage);
});

window.onload = function() {
    window.scrollTo(0, 0);
};

displayProducts(products, currentPage);


