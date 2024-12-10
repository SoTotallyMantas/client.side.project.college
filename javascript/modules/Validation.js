

export function ValidateForm() {
    const form = document.getElementById('contactForm');
    const FirstName = document.getElementById('fname');
    const LastName = document.getElementById('lname');
    const Email = document.getElementById('email');
    const Message = document.getElementById('subject');
    let EmailDomain = new RegExp("@[a-zA-Z0-9]+\\.+[a-zA-Z]{3}$");

    FirstName.addEventListener('input', function () {
        if (FirstName.validity.valid) {

           
            FirstName.nextElementSibling.textContent = '';
            FirstName.classList.remove('is-invalid');
            FirstName.classList.add('is-valid');
        } else if (FirstName.validity.valueMissing) {
            FirstName.classList.remove('is-valid');
            FirstName.classList.remove('is-invalid');
        } else {
            showFirstNameError();
        }
    });

    LastName.addEventListener('input', function () {
        if (LastName.validity.valid) {
           
            LastName.nextElementSibling.textContent = '';
            LastName.classList.remove('is-invalid');
            LastName.classList.add('is-valid');
        } else if (LastName.validity.valueMissing) {
            LastName.classList.remove('is-valid');
            LastName.classList.remove('is-invalid');
        } else {
            showLastNameError();
        }
    });
    
    
    
    Email.addEventListener('input', function () {
        if (Email.validity.valid) {
            let check = EmailDomain.test(Email.value)
            if(!check)
            {
              const emailFeedback= document.getElementById("emailerror");
                emailFeedback.innerHTML = "Wrong Domain";
                Email.classList.add('is-invalid');
                Email.classList.remove('is-valid');
            }
            else
            {
            Email.nextElementSibling.textContent = '';
            Email.classList.remove('is-invalid');
            Email.classList.add('is-valid');
            }
        } else if (Email.validity.valueMissing) {
            Email.classList.remove('is-valid');
            Email.classList.remove('is-invalid');
        } else {
            showEmailError();
        }   
    });

    Message.addEventListener('input', function () {
        if (Message.validity.valid) {

            Message.nextElementSibling.textContent = '';
            Message.classList.remove('is-invalid');
            Message.classList.add('is-valid');
        } else if (Message.validity.valueMissing) {

            Message.classList.remove('is-valid');
            Message.classList.remove('is-invalid');
        } else {
            showMessageError();
        }
    });

    form.addEventListener('submit', function (event) {

        let isFormValid = true;
        if (!Email.validity.valid) {
            showEmailError();
            isFormValid = false
        }

        if (!FirstName.validity.valid) {
            showFirstNameError();
            isFormValid = false
        }

        if (!LastName.validity.valid) {
            showLastNameError();
            isFormValid = false
        }

        if (!Message.validity.valid) {
            showMessageError();
            isFormValid = false
        }

        if (!isFormValid) {
            event.preventDefault();
        }
        else{
            alert(`     Form submitted successfully!
                  First Name: ${FirstName.value}
                  Last Name: ${LastName.value}
                  Email: ${Email.value}
                  Message: ${Message.value}`);
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.value = '';
                input.classList.remove('is-valid'); 

            event.preventDefault();
        }
        );
        }
    });

    function showEmailError() {


        if (Email.validity.valueMissing) {
            Email.nextElementSibling.textContent = 'Email is required';

        } else if (Email.validity.typeMismatch) {
            Email.nextElementSibling.textContent = 'Please enter a valid email address';

        } else if (Email.validity.tooShort) {
            Email.nextElementSibling.textContent = `Email must be at least ${email.minLength} characters long; you entered ${email.value.length}.`;

        } else {
            Email.nextElementSibling.textContent = '';
        }
        toggleInvalidClass(Email);


    }

    function showFirstNameError() {
        if (FirstName.validity.valueMissing) {
            FirstName.nextElementSibling.textContent = 'First name is required';

        } else {
            FirstName.nextElementSibling.textContent = '';
        }
        toggleInvalidClass(FirstName);
    }

    function showLastNameError() {
        if (LastName.validity.valueMissing) {
            LastName.nextElementSibling.textContent = 'Last name is required';

        } else {
            LastName.nextElementSibling.textContent = '';
        }
        toggleInvalidClass(LastName);
    }

    function showMessageError() {
        if (Message.validity.valueMissing) {
            Message.nextElementSibling.textContent = 'Message is required';

        } else {
            Message.nextElementSibling.textContent = '';
        }
        toggleInvalidClass(Message);
    }

    function toggleInvalidClass(input) {
        if (input.validity.valid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
        }
    }
}