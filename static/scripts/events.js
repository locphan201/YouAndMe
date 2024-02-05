const contentElement = document.getElementById("content");
const popUp = document.getElementById("pop-up");
const eventForm = document.getElementById("event-form");
const eventFormTitle = document.getElementById("event-title");
const eventFormDate = document.getElementById("event-date");
const deleteBtn = document.getElementById("delete-btn");

const months = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04":"Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08":"Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12":"Dec",
}

function loadEvents() {
    fetch("./api/events/")
        .then(response => response.json())
        .then(data => {
            const sortedEvents = Object.entries(data.events)
                .sort(([, a], [, b]) => new Date(a.date) - new Date(b.date))
                .map(([key, value]) => ({ id: key, ...value }));
            
            sortedEvents.forEach(item => {
                const eventElement = document.createElement("div");
                eventElement.className = "event-item";
                const eventTitle = document.createElement("h3");
                eventTitle.className = "event-title";
                eventTitle.textContent = item.title;
                const eventDate = document.createElement("p");
                eventDate.className = "event-date";
                let date = item.date.split("-").reverse();
                date[1] = months[date[1]];
                eventDate.textContent = date.join(" ");

                eventElement.appendChild(eventTitle);
                eventElement.appendChild(eventDate);

                eventElement.addEventListener("click", () => {
                    popUp.style.display = "block";
                    deleteBtn.setAttribute("onclick", `deleteEventForm("${item.id}")`);
                    eventFormTitle.value = item.title;
                    eventFormDate.value = item.date;
                });

                contentElement.appendChild(eventElement);
            });
            
        })
        .catch(error => error)
}

function cancelEventForm() {
    event.preventDefault();
    popUp.style.display = "none";
}

function deleteEventForm(eventID) {
    event.preventDefault();

    fetch(`./api/events/${eventID}`, { method: "DELETE" })
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

loadEvents();