
const exploreBtn = document.getElementById("exploreBtn");
const eventsSection = document.getElementById("events");

exploreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    eventsSection.scrollIntoView({
        behavior: "smooth"
    });
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const eventItems = document.querySelectorAll(".event-item");

searchBtn.addEventListener("click", function() {
    const searchText = searchInput.value.toLowerCase();

    eventItems.forEach(function(eventItem) {
        const eventName = eventItem.querySelector("h3").textContent.toLowerCase();

        if (eventName.includes(searchText)) {
            eventItem.style.display = "";
        } else {
            eventItem.style.display = "none";
        }
    });
});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const selectedCategory = button.getAttribute("data-category");

        eventItems.forEach(function(eventItem) {

            const eventCategory = eventItem.getAttribute("data-category");

            if (selectedCategory === "all" || selectedCategory === eventCategory) {
                eventItem.style.display = "";
            } else {
                eventItem.style.display = "none";
            }

        });

        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");
    });
});

const detailsButtons = document.querySelectorAll(".details-btn");

const eventData = {
    music: {
        name: "Music Festival",
        date: "October 10, 2026",
        location: "Amman, Jordan",
        category: "Music",
        description: "Enjoy an exciting music festival with live performances and entertainment."
    },

    technology: {
        name: "Tech Conference",
        date: "October 15, 2026",
        location: "Amman, Jordan",
        category: "Technology",
        description: "Explore the latest technology trends and connect with technology professionals."
    },

    art: {
        name: "Art Exhibition",
        date: "October 20, 2026",
        location: "Amman, Jordan",
        category: "Art",
        description: "Discover creative artworks and enjoy an inspiring art exhibition."
    }
};

const eventModal = new bootstrap.Modal(document.getElementById("eventModal"));

detailsButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const eventType = button.getAttribute("data-event");
        const selectedEvent = eventData[eventType];

        document.getElementById("modalEventName").textContent = selectedEvent.name;
        document.getElementById("modalEventDate").textContent = "📅 " + selectedEvent.date;
        document.getElementById("modalEventLocation").textContent = "📍 " + selectedEvent.location;
        document.getElementById("modalEventCategory").textContent = "🏷️ Category: " + selectedEvent.category;
        document.getElementById("modalEventDescription").textContent = selectedEvent.description;

        eventModal.show();
    });

});

const bookNowBtn = document.getElementById("bookNowBtn");
const bookingsContainer = document.getElementById("bookingsContainer");

let bookings = JSON.parse(localStorage.getItem("eventifyBookings")) || [];

function displayBookings() {

    bookingsContainer.innerHTML = "";

    if (bookings.length === 0) {

        bookingsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>No bookings yet.</p>
            </div>
        `;

        return;
    }

    bookings.forEach(function(booking, index) {

        bookingsContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="event-card card">

                    <div class="event-image">
                        ${booking.icon}
                    </div>

                    <div class="event-content">

                        <h3>${booking.name}</h3>

                        <p>📅 ${booking.date}</p>

                        <p>📍 ${booking.location}</p>

                        <p>🏷️ Category: ${booking.category}</p>

                        <button
                            class="btn btn-danger cancel-btn"
                            data-index="${index}">
                            Cancel Booking
                        </button>

                    </div>

                </div>
            </div>
        `;

    });

    const cancelButtons = document.querySelectorAll(".cancel-btn");

    cancelButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const bookingIndex = button.getAttribute("data-index");

            bookings.splice(bookingIndex, 1);

            localStorage.setItem(
                "eventifyBookings",
                JSON.stringify(bookings)
            );

            displayBookings();
        });

    });
}

bookNowBtn.addEventListener("click", function() {

    const eventName = document.getElementById("modalEventName").textContent;

    const selectedBooking = Object.values(eventData).find(function(event) {
        return event.name === eventName;
    });

    if (selectedBooking) {

        const alreadyBooked = bookings.some(function(booking) {
            return booking.name === selectedBooking.name;
        });

        if (alreadyBooked) {

            alert("You have already booked this event.");

            eventModal.hide();

            return;
        }

        bookings.push({
            name: selectedBooking.name,
            date: selectedBooking.date,
            location: selectedBooking.location,
            category: selectedBooking.category,
            icon: selectedBooking.category === "Music" ? "🎵" :
                  selectedBooking.category === "Technology" ? "💻" :
                  "🎨"
        });

        localStorage.setItem(
            "eventifyBookings",
            JSON.stringify(bookings)
        );

        displayBookings();

        alert("Booking Confirmed! You have successfully booked " + eventName + ".");

        eventModal.hide();
    }
});

displayBookings();

const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");

const registerModal = new bootstrap.Modal(
    document.getElementById("registerModal")
);

const loginModal = new bootstrap.Modal(
    document.getElementById("loginModal")
);

registerLink.addEventListener("click", function(event) {

    event.preventDefault();

    registerModal.show();
});

loginLink.addEventListener("click", function(event) {

    event.preventDefault();

    loginModal.show();
});

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("eventifyUser", JSON.stringify(user));

    alert("Registration successful!");

    registerForm.reset();

    registerModal.hide();

    loginModal.show();
});

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("eventifyUser"));

    if (!savedUser) {
        alert("No registered account found. Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        alert("Login successful! Welcome " + savedUser.name + ".");

        loginForm.reset();

        loginModal.hide();

    } else {

        alert("Invalid email or password.");

    }
});








