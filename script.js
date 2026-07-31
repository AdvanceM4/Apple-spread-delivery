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

async function trackPackage() {

    const number =
        document
            .getElementById("trackingNumber")
            .value
            .trim();

    const result =
        document
            .getElementById("trackingResult");


    if (!number) {

        result.innerHTML =
            "<p>Please enter a tracking number.</p>";

        return;

    }


    // Show a loading message

    result.innerHTML =
        "<p>Checking tracking information...</p>";


    try {

        // Ask our backend for the delivery information

        const response = await fetch(
    "https://apple-spread-backend.onrender.com"
);


        // Convert the response into data

        const delivery =
            await response.json();


        // Check if the tracking number matches

        if (
            number !==
            delivery.trackingNumber
        ) {

            result.innerHTML = `

                <div class="tracking-card">

                    <h3>
                        Tracking number not found
                    </h3>

                    <p>
                        Please check your tracking number
                        and try again.
                    </p>

                </div>

            `;

            return;

        }


        // Display the delivery information

        result.innerHTML = `

            <div class="tracking-card">

                <h3>
                    📦 ${delivery.trackingNumber}
                </h3>

                <p>
                    🚚 Status:
                    <strong>
                        ${delivery.status}
                    </strong>
                </p>

                <p>
                    📍 Location:
                    ${delivery.location}
                </p>

                <p>
                    📅 Estimated Delivery:
                    ${delivery.estimatedDelivery}
                </p>

            </div>

        `;


    } catch (error) {

        result.innerHTML = `

            <div class="tracking-card">

                <h3>
                    Unable to connect
                </h3>

                <p>
                    Please make sure your
                    backend server is running.
                </p>

            </div>

        `;

    }

}