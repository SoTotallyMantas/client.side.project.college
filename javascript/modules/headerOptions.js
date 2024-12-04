export function RecheckHeaders() {
    return document.querySelectorAll("h1, h2, h3, h4, h5, h6");

}

export function HeaderSizeController() {
    

    const headerSizeRange = document.getElementById("header-font-range");
    const headerSizeValue = document.getElementById("header-font-size-value");

    if (!headerSizeRange) {
        console.error("Header size range element not found.");
        return;
    }

    function applySize() {
        const headers = RecheckHeaders();
        const selectedSize = headerSizeRange.value;
        headerSizeValue.textContent = selectedSize;
        headers.forEach(header => {
            header.style.fontSize = `${selectedSize}px`;
        });

        localStorage.setItem("headerSize", selectedSize);

    }

    

    function applySavedSize() {
        const savedFontSize = localStorage.getItem("headerSize");

        if (savedFontSize) {
            const headers = RecheckHeaders();
            headerSizeRange.value = parseInt(savedFontSize, 10);
            headerSizeValue.textContent = savedFontSize;
            headers.forEach(header => {
                header.style.fontSize = `${savedFontSize}px`;
            });
    }
    }
    if(!headerSizeRange.dataset.initialized){

    headerSizeRange.addEventListener("input", applySize);
    headerSizeRange.dataset.initialized = true;
    }
    window.addEventListener("load", function () {
        applySavedSize();
    });

    return applySavedSize;
}

export function HeaderColorController() {

    
    const headerColor = document.getElementById("header-color");

    if (!headerColor) {
        console.error("Header color element not found.");
        return;
    }

   function applyColor() {
        const selectedColor = headerColor.value;
        const headers = RecheckHeaders();
        headers.forEach(header => {
            header.style.color = selectedColor;
        });

        localStorage.setItem("headerColor", headerColor.value);
    }

    function applySavedColor() {
        const savedColor = localStorage.getItem("headerColor");

        if (savedColor) {
            const headers = RecheckHeaders();
            headerColor.value = savedColor;
            headers.forEach(header => {
                header.style.color = savedColor;
            });
        }
    }
    
    if (!headerColor.dataset.initialized) {
        headerColor.addEventListener("input", applyColor);
        headerColor.dataset.initialized = "true";
    }
    document.addEventListener("DOMContentLoaded", function () {
       applySavedColor();
    });

    return applySavedColor;
}

export function ResetDefault() {

    
    const ResetButton = document.getElementById("restore-Default");
    const headerSizeValue = document.getElementById("header-font-size-value");
    const headerColor = document.getElementById("header-color");



    if(!ResetButton){
        console.error("Reset button not found");
        return;
    }

    ResetButton.addEventListener("click", function () {
        let headers = RecheckHeaders();
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
