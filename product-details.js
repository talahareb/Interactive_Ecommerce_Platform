document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const products = [
        { id: 1, name: "RYWD Circle Tshirt", price: 70, image: "./assets/product-1.jpg", category: "Unisex Tshirts", description: "'Remember You Will Die' brown tshirt for men and women", rating: 4 },
        { id: 2, name: "Los Angeles Tshirt", price: 30, image: "./assets/product-10.jpg", category: "Tshirts for men", description: "Blue 'Los Angeles' Tshirt for Men", rating: 4.5 },
        { id: 3, name: "'MOOD' Tshirt", price: 40, image: "./assets/product-7.jpg", category: "Tshirts for women", description: "'MOOD' Beige Tshirt For Women", rating: 3 },
        { id: 4, name: "Simple White Hoodie", price: 55, image: "./assets/product-11.jpg", category: "Unisex Hoodies", description: "Simple White hoodie for men and women", rating: 5 },
        { id: 5, name: "Collusion Tshirt", price: 85, image: "./assets/product-5.jpg", category: "Unisex Tshirts", description: "White Collision Oversized Tshirts for Men and Women", rating: 4 },
        { id: 6, name: "Jubilee Oversized Pullover", price: 130, image: "./assets/product-14.jpg", category: "Hoodies for women", description: "Jubilee Oversized Pullover in colors Coffee Brown, Creme and Dark Blue", rating: 4.5 },
        { id: 7, name: "Black Tshirt", price: 35, image: "./assets/product-9.jpg", category: "Tshirts for men", description: "Simple Black Tshirt for men", rating: 4.5 },
        { id: 8, name: "Approval Tshirt", price: 60, image: "./assets/product-3.jpg", category: "Unisex Tshirts", description: "'THE ONLY APPROVAL YOU NEED IS YOUR OWN' White Tshirt for men and women", rating: 5 },
        { id: 9, name: "Jubilee Hoodie", price: 100, image: "./assets/product-15.jpg", category: "Hoodies for women", description: "Cropped olive green hoodie by Jubilee", rating: 4.6 },
        { id: 10, name: "'Love Hurts' Tshirt", price: 30, image: "./assets/product-6.png", category: "Unisex Tshirts", description: "'Love Hurts' lavender tshirt for men and women", rating: 4 },
        { id: 11, name: "'YELLOWSTONE' Sweatshirt", price: 70, image: "./assets/product-17.jpg", category: "Hoodies for men", description: "Casual 'YELLOWSTONE' Brown Sweatshirt", rating: 4.5 },
        { id: 12, name: "'Valiri Hoodie'", price: 99, image: "./assets/product-12.jpg", category: "Unisex Hoodies", description: "Dark Grey Valiri Hoodie For Men and Women", rating: 4.5 },
        { id: 13, name: "Panda Tshirt", price: 20, image: "./assets/product-8.jpg", category: "Tshirts for women", description: "White Oversized Tshirt for women", rating: 3.7 },
        { id: 14, name: "Blessed Hoodie", price: 75, image: "./assets/product-13.jpg", category: "Unisex Hoodies", description: "Beige 'BLESSED' oversized hoodie", rating: 4.5 },
        { id: 14, name: "Manfinity Tshirt", price: 75, image: "./assets/product-4.jpg", category: "Unisex Tshirts", description: "Manfinity Black Ovsersized Tshirt", rating: 4.3 },
        { id: 15, name: "Glacier Hoodie", price: 80, image: "./assets/product-16.jpg", category: "Hoodies for men", description: "Washed Green Glacier Hoodie for men", rating: 4.5 },
        { id: 16, name: "RYWD Cross Tshirt", price: 45, image: "./assets/product-2.jpg", category: "Unisex Tshirts", description: "'Remember You Will Die' black tshirt for men and women", rating: 4.5 },
        { id: 17, name: "Marine Yellow Sweatshirt", price: 60, image: "./assets/product-23.jpg", category: "Hoodies for women", description: "Marine Mustard Yellow Overesized Sweatshirt for women", rating: 4.75 },
        { id: 18, name: "'DON'T GIVE UP' tshirt", price: 60, image: "./assets/product-18.jpg", category: "Tshirts for men", description: "'DON'T GIVE UP ' Oversized white tshirt", rating: 4.7 },
        { id: 19, name: "Jubilee Fleece Hoodie", price: 80, image: "./assets/product-24.jpg", category: "Unisex hoodies", description: "Chocolate brown oversized hoodie  for both men and women", rating: 5 },
        { id: 20, name: "'BROKEN HEART CLUB' Tshirt", price: 45, image: "./assets/product-21.jpg", category: "Tshirts for women", description: "'BROKEN HEART CLUB' White Oversized Tshirt for women", rating: 4.5 },
    ];

    const product = products.find(product => product.id == productId);

    if (product) {
        const productDetailsContainer = document.getElementById('product-details');
        productDetailsContainer.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h1>${product.name}</h1>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <div class="rating">
                        <span>${'★'.repeat(Math.floor(product.rating))}</span>
                        <span>${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        (${product.rating})
                    </div>
                    <br>
                    <div class="size-select">
                        <label for="size">Size:</label>
                        <select id="size" name="size">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    <br>
                    <div class="quantity-select">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
                    </div>
                    <br>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        setupAddToCartButton(product);
    }

    function setupAddToCartButton(product) {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            const size = document.getElementById('size').value;

            // Check if user is logged in
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (!loggedInUser) {
                alert('You need to be logged in to add items to the cart.');
                return;
            }

            addToCart(product, quantity, size, loggedInUser.email);
            alert('Product added to cart!');
        });
    }

    function addToCart(product, quantity, size, userEmail) {
        let carts = JSON.parse(localStorage.getItem('carts')) || {};
        if (!carts[userEmail]) {
            carts[userEmail] = [];
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.image
        };

        carts[userEmail].push(cartItem);
        localStorage.setItem('carts', JSON.stringify(carts));
    }
});