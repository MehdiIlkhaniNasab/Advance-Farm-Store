let listUser = []
let listUserStr = 'list-User'
let btnRegisterUser = _querySelector('.btn-register-user')
let formIconPassword = _querySelector('.form__icon-password')
let userId = 0

// get info new User
function getInfoNewUser() {
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

    let infoNewUser = {
        id: userId,
        firstname: registerFirstnameInputValue,
        lastname: registerLastnameInputValue,
        username: registerUsernameInputValue,
        email: registerEmailInputValue,
        password: registerPasswordInputValue,
        imgProfileSrc: imgProfileSrcStr,
        imgBannerSrc: imgBannerSrcStr,
        products: [],
        message: [],
    }

    userId++
    return infoNewUser

}

// set info new User in arrey
function addInfoNewUserInArrey(arrey, infoUser) {
    arrey.push(infoUser)
    return arrey
}


// set arrey in localstorage
function setInfoNewUserToLocal(event) {
    event.preventDefault()
    let isExistEmail;
    let idFormRegisterStr = 'register__form'
    let infoNewUser = getInfoNewUser()
    let formRegister = _querySelector('.register__form')
    let isvalidForm = checkValidInputs(idFormRegisterStr) //checkValidInputs function is in common-script.js file ---> retur true if form isvalid
    let registerEmailInput = _querySelector('.register__email-input') // for check email is exist in localstoarge or not
    listUser = getItemLocalStorage(listUserStr)

    if (!listUser) {
        listUser = []
    }

    if (isvalidForm) {

        isExistEmail = existEmailNewUser() // true --> email is exist in localstorage /  false --> email is not exist in localstorage

        if (!isExistEmail) {

            listUser = addInfoNewUserInArrey(listUser, infoNewUser) // addInfoNewUserInArrey  return array 
            setItemLocalStorage(listUserStr, listUser)
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
                window.location.href = '/pages/User/login-User.html'
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


// check email new User is exist or not
function existEmailNewUser() {
    let registerEmailInput = _querySelector('.register__email-input')
    let registerEmailInputValue = registerEmailInput.value

    let listUser = getItemLocalStorage(listUserStr)

    let isExist = _.some(listUser, { 'email': `${registerEmailInputValue}` })

    return isExist
}


// get id last of User
function getIndexLastIdUser(){
    let lengthListUser = listUser.length
    let lastUser = listUser[lengthListUser - 1]

    if(lastUser){
        return lastUser.id
    }else{
        return 0
    }

}

// load page register func
function loadPageRegiter() {
    listUser = getItemLocalStorage(listUserStr)

    if (!listUser) {
        listUser = []
    }
    
    userId = getIndexLastIdUser() + 1
}

// events
btnRegisterUser.addEventListener('click', setInfoNewUserToLocal)
formIconPassword.addEventListener('click', convertInputToText)


window.addEventListener('load', loadPageRegiter)