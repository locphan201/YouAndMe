var events = [
    {
        date: "01/01/2023",
        place: "Place 1" 
    },
    {
        date: "02/02/2023",
        place: "Place 2" 
    },
    {
        date: "10/10/2024",
        place: "Place 3" 
    }
];

function compareEvents(a, b) {
    const dateComparison = new Date(b.date) - new Date(a.date);

    if (dateComparison === 0) {
        return new Date(b.time) - new Date(a.time);
    }

    return dateComparison;
}

function loadEvents() {
    var currentDate = new Date();

    historyTab.innerHTML = "";
    eventTab.innerHTML = "";

    events.sort(compareEvents);
    events.forEach(eventInfo => {
        var eventDate = new Date(eventInfo.date);
        var dayOfWeek = getDayOfWeek(eventDate.getDay());

        const content = document.createElement("div");
        content.className = "event-item";
        const eventDateElement = document.createElement("h3");
        eventDateElement.textContent = `${dayOfWeek}, ${eventInfo.date}`;
        const eventLocationElement = document.createElement("p");
        eventLocationElement.textContent = `${eventInfo.place}`;

        content.appendChild(eventDateElement);
        content.appendChild(eventLocationElement);

        content.addEventListener("click", () => {
            openEventForm("delete");
            document.getElementById('place').value = eventInfo.place;
            var rawDate = eventInfo.date;
            var dateParts = rawDate.split("/");
            var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
            document.getElementById('date').value = formattedDate;
        })

        if (eventDate < currentDate) {
            historyTab.append(content);
        } else {
            eventTab.append(content);
        }
    });
}

function addEvent() {
    var place = document.getElementById('place').value;
    var rawDate = document.getElementById('date').value;
    var dateParts = rawDate.split("-");
    var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

    if (place == "" && rawDate == "") {
        eventForm.reset();
        eventForm.style.display = "none";
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    var newEvent = {
        place: place,
        date: formattedDate
    };

    events.push(newEvent);
    eventForm.reset();
    eventForm.style.display = "none";
    loadEvents();
    hideOverlay();
}

function deleteEvent() {
    hideOverlay();
}