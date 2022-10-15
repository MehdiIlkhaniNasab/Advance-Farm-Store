let listUserStr = 'list-User'
let currentUserStr = 'current-User'
let btnLogin = _querySelector('.btn-login')

// get info current User
function getInfoCurrentUser() {
    let loginUsernameInput = _querySelector('.login__username-input')
    let loginPasswordInput = _querySelector('.login__password-input')
    let loginUserNameInputValue = loginUsernameInput.value
    let loginPasswordInputValue = loginPasswordInput.value


    let infoCurrentUser = {
        
        username : loginUserNameInputValue,
        password : loginPasswordInputValue,
        
    }

    return infoCurrentUser

}



// check the infoCurrentUser is exist or not
function checkInfoCurrentUser(){
    let listUser = getItemLocalStorage(listUserStr)
    let infoCurrentUser = getInfoCurrentUser()
    let isExist = _.some(listUser, {username: infoCurrentUser.username, password: infoCurrentUser.password})
    console.log(isExist);
    return isExist
}

// login to panel function
function loginToPanel(event){
    event.preventDefault()
    let isExist = checkInfoCurrentUser()
    let infoCurrentUser = getInfoCurrentUser()
    let formLogin = _querySelector('.login__form')
    resetFormInputs(formLogin) //rest value of inputs

    if(isExist){

        setItemLocalStorage(currentUserStr, infoCurrentUser)

        Swal.fire({
            position: 'top-end',
            toast:true,
            icon: 'success',
            title: 'خوش آمدید. در حال انتقال به پنل',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
           
        })

        setTimeout(function(){
               window.location.href = '/pages/user/users-panel.html' 
        },3000)
    }else{
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
