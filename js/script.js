"use strict"
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);        
    }
    function formValidate(form){
        const messagePass = document.getElementById('messagePass');
        messagePass.innerHTML = "";
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        console.log(formReq);
        const pas = document.getElementById('password');
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];  
            formRemoveError(input);            
            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            }else if (pas.value.length < 6) {                
                if(pas.value.length < 6){
                    messagePass.innerHTML = "Пароль повинен мати не менше 6ти символів!";
                }                
                formAddError(input);
                error++;
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    } 
});