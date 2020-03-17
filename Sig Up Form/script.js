const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const fillText = document.getElementById('fill-text');
const fillMessage = document.getElementById('fill-message');

// Show Input Error Message
function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;

}

// Show Success Outline
function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

// Confirm Email Address
function confirmEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Email is not Valid.')
    }
}

// ConfirmRequirement
function confirmRequirement(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input)
        }
    });
};

// Confirm Length of FillText and Fill Message
function confirmTextLength(input, max){
    if(input.value.length < max){
        showError(input, `${getFieldName(input)} must be at least ${max} words.`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must not exceed a ${max} words.`)
    }else{
        showSuccess(input);
    }
}

function confirmMessageLength(input, max){
    if(input.value.length < max){
        showError(input, `${getFieldName(input)} must be at least ${max} words.`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must not exceed a ${max} words.`)
    }else{
        showSuccess(input);
    }
}

// Get FieldName
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function storeFormInLocalStorage(form){
    let forms;
    if(localStorage.getItem('forms')  ===null){
        tasks = [];
    } else{
        forms= JSON.parse(localStorage.getItem('forms'));
    }
    form.push(forms);

    localStorage.setItem('form', JSON.stringify(forms));

}


form.addEventListener('submit', function(e){
    e.preventDefault();

    // Create Function For Validation
    confirmRequirement([name, email, fillText, fillMessage]);
    confirmEmail(email);
    confirmTextLength(fillText, 100);
    confirmMessageLength(fillMessage, 150);

});
