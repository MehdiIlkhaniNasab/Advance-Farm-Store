let listAdminStr = 'list-admin'
let currentAdminStr = 'current-admin'
let btnLogin = _querySelector('.btn-login')

// get info current admin
function getInfoCurrentAdmin() {
    let loginUsernameInput = _querySelector('.login__username-input')
    let loginPasswordInput = _querySelector('.login__password-input')
    let loginUserNameInputValue = loginUsernameInput.value
    let loginPasswordInputValue = loginPasswordInput.value


    let infoCurrentAdmin = {
        username: loginUserNameInputValue,
        password: loginPasswordInputValue,

    }

    return infoCurrentAdmin

}



// check the infoCurrentAdmin is exist or not
function checkInfoCurrentAdmin() {
    let listAdmin = getItemLocalStorage(listAdminStr)
    let infoCurrentAdmin = getInfoCurrentAdmin()
    let isExist = _.some(listAdmin, { username: infoCurrentAdmin.username, password: infoCurrentAdmin.password })

    return isExist
}

// login to panel function
function loginToPanel(event) {
    event.preventDefault()
    let isExist = checkInfoCurrentAdmin()
    let infoCurrentAdmin = getInfoCurrentAdmin()
    let formLogin = _querySelector('.login__form')
    resetFormInputs(formLogin) //rest value of inputs

    if (isExist) {

        setItemLocalStorage(currentAdminStr, infoCurrentAdmin)

        Swal.fire({
            position: 'top-end',

            toast: true,
            icon: 'success',
            title: 'خوش آمدید. در حال انتقال به پنل',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

        })

        setTimeout(function () {
            window.location.href = '/pages/admin/users-admin.html'
        }, 3000)

    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}

// events
btnLogin.addEventListener('click', loginToPanel)