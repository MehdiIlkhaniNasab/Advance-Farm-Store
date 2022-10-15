let listProdcut
let isLogin
let currentUser
let infoCurrentUser
// make tab pane nav with list category
function makeTabPaneCategory() {
    let listCategory = getItemLocalStorage('list-category')
    let tabNumber = 0
    let tabPaneContainer = _querySelector('.tab-pane-nav-container')
    let tabPaneWrapper = _querySelector('.tab-pane-nav-wrapper')
    let tabPaneFragment = document.createDocumentFragment()
    tabPaneWrapper.innerHTML = ''
    tabPaneWrapper.insertAdjacentHTML('beforeend', `<li class="nav-item"><a class="nav-link  nav-custom-link" data-bs-toggle="tab" href="#all">همه</a></li>`)
    listCategory.forEach(function (category) {
        tabPaneWrapper.insertAdjacentHTML('beforeend',
            `
         <li class="nav-item">
            <a class="nav-link link-tab-product  nav-custom-link " data-bs-toggle="tab" data-name="${category}" data-id="home${tabNumber}" href="#home${tabNumber}" onclick="showCardsEveryTabs(event)">${category}</a>
        </li>
        `
        )
        tabNumber++
        tabPaneFragment.appendChild(tabPaneWrapper)
    })
    tabPaneContainer.appendChild(tabPaneFragment)
}


// make tab all product
function makeTabAllProducts() {
    let tabContentContainer = _querySelector('.tab-content-container')
    let tabContentWrapper = _querySelector('.tab-content-wrapper')
    let divBoxCards = document.createElement('div')
    let cardProducts = makeCardProducts(listProdcut, divBoxCards, 'all')
    tabContentWrapper.appendChild(cardProducts)
    tabContentContainer.appendChild(tabContentWrapper)
}


// make product every tab
function makeProductEvreyTab() {
    let listLinkTab = _querySelectorAll('.link-tab-product')
    listLinkTab.forEach(function (link) {
        let idTab = link.dataset.id
        let categoryName = link.dataset.name
        filterProductsFun(categoryName, idTab)
    })
}

// filter products
function filterProductsFun(categoryName, tabId) {
    let tabContentContainer = _querySelector('.tab-content-container')
    let tabContentWrapper = _querySelector('.tab-content-wrapper')


    let filterProducts = _.filter(listProdcut, function (product) { return product.category == categoryName });
    let divBoxCards = document.createElement('div')

    if (!filterProducts) {
        filterProducts = []
    }


    let tabProcuts = makeCardProducts(filterProducts, divBoxCards, tabId)
    tabContentWrapper.append(tabProcuts)
    tabContentContainer.append(tabContentWrapper)

}

// make card products
function makeCardProducts(array, divBoxCards, idTab) {


    divBoxCards.setAttribute('id', `${idTab}`)
    divBoxCards.className = `tab-pane  container `
    divBoxCards.innerHTML = ''
    let cardsRow = document.createElement('div')
    cardsRow.className = 'cards row justify-content-center justify-content-lg-start align-items-center px-4 px-md-0 mx-0'

    array.forEach(function (item) {
        cardsRow.insertAdjacentHTML('beforeend',
            `
                <div class="col-8 col-sm-5 col-lg-4 mb-5">
                    <div class="cards__item px-0 pt-0">
                        <img src="${item.imgSrc}" alt="${item.name}"
                            class="cards__img">
                        <h4 class="cards__name"> ${item.name}</h4>
                        <p class="prducts__units">
                            <span class="cards__every-text">هر</span>
                            <span class="peoducts__per-unit">${item.unit}</span>
                        </p>
                        <h3 class="cards__price">${item.price}</h3>
                        <div class="btns d-flex gap-2">
                        <a  href="single-products.html?id=${item.id}"  data-id="${item.id}" class="text-decoration-none btn-custome btn-custome-orange px-4" ">
                           
                            مشاهده محصول
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-wallet"></use>
                            </svg>
                        </a ">
                        <button   data-id="${item.id}" class="text-decoration-none btn-custome btn-custome-secondry  px-4" onclick="checkLoginUser(event)">
                        افزودن به سبد
                            <svg class="cards__icon">
                                <use xlink:href="../../fonts/sprite.svg#icon-basket"></use>
                            </svg>
                        </button ">
                    </div>
                </div>
            </div>
        `)
    })

    divBoxCards.append(cardsRow)
    return divBoxCards

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

    let targetProduct = _.find(listProdcut, function (product) { return product.id == productId })
    let infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUser.username })
    let userBaskit = infoCurrentUser.products

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

// show products every tabs 
function showCardsEveryTabs(event) {
    let categoryName = event.target.dataset.name
    let tabId = event.target.dataset.id
    filterProductsFun(categoryName, tabId)
}

// load page shop 
function loadPageShop() {
    listProdcut = getItemLocalStorage('list-products')
    currentUser = getItemLocalStorage('current-User')
    listUser = getItemLocalStorage('list-User')

    if (currentUser) {
        infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUser.username })
        userBaskit = infoCurrentUser.products
        isLogin = true
    }

    if (!listProdcut) {
        listProdcut = []
    }
    makeTabPaneCategory()
    makeTabAllProducts()
    makeProductEvreyTab()
}

window.addEventListener('load', loadPageShop)