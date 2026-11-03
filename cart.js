document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    alert("You need to be logged in to view the cart.");
    window.location.href = "account.html";
    return;
  }

  const userEmail = loggedInUser.email;
  const carts = JSON.parse(localStorage.getItem("carts")) || {};
  const cart = carts[userEmail] || [];

  displayCartItems(cart);

  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    clearCart(userEmail);
    displayCartItems([]);
  });
});

function displayCartItems(cart) {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><img src="${item.image}" alt="${
      item.name
    }" width="50" height="50"></td>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td><input type="number" class="quantity-input" value="${
              item.quantity
            }" min="1" max="10" data-id="${item.id}"></td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="remove-btn" data-id="${
              item.id
            }">Remove</button></td>
        `;

    cartItems.appendChild(row);
  });

  updateTotalPrice(cart);
  attachQuantityChangeListeners(cart);
  attachRemoveButtonListeners(cart);
}

function attachQuantityChangeListeners(cart) {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const id = this.getAttribute("data-id");
      const newQuantity = parseInt(this.value);
      const item = cart.find((item) => item.id == id);
      if (item) {
        item.quantity = newQuantity;
      }
      updateCartInStorage(cart);
      updateTotalPrice(cart);
    });
  });
}

function attachRemoveButtonListeners(cart) {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const updatedCart = cart.filter((item) => item.id != id);
      updateCartInStorage(updatedCart);
      displayCartItems(updatedCart);
    });
  });
}

function updateCartInStorage(cart) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = loggedInUser.email;
  let carts = JSON.parse(localStorage.getItem("carts")) || {};
  carts[userEmail] = cart;
  localStorage.setItem("carts", JSON.stringify(carts));
}

function clearCart(userEmail) {
  let carts = JSON.parse(localStorage.getItem("carts")) || {};
  carts[userEmail] = [];
  localStorage.setItem("carts", JSON.stringify(carts));
}

function updateTotalPrice(cart) {
  const cartTotalElement = document.getElementById("cart-total");
  const discountElement = document.getElementById("discount");
  const finalTotalElement = document.getElementById("final-total");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = total > 200 ? total * 0.1 : 0;
  const finalTotal = total - discount;

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  discountElement.textContent = `Discount: $${discount.toFixed(2)}`;
  finalTotalElement.textContent = `Final Total: $${finalTotal.toFixed(2)}`;
  localStorage.setItem("final", JSON.stringify(finalTotal));
}
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const Sides = ["Left", "Right", "Middle"];
// Get the datalist element
const datalist = document.getElementById("countries");

// Add countries to the datalist
countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.name = "country";
  datalist.appendChild(option);
});
const sides = document.getElementById("sides");
Sides.forEach((side) => {
  const option = document.createElement("option");
  option.value = side;
  option.name = "side";
  sides.appendChild(option);
});
let k = true;
const form = document.getElementById("form");
form.style.display = "none";
function pop() {
  if (k == true) {
    const form = document.getElementById("form");
    form.style.display = "block";
    k = false;
  } else {
    const form = document.getElementById("form");
    form.style.display = "none";
    k = true;
  }
}
document.getElementById("form").addEventListener("submit", function (event) {
  popUp(event);
});
function popUp(event) {
  event.preventDefault();
  const form = document.getElementById("form");
  form.style.display = "none";
}

document.getElementById("placeOrder").addEventListener("click", function () {
  const city = document.getElementById("City").value.trim();
  const street = document.getElementById("Street").value.trim();
  const bn = document.getElementById("Building-Name").value.trim();
  const bs = document.getElementById("Building-Side").value.trim();
  const ad = document.getElementById("adddd");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = loggedInUser.email;
  const userPhone = loggedInUser.phone;
  const cart = JSON.parse(localStorage.getItem("carts"))[userEmail];
  let isEmpty = false;
  if (city === "" || street === "" || bn === "" || bs === "") {
    isEmpty = true;
  }
  if (isEmpty) {
    ad.textContent =
      "All fields are required on your left side, Please check them before continuing with your order.";
  } else {
    const sub = document.getElementById("sub").textContent;
    const total = document.getElementById("total").textContent;
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    formObject.subTotal = sub;
    formObject.shipping = "LBP 268,500";
    formObject.Total = total;
    formObject.email = userEmail;
    formObject.phone = userPhone;
    formObject.items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));
    const json = JSON.stringify(formObject, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "checkOut.json";
    a.click();
    URL.revokeObjectURL(url);
    // Clear input fields
    clearInputs(form);
    alert("Thank You For Your Order!");
    clearCart(userEmail);
    displayCartItems([]);
  }
});
function clearInputs(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

var a = true;
let coupon = document.getElementById("width");
coupon.style.display = "none";
function i() {
  if (a == false) {
    let coupon = document.getElementById("width");
    coupon.style.display = "none";
    a = true;
  } else {
    let coupon = document.getElementById("width");
    coupon.style.display = "block";
    a = false;
  }
}
function checkOut() {
  const final = JSON.parse(localStorage.getItem("final")); //115
  const a = final * 90000;
  const b = a.toLocaleString();
  //console.log(final);
  const price = `LBP ${b}`;
  //const final = document.getElementById('final-total');
  // const f = final.textContent;
  const sub = document.getElementById("sub");
  sub.textContent = price;
  const total = (a + 268500).toLocaleString();
  const t = document.getElementById("total");
  t.textContent = `LBP ${total}`;
}
let array = {
  julia10: 10,
  tala10: 10,
  salma10: 10,
  mohiddeen10: 10,
};
function discountt() {
  const a = document.getElementById("coupon");
  const b = a.value.trim(); //trim
  const final = JSON.parse(localStorage.getItem("final")); //115
  const aa = final * 90000;
  // console.log(aa);
  let cv = false;
  Object.entries(array).forEach(([key, value]) => {
    // console.log('k');
    if (key == b) {
      cv = true;
      // console.log('o');
      const c = aa * (value / 100); //10
      const o = (aa - c) / 90000;
      const d = `LBP ${(aa - c).toLocaleString()} `;
      const k = document.getElementById("sub");
      k.textContent = d;
      localStorage.setItem("final", JSON.stringify(o)); //dollar
      const total = (aa - c + 268500).toLocaleString();
      const t = document.getElementById("total");
      t.textContent = `LBP ${total}`;
      if (cv) {
        const i = document.getElementById("ii");
        i.style.display = "none";
        const pp = document.getElementById("pp");
        pp.style.display = "none";
        document.getElementById("coupon").disabled = true;
      }
    }
  });
  if (cv == false) {
    const p = document.getElementById("pp");
    p.style.display = "block";
    p.textContent = "This Coupon Doesn't Exist, Please Enter A Valid One.";
  }
}
window.onload = checkOut;
