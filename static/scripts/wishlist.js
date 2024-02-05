const foodTab = document.getElementById("food-btn");
const placeTab = document.getElementById("place-btn");
const activityTab = document.getElementById("activity-btn");

const foodList = document.getElementById("food-list");
const placeList = document.getElementById("place-list");
const activityList = document.getElementById("activity-list");

const searchInput = document.getElementById("searchInput");

const popUp = document.getElementById("pop-up");
const wishForm = document.getElementById("wish-form");
const wishFormTitle = document.getElementById("wishlist-title");
const wishFormType = document.getElementById("wishlist-type");
const deleteBtn = document.getElementById("delete-btn");

function tabBtnClicked(btn) {
    if (btn == "food") {
        foodTab.classList.add("selected");
        placeTab.classList.remove("selected");
        activityTab.classList.remove("selected");

        foodList.style.display = "grid";
        placeList.style.display = "none";
        activityList.style.display = "none";
    } else if (btn == "place") {
        foodTab.classList.remove("selected");
        placeTab.classList.add("selected");
        activityTab.classList.remove("selected");

        foodList.style.display = "none";
        placeList.style.display = "grid";
        activityList.style.display = "none";
    } else if (btn == "activity") {
        foodTab.classList.remove("selected");
        placeTab.classList.remove("selected");
        activityTab.classList.add("selected");

        foodList.style.display = "none";
        placeList.style.display = "none";
        activityList.style.display = "grid";
    }
}

function loadWishList() {
    fetch("./api/wishlist/")
        .then(response => response.json())
        .then(data => {
            const wishes = data.wishlist;
            Object.keys(wishes).forEach(key => {
                const wishElement = document.createElement("p");
                wishElement.innerHTML = `
                    <p>${wishes[key].title}</p>
                `;

                wishElement.addEventListener("click", () => {
                    popUp.style.display = "block";
                    deleteBtn.setAttribute("onclick", `deleteWishForm("${key}")`);
                    wishFormTitle.value = wishes[key].title;
                    wishFormType.value = wishes[key].type;
                });

                if (wishes[key].type == "food") {
                    foodList.appendChild(wishElement);
                } else if (wishes[key].type == "place") {
                    placeList.appendChild(wishElement);
                } else if (wishes[key].type == "activity") {
                    activityList.appendChild(wishElement);
                }
            });   
            setupSearch();
        })
        .catch(error => error)
}

function setupSearch() {
    const foodItems = foodList.querySelectorAll("p");
    const placeItems = placeList.querySelectorAll("p");
    const activityItems = activityList.querySelectorAll("p");

    const allItems = [...foodItems, ...placeItems, ...activityItems];

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();

        allItems.forEach(item => {
            const foodItemText = item.textContent.toLowerCase();
            if (foodItemText.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

function cancelWishForm() {
    event.preventDefault();
    popUp.style.display = "none";
}

function deleteWishForm(wishID) {
    event.preventDefault();

    fetch(`./api/wishlist/${wishID}`, { method: "DELETE" })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete event!");
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.reload();
    })
    .catch(error => {
        alert(error.message);
    });
}

loadWishList();