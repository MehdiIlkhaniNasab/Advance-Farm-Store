let listUserStr = 'list-User'
let listUser = []
let searchInput = _id('search')






// make card users and show in dom
function makeCardUser(array) {
    let usersListContainer = _querySelector('.users__list-container')
    let usersListwrapper = _querySelector('.users__list-wrapper')
    let usersListFragment = document.createDocumentFragment()
    usersListwrapper.innerHTML = ''
    array.forEach(function (user) {
        usersListwrapper.insertAdjacentHTML('beforeend',
            `
        <div class="uesrs__item">
            <div class="users__info">
                <img src="${user.imgProfileSrc}" alt="photo user" class="users__img">
                <div class="users__details">
                    <p class="users__name my-0">${user.firstname + ' ' + user.lastname} </p>
                    <p lang="en" class="users__email">${user.email}</p>
                </div>
            </div>
            <div class="users__btns">
                <button class="btn-custome btn-custome--gray" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#show-ticket-modal" onclick="makesCardAllTickets(event)">پیام ها</button>
                <button class="btn-custome btn-custome__blue" data-id="${user.id}"  onclick="showInfoUser(event)" data-bs-toggle="modal" data-bs-target="#show-info-modal">اطلاعات</button>
                <button class="btn-custome btn-custome__red" data-id="${user.id}" onclick="removeUser(event)">حذف</button>
            </div>
        </div>
        `)
        usersListFragment.appendChild(usersListwrapper)
    })
    usersListContainer.appendChild(usersListFragment)
}

// remove user from site 
function removeUser(event) {
    let targetId = event.target.dataset.id

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
            _.remove(listUser, function (user) {
                return user.id == targetId;
            });

            setItemLocalStorage(listUserStr, listUser)

            makeCardUser(listUser)
        }
    })
}

// show info user
function showInfoUser(event) {
    let targetId = event.target.dataset.id
    let targetUser = _.find(listUser, function (user) { return user.id = targetId; });

    let inputUserFirstname = _querySelector('.input-user-firstname')
    let inputUserLastname = _querySelector('.input-user-lastname')
    let inputUserUsername = _querySelector('.input-user-username')
    let inputUserEmail = _querySelector('.input-user-email')
    let inputUserPassword = _querySelector('.input-user-password')
    let inputUserProduct = _querySelector('.input-user-product')

    inputUserFirstname.value = targetUser.firstname
    inputUserLastname.value = targetUser.lastname
    inputUserUsername.value = targetUser.username
    inputUserEmail.value = targetUser.email
    inputUserPassword.value = targetUser.password
    inputUserProduct.value = targetUser.products.length

}

// search function 
function searchUser() {
    let searchValue = searchInput.value.trim()
    let targetUsersFilter = _.filter(listUser, function (user) {

        let fullname = user.firstname + ' ' + user.lastname
        return fullname.includes(searchValue) || user.email.includes(searchValue)

    });

    makeCardUser(targetUsersFilter)

}


// makes accordion box tickets
function makesCardAllTickets(event) {
    let targetUserId = event.target.dataset.id
    let targetUser = _.find(listUser, function (user) { return user.id == targetUserId; });
    let targetUserTicketsArray = targetUser.message

    let ticketBoxContainer = _querySelector('.tickets-cards-container')
    let ticketBoxWrapper = _querySelector('.tickets-cards-wrapper')
    let ticketBoxFragment = document.createDocumentFragment()
    ticketBoxWrapper.innerHTML = ''

    targetUserTicketsArray.forEach(function (message) {

        let haveAnswer = message.haveAnswer
        message.name = targetUser.firstname + ' ' + targetUser.lastname
        ticketBoxWrapper.insertAdjacentHTML('beforeend',
            `
        
            <div class="card  ">
                <div class="card-header  ticket-subject-text">
                    <svg class="icon  ticket__icon  ${(haveAnswer) ? 'check-icon' : ''}">
                        <use xlink:href="../../fonts/sprite.svg#icon-${(haveAnswer) ? 'check-circle' : 'hourglass'}"></use>
                    </svg>
                    <a class="btn" data-bs-toggle="collapse" href="#collapse${message.id}">
                        ${message.subject}
                    </a>
                </div>
                <div class="tikets-box-container">
                    <div class="ticket-box-wrapper">
                        <div id="collapse${message.id}" class="collapse show" data-bs-parent="#accordion">
                            <div class="card-body ticket-deatils-wrapper p-4">
                                <div class="alert alert-info ticket-question-text">
                                    ${message.text}
                                </div>
                                <div class="alert alert-success ticket-reply-text ${(haveAnswer) ? 'd-block' : 'd-none'} ms-5">                                          
                                        <strong>${message.name}</strong> ${message.reply}                                             
                                </div>

                                <button class="btn btn-primary btn-lg ${(haveAnswer) ? 'd-none' : 'd-block'} " data-id="${message.userId}" data-ticketid="${message.id}" onclick="visiableFormReply(event)">پاسخ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        )

        ticketBoxFragment.appendChild(ticketBoxWrapper)
    })
    ticketBoxContainer.appendChild(ticketBoxFragment)
}


// function get info message ticket for reply
function getInfoMessageTicket(event) {
    let targetUserId = event.target.dataset.id
    let targetUser = _.find(listUser, function (user) { return user.id == targetUserId; });
    let targetUserTicketsArray = targetUser.message
    console.log(targetUserId);
    return targetUserTicketsArray
}


// function visiable box reply ticket
function visiableFormReply(event) {
    let btnReply = event.target
    btnReply.classList.add('d-none')
    let targetMessageUserId = event.target.dataset.ticketid

    let targetUserMessageArray = getInfoMessageTicket(event)
    let targetMessageUser = _.find(targetUserMessageArray, function (message) { return message.id == targetMessageUserId });
    let boxReplyTicketContainer = _querySelector('.box-reply-ticket')
    boxReplyTicketContainer.classList.remove('d-none')

    boxReplyTicketContainer.insertAdjacentHTML('beforeend',
        `
        <div class="sender-tickets-details">
            <h3 class="subject-ticket">${targetMessageUser.subject}</h3>
            <p class="message-ticket">${targetMessageUser.text}</p>
        </div>
        <div class="reply-tickets-details">
            <form action="#" class="form modal__form row   mx-0" id="form-reply-ticket">
                <div class="form__box-input  col-12 px-2 my-4">
                    <textarea class="form-control form__input" name="" id="input-reply-ticket" minlength="10" maxlength="200" rows="2" placeholder="متن پیام" required=""></textarea>
                </div>

                <button type="button" class="btn btn-primary btn-lg py-3 col-2" id="btn-send-ticket" data-id="${targetMessageUser.userId}"  data-messageid="${targetMessageUser.id}" onclick="submitReplyTicket(event)" >ارسال</button>
            </form>
        </div>
    `)

}

// send message ticket to user
function sendReplyTicket(event) {
    let targetMessageId = event.target.dataset.messageid

    let inputReplyTicket = _id('input-reply-ticket')
    let targetUserMessageArray = getInfoMessageTicket(event)
    let targetMessageUser = _.find(targetUserMessageArray, function (message) { return message.id == targetMessageId });

    targetMessageUser.haveAnswer = true
    targetMessageUser.reply = inputReplyTicket.value.trim()

    setItemLocalStorage(listUserStr, listUser)
    resetAllForm()
}

// submit send message to user for ticket
function submitReplyTicket(event) {
    let isValid = checkValidInputs('form-reply-ticket')
    let boxReplyTicketContainer = _querySelector('.box-reply-ticket')

    if (isValid) {
        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'تیکت جدید با موفقیت ارسال شد',
            confirmButtonText: 'باشه'
        })
        sendReplyTicket(event)
        makesCardAllTickets(event)
        boxReplyTicketContainer.classList.add('d-none')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }

}



// onload page
function laodPageUsersAdmin() {

    listUser = getItemLocalStorage(listUserStr)

    if (!listUser) {
        listUser = []
    }
    makeCardUser(listUser)

}


// events
window.addEventListener('load', laodPageUsersAdmin)

// search event
searchInput.addEventListener('keyup', searchUser)