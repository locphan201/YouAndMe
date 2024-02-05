const eventTab = document.getElementById("event-btn");
const wishlistTab = document.getElementById("wishlist-btn");
const eventForm = document.getElementById("event-form");
const wishlistForm = document.getElementById("wishlist-form");

function tabBtnClicked(btn) {
    if (btn == "event") {
        eventTab.classList.add("selected");
        eventForm.style.display = "block";
        wishlistTab.classList.remove("selected");
        wishlistForm.style.display = "none";
        wishlistForm.reset();
    } else if (btn == "wishlist") {
        eventTab.classList.remove("selected");
        eventForm.style.display = "none";
        wishlistTab.classList.add("selected");
        wishlistForm.style.display = "block";
        eventForm.reset();
    }
}

function submitEventForm() {
    event.preventDefault();

    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;

    const eventData = {
        "title": title,
        "date": date
    };

    fetch("./api/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create new event!");
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        eventForm.reset();
    })
    .catch(error => {
        alert(error.message);
    });
}

function submitWishListForm() {
    event.preventDefault();

    const title = document.getElementById("wishlist-title").value;
    const wishlistType = document.getElementById("wishlist-type").value;

    const wishlistData = {
        "title": title,
        "type": wishlistType
    };

    fetch("./api/wishlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishlistData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create new wish!");
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        wishlistForm.reset();
    })
    .catch(error => {
        alert(error.message);
    });
}