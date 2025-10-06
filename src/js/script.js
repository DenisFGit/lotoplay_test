

//displaying price and data through select

const priceEl = document.querySelector('#price');
const dateEl = document.querySelector('#date');
const modalSelect = document.querySelector('#modal-select');

// open and clode modal
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');
const promoBtn = document.querySelector('.promo__btn');
const overscreen = document.querySelector('.overscreen');

const orderBtns = document.querySelectorAll('.btn_small');
orderBtns.forEach((item) => {
    item.addEventListener('click', openModal);
});



//errors messages
const nameError = document.querySelector('.error-name');
const emailError = document.querySelector('.error-email');
const selectError = document.querySelector('.error-select');

//modal inputs
const modalName = document.querySelector('#modal-name');
const modalEmail = document.querySelector('#modal-email');

console.log(modalName);
console.log(modalSelect.value);

const modalBtn = document.querySelector('#modal-btn');
const modalForm = document.querySelector('.modal__form');

// element where we will show success
const body = document.body;
const successMessage = document.createElement("div");
successMessage.classList.add("success-message");
successMessage.style.color = "green";
successMessage.style.marginTop = "10px";

const loadingMessage = document.createElement('div');
loadingMessage.style.color = "green";
loadingMessage.style.marginTop = "10px";
loadingMessage.textContent = 'Loaidng...';

// connect with us 
const contactForm = document.querySelector('.contacts__form');
const contactName = document.querySelector('#name');
const contactEmail = document.querySelector('#email');
const contactMessage = document.querySelector('#message');

//valiadate connect form

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeAllErrors(contactForm);
    let isValid = true;
    if (contactName.value.length < 2) {
        showError(contactName, "Ім'я повинно мати не менше 2 символів");
        isValid = false;
    }
    if (contactEmail.value.includes('@') == false) {
        showError(contactEmail, "Please enter a valid email.")
        isValid = false;
    }
    if (contactMessage.value.length < 5) {
        showError(contactMessage, "Повідомлення повинно мати не менше 5 символів");
        isValid = false;
    }
    if (isValid) {
        const formData = new FormData(contactForm);
        const query = new URLSearchParams(formData).toString();

        fetch(`https://httpbin.org/get?${query}`)
            .then(res => res.json())
            .then(data => {
                console.log("Response:", data);
            });
    }

});

function removeAllErrors(form) {
    form.querySelectorAll('.error').forEach(err => err.remove());
    form.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
}

function showError(input, message) {
    const error = document.createElement('p');
    error.className = 'error';
    input.classList.add('error-input');
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
}

// modalForm.appendChild(successMessage);

function updateSelectedData() {
    const selectedOption = modalSelect.options[modalSelect.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    const date = selectedOption.getAttribute("data-date");

    console.log(price, date);

    priceEl.textContent = price ? `${price}` : "";
    dateEl.textContent = date || "";
    console.log(price);
}

modalSelect.addEventListener('change', updateSelectedData);

function openModal() {
    modal.classList.add('showModal');
    overscreen.classList.add('show');
    updateSelectedData();

    // nameError.textContent = "";
    // emailError.textContent = "";
    // selectError.textContent = "";

    if (successMessage.parentNode) {
        successMessage.remove();
    }
    if (loadingMessage.parentNode) {
        loadingMessage.remove();
    }

    modalForm.classList.remove('hide');
    modalForm.reset();
    modalBtn.disabled = false;
    modalBtn.style.opacity = "1";
}

promoBtn.addEventListener('click', openModal);



function closeModal() {
    modal.classList.remove('showModal');
    overscreen.classList.remove('show');
}

overscreen.addEventListener('click', closeModal);
close.addEventListener('click', closeModal);

//-----------form validation------------


modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeAllErrors(modalForm);
    let isValid = true;
    if (modalName.value.length < 2) {
        showError(modalName, "Ім'я повинно мати не менше 2 символів");
        isValid = false;
    }
    if (modalEmail.value.includes('@') == false) {
        showError(modalEmail, "Please enter a valid email.")
        isValid = false;
    }
    if (isValid) {
        modalBtn.disabled = true;
        modalBtn.style.opacity = "0.6"; // optional visual feedback
        modalForm.appendChild(loadingMessage);
        const formData = new FormData(modalForm);
        const query = new URLSearchParams(formData).toString();
        fetch(`https://httpbin.org/get?${query}`)
            .then(res => res.json())
            .then(data => {
                console.log("Response:", data);
                modalForm.classList.add('hide');
                successMessage.textContent = 'Форма успішно відправлена ✅';
                modal.appendChild(successMessage);

                // modalBtn.disabled = true;
                // modalBtn.style.opacity = "0.6"; // optional visual feedback
            });
    }
});

const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
    burger.classList.toggle('burgerShow');
    navList.classList.toggle('show');
});







