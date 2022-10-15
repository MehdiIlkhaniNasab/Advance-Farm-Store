
// function reset form inputs
function resetFormInputs(form){
    form.reset()
}

// funtion reset all form of page when page load
function resetAllForm(){
    let forms = _querySelectorAll('form')
    forms.forEach(function(form){
        form.reset()
    })
}

// check inputs is valid or not
function checkValidInputs(formId ) {

    let inputsInvalid = _querySelectorAll(`#${formId} :invalid`) //check there is any inputs invalid -> yes:form is not valid no:form is valid
    let isEmpty = (inputsInvalid.length > 0)  ? false : true

    return isEmpty
}

// get item from localstorge
function getItemLocalStorage(nameValue) {
    let getItem = localStorage.getItem(nameValue)
    let listAdminLocalStorage = JSON.parse(getItem)
    return listAdminLocalStorage;
}

// set item on localstorage
function setItemLocalStorage(nameValue, value) {
    localStorage.setItem(nameValue, JSON.stringify(value))
}

// remove item on localstorage
function removeItemLocalStorage(nameValue) {
    localStorage.removeItem(nameValue)
}



// get element by Id, class, querySelector
function _id(elemId) {
    return document.getElementById(elemId)
}

function _class(elemClass) {
    return document.getElementsByClassName(elemClass)
}

function _querySelector(elemSelector) {
    return document.querySelector(elemSelector)
}

function _querySelectorAll(elemSelector) {
    return document.querySelectorAll(elemSelector)
}

window.addEventListener('load', function(){
    resetAllForm()
})
