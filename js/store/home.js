let currentUser
let infoCurrentUser
let listUser
let listProduct
let isLogin
let listTeam
let userBaskit
let count

// make card top products 
function makeCardProducts() {
    let productsContainer = _querySelector('.products-container')
    let productsWrapper = _querySelector('.products-wrapper')
    let productsFragment = document.createDocumentFragment()
    let listProducts = getItemLocalStorage('list-products')
    let lastSexProducts = _.slice(listProducts, -6)

    productsWrapper.innerHTML = ''
    lastSexProducts.forEach(function (product) {
        productsWrapper.insertAdjacentHTML('afterbegin',
            `
            <div class="col-8 col-sm-5 col-lg-4 mb-4">
                <div class="cards__item  ">
                    <img src="${product.imgSrc}" alt="Strawberry" class="cards__img">
                    <h4 class="cards__name">${product.name} </h4>
                    <p class="prducts__units">
                        <span class="cards__every-text">هر</span>
                        <span class="peoducts__per-unit">${product.unit}</span>
                    </p>
                    <h3 class="cards__price">${product.price}</h3>
                    <div class="btns d-flex gap-2">
                        <a  href="single-products.html?id=${product.id}"  data-id="${product.id}" class="text-decoration-none btn-custome btn-custome-orange px-4" ">
                           
                            مشاهده محصول
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-wallet"></use>
                            </svg>
                        </a ">
                        <button   data-id="${product.id}" class="text-decoration-none btn-custome btn-custome-secondry  px-4" onclick="checkLoginUser(event)">
                        افزودن به سبد
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-basket"></use>
                            </svg>
                        </button ">
                    </div>
                </div>
            </div>
        
        `)
        productsFragment.appendChild(productsWrapper)
    })
    productsContainer.appendChild(productsFragment)

    productsContainer.insertAdjacentHTML('beforeend', `
        <a href="shop.html" class="btn-custome btn-custome-orange text-decoration-none mx-auto cards__btn-custome col-8 col-sm-5 col-lg-3">همه
         محصولات
        </a>
    `)
}

// make our team info
function makeOurTeamInfo() {

    let ourTeamSliderWrapper = _querySelector('.our-team__slider-wrapper')


    ourTeamSliderWrapper.innerHTML = ''
    listTeam.forEach(function (member) {
        ourTeamSliderWrapper.insertAdjacentHTML('beforeend',
            `   
        <div class="swiper-slide our-team__slide">
                <img src="${member.imgSrc}" alt="admin ${member.id}" class="our-team__img">
                <h4 class="our-team__name">${member.name}</h4>
                <p class="our-team__role">${member.role}</p>
                <p class="our-team__description">
                ${member.shortDesc}
                </p>
                <p class="our-team__quo-icon">&rdquo;</p>
        </div>
        `)
    })
}

// make card article
function makeCardArticle() {

    let ArticleContainer = _querySelector('.article-container')
    let ArticleWrapper = _querySelector('.article-wrapper')
    let ArticleFragment = document.createDocumentFragment()
    let listArticle = getItemLocalStorage('list-article')
    let lastSexArticle = _.slice(listArticle, -3)

    ArticleWrapper.innerHTML = ''
    lastSexArticle.forEach(function (article) {
        ArticleWrapper.insertAdjacentHTML('afterbegin',
            `
            <div class="col-8 col-sm-5 col-lg-4 mb-5 mb-lg-0 px-2">
                <div class="cards__item news__item   ">
                    <img src="${article.imgSrc}" alt="Strawberry" class="cards__img">
                    <h4 class="cards__title px-4 my-0">${article.name}"</h4>
                    <p class="cards__admin-date px-4 my-0">
                        <span class="cards__admin-name">
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-user"></use>
                            </svg>
                            ${article.author}
                        </span>
                        <span class="cards__date">
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-calendar"></use>
                            </svg>
                            ${article.date}
                        </span>
                    </p>
                    <p class="cards__short-desc px-4">${article.shortDesc}</p>
                    <a href="single-news.html?id=${article.id}" class="cards__link px-4" data-id="${article.id}"> مشاهده خبر  &larr;</a>
                </div>
            </div>
        
        `)
        ArticleFragment.appendChild(ArticleWrapper)
    })
    ArticleContainer.appendChild(ArticleFragment)

    ArticleContainer.insertAdjacentHTML('beforeend', `
    <a  href="article.html"  class="btn-custome text-decoration-none btn-custome-orange mx-auto cards__btn-custome col-8 col-sm-7 col-lg-4">خبر های بیشتر
    </a>
    `)
}

// check the user is login or not
function checkLoginUser(event) {
    let productId = event.target.dataset.id

    if (isLogin) {
        isExistInBaskit(productId)
        userBaskitCount()

        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'محصول مورد نظر با موفقیت به سبد خرید شما اضافه شد',
            confirmButtonText: 'باشه',
        })

    } else {
        Swal.fire({
            icon: 'error',
            title: 'شرمنده.',
            text: 'برای افزودن به سبد خرید ابتدا از طریق لینک زیر وارد سایت شوید',
            confirmButtonText: 'باشه',
            footer: '<a href="../user/register-user.html"  target="_blank">ثبت نام</a>'
        })
    }
}

// add target product to user baskit
function addProductToUserBaskit(targetProduct, infoCurrentUser, userBaskit) {
    userBaskit.push(targetProduct)
    _.remove(listUser, function (user) { return user.username == currentUser.username })
    listUser.push(infoCurrentUser)
    setItemLocalStorage('list-User', listUser)

}

// the product isExist in user baskit or not
function isExistInBaskit(productId) {

    let targetProduct = _.find(listProduct, function (product) { return product.id == productId })

    let isExist = _.some(userBaskit, function (product) {
        targetProduct.count = product.count
        return product.id == targetProduct.id
    })


    if (isExist) {
        _.remove(userBaskit, function (product) { return product.id == targetProduct.id })
        targetProduct.count++
    } else {
        targetProduct.count = 1
    }

    addProductToUserBaskit(targetProduct, infoCurrentUser, userBaskit)

}

// slider header
let swiperHeader = new Swiper(".slider-header", {
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let swiperOurTeam = new Swiper(".our-team__slider", {
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,

    },
});
// end slider




// load page home fun
function loadHomePage() {
    currentUser = getItemLocalStorage('current-User')
    listUser = getItemLocalStorage('list-User')
    listProduct = getItemLocalStorage('list-products')
    listTeam = getItemLocalStorage('list-team')

    if (currentUser) {
        infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUser.username })
        userBaskit = infoCurrentUser.products
        isLogin = true
    }

    if (!listTeam) {
        listTeam = []
    }

    makeCardProducts()
    makeOurTeamInfo()
    makeCardArticle()
}

// events
window.addEventListener('load', loadHomePage)