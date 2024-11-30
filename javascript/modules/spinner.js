

export function showSpinner(id) {
    const spinner = document.getElementById(id);
    if (spinner) {
        spinner.style.display = 'block';
    }
}

export function hideSpinner(id) {
    
    setTimeout(() => {
        const spinner = document.getElementById(id);
        if (spinner) {
            spinner.style.display = 'none';
        }
    }, 500);

}

