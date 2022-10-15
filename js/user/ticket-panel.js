let listUser = 'list-User'
let btnSendTicket = _id('btn-send-ticket')
let ticketId = 0
let currentUserInfo 
let inputTicketSubject = _id('input-ticket-subject')
let inputMessageTicket = _id('input-message-ticket')

// get info messgage ticket
function getInfoMessageTicket() {




    let messageTicket = {
        userId: currentUserInfo.id,
        id: ticketId,
        name: currentUserInfo.firstname + ' ' + currentUserInfo.lastname,
        uesrname: currentUserInfo.username,
        subject: inputTicketSubject.value.trim(),
        text: inputMessageTicket.value.trim(),
        reply: 'پیام شما در حال بررسی میباشد. پس از بررسی لازم نتیجه به شما اعلام خواهد شد',
        haveAnswer: false,
    }

    ticketId++

    return messageTicket
}


// save info message ticket in array of user
function saveInfoTicketInUserArray() {
    let messageTicket = getInfoMessageTicket()
    let listUser = getItemLocalStorage('list-User')
    let targetUser = _.find(listUser, function (user) { return user.id == messageTicket.userId });

    _.remove(listUser, function (user) { return user.id == targetUser.id });

    let messageUserArray = targetUser.message
    messageUserArray.push(messageTicket)
    targetUser.message = messageUserArray
    listUser.push(targetUser)
    setItemLocalStorage('list-User', listUser)
    makeCardsReplyTicket(targetUser)
    resetAllForm()
    
}

//send ticket
function sendTicket(){
    let isValid = checkValidInputs('form-send-ticket')
    let inputsValue = inputMessageTicket.value.trim() != '' || inputTicketSubject.value.trim() != ''

    if(isValid && inputsValue){
        saveInfoTicketInUserArray()
        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'تیکت جدید با موفقیت ارسال شد',
            confirmButtonText: 'باشه'
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}

// make cards reply tickets
function makeCardsReplyTicket(currentUser) {

    
    let messageTicket = currentUser.message
    let ticketsCardsContainer = _querySelector('.tickets-cards-container')
    let ticketsCardsWrapper = _querySelector('.tickets-cards-wrapper')
    let ticketCardsFragment = document.createDocumentFragment()



    ticketsCardsWrapper.innerHTML = ''
    messageTicket.forEach(function(message){
        
        let messageReply = message.haveAnswer == true

        ticketsCardsWrapper.insertAdjacentHTML('beforeend',`
        <div class="card  ">
                <div class="card-header  ticket-subject-text">
                        <svg class="icon  ticket__icon ${(messageReply) ? 'check-icon' : ''} ">
                                <use xlink:href="../../fonts/sprite.svg#icon-${(messageReply) ? 'check-circle' : 'hourglass'}"></use>
                        </svg>
                         <a class="btn" data-bs-toggle="collapse" href="#collapse${message.id}">
                           ${message.subject}
                        </a>
                </div>
                <div id="collapse${message.id}" class="collapse " data-bs-parent="#accordion">
                        <div class="card-body ticket-reply-text p-4">
                                                
                            <div class="alert alert-${(messageReply) ? 'success' : 'info'}">
                                    <strong>${message.name} !</strong>  ${message.reply}
                            </div>

                         </div>
                 </div>
         </div>
        
        `)
        ticketCardsFragment.appendChild(ticketsCardsWrapper)
    })

    ticketsCardsContainer.appendChild(ticketCardsFragment)
   
}

// fun load page ticket
function loadPageTicket(){

    

    makeCardsReplyTicket(currentUserInfo)
  
    

}

btnSendTicket.addEventListener('click', sendTicket)


window.addEventListener('load', loadPageTicket)