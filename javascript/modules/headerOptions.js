export function HeaderSizeController() {
    const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const headerSizeRange = document.getElementById("header-font-range");
    const headerSizeValue = document.getElementById("header-font-size-value");

    if (!headerSizeRange) {
        console.error("Header size range element not found.");
        return;
    }

    headerSizeRange.addEventListener("input", function () {
        const selectedSize = `${headerSizeRange.value}px`;
        headerSizeValue.textContent = selectedSize;
        headers.forEach(header => {
            header.style.fontSize = selectedSize;
        });

        localStorage.setItem("headerSize", selectedSize);

    });

    window.addEventListener("load", function () {
        const savedFontSize = localStorage.getItem("headerSize");

        if (savedFontSize) {
            headerSizeRange.value = parseInt(savedFontSize, 10);
            headerSizeValue.textContent = savedFontSize;
            headers.forEach(header => {
                header.style.fontSize = savedFontSize;
            });
        }

    });
}
export function HeaderColorController() {

    const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headerColor = document.getElementById("header-color");

    if (!headerColor) {
        console.error("Header color element not found.");
        return;
    }

    headerColor.addEventListener("input", function () {
        const selectedColor = headerColor.value;

        headers.forEach(header => {
            header.style.color = selectedColor;
        });

        localStorage.setItem("headerColor", headerColor.value);
    });

    document.addEventListener("DOMContentLoaded", function () {
        const savedColor = localStorage.getItem("headerColor");
        if (savedColor) {
            headerColor.value = savedColor;
            headers.forEach(header => {
                header.style.color = savedColor;
            });
        }
    });
}

export function ResetDefault() {

    const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const ResetButton = document.getElementById("restore-Default");
    const headerSizeValue = document.getElementById("header-font-size-value");
    const headerColor = document.getElementById("header-color");



    if(!ResetButton){
        console.error("Reset button not found");
        return;
    }

    ResetButton.addEventListener("click", function () {

        headers.forEach(header => {
            header.style.color = "";
            header.style.fontSize = "";
        });

        headerSizeValue.textContent = "";
        headerColor.value = "";
        localStorage.removeItem("headerColor");
        localStorage.removeItem("headerSize");

    });

}
