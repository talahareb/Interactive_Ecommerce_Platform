const mostpopular = [
    { id: 6, name: "Jubilee Oversized Pullover", price: 130, image: "./assets/product-14.jpg", category: "Hoodies for women", description: "Jubilee Oversized Pullover in colors Coffee Brown, Creme and Dark Blue", rating: 4.5 },
    { id: 14, name: "Blessed Hoodie", price: 75, image: "./assets/product-13.jpg", category: "Unisex Hoodies", description: "Beige 'BLESSED' oversized hoodie", rating: 4.5 },
    { id: 20, name: "'BROKEN HEART CLUB' Tshirt", price: 45, image: "./assets/product-21.jpg", category: "Tshirts for women", description: "'BROKEN HEART CLUB' White Oversized Tshirt for women", rating: 4.5 },
];

const newarrivals = [
    { id: 8, name: "Approval Tshirt", price: 60, image: "./assets/product-3.jpg", category: "Unisex Tshirts", description: "'THE ONLY APPROVAL YOU NEED IS YOUR OWN' White Tshirt for men and women", rating: 5 },
    { id: 15, name: "Glacier Hoodie", price: 80, image: "./assets/product-16.jpg", category: "Hoodies for men", description: "Washed Green Glacier Hoodie for men", rating: 4.5 },
    { id: 14, name: "Manfinity Tshirt", price: 75, image: "./assets/product-4.jpg", category: "Unisex Tshirts", description: "Manfinity Black Ovsersized Tshirt", rating: 4.3 },
];

function displayPopularProducts(products) {
    const popularItemsContainer = document.getElementById('most-popular-items');
    products.forEach(product => {
        const productCard = `
            <div class="col-4">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            </div>
        `;
        popularItemsContainer.innerHTML += productCard;
    });
}

function displayNewArrivals(products) {
    const newArrivalsContainer = document.getElementById('new-arrivals');
    products.forEach(product => {
        const productCard = `
            <div class="col-4">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            </div>
        `;
        newArrivalsContainer.innerHTML += productCard;
    });
}
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 2000); // Change slide every 3 seconds
}





displayPopularProducts(mostpopular);
displayNewArrivals(newarrivals);
