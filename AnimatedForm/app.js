function animatedForm(){
    const arrows = document.querySelectorAll('.fa-arrow-down');

    arrows.forEach(arrow=>{
        arrow.addEventListener('click', ()=>{
            const input = arrow.previousElementSibling;
            const parent = arrow.parentElement;
            const nextForm = parent.nextElementSibling;

            //Check for validation
            if(input.type === "text" && validateUser(input)){
                nextSlide(parent, nextForm); 
                updateProgress("first");
            } else if(input.type === 'email' && validateEmail(input)){
                nextSlide(parent, nextForm);
                updateProgress("second");
            } else if(input.type === 'password' && validateUser(input)){
                nextSlide(parent, nextForm);
                updateProgress("third");
            } else {
                parent.style.animation = "shake 0.3s ease";
            }

            //get rid of animation
            parent.addEventListener('animationend', ()=>{
                parent.style.animation = '';
            })
        });
    });
}

function validateUser(user){
    //fail validation
    if(user.value.length < 6){
        displayError("usrLen");
        error('rgb(189,87,87)');
    }else{
        error('rgb(87,189,130)');
        document.querySelector('.errMessage').innerText = '';
        return true;
    }
}

function validateEmail(email){
    const validation =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //pass validation
    if(validation.test(email.value)){
        error('rgb(87,189,130)');
        document.querySelector('.errMessage').innerText = '';
        return true;
    }else{
        displayError("mail");
        error('rgb(189,87,87)');
    }
}

function nextSlide(parent, nextForm){
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
}

function updateProgress(step){
    document.getElementById(step).style.color = "green";
}

function error(color){
    document.body.style.backgroundColor = color;
}

//ERROR CODES:
//usrLen -> not enough characters in username
//mail -> email address is not valid
//pass -> password is not long enough
function displayError(code){
    let err;
    switch(code){
        case "usrLen":
            err = "Your username and password must be at least 6 characters long";
            break;
        case "mail":
            err = "Your email address is not valid"
            break;
    }
    document.querySelector('.errMessage').innerText = err;
}

animatedForm();