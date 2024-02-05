const contentElement = document.getElementById("content");
const startDate = new Date("2024-01-28")

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
    document.getElementById("time").textContent = 
        `${differenceInDays(startDate, new Date())} Days Together`;

    document.getElementById("names").innerHTML = 
        `Mắm - Muối`;
}

loadHomePage();