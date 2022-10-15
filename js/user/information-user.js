
// function get info current User
function getNewInfoCurrentUser() {
    let formCurrentInfo = _querySelector('.form_current-Info')
    let infoCurrentUser = getInfoCurrentUser()

    let imgProfileSrc = getItemLocalStorage('profileImgSrc')
    let imgBannerSrc = getItemLocalStorage('bannerImgSrc')

    let formInputUserFirstname = _querySelector('.form__input-user-firstname')
    let formInputUserLastname = _querySelector('.form__input-user-lastname')
    let formInputUserUsername = _querySelector('.form__input-user-username')
    let formInputUserEmail = _querySelector('.form__input-user-email')
    let formInputUserCurrentPassword = _querySelector('.form__input-user-current-password')
    let formInputUserNewPassword = _querySelector('.form__input-user-new-password')
    let formInputUserRepeatPassword = _querySelector('.form__input-user-repeat-password')



    let isMatchPasswordNew = formInputUserNewPassword.value == formInputUserRepeatPassword.value
    let isMatvhPasswordOld = formInputUserCurrentPassword.value == infoCurrentUser.password

    if (!imgProfileSrc && !imgBannerSrc) {
        imgProfileSrc = '../../img/admin/profile/banana.png'
        imgBannerSrc = '../../img/admin/banner/banner.png'
    } else if (!imgProfileSrc) {
        imgProfileSrc = '../../img/admin/profile/banana.png'

    } else if (!imgBannerSrc) {
        imgBannerSrc = '../../img/admin/banner/banner.png'
    }

    if (isMatchPasswordNew && isMatvhPasswordOld) {

        let newInfoCurrentUser = {
            id: infoCurrentUser.id,
            firstname: formInputUserFirstname.value,
            lastname: formInputUserLastname.value,
            username: formInputUserUsername.value,
            email: formInputUserEmail.value,
            password: formInputUserNewPassword.value,
            imgProfileSrc: imgProfileSrc,
            imgBannerSrc: imgBannerSrc,
            message:infoCurrentUser.message,
            products: infoCurrentUser.products

        }

        resetFormInputs(formCurrentInfo)
        console.log(newInfoCurrentUser);
        return newInfoCurrentUser

    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا در اطلاعات ',
            text: 'لطفا در وارد کردن پسورد ها. لطفا دوباره تلاش کنید!',
            confirmButtonText: 'باشه'
        })
    }


}

// update info current User
function updateInfoCurrentUser(event) {
    event.preventDefault()

    let newInfoCurrentUser = getNewInfoCurrentUser()
    let infoCurrentUser = getInfoCurrentUser()
    let listUser = getItemLocalStorage(listUserStr)


    _.remove(listUser, function (user) {
        return user.username == infoCurrentUser.username;
    });

    listUser.push(newInfoCurrentUser)

    setItemLocalStorage(listUserStr, listUser)

    Swal.fire({
        title: 'موفقیت',
        text: "برای ثبت اطلاعات دوباره وارد پنل شوید",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'باشه',

    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/pages/admin/login-admin.html'
            removeItemLocalStorage(currentUserStr)
        }
    })

}

// submit new info current User
function submitNewInfoCurrentUser(event) {
    let isValid = checkValidInputs('form_current-Info')

    if (isValid) {

        updateInfoCurrentUser(event)

        Swal.fire({
            title: 'موفقیت',
            text: "برای ثبت اطلاعات دوباره وارد پنل شوید",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'باشه',

        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/pages/user/login-user.html'
                removeItemLocalStorage(currentUserStr)
                removeItemLocalStorage('profileImgSrc')
                removeItemLocalStorage('bannerImgSrc')
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا در اطلاعات ',
            text: 'لطفا تمام فیلد ها را پر کنید !',
            confirmButtonText: 'باشه'
        })
    }
}

