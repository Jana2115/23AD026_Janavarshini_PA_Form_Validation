const validUsers = {
    "user1@kpriet.ac.in": "Pass@123",
    "user2@kpriet.ac.in": "Test@456",
    "user3@kpriet.ac.in": "Demo@789",
    "user4@kpriet.ac.in": "Login@111",
    "user5@kpriet.ac.in": "Kpr@2025",
    "user6@kpriet.ac.in": "Webinar@77",
    "user7@kpriet.ac.in": "Secure@88",
    "user8@kpriet.ac.in": "Access@99"
};

// LOGIN
function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const error = document.getElementById('loginError');
    if (validUsers[email] && validUsers[email] === password) {
        error.textContent = "";
        window.location.href = "register.html";
    } else {
        error.textContent = "Invalid email or password!";
    }
}

// REGISTER
function register(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const rollno = document.getElementById('rollno').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const topic = document.getElementById('topic').value;
    const terms = document.getElementById('terms').checked;
    const error = document.getElementById('registerError');

    // Validation
    if (!/^[A-Za-z ]{4,}$/.test(name)) return error.textContent = "Name must have only letters & spaces (min 4 chars)";
    if (!/^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/.test(email)) return error.textContent = "Email must be KPRIET mail ID";
    if (!/^(\+91-)?[987]\d{9}$/.test(phone)) return error.textContent = "Invalid phone number";
    if (!/^\d{2}[A-Z]{2}\d{3}$/.test(rollno)) return error.textContent = "Invalid Roll Number format";
    if (!dob) return error.textContent = "Select your DOB";

    // Age check
    const birthYear = new Date(dob).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    if (age < 18) return error.textContent = "You must be 18 or older";

    if (!gender) return error.textContent = "Select your gender";
    if (!topic) return error.textContent = "Select a webinar topic";
    if (!terms) return error.textContent = "You must agree to terms";

    // Store info in session for success page
    const currentDateTime = new Date();
    sessionStorage.setItem("regData", JSON.stringify({
        name, email, topic,
        registeredDate: currentDateTime.toLocaleDateString(),
        registeredTime: currentDateTime.toLocaleTimeString()
    }));

    window.location.href = "success.html";
}

// SUCCESS PAGE
function loadSuccessData() {
    const data = JSON.parse(sessionStorage.getItem("regData"));
    if (data) {
        document.getElementById('successDetails').innerHTML = `
            <strong>Name:</strong> ${data.name}<br>
            <strong>Registered Email:</strong> ${data.email}<br>
            <strong>Registered Date & Time:</strong> ${data.registeredDate} ${data.registeredTime}<br>
            <strong>Workshop Topic:</strong> ${data.topic}<br>
            <strong>Event Date & Time:</strong> 15.09.2025 10:00 AM - 12:00 PM
        `;
    }
}

function downloadReceipt() {
    const text = document.getElementById('successDetails').innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Workshop_Receipt.txt";
    link.click();
}
