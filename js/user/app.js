let listUserStr = 'list-User'
let currentUserStr = 'current-User'

let bodyDuc = document.body



// get info current User
function getInfoCurrentUser() {
    let currentUser = getItemLocalStorage(currentUserStr)
    let listUser = getItemLocalStorage(listUserStr)

    if (currentUser) {
        let infoCurrentUser = _.find(listUser, { 'username': currentUser.username })
        return infoCurrentUser
    } else {
        return false
    }

}

// logout from panel 
function logoutPanel() {

    Swal.fire({
        title: 'آیا از خروج پنل مطمئن هستید؟',
        text: "در صورت تایید به صفحه ورود منتقل خواهید شد",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله، خارج شو!',
        cancelButtonText: 'خیر، منصرف شدم',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/pages/user/login-user.html'
            removeItemLocalStorage(currentUserStr)
            removeItemLocalStorage('theme-user')
        }
    })
}

// dark mode toggle function 
function darkModeToggleFunc() {
    let isDark = bodyDuc.classList.toggle('dark')
    setItemLocalStorage('theme-user', isDark)
}

// dark mode load page
function darkModeLoadPage() {
    isDark = getItemLocalStorage('theme-user')


    if (isDark) {
        bodyDuc.classList.add('dark')


    } else {
        bodyDuc.classList.remove('dark')


    }

}


// load header with User info
function loadHeader() {
    let headerContainer = _querySelector(".header")
    let infoCurrentUser = getInfoCurrentUser()

    headerContainer.insertAdjacentHTML('beforeend', `
        <div class="header__info">
        <img src="${infoCurrentUser.imgProfileSrc}" alt="uesr photo" class="header__img">
        <div class="header__details">
            <h4 class="header__name mb-2">${infoCurrentUser.firstname + ' ' + infoCurrentUser.lastname}</h4>
            <p class="header__email my-0" lang="en">${infoCurrentUser.email}</p>
        </div>
    </div>
    <div class="header__btns">

        <a href="../store/index.html" class="btn-custome btn-custome__green" >
            <svg class="icon  header__icon ">
                <use xlink:href="../../fonts/sprite.svg#icon-home"></use>
            </svg>
        </a>

        <button class="btn-custome btn-header__dark-mode" onclick="darkModeToggleFunc()">
            <svg class="icon  header__icon ">
                <use xlink:href="../../fonts/sprite.svg#icon-sun"></use>
            </svg>
        </button>

        <button class="btn-custome btn-header__alert">
            <svg class="icon  header__icon ">
                <use xlink:href="../../fonts/sprite.svg#icon-sound"></use>
            </svg>

            <span class="header__alert-count">5</span>
        </button>

        <button class="btn-custome btn-custome__blue btn-header__log-out" onclick="logoutPanel()">
            <svg class="icon  header__icon ">
                <use xlink:href="../../fonts/sprite.svg#icon-log-out"></use>
            </svg>
            خروج از پنل
        </button>
    </div>
    
    `)
}

// load sidebar with user info
function loadSidebar() {
    let sidebarContainer = _querySelector(".sidebar")
    let infoCurrentUser = getInfoCurrentUser()

    sidebarContainer.insertAdjacentHTML('beforeend', `
    <div class="sidebar-content">
    <div class="card position-relative text-center">
        <img class="card-img-top sidebar__img-banner" src="${infoCurrentUser.imgBannerSrc}"
            alt="banner User photo">
        <div class="card-body">
            <h4 class="card-title sidebar__top-name">${infoCurrentUser.firstname + ' ' + infoCurrentUser.lastname}</h4>
            <p class="card-text sidebar__top-email" lang="en">${infoCurrentUser.email}</p>
            <ul class="list px-0">
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-type"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">نام کوچک</span>
                        <span class="list__firstname">${infoCurrentUser.firstname}</span>
                    </p>
                </li>
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-format-text-size"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">نام خانوادگی</span>
                        <span class="list__lastname">${infoCurrentUser.lastname} </span>
                    </p>
                </li>
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-wallet"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">تعداد دوره</span>
                        <span class="list__course-count">35</span>
                    </p>
                </li>
            </ul>
            <button class="btn-custome btn-custome__blue w-100">
                تغییر اطلاعات
                <svg class="icon  sidebar__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-pen"></use>
                </svg>
            </button>
        </div>

        <div class="sidebar__profile">
            <img src="${infoCurrentUser.imgProfileSrc}" alt="User photo"
                class="sidebar__img-profile">
        </div>
    </div>
</div>
    `)
}


// onload window
function laodPage() {

    let currentUser = getItemLocalStorage('current-User')
    let listUser = getItemLocalStorage('list-User')
    let currentUserMessages
    let infoCurrentUser = getInfoCurrentUser()

    if (infoCurrentUser) {
        loadHeader()
        loadSidebar()
        darkModeLoadPage()

        currentUserInfo = _.find(listUser, function (user) { return user.username == currentUser.username });
        currentUserMessages = currentUserInfo.message
        ticketId = currentUserMessages.length

        currentUserMessages.forEach(function (message) {
            message.name = currentUserInfo.firstname + ' ' + currentUserInfo.lastname
        })

        setItemLocalStorage('list-User', listUser)

    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا در دریافت اطلاعات',
            text: 'متاسفانه اطلاعات شما یافت نشد. لطفا دوباره وارد شوید',
            confirmButtonText: 'باشه'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/pages/user/login-user.html'

            }
        })
    }

}







window.addEventListener('load', laodPage)
