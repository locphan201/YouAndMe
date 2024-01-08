const menuIcon = document.getElementById("menu-icon");
const homeTab = document.getElementById("home");
const eventTab = document.getElementById("event");
const favoriteTab = document.getElementById("favorite");
const historyTab = document.getElementById("history");
const galleryTab = document.getElementById("gallery");
const addIcon = document.getElementById("add-icon");

const menuBar = document.querySelector(".menu");
const tabBtns = document.querySelectorAll(".menu div");
const title = document.querySelector("header h3");

const eventForm = document.getElementById("eventForm");

const domain = 'https://youandme.locphan201.repl.co';

function showOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden");
}
  
function hideOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("hidden");
}

function openEventForm(type="create") {
    eventForm.style.display = "block";
    eventForm.reset();
    showOverlay();
    if (type === "create") {
        document.getElementById("place").disabled = false;
        document.getElementById("date").readOnly = false;
        document.querySelector("#eventForm .accept-btn").style.display = "block";
        document.querySelector("#eventForm .delete-btn").style.display = "none";
    } else if (type === "delete") {
        document.getElementById("place").disabled = true;
        document.getElementById("date").readOnly = true;
        document.querySelector("#eventForm .accept-btn").style.display = "none";
        document.querySelector("#eventForm .delete-btn").style.display = "block";
    }
};

function closeEventForm() {
    eventForm.reset();
    eventForm.style.display = "none";
    hideOverlay();
};

function openGalleryForm() {
    showOverlay();
    document.getElementById("galleryUploadForm").style.display = "block";
}

function closeGalleryForm() {
    hideOverlay();
    document.getElementById("galleryUploadForm").reset();
    document.getElementById("galleryUploadForm").style.display = "none";
    document.getElementById("selected-img-list").innerHTML = "";
}

function openImageDisplay() {
    showOverlay();
    document.getElementById("imageDisplay").style.display = "block";
}

function closeImageDisplay() {
    hideOverlay();
    document.getElementById("imageDisplay").reset();
    document.getElementById("imageDisplay").style.display = "none";
    document.getElementById("imageDisplay").src = "";
}

menuIcon.addEventListener("click", () => {
    menuBar.classList.toggle("show");
});

addIcon.addEventListener("click", () => {
    if (eventTab.style.display == "block") {
        openEventForm();
    }
    else if (favoriteTab.style.display == "block") {
        alert("favorite");
    }
    else if (historyTab.style.display == "block") {
        openEventForm();
    }
    else if (galleryTab.style.display == "block") {
        openGalleryForm();
    }
});

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        hideAllTabs();

        switch (btn.id) {
            case "home-tab-btn":
                title.textContent = "Home"
                homeTab.style.display = "block";
                break;
            case "events-tab-btn":
                title.textContent = "Events"
                eventTab.style.display = "block";
                addIcon.style.display = "block";
                break;
            case "wishlist-tab-btn":
                title.textContent = "Wishlist"
                favoriteTab.style.display = "block";
                addIcon.style.display = "block";
                break;
            case "memories-tab-btn":
                title.textContent = "Memories"
                historyTab.style.display = "block";
                addIcon.style.display = "block";
                break;
            case "gallery-tab-btn":
                title.textContent = "Gallery"
                galleryTab.style.display = "block";
                addIcon.style.display = "block";
        };
    });
});

function hideAllTabs() {
    homeTab.style.display = "none";
    eventTab.style.display = "none";
    favoriteTab.style.display = "none";
    historyTab.style.display = "none";
    galleryTab.style.display = "none";
    addIcon.style.display = "none";
    menuBar.classList.toggle("show");
}