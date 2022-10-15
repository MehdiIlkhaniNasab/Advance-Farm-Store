let listAdmin = []
let listAdminStr = 'list-admin'
let btnRegisterAdmin = _querySelector('.btn-register-admin')
let formIconPassword = _querySelector('.form__icon-password')

// get info new admin
function getInfoNewAdmin() {
    let imgProfileSrcStr = '../../img/admin/profile/banana.png'
    let imgBannerSrcStr = '../../img/admin/banner/banner.png'
    let registerFirstnameInput = _querySelector('.register__firstname-input')
    let registerLastnameInput = _querySelector('.register__lastname-input')
    let registerUsernameInput = _querySelector('.register__username-input')
    let registerEmailInput = _querySelector('.register__email-input')
    let registerPasswordInput = _querySelector('.register__password-input')
    let registerFirstnameInputValue = registerFirstnameInput.value
    let registerLastnameInputValue = registerLastnameInput.value
    let registerUsernameInputValue = registerUsernameInput.value
    let registerEmailInputValue = registerEmailInput.value
    let registerPasswordInputValue = registerPasswordInput.value

    let infoNewAdmin = {
        firstname: registerFirstnameInputValue,
        lastname: registerLastnameInputValue,
        username: registerUsernameInputValue,
        email: registerEmailInputValue,
        password: registerPasswordInputValue,
        imgProfileSrc: imgProfileSrcStr,
        imgBannerSrc: imgBannerSrcStr,
    }



    return infoNewAdmin

}

// set info new admin in arrey
function addInfoNewAdminInArrey(arrey, infoAdmin) {
    arrey.push(infoAdmin)
    return arrey
}


// set arrey in localstorage
function setInfoNewAdminToLocal(event) {
    event.preventDefault()
    let isExistEmail;
    let idFormRegisterStr = 'register__form'
    let infoNewAdmin = getInfoNewAdmin()
    let formRegister = _querySelector('.register__form')
    let isvalidForm = checkValidInputs(idFormRegisterStr) //checkValidInputs function is in common-script.js file ---> retur true if form isvalid
    let registerEmailInput = _querySelector('.register__email-input') // for check email is exist in localstoarge or not
    listAdmin = getItemLocalStorage(listAdminStr)

    if (!listAdmin) {
        listAdmin = []
    }

    if (isvalidForm) {

        isExistEmail = existEmailNewAdmin() // true --> email is exist in localstorage /  false --> email is not exist in localstorage

        if (!isExistEmail) {

            listAdmin = addInfoNewAdminInArrey(listAdmin, infoNewAdmin) // addInfoNewAdminInArrey  return array 
            setItemLocalStorage(listAdminStr, listAdmin)
            resetFormInputs(formRegister) //rest value of inputs

            Swal.fire({
                position: 'top-end',
                showClass: {
                    popup: 'animate__animated animate__fadeInLeft'
                },
                toast: true,
                icon: 'success',
                title: 'اطلاعات شما با موفقیت ثبت شد.  از طریق صفحه ورود وارد شوید ...',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            })

            setTimeout(function () {
                window.location.href = '/pages/admin/login-admin.html'
            }, 3000)

        } else {
            registerEmailInput.style.borderBottom = '3px solid #CE0000'
            Swal.fire({
                icon: 'error',
                title: 'اووه!! اطلاعات معتبر نیست.',
                text: 'ایمیل وارد شده در دیتابیس موجود است لطفا ایمیل دیگری وارد کنید',
                confirmButtonText: 'باشه',
                width: '36rem'
            })
        }


    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }

}

// convert input password to text
function convertInputToText() {
    let registerPasswordInput = _querySelector('.register__password-input')
    let isPassword = registerPasswordInput.type == 'password'

    if (isPassword) {
        registerPasswordInput.type = 'text'
    } else {
        registerPasswordInput.type = 'password'
    }
}


// check email new admin is exist or not
function existEmailNewAdmin() {
    let registerEmailInput = _querySelector('.register__email-input')
    let registerEmailInputValue = registerEmailInput.value

    let listAdmin = getItemLocalStorage(listAdminStr)

    let isExist = _.some(listAdmin, { 'email': `${registerEmailInputValue}` })

    return isExist
}


// events
btnRegisterAdmin.addEventListener('click', setInfoNewAdminToLocal)
formIconPassword.addEventListener('click', convertInputToText)
