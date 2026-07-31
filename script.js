// =========================
// REGISTER & LOGIN POPUPS
// =========================

function openRegister() {

    document
        .getElementById("registerModal")
        .classList.add("show");

}


function closeRegister() {

    document
        .getElementById("registerModal")
        .classList.remove("show");

}


function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


function switchToLogin() {

    closeRegister();

    openLogin();

}


function switchToRegister() {

    closeLogin();

    openRegister();

}


// =========================
// REGISTER USER
// =========================

function registerUser() {

    const name =
        document.getElementById(
            "registerName"
        ).value;

    const email =
        document.getElementById(
            "registerEmail"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    if (
        !name ||
        !email ||
        !password
    ) {

        alert(
            "Please fill in all fields."
        );

        return;

    }


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
        "Account created successfully!"
    );


    closeRegister();

}


// =========================
// LOGIN USER
// =========================

function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const savedUser =

        JSON.parse(

            localStorage.getItem(
                "appleSpreadUser"
            )

        );


    if (!savedUser) {

        alert(
            "Please create an account first."
        );

        return;

    }


    if (

        email === savedUser.email &&

        password === savedUser.password

    ) {

        alert(

            "Welcome back, " +

            savedUser.name +

            "!"

        );


        closeLogin();


    } else {

        alert(

            "Incorrect email or password."

        );

    }

}


// =========================
// DELIVERY FORM
// =========================

document

    .getElementById(
        "deliveryForm"
    )

    .addEventListener(

        "submit",

        function(event) {

            event.preventDefault();


            const trackingNumber =

                "ASD-2026-" +

                Math.floor(

                    100000 +

                    Math.random() *

                    900000

                );


            alert(

                "Delivery request created!\n\n" +

                "Your tracking number is:\n" +

                trackingNumber

            );


            this.reset();

        }

    );


// =========================
// TRACK PACKAGE
// =========================

function trackPackage() {

    const number =

        document

            .getElementById(
                "trackingNumber"
            )

            .value

            .trim();


    const result =

        document

            .getElementById(
                "trackingResult"
            );


    if (!number) {

        result.innerHTML =

            "<p>Please enter a tracking number.</p>";

        return;

    }


    result.innerHTML = `

        <div style="
            background:white;
            color:#172033;
            padding:25px;
            border-radius:15px;
            max-width:600px;
            margin:auto;
        ">

            <h3>
                Tracking Number:
                ${number}
            </h3>

            <p>
                📦 Status:
                <strong>
                    In Transit
                </strong>
            </p>

            <p>
                📍 Current Location:
                Processing Center
            </p>

            <p>
                🚚 Estimated Delivery:
                In Progress
            </p>

        </div>

    `;

}