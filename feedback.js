const modal = document.getElementById('feedbackModal');
const closeBtn = document.getElementById('closeModalBtn');
const giveFeedbackBtn = document.getElementById('giveFeedbackBtn');
const feedbackForm = document.getElementById('feedbackForm');
const successMessageDiv = document.getElementById('successMessage');

let formSubmitted = false;
let autoShowTimeout = null;
let hasAutoShown = false;
let modalOpened = false;

function openModal() {
    if (!formSubmitted && !modalOpened) {
        modalOpened = true;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    modal.style.display = 'none';
    if (!formSubmitted) {
        feedbackForm.reset();
        document.querySelectorAll('.error-message').forEach(err => {
            err.style.display = 'none';
        });
    }
}
console.log("Timer started - Modal will appear in 3 minutes if not opened");
autoShowTimeout= setTimeout(function(){
    console.log("3minutes passed - checking conditions");
    console.log("formSubmitted:", formSubmitted);
    console.log("modalOpened:", modalOpened);
    console.log("hasAutoShown:",hasAutoShown);
    if (!formSubmitted && !modalOpened && ! hasAutoShown){
        hasAutoShown = true;
        modalOpened = true
        console.log("Auto-opening modal now!");
        openModal();
    }else{
        console.log("Auto-opened skipped - conditions not met");
    }
    }, 180000);


if (giveFeedbackBtn) {
    giveFeedbackBtn.onclick = function() {
        console.log("Manual open- give Feedback clicked");
        hasAutoShown = true;
        modalOpened= true;
        if (autoShowTimeout){ clearTimeout(autoShowTimeout);
        console.log("Auto-show timeout cancelled");
    }
    modal.style.display='flex'
    };
}

if (closeBtn) {
    closeBtn.onclick = function(){
        closeModal();
    };
}

modal.onclick = function(e) {
    if (e.target === modal && !formSubmitted) {
        closeModal();
    }
}
feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    
    let isValid = true;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    const emailError = document.getElementById('emailError');
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    const categoryError = document.getElementById('categoryError');
    if (category === '') {
        categoryError.style.display = 'block';
        isValid = false;
    } else {
        categoryError.style.display = 'none';
    }

    const messageError = document.getElementById('messageError');
    if (message === '') {
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    if (isValid) {
        formSubmitted = true;
        if (autoShowTimeout) clearTimeout(autoShowTimeout);
        
        document.querySelectorAll('.form-group').forEach(group => {
            group.style.display = 'none';
        });
        
        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) submitBtn.style.display = 'none';
        
        successMessageDiv.style.display = 'block';
        
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }
};