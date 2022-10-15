let listTeam = []
let listTeamStr = 'list-team'
let formInputImgMemeber = _querySelector('.form__input-img-memeber')
let formEditInfoInputImgMemeber = _querySelector('.form-edit-info__input-img-memeber')
let btnAddNewMemberTeam = _querySelector('.btn-add-new-member-team')
let btnEditInfoMemberTeam = _querySelector('.btn-edit-info-member-team')
let idMember = 0



// function get info new member team
function getInfoNewMemberTeam() {

    let formInputNameMemeber = _querySelector('.form__input-name-memeber')
    let formInputRoleMemeber = _querySelector('.form__input-role-memeber')
    let formInputShortDescMemeber = _querySelector('.form__input-shortDesc-memeber')
    let formInputNameMemeberValue = formInputNameMemeber.value
    let formInputRoleMemeberValue = formInputRoleMemeber.value
    let formInputShortDescMemeberValue = formInputShortDescMemeber.value

    let profileImgMemberTeamSrc = getItemLocalStorage('profileImgMemberTeamSrc')



    let infoNewMemberTeam = {
        id: idMember,
        name: formInputNameMemeberValue,
        role: formInputRoleMemeberValue,
        imgSrc: profileImgMemberTeamSrc,
        shortDesc: formInputShortDescMemeberValue,
    }
    idMember++
    return infoNewMemberTeam
}


// add new member team to array
function addNewMemberTeamToArray() {

    let infoNewMemberTeam = getInfoNewMemberTeam()

    listTeam.push(infoNewMemberTeam)
    setItemLocalStorage(listTeamStr, listTeam)
    makeCardListTeam(listTeam)
    removeItemLocalStorage('profileImgMemberTeamSrc')
}

// add new member to team
function addNewMemberToTeam() {
    let formNewMemberTeam = _querySelector(".form-new-member-team")
    let isValid = checkValidInputs('form-new-member-team')
    let btnAddNewMemberTeam = _querySelector('.btn-add-new-member-team')

    if (isValid) {
        addNewMemberTeamToArray()
        resetFormInputs(formNewMemberTeam)
    } else {
        btnAddNewMemberTeam.removeAttribute('data-bs-dismiss', 'modal')

        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}



// function get info current admin
function getNewInfoCurrentAdmin() {
    let formCurrentInfo = _querySelector('.form_current-Info')
    let infoCurrentAdmin = getInfoCurrentAdmin()

    let imgProfileSrc = getItemLocalStorage('profileImgSrc')
    let imgBannerSrc = getItemLocalStorage('bannerImgSrc')

    let formInputAdminFirstname = _querySelector('.form__input-admin-firstname')
    let formInputAdminLastname = _querySelector('.form__input-admin-lastname')
    let formInputAdminUsername = _querySelector('.form__input-admin-username')
    let formInputAdminEmail = _querySelector('.form__input-admin-email')
    let formInputAdminCurrentPassword = _querySelector('.form__input-admin-current-password')
    let formInputAdminNewPassword = _querySelector('.form__input-admin-new-password')
    let formInputAdminRepeatPassword = _querySelector('.form__input-admin-repeat-password')



    let isMatchPasswordNew = formInputAdminNewPassword.value == formInputAdminRepeatPassword.value
    let isMatvhPasswordOld = formInputAdminCurrentPassword.value == infoCurrentAdmin.password

    if (!imgProfileSrc && !imgBannerSrc) {
        imgProfileSrc = '../../img/admin/profile/banana.png'
        imgBannerSrc = '../../img/admin/banner/banner.png'
    } else if (!imgProfileSrc) {
        imgProfileSrc = '../../img/admin/profile/banana.png'

    } else if (!imgBannerSrc) {
        imgBannerSrc = '../../img/admin/banner/banner.png'
    }

    if (isMatchPasswordNew && isMatvhPasswordOld) {

        let newInfoCurrentAdmin = {
            firstname: formInputAdminFirstname.value,
            lastname: formInputAdminLastname.value,
            username: formInputAdminUsername.value,
            email: formInputAdminEmail.value,
            password: formInputAdminNewPassword.value,
            imgProfileSrc: imgProfileSrc,
            imgBannerSrc: imgBannerSrc,
        }

        resetFormInputs(formCurrentInfo)
        console.log(newInfoCurrentAdmin);
        return newInfoCurrentAdmin

    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا در اطلاعات ',
            text: 'لطفا در وارد کردن پسورد ها. لطفا دوباره تلاش کنید!',
            confirmButtonText: 'باشه'
        })
    }


}

// update info current admin
function updateInfoCurrentAdmin(event) {
    event.preventDefault()

    let newInfoCurrentAdmin = getNewInfoCurrentAdmin()
    let infoCurrentAdmin = getInfoCurrentAdmin()
    let listAdmin = getItemLocalStorage(listAdminStr)


    _.remove(listAdmin, function (admin) {
        return admin.username == infoCurrentAdmin.username;
    });

    listAdmin.push(newInfoCurrentAdmin)

    setItemLocalStorage(listAdminStr, listAdmin)

    Swal.fire({
        title: 'موفقیت',
        text: "برای ثبت اطلاعات دوباره وارد پنل شوید",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'باشه',

    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/pages/admin/login-admin.html'
            removeItemLocalStorage(currentAdminStr)
        }
    })

}

// submit new info current admin
function submitNewInfoCurrentAdmin(event) {
    let isValid = checkValidInputs('form_current-Info')

    if (isValid) {

        updateInfoCurrentAdmin(event)

        Swal.fire({
            title: 'موفقیت',
            text: "برای ثبت اطلاعات دوباره وارد پنل شوید",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'باشه',

        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/pages/admin/login-admin.html'
                removeItemLocalStorage(currentAdminStr)
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

// fill information current admin form
function fillInforCurentAdmin() {
    let infoCurrentAdmin = getInfoCurrentAdmin()

    let informationCurrentAdminWrapperForm = _querySelector('.information-current-admin-wrapper-form')
    informationCurrentAdminWrapperForm.insertAdjacentHTML('beforeend', `
            <form action="#" class="form form_current-Info row  mx-0" id="form_current-Info">
            <div class="form__box-input  col-6 px-2">
                <svg class="icon  form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-diamond"></use>
                </svg>
                <input type="text" name="" value="${infoCurrentAdmin.firstname}" id="firstname" placeholder="نام "
                    class="form-control form__input form__input-admin-firstname   " minlength="3" maxlength="18" required>
                <label for="firstname" class="form__label my-0" >نام </label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon  form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-t-shirt"></use>
                </svg>
                <input type="text" name="" value="${infoCurrentAdmin.lastname}" id="lastname" placeholder="نام خانوادگی"
                    class="form-control form__input form__input-admin-lastname   " minlength="3" maxlength="18" required>
                <label for="lastname" class="form__label my-0">نام خانوادگی</label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon icon-user-admin form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-user-admin"></use>
                </svg>
                <input lang="en" type="text" name="" value="${infoCurrentAdmin.username}" id="username"
                    placeholder="نام کاربری" class="form-control form__input form__input-admin-username   "
                    required minlength="8" maxlength="18">
                <label for="username" class="form__label my-0">نام کاربری</label>
            </div>

            <div class="form__box-input  col-6 px-2">
                <svg class="icon icon-user-admin form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-world"></use>
                </svg>
                <input lang="en" type="email" name="" value="${infoCurrentAdmin.email}" id="email"
                    placeholder="email " class="form-control form__input form__input-admin-email   "
                    required>
                <label for="email" class="form__label my-0" lang="en">email </label>
            </div>

            <div class="form__box-input  col-4 px-2 ">
                <svg class="icon icon-key form__icon ">
                    <use xlink:href="../../fonts/sprite.svg#icon-key"></use>
                </svg>
                <input type="password" name="" id="password" placeholder="رمز جاری"
                    class="form-control form__input form__input-admin-current-password" minlength="8" maxlength="18" required>
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
                    class="form-control form__input form__input-admin-new-password   " minlength="8" maxlength="18" required>
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
                    class="form-control form__input form__input-admin-repeat-password   " minlength="8" maxlength="18" required>
                <label for="password" class="form__label my-0">تکرار رمز </label>
                <svg class="icon icon-eye form__icon form__icon-password">
                    <use xlink:href="../../fonts/sprite.svg#icon-eye"></use>
                </svg>
            </div>

            <div class="change-profile-box px-0 d-flex gap-4 mb-4">

                <div class="change-profile-input-box">
                    <img src="${infoCurrentAdmin.imgProfileSrc}"
                        class="change-profile-pic" alt="">
                    <label for="upload-profile-input"
                        class="upload-profile-input-label">
                        <input type="file" id="upload-profile-input" onchange="saveSrcImageProfileAdmin(event)" name="">
                    </label>
                </div>


                <div class="change-banner-input-box">
                    <img src="${infoCurrentAdmin.imgBannerSrc}"
                        class="change-banner-pic" alt="">
                    <label for="upload-banner-input"
                        class="upload-banner-input-label">
                        <input type="file" id="upload-banner-input"  onchange="saveSrcImageBannerAdmin(event)" name="">
                    </label>
                </div>
            </div>

            <button type="button" class="btn-custome btn-custome__blue col-6  mb-3" onclick="submitNewInfoCurrentAdmin(event)">اپدیت
                اطلاعات
            </button>
        </form>
    `)

}

// save img profile new member src uploded
let saveSrcImageProfileMemberTeam = function (event) {
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        setItemLocalStorage('profileImgMemberTeamSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};

// save img profile src uploded
let saveSrcImageProfileAdmin = function (event) {
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
let saveSrcImageBannerAdmin = function (event) {
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

// make card list team 
function makeCardListTeam(array) {

    let infromationTeamContainer = _querySelector('.infromation-team-container')
    let infromationTeamCards = _querySelector('.infromation-team-cards')
    let infoNewMemberTeamFragment = document.createDocumentFragment()
    infromationTeamCards.innerHTML = ''
    array.forEach(function (member) {
        infromationTeamCards.insertAdjacentHTML('beforeend', `
        <div class="card col-4 information__team-card p-2">
            <img class="card-img-top information__admin-img"
                src="${member.imgSrc}" alt="admin photo">
            <div class="card-body d-flex flex-column justify-content-between p-4">
                <div class="d-flex flex-column justify-content-between align-items-start mb-4">
                    <h4 class="card-title information__admin-name my-2"> ${member.name}
                    </h4>
                    <p class="card-text information__admin-role my-2">${member.role}</p>
                </div>
                <div class="mt-4 d-flex justify-content-end gap-2">
                <button class="btn btn-lg btn-info" data-id='${member.id}' data-bs-toggle="modal" data-bs-target="#show-info-member" onclick=showInfoMemberTeam(event)> اطلاعات</button>
                <button class="btn btn-lg btn-danger" data-id='${member.id}' onclick="removeMemberTeam(event)" >حذف</button>
                    <button class="btn btn-lg btn-primary" data-id='${member.id}' data-bs-toggle="modal" data-bs-target="#edit-info-member" onclick="editInfoMemberTeam(event)">ویرایش</button>
                </div>
            </div>
        </div>
        `)
        infoNewMemberTeamFragment.appendChild(infromationTeamCards)
    })
    infromationTeamContainer.appendChild(infoNewMemberTeamFragment)

}

// show info the member of team
function showInfoMemberTeam(event) {
    let targetId = event.target.dataset.id
    let listTeam = getItemLocalStorage(listTeamStr)
    let formInfoInputNameMemeber = _querySelector('.form-info__input-name-memeber')
    let formInfoInputRoleMemeber = _querySelector('.form-info__input-role-memeber')
    let formInfoInputShortDescMemeber = _querySelector('.form-info__input-shortDesc-memeber')


    let targetMember = _.find(listTeam, function (member) { return member.id == targetId; });

    formInfoInputNameMemeber.value = targetMember.name
    formInfoInputRoleMemeber.value = targetMember.role
    formInfoInputShortDescMemeber.value = targetMember.shortDesc


}


// edit info the member of team
function editInfoMemberTeam(event) {
    let targetId = event.target.dataset.id
    let listTeam = getItemLocalStorage(listTeamStr)
    let formEditInfoInputNameMemeber = _querySelector('.form-edit-info__input-name-memeber')
    let formEditInfoInputRoleMemeber = _querySelector('.form-edit-info__input-role-memeber')
    let formEditInfoInputShortDescMemeber = _querySelector('.form-edit-info__input-shortDesc-memeber')


    let targetMember = _.find(listTeam, function (member) { return member.id == targetId; });

    formEditInfoInputNameMemeber.value = targetMember.name
    formEditInfoInputRoleMemeber.value = targetMember.role
    formEditInfoInputShortDescMemeber.value = targetMember.shortDesc

    btnEditInfoMemberTeam.setAttribute('data-id', `${targetId}`)
}


// // function new info of member team
function getNewInfoMemberTeam(id) {

    let formEditInfoInputNameMemeber = _querySelector('.form-edit-info__input-name-memeber')
    let formEditInfoInputRoleMemeber = _querySelector('.form-edit-info__input-role-memeber')
    let formEditInfoInputShortDescMemeber = _querySelector('.form-edit-info__input-shortDesc-memeber')
    let formEditInfoInputNameMemeberValue = formEditInfoInputNameMemeber.value
    let formEditInfoInputRoleMemeberValue = formEditInfoInputRoleMemeber.value
    let formEditInfoInputShortDescMemeberValue = formEditInfoInputShortDescMemeber.value

    let profileImgMemberTeamSrc = getItemLocalStorage('profileImgMemberTeamSrc')



    let newInfoMemberTeam = {
        id: id,
        name: formEditInfoInputNameMemeberValue,
        role: formEditInfoInputRoleMemeberValue,
        imgSrc: profileImgMemberTeamSrc,
        shortDesc: formEditInfoInputShortDescMemeberValue,
    }
    idMember++
    return newInfoMemberTeam
}

//save list team TO arrey
function saveListTeamArray(event) {
    let targetId = event.target.dataset.id
    listTeam = getItemLocalStorage(listTeamStr)
    let newInfoMember = getNewInfoMemberTeam(targetId)

    _.remove(listTeam, function (member) {
        return member.id == targetId;
    });

    listTeam.push(newInfoMember)
    setItemLocalStorage(listTeamStr, listTeam)
    removeItemLocalStorage('profileImgMemberTeamSrc')
}

//update list team  arrey
function updateListTeamArray(event) {
    let modalEditInfoMemer = _id('edit-info-member');
    let modal = bootstrap.Modal.getInstance(modalEditInfoMemer)
    let formNewInfoMemberTeam = _querySelector(".form-new-info-member-team")
    let isValid = checkValidInputs('form-new-info-member-team')
    listTeam = getItemLocalStorage(listTeamStr)


    if (isValid) {
        saveListTeamArray(event)
        makeCardListTeam(listTeam)
        resetFormInputs(formNewInfoMemberTeam)
        modal.hide();

    } else {
        btnEditInfoMemberTeam.removeAttribute('data-bs-dismiss', 'modal')

        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }

}


// remove member from team
function removeMemberTeam(event) {
    let targetId = event.target.dataset.id
    listTeam = getItemLocalStorage(listTeamStr)

    Swal.fire({
        icon: 'warning',
        title: 'ایا از حذف کاربر مورد نظر مطمئن هستید؟',
        text: 'در صورت تایید قادر به بازگشت نیست.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله،  حذف کن!',
        cancelButtonText: 'خیر، منصرف شدم',

    }).then((result) => {
        if (result.isConfirmed) {
            listTeam = _.filter(listTeam, function (member) {
                return member.id != targetId;
            });

            setItemLocalStorage(listTeamStr, listTeam)
            makeCardListTeam(listTeam)
            idMember = getIndexLastIdTeam() + 1
        }
    })
}



// get id last of member
function getIndexLastIdTeam() {
    let lengthListTeam = listTeam.length
    let lastTeam = listTeam[lengthListTeam - 1]

    if (lastTeam) {
        return lastTeam.id
    } else {
        return 0
    }

}

// onload page
function laodPageUsersAdmin() {
    fillInforCurentAdmin()
    listTeam = getItemLocalStorage(listTeamStr)
    if (!listTeam) {
        listTeam = []
    }

    idMember = getIndexLastIdTeam() + 1

    makeCardListTeam(listTeam)
}




// events
window.addEventListener('load', laodPageUsersAdmin)

// change input file new member team
formInputImgMemeber.addEventListener('change', saveSrcImageProfileMemberTeam)
formEditInfoInputImgMemeber.addEventListener('change', saveSrcImageProfileMemberTeam)

// add new member to team event
btnAddNewMemberTeam.addEventListener('click', addNewMemberToTeam)

btnEditInfoMemberTeam.addEventListener('click', updateListTeamArray)