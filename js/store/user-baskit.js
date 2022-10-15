let listUser
let userBaskit
let currentUesr
let infoCurrentUser
let totalPrice = 0
let totalDiscount = 0
let btnApllyDiscount = _id('btn-aplly-discount')
let btnFinalPayment = _id('btn-final-payment')

// get user basjit array
function getUserBaskit() {

    if (infoCurrentUser) {
        userBaskit = infoCurrentUser.products
        return userBaskit
    } else {
        Swal.fire({
            icon: 'error',
            title: 'شرمنده.',
            text: 'لیست سبد خرید شما خالیست.',
            confirmButtonText: 'باشه',
            footer: '<a href="../user/shop.html"  target="_blank">محصولات سایت</a>'
        })
        return false
    }
}


// make user baskit table
function makeUserBaskitTable() {
    let userBaskit = getUserBaskit()
    let userBaskitContaainer = _querySelector('.user-baskit-contaainer')
    let userBaskitWrapper = _querySelector('.user-baskit-wrapper')
    let userBaskitFragment = document.createDocumentFragment()

    if (userBaskit) {
        userBaskitWrapper.innerHTML = ''
        userBaskit.forEach(function (product) {
            userBaskitWrapper.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="tabel__btn-remove">
                        <button class="btn-close " data-id="${product.id}" onclick="acceptRemoveProductUserBaskit(event)"></button>
                    </td>
                    <td>
                        <img src="${product.imgSrc}" alt="" class="product__img ${product.name}">
                    </td>
                    <td class="products__name">${product.name} </td>
                    <td class="products__price"> ${product.price}</td>
                    <td>
                        <input type="number" name="" id="" value="${product.count}" class="products__count" disabled>
                    </td>
                </tr>
            `)
            userBaskitFragment.appendChild(userBaskitWrapper)
        })
        userBaskitContaainer.appendChild(userBaskitFragment)
    }
}


// get target product for remove
function getTargetProduct(productId) {
    let userBaskit = getUserBaskit()
    let targetProduct = _.find(userBaskit, function (product) { return product.id == productId })
    return targetProduct
}

// remove target product from userbaskit
function removeTargetProductUserBaskit(productId) {

    let targetProduct = getTargetProduct(productId)

    _.remove(userBaskit, function (product) { return product.id == targetProduct.id })
    _.remove(listUser, function (user) { return user.id == infoCurrentUser.id })

    infoCurrentUser.products = userBaskit
    listUser.push(infoCurrentUser)

    setItemLocalStorage('list-User', listUser)
    makeUserBaskitTable()
    showDetailsPayment()
    userBaskitCount()

}

//accept for remove product from user baskit
function acceptRemoveProductUserBaskit(event) {
    let productId = event.target.dataset.id

    Swal.fire({
        icon: 'warning',
        title: 'ایا از حذف محصول از سبد خرید مطمئن هستید؟',
        text: 'در صورت تایید قادر به بازگشت نیست.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله،  حذف کن!',
        cancelButtonText: 'خیر، منصرف شدم',

    }).then((result) => {
        if (result.isConfirmed) {
            removeTargetProductUserBaskit(productId)
        }
    })
}

// get price whit discount
function getTotalDiscount() {
    let discountCode = _id('discount-code')
    let isValidCopen
    let userBaskit = getUserBaskit()
    let discountPrice
    let productDiscount = _.filter(userBaskit, function (product) { return product.haveDiscount == true })

    productDiscount.forEach(function (product) {
        isValidCopen = discountCode.value == product.copenCode
        discountPrice = (product.price * (product.valueDiscount / 100)) * product.count
        if (isValidCopen) {
            totalDiscount += discountPrice

        } else {
            totalDiscount = 0
        }

    })

    return totalDiscount
}

// get total price product
function getTotalPrice() {
    let userBaskit = getUserBaskit()
    userBaskit.forEach(function (product) {
        totalPrice += (product.price * product.count)
    })

    return totalPrice
}

// calculation of payment price
function calcPaymentPrice() {
    let totalPriceProucts = getTotalPrice()
    let totalDiscountProducts = getTotalDiscount()
    let totalPaymentPrice = totalPriceProucts - totalDiscountProducts

    let paymentDetails = {
        totalPrice: totalPriceProucts,
        totalDiscount: totalDiscountProducts,
        totalPayment: totalPaymentPrice
    }

    return paymentDetails
}

// show details payment in table
function showDetailsPayment() {
    totalPrice = 0
    totalDiscount = 0
    let paymentWrapper = _querySelector('.payment-wrapper')
    let billUser = calcPaymentPrice()
    paymentWrapper.innerHTML = ''
    paymentWrapper.insertAdjacentHTML('beforeend',
        `
        <tr>
            <td class="products__discount">تخفیف</td>
            <td class="products__discount-value">${billUser.totalDiscount}</td>
        </tr>
        <tr>
            <td class="products__total">کل</td>
            <td class="products__total-value">${billUser.totalPrice}</td>

        </tr>
        <tr>
            <td class="products__pay">قابل پرداخت</td>
            <td class="products__pay-value">${billUser.totalPayment}</td>
        </tr>
    `)
}


function goToCheckOutPage() {
    let codeOrder = _.random(4000, 5000)
    Swal.fire({
        icon: 'warning',
        title: 'ایا از پرداخت   مطمئن هستید؟',
        text: 'در صورت تایید قادر به بازگشت نیست.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله،  حذف کن!',
        cancelButtonText: 'خیر، منصرف شدم',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'موفقیت',
                text: `شماره پیگیری ${codeOrder}`,
                showConfirmButton: true,
                confirmButtonText: 'باشه',
            }).then((result) => {
                if (result.isConfirmed) {
                    emptyUserBaskit()
                }
            })
        }
    })

}

// empty userbaskit
function emptyUserBaskit() {
    let userBaskit = infoCurrentUser.products
    userBaskit = []
    infoCurrentUser.products = userBaskit
    _.remove(listUser, function (user) { return user.id == infoCurrentUser.id })
    listUser.push(infoCurrentUser)
    setItemLocalStorage('list-User', listUser)
    window.location.href = 'index.html'
}





// load page user baskit
function loadBaskitPage() {
    listUser = getItemLocalStorage('list-User')
    currentUesr = getItemLocalStorage('current-User')

    if (currentUesr) {
        infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUesr.username })
    }
    makeUserBaskitTable()
    showDetailsPayment()
}


// aplly discount for user product event
btnApllyDiscount.addEventListener('click', showDetailsPayment)


//event final payment
btnFinalPayment.addEventListener('click', goToCheckOutPage)

window.addEventListener('load', loadBaskitPage)