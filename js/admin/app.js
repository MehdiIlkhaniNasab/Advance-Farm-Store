let listAdminStr = 'list-admin'
let currentAdminStr = 'current-admin'
let chatBoxContacts = _querySelector('.chat-box-contacts')
let bodyDuc = document.body
let listProductCount



// get info current admin
function getInfoCurrentAdmin() {
    let currentAdmin = getItemLocalStorage(currentAdminStr)
    let listAdmin = getItemLocalStorage(listAdminStr)

    if (currentAdmin) {
        let infoCurrentAdmin = _.find(listAdmin, { 'username': currentAdmin.username })
        return infoCurrentAdmin
    } else {
        return false
    }

}


// dark mode toggle function 
function darkModeToggleFunc() {
    let isDark = bodyDuc.classList.toggle('dark')
    setItemLocalStorage('theme', isDark)
}

// dark mode load page
function darkModeLoadPage() {
    isDark = getItemLocalStorage('theme')


    if (isDark) {
        bodyDuc.classList.add('dark')


    } else {
        bodyDuc.classList.remove('dark')


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
            window.location.href = '/pages/admin/login-admin.html'
            removeItemLocalStorage(currentAdminStr)
            removeItemLocalStorage('theme')

        }
    })
}

// load header with admin info
function loadHeader() {
    let headerContainer = _querySelector(".header")
    let infoCurrentAdmin = getInfoCurrentAdmin()

    headerContainer.insertAdjacentHTML('beforeend', `
        <div class="header__info">
        <img src="${infoCurrentAdmin.imgProfileSrc}" alt="admin photo" class="header__img">
        <div class="header__details">
            <h4 class="header__name mb-2">${infoCurrentAdmin.firstname + ' ' + infoCurrentAdmin.lastname}</h4>
            <p class="header__email my-0" lang="en">${infoCurrentAdmin.email}</p>
        </div>
    </div>
    <div class="header__btns">



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

// load sidebar with admin info
function loadSidebar() {
    let sidebarContainer = _querySelector(".sidebar")
    let infoCurrentAdmin = getInfoCurrentAdmin()

    sidebarContainer.insertAdjacentHTML('beforeend', `
    <div class="sidebar-content">
    <div class="card position-relative text-center">
        <img class="card-img-top sidebar__img-banner" src="${infoCurrentAdmin.imgBannerSrc}"
            alt="banner admin photo">
        <div class="card-body">
            <h4 class="card-title sidebar__top-name">${infoCurrentAdmin.firstname + ' ' + infoCurrentAdmin.lastname}</h4>
            <p class="card-text sidebar__top-email" lang="en">${infoCurrentAdmin.email}</p>
            <ul class="list px-0">
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-type"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">نام کوچک</span>
                        <span class="list__firstname">${infoCurrentAdmin.firstname}</span>
                    </p>
                </li>
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-format-text-size"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">نام خانوادگی</span>
                        <span class="list__lastname">${infoCurrentAdmin.lastname} </span>
                    </p>
                </li>
                <li class="list__item">
                    <svg class="icon  sidebar__icon ">
                        <use xlink:href="../../fonts/sprite.svg#icon-wallet"></use>
                    </svg>
                    <p class="list__text mb-0">
                        <span class="">تعداد دوره</span>
                        <span class="list__course-count">${listProductCount.length}</span>
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
            <img src="${infoCurrentAdmin.imgProfileSrc}" alt="admin photo"
                class="sidebar__img-profile">
        </div>
    </div>
</div>
    `)
}

// onload window
function laodPage() {
    let infoCurrentAdmin = getInfoCurrentAdmin()
    listProductCount = getItemLocalStorage('list-products')
    if (infoCurrentAdmin) {

        if (!listProductCount) {
            listProductCount = []
        }

        loadHeader()
        loadSidebar()
        darkModeLoadPage()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا در دریافت اطلاعات',
            text: 'متاسفانه اطلاعات شما یافت نشد. لطفا دوباره وارد شوید',
            confirmButtonText: 'باشه'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/pages/admin/login-admin.html'

            }
        })
    }

}

// show contacts list of user
function showContactsList() {
    let listContact = _querySelector('.list-contact')
    listContact.classList.toggle('list-contact-visible')
}

// transform to informatin page
function goToInformationPage() {
    window.location.href = '/pages/admin/infomation-admin.html'
}

// get item from localstorge
function getItemLocalStorage(nameValue) {
    let getItem = localStorage.getItem(nameValue)
    let listLocalStorage = JSON.parse(getItem)
    return listLocalStorage;
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

chatBoxContacts.addEventListener('click', showContactsList)
window.addEventListener('load', laodPage)
