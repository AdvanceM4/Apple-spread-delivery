// ===============================
// MODAL FUNCTIONS
// ===============================

function openModal(id) {
    document.getElementById(id).classList.add("active");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}

function switchModal(current, next) {
    closeModal(current);
    openModal(next);
}


// Close modal when clicking outside

window.addEventListener("click", function(event) {

    if (event.target.classList.contains("modal")) {
        event.target.classList.remove("active");
    }

});


// ===============================
// REGISTER
// ===============================

document.getElementById("registerForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "appleSpreadUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! You can now sign in."
    );


    this.reset();

    closeModal("registerModal");

    openModal("loginModal");

});


// ===============================
// LOGIN
// ===============================

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("appleSpreadUser")
        );


    if (!savedUser) {

        alert(
            "No account found. Please register first."
        );

        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        alert(
            "Welcome back, " + savedUser.name + "!"
        );

        closeModal("loginModal");

        document.getElementById("delivery")
            .scrollIntoView({
                behavior: "smooth"
            });

    } else {

        alert(
            "Incorrect email or password."
        );

    }

});


// ===============================
// DELIVERY FORM
// ===============================

document.getElementById("deliveryForm").addEventListener("submit", function(event) {

    event.preventDefault();


    const firstName =
        document.getElementById("firstName").value;

    const lastName =
        document.getElementById("lastName").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const city =
        document.getElementById("city").value;

    const state =
        document.getElementById("state").value;

    const postalCode =
        document.getElementById("postalCode").value;

    const country =
        document.getElementById("country").value;

    const packageType =
        document.getElementById("packageType").value;

    const deliverySpeed =
        document.getElementById("deliverySpeed").value;


    const summary = 

        <div class="summary-item">
            <strong>CLIENT NAME</strong>
            ${firstName} ${lastName}
        </div>

        <div class="summary-item">
            <strong>EMAIL</strong>
            ${email}
        </div>

        <div class="summary-item">
            <strong>PHONE</strong>
            ${phone}
        </div>

        <div class="summary-item">
            <strong>DELIVERY ADDRESS</strong>
            ${address}, ${city}, ${state},
            ${postalCode}, ${country}
        </div>

        <div class="summary-item">
            <strong>PACKAGE TYPE</strong>
            ${packageType}
        </div>

        <div class="summary-item">
            <strong>DELIVERY SPEED</strong>
            ${deliverySpeed}
        </div>

    ;


    document.getElementById("summaryContent")
        .innerHTML = summary;


    openModal("summaryModal");

});


// ===============================
// CONFIRM DELIVERY
// ===============================

function confirmDelivery() {

    const trackingID =
        "ASD-" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    alert(
        "Delivery request created successfully!\n\n" +
        "Your tracking ID is: " +
        trackingID
    );


    closeModal("summaryModal");

    document.getElementById("deliveryForm")
        .reset();

}


// ===============================
// TRACKING
// ===============================

function trackPackage() {

    const trackingNumber =
        document.getElementById("trackingNumber")
            .value
            .trim();


    const result =
        document.getElementById("trackingResult");


    if (!trackingNumber) {

        result.innerHTML =
            "Please enter a tracking ID.";

        return;

    }


    result.innerHTML = 

        <div style="
            background:white;
            color:#172033;
            padding:20px;
            border-radius:12px;
            margin-top:20px;
        ">

            <strong>
                Tracking ID: ${trackingNumber}
            </strong>

            <p style="margin-top:10px;">

                📦 Your package is currently
                being processed for delivery.

            </p>

        </div>

    ;

}
