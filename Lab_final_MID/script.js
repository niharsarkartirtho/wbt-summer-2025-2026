const form = document.getElementById("myForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function(event){

    event.preventDefault();

    clearErrors();

    if(isLocked){
        document.getElementById("passwordError").innerHTML =
        "Password locked. Try again later.";
        return;
    }

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let category = document.getElementById("category");
    let reason = document.getElementById("reason");

    let gender = document.querySelector('input[name="gender"]:checked');
    let clubs = document.querySelectorAll('input[name="club"]:checked');

    let valid = true;

    //First Name

    if(firstName.value.trim()==""){
        showError(firstName,"firstNameError","First name required");
        valid=false;
    }
    else if(!/^[A-Za-z]+$/.test(firstName.value.trim())){
        showError(firstName,"firstNameError","Type only letters");
        valid=false;
    }
    else{
        showSuccess(firstName);
    }

    //Last Name

    if(lastName.value.trim()==""){
        showError(lastName,"lastNameError","Last name required");
        valid=false;
    }
    else if(!/^[A-Za-z]+$/.test(lastName.value.trim())){
        showError(lastName,"lastNameError","Type only letters");
        valid=false;
    }
    else{
        showSuccess(lastName);
    }

    //Email

    if(email.value.trim()==""){
        showError(email,"emailError","Email required");
        valid=false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        showError(email,"emailError","Invalid Email");
        valid=false;
    }
    else{
        showSuccess(email);
    }

    //Password

    if(password.value==""){
        showError(password,"passwordError","Password required");
        valid=false;
    }
    else if(password.value!="AIUB123"){

        wrongAttempts++;

        showError(password,"passwordError",
        "Wrong Password! Attempt "+wrongAttempts+" of 3");

        valid=false;

        if(wrongAttempts>=3){

            isLocked=true;

            password.disabled=true;

            document.getElementById("passwordError").innerHTML =
            "Locked for 1 minute";

            setTimeout(function(){

                wrongAttempts=0;
                isLocked=false;
                password.disabled=false;

                document.getElementById("passwordError").innerHTML =
                "Password unlocked.";

            },60000);
        }
    }
    else{
        wrongAttempts=0;
        showSuccess(password);
    }

    //Gender

    if(gender==null){
        document.getElementById("genderError").innerHTML =
        "One option must be selected";
        valid=false;
    }

    //Clubs

    if(clubs.length==0){
        document.getElementById("clubError").innerHTML =
        "Select at least one club";
        valid=false;
    }

    //Category

    if(category.value==""){
        showError(category,"categoryError","Select category");
        valid=false;
    }
    else{
        showSuccess(category);
    }

    //Reason

    if(reason.value.trim()==""){
        showError(reason,"reasonError","Required");
        valid=false;
    }
    else if(reason.value.trim().length<20){
        showError(reason,"reasonError","Minimum 20 characters");
        valid=false;
    }
    else{
        showSuccess(reason);
    }

    if(valid){

        alert("Registration Successful!");

        form.reset();

        clearErrors();
    }

});

function showError(input,errorId,message){

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input){

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

function clearErrors(){

    let errors=document.querySelectorAll(".error");

    errors.forEach(function(item){

        item.innerHTML="";

    });

    let fields=document.querySelectorAll("input,select,textarea");

    fields.forEach(function(field){

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}