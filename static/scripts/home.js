const startDate = new Date("2023-11-28")

function getDayOfWeek(dayNumber) {
    var daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return daysOfWeek[dayNumber];
}

function differenceInDays(date1, date2) {
    const date1Milliseconds = date1.getTime();
    const date2Milliseconds = date2.getTime();
    const differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
    const differenceInDays = Math.floor(differenceMilliseconds / (24 * 60 * 60 * 1000));
    return differenceInDays;
}

function loadHomePage() {
    const partnerName = "Partner's Name";

    const infoDiv = document.createElement("div");
    const text1 = document.createElement("h3");
    const text2 = document.createElement("p");



    text1.textContent = `${differenceInDays(startDate, new Date())} Days Together`;
    text2.textContent = `With ${partnerName}`;
    infoDiv.appendChild(text1);
    infoDiv.appendChild(text2);

    homeTab.appendChild(infoDiv);

    // const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mona_Lisa-restored.jpg/1200px-Mona_Lisa-restored.jpg";
    // document.getElementById("home-background").src = imageUrl;
}