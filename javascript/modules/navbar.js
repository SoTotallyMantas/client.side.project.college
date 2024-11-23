
export function navbarMobile() {
    console.log("navbarMobile");
    const x = document.getElementById("Mainnavbar");
    x.classList.toggle("responsive", x.className === "navbar");
}