// fill information current User form
function fillInforCurentUser() {
    let infoCurrentUser = getInfoCurrentUser()

    let informationCurrentAdminWrapperForm = _querySelector('.information-current-user-wrapper-form')
    informationCurrentAdminWrapperForm.insertAdjacentHTML('beforeend', `
            <form action="#" class="form form_current-Info row  mx-0" id="form_current-Info">
            <div class="form__box-input  col-6 px-2">
                <svg class="icon  form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-diamond"></use>
                </svg>
                <input type="text" name="" value="${infoCurrentUser.firstname}" id="firstname" placeholder="نام "
                    class="form-control form__input form__input-user-firstname   " required>
                <label for="firstname" class="form__label my-0" minlength="3" maxlength="18">نام </label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon  form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-t-shirt"></use>
                </svg>
                <input type="text" name="" value="${infoCurrentUser.lastname}" id="lastname" placeholder="نام خانوادگی"
                    class="form-control form__input form__input-user-lastname   " required>
                <label for="lastname" class="form__label my-0" minlength="3" maxlength="18">نام خانوادگی</label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon icon-user-admin form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-user-admin"></use>
                </svg>
                <input lang="en" type="text" name="" value="${infoCurrentUser.username}" id="username"
                    placeholder="نام کاربری" class="form-control form__input  form__input-user-username  "
                    required minlength="8" maxlength="18">
                <label for="username" class="form__label my-0">نام کاربری</label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon icon-user-admin form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-world"></use>
                </svg>
                <input lang="en" type="email" name="" value="${infoCurrentUser.email}" id="email"
                    placeholder="email " class="form-control form__input form__input-user-email   "
                    required>
                <label for="email" class="form__label my-0" lang="en">email </label>
            </div>

            <div class="form__box-input  col-4 px-2 ">
                <svg class="icon icon-key form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-key"></use>
                </svg>
                <input type="password" name="" id="password" placeholder="رمز جاری"
                    class="form-control form__input form__input-user-current-password" minlength="8" maxlength="18" required>
                <label for="password" class="form__label my-0"> رمز جاری</label>
                <svg class="icon icon-eye form__icon form__icon-password">
                    <use xlink:href="../../fonts/sprite.svg#icon-eye"></use>
                </svg>
            </div>
            <div class="form__box-input  col-4 px-2 ">
                <svg class="icon icon-key form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-key"></use>
                </svg>
                <input type="password" name="" id="password" placeholder="رمز  جدید"
                    class="form-control form__input form__input-user-new-password   " minlength="8" maxlength="18" required>
                <label for="password" class="form__label my-0">رمز جدید </label>
                <svg class="icon icon-eye form__icon form__icon-password">
                    <use xlink:href="../../fonts/sprite.svg#icon-eye"></use>
                </svg>
            </div>
            <div class="form__box-input  col-4 px-2 ">
                <svg class="icon icon-key form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-key"></use>
                </svg>
                <input type="password" name="" id="password" placeholder="تکرار رمز"
                    class="form-control form__input form__input-user-repeat-password   " minlength="8" maxlength="18" required>
                <label for="password" class="form__label my-0">تکرار رمز </label>
                <svg class="icon icon-eye form__icon form__icon-password">
                    <use xlink:href="../../fonts/sprite.svg#icon-eye"></use>
                </svg>
            </div>

            <div class="change-profile-box px-0 d-flex gap-4 mb-4">

                <div class="change-profile-input-box">
                    <img src="${infoCurrentUser.imgProfileSrc}"
                        class="change-profile-pic" alt="">
                    <label for="upload-profile-input"
                        class="upload-profile-input-label">
                        <input type="file" id="upload-profile-input" onchange="saveSrcImageProfileUser(event)" name="">
                    </label>
                </div>


                <div class="change-banner-input-box">
                    <img src="${infoCurrentUser.imgBannerSrc}"
                        class="change-banner-pic" alt="">
                    <label for="upload-banner-input"
                        class="upload-banner-input-label">
                        <input type="file" id="upload-banner-input"  onchange="saveSrcImageBannerUser(event)" name="">
                    </label>
                </div>
            </div>

            <button type="button" class="btn-custome btn-custome__blue col-6  mb-3" onclick="submitNewInfoCurrentUser(event)">اپدیت
                اطلاعات
            </button>
        </form>
    `)

}


// save img profile src uploded
let saveSrcImageProfileUser = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        let profileImgage = _querySelector('.change-profile-pic');
        profileImgage.src = dataURL;
        setItemLocalStorage('profileImgSrc', dataURL)

    };
    reader.readAsDataURL(input.files[0]);
};

// save img profile src uploded
let saveSrcImageBannerUser = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        let profileImgage = _querySelector('.change-banner-pic');
        profileImgage.src = dataURL;
        setItemLocalStorage('bannerImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};




// onload page
function laodPageUsers() {
    fillInforCurentUser()
}

// events
window.addEventListener('load', laodPageUsers)

