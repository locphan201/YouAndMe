const navBar = document.getElementById("navBar");

const tabs = [
    {
        title: "Homepage",
        icon: "home",
        url: "homepage"
    },
    {
        title: "Events",
        icon: "event",
        url: "events"
    },
    {
        title: "Add",
        icon: "add",
        url: "add"
    },
    {
        title: "Wishlist",
        icon: "favorite",
        url: "wishlist"
    },
    {
        title: "Settings",
        icon: "manage_accounts",
        url: "settings"
    },
]

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadNavigationBar() {
    const path = window.location.href.split("/");
    const endpoint = path[path.length-1].split(".html")[0];

    tabs.forEach(tab => {
        const tabElement = document.createElement("a");
        tabElement.href = `./${tab.url}`;
        const iconElement = document.createElement("span");
        if (tab.icon == "add") {
            iconElement.className = "material-symbols-outlined mid";
        } else {
            if (tab.url == endpoint) {
                iconElement.className = "material-symbols-outlined selected";
            } else {
                iconElement.className = "material-symbols-outlined";
            }  
        }
        if (tab.url == endpoint) {
            document.getElementById("title").textContent = toCapitalize(tab.title);
        }
        iconElement.textContent = tab.icon;
        tabElement.appendChild(iconElement);
        navBar.appendChild(tabElement);
    });
}

loadNavigationBar();