document.addEventListener("DOMContentLoaded", function() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    signInBtn.addEventListener('click', function() {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInBtn.classList.add('active');
        signUpBtn.classList.remove('active');
    });

    signUpBtn.addEventListener('click', function() {
        signUpForm.style.display = 'block';
        signInForm.style.display = 'none';
        signUpBtn.classList.add('active');
        signInBtn.classList.remove('active');
    });

    // Loader
    setTimeout(function() {
        document.body.classList.add("loaded");
    }, 1000); 
});