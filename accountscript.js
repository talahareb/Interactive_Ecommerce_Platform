document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const formContent = document.getElementById("formContent");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const signOutButton = document.getElementById("signOutButton");
  const usernameerror = document.getElementById("usernameerror");
  const emailerror = document.getElementById("emailerror");
  const numbererror = document.getElementById("numbererror");
  const passworderror = document.getElementById("passworderror");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  usernameerror.innerHTML = "";
  emailerror.innerHTML = "";
  numbererror.innerHTML = "";
  passworderror.innerHTML = "";

  function showForm(formId) {
    loginForm.style.display = formId === "loginForm" ? "block" : "none";
    registerForm.style.display = formId === "registerForm" ? "block" : "none";
    formContent.style.display = "block";
  }

  function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      formContent.style.display = "none";
      welcomeMessage.style.display = "block";
      usernameDisplay.textContent = user.username;
    } else {
      formContent.style.display = "block";
      welcomeMessage.style.display = "none";
    }
  }

  checkLoggedIn();

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      console.log(`Clicked tab: ${tab.id}`);
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const formId = tab.id === "loginTab" ? "loginForm" : "registerForm";
      showForm(formId);
    });
  });

  function clearInputs(form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }

  function downloadJSON(data, filename = "users.json") {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("registerPhone").value;
    const password = document.getElementById("registerPassword").value;
    usernameerror.innerHTML = "";
    emailerror.innerHTML = "";
    numbererror.innerHTML = "";
    passworderror.innerHTML = "";
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email);
    const nbExists = users.some((user) => user.phone === phone);
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      usernameerror.innerHTML = "Username already used";
    } else if (nbExists) {
      numbererror.innerHTML = "Phone number already used";
    } else if (emailExists) {
      emailerror.innerHTML = "Email already used";
    } else if (password.length < 6) {
      passworderror.innerHTML = "Password must be at least 6 characters";
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      passworderror.innerHTML =
        "Password must contain both letters and numbers";
    } else {
      const newUser = {
        username,
        email,
        phone,
        password: hashedPassword,
        cart: [],
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful");
      clearInputs(registerForm);
      showForm("loginForm");
      downloadJSON(users);
    }
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const hashedInputPassword = CryptoJS.SHA256(password).toString();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === hashedInputPassword
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      clearInputs(loginForm);
      checkLoggedIn();
    } else {
      alert("Invalid email or password");
    }
  });

  signOutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    checkLoggedIn();
    tabs.forEach((t) => t.classList.remove("active"));
    loginTab.classList.add("active");
    showForm("loginForm");
  });
});
