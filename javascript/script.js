
function navbarMobile() {
    var x = document.getElementById("Mainnavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}