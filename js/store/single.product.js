let listProduct
let targetProduct
let isLogin
let currentUser
let listUser
let infoCurrentUser

// get info target product
function getDetailsTargetProduct() {
    let urlSearch = window.location.search
    let urlSearchParam = new URLSearchParams(urlSearch)
    let targetProductId = urlSearchParam.get('id')
    let targetProduct = _.find(listProduct, function (product) { return product.id == targetProductId; });

    return targetProduct

}

// show info target products
function showDetailsProducts() {
    let productDetailsWrapper = _querySelector('.product-details-wrapper')
    let targetProductObj = targetProduct
    productDetailsWrapper.insertAdjacentHTML('beforeend',
        `
        <div class="col-8 col-lg-5 mb-5 mb-lg-0">
            <div class="product-details__img-box">
                <img src="${targetProductObj.imgSrc}" alt="${targetProductObj.name} img"
                class="peoduct-details__img">
            </div>
        </div>
        <div class="col-12 col-lg-7 mt-5 mt-lg-0">
            <div class="product-details__info">
                <h3 class="product-details__name">${targetProductObj.name}</h3>
                <p class="product-details__units">${targetProductObj.unit} ای </p>
                <h4 class="product-details__price">
                    <span class="product-details__price-value">${targetProductObj.price}</span>
                    تومان
                </h4>
                <p class="product-details__description">${targetProductObj.shortDesc}</p>
                <form action="#" class="">
                    <input type="number" name="" id="input-product-count" class="product__count mb-4" value="${targetProductObj.count}">
                    <button type="button" class="btn-custome btn-custome-orange mt-4" data-id="${targetProductObj.id}"  onclick="checkLoginUser(event)"">افزودن به سبد</button>
                </form>
                <p class="product-details__category">
                    <span class="products-details__category-title">دسته بندی :</span>
                    <span class="products-details__category-name" data-category="${targetProductObj.category}">${targetProductObj.category}</span>
                </p>
            </div>
        </div>
    `)
}


// check the user is login or not
function checkLoginUser(event) {
    let productId = event.target.dataset.id
    let inputProductCount = _id('input-product-count')
    let isNotZero = inputProductCount.value > 0
    if (isNotZero) {
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'شرمنده.',
            text: 'تعداد محصول باید از صفر بیشتر باشد',
            confirmButtonText: 'باشه',
        })
    }

}

// add target product to user baskit
function addProductToUserBaskit(targetProduct, infoCurrentUser, userBaskit) {
    userBaskit.push(targetProduct)
    _.remove(listUser, function (user) { return user.username == currentUser.username })
    infoCurrentUser.products = userBaskit
    listUser.push(infoCurrentUser)
    setItemLocalStorage('list-User', listUser)
}

// set count of products if target product is exist in userbakit count ++ else count = 1
function isExistInBaskit(productId) {

    let inputProductCount = _id('input-product-count')
    let targetProduct = getTargetProduct(productId)
    let userBaskit = getUserBaskit(productId)
    let infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUser.username })


    _.remove(userBaskit, function (product) { return product.id == targetProduct.id })
    targetProduct.count = inputProductCount.value

    addProductToUserBaskit(targetProduct, infoCurrentUser, userBaskit)
}


// this product is exist in userbaskit or not
function checkProductIsExit(productId) {
    let userBaskit = getUserBaskit()
    let isExistInUserBaskit = _.some(userBaskit, function (product) {
        targetProduct.count = product.count
        return product.id == productId
    })
    return isExistInUserBaskit
}


// get target product from list products
function getTargetProduct(productId) {

    let targetProduct = _.find(listProduct, function (product) { return product.id == productId })

    return targetProduct
}

// get user baskit
function getUserBaskit() {
    let listUser = getItemLocalStorage('list-User')
    let currentUser = getItemLocalStorage('current-User')
    let infoCurrentUser
    let userBaskit

    if (currentUser) {
        infoCurrentUser = _.find(listUser, function (user) { return user.username == currentUser.username })
        userBaskit = infoCurrentUser.products
    }

    return userBaskit
}

// count of products get from userbaskit
function countUserProduct() {
    let infoThisProduct = getDetailsTargetProduct()
    let productId = infoThisProduct.id
    let isExist = checkProductIsExit(productId)
    let inputProductCount = _id('input-product-count')
    let targetProduct = getTargetProduct(productId)

    if (isExist) {
        inputProductCount.value = targetProduct.count
    } else {
        inputProductCount.value = 0
    }
}

// get list of related products of this product
function getRelatedProducts() {
    let relatedProducts = _.filter(listProduct, function (product) { return product.category == targetProduct.category && product.id != targetProduct.id })
    return relatedProducts
}

// make card top products 
function makeCardProducts() {
    let productsContainer = _querySelector('.related-product-container')
    let productsWrapper = _querySelector('.related-product-wrapper')
    let productsFragment = document.createDocumentFragment()
    let relatedProducts = getRelatedProducts()
    let lastThreeProducts = _.slice(relatedProducts, -3)

    productsWrapper.innerHTML = ''
    lastThreeProducts.forEach(function (product) {
        productsWrapper.insertAdjacentHTML('afterbegin',
            `
            <div class="col-8 col-sm-5 col-lg-4 ">
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
                </div>
                </div>
            </div>
        
        `)
        productsFragment.appendChild(productsWrapper)
    })
    productsContainer.appendChild(productsFragment)

}


// load page DetailsProduct
function loadPageDetailsProduct() {
    listProduct = getItemLocalStorage('list-products')
    targetProduct = getDetailsTargetProduct()
    listUser = getItemLocalStorage('list-User')
    currentUser = getItemLocalStorage('current-User')

    if (!listUser) {
        listUser = []
    }

    if (currentUser) {
        isLogin = true
    }

    if (!listProduct || !targetProduct) {
        location.href = '404.html'
    } else {
        showDetailsProducts()
        makeCardProducts()
        countUserProduct()
    }


}

window.addEventListener('load', loadPageDetailsProduct)