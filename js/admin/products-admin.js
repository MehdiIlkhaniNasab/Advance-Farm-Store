let btnAddNewCategory = _querySelector('.btn-add-new-category')
let listCategory = []
let listProducts = []
let listCategoryStr = 'list-category'
let listProductsStr = 'list-products'
let formInputProductImg = _querySelector('.form-input-product-img')
let formInputEditProductImg = _querySelector('.form-input-edit-product-img')
let btnAddNewProduct = _querySelector('.btn-add-new-product')
let btnEditInfoProduct = _querySelector('.btn-edit-info-product')
let btnSubmitDiscountAllProduct = _querySelector('.btn-submit-discount-all-product')
let btnShowModalNewProduct = _id('btn-show-modal-new-product')
let btnShowModalDiscountProduct = _id('btn-show-modal-discount-product')
let btnShowModalCategoryProduct = _id('btn-show-modal-category-product')
let listCourseCount
let productId = 0




// fill select option category products
function fillCategoryProducts(formSelectCategoryContainer, formSelectCategoryWrapper) {
    let formSelectcCategoryContainer = _querySelector(`.${formSelectCategoryContainer}`)
    let formSelectcCategoryWrapper = _querySelector(`.${formSelectCategoryWrapper}`)
    let formSelectcCategoryFragment = document.createDocumentFragment()

    formSelectcCategoryWrapper.innerHTML = ''

    formSelectcCategoryWrapper.insertAdjacentHTML('afterbegin', ` <option value='0' selected>دسته بندی</option>`)
    listCategory.forEach(function (category) {
        formSelectcCategoryWrapper.insertAdjacentHTML('beforeend',
            `
            <option value="${category}" data-category-name="${category}">${category}</option>
        `)
        formSelectcCategoryFragment.appendChild(formSelectcCategoryWrapper)
    })
    formSelectcCategoryContainer.appendChild(formSelectcCategoryFragment)
}

// save img profile src uploded
let saveSrcImageProduct = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        setItemLocalStorage('productImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};

// get info new prodcuts
function getInfoNewProducts() {

    let formInputProductName = _querySelector('.form-input-product-name')
    let formInputProductPrice = _querySelector('.form-input-product-price')
    let formInputProductCount = _querySelector('.form-input-product-count')
    let formInputProductValueDiscount = _querySelector('.form-input-product-value-discount')
    let formInputProductCopenDiscount = _querySelector('.form-input-product-copen-discount')
    let formSelectUnitsWrapper = _querySelector('.form-select-units-wrapper')
    let formSelectCategoryWrapper = _querySelector('.form-select-category-wrapper')
    let formInputProductShortDesc = _querySelector('.form-input-product-shortDesc')
    let productImgSrc = getItemLocalStorage('productImgSrc')
    let productDiscountCheckbox = _id('product-discount-checkbox')
    let collapseCheckboxDiscount = _querySelector('.collapse-checkbox-new-product')
    let haveDiscount = collapseCheckboxDiscount.classList.contains('show')

    let infoProdut = {
        id: productId,
        name: formInputProductName.value,
        price: +formInputProductPrice.value,
        count: +formInputProductCount.value,
        unit: formSelectUnitsWrapper.value,
        category: formSelectCategoryWrapper.value,
        imgSrc: productImgSrc,
        shortDesc: formInputProductShortDesc.value
    }


    if (haveDiscount) {
        collapseCheckboxDiscount.classList.add('show')
        infoProdut.haveDiscount = true
        infoProdut.valueDiscount = Number(formInputProductValueDiscount.value)
        infoProdut.copenCode = formInputProductCopenDiscount.value
        productDiscountCheckbox.checked = true

    } else {
        infoProdut.haveDiscount = false
        infoProdut.valueDiscount = 0
        collapseCheckboxDiscount.classList.remove('show')
        productDiscountCheckbox.checked = false
    }

    productId++
    return infoProdut

}


// save info new product in array
function saveInfoNewProduct() {
    let infoProduct = getInfoNewProducts()
    let formNewProduct = _querySelector('.form-new-product')
    listProducts.push(infoProduct)
    setItemLocalStorage(listProductsStr, listProducts)
    removeItemLocalStorage('productImgSrc')
    resetFormInputs(formNewProduct)
    listCourseCount.innerHTML = listProducts.length
}

// make card item product
function makeProductsCard() {

    let productsContainer = _querySelector('.products-container')
    let productsWrapper = _querySelector('.products-wrapper')
    let productsCardFragment = document.createDocumentFragment()

    productsWrapper.innerHTML = ''
    listProducts.forEach(function (product) {
        productsWrapper.insertAdjacentHTML('beforeend', `
        
        <div class="products__item">
            <img src="${product.imgSrc}" alt="product-img-1"
                class="products__img">
            <div class="products__details w-100">
                <div class="products__info">
                    <h3 class="products__name">${product.name}</h3>
                    <p class="products__short-desc ellipse-text">${product.shortDesc} </p>
                </div>
                <div class="products__tags ">
                    <div class="products__boxes">
                        <div class=" products__price-box">
                            <svg class="icon  products__icon ">
                                <use xlink:href="../../fonts/sprite.svg#icon-data"></use>
                            </svg>
                            <span class="product__teg-text ">قیمت :</span>
                            <span class="product__teg-text products__price-value">${product.price}</span>
                        </div>
                        <div class=" products__category-box">
                            <svg class="icon  products__icon ">
                                <use xlink:href="../../fonts/sprite.svg#icon-clip"></use>
                            </svg>
                            <span class="product__teg-text">دسته :</span>
                            <span class="product__teg-text products__category">${product.category}</span>

                        </div>
                        <div class=" products__shop-box">
                            <svg class="icon  products__icon ">
                                <use xlink:href="../../fonts/sprite.svg#icon-user"></use>
                            </svg>
                            <span class="product__teg-text "> فروش :</span>
                            <span class="product__teg-text products__sell">${product.count}</span>
                        </div>
                    </div>
                    <div class="products__btns">
                        <button class="btn btn-danger btn-lg" data-id="${product.id}" onclick="removeProduct(event)">حذف</button>
                        <button class="btn btn-info btn-lg" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#edit-product" onclick="showInForProductForEdit(event)">ویرایش</button>
                    </div>
                </div>
            </div>

            <div class="product__discount-Box">
                ${product.valueDiscount || 0} %
            </div>
        </div>

        `)
        productsCardFragment.appendChild(productsWrapper)



    })
    productsContainer.appendChild(productsCardFragment)
}

// make products function
function makeProduct() {
    let isValid = checkValidInputs('form-new-product')
    let formSelectUnitsWrapper = _querySelector('.form-select-units-wrapper')
    let formInputProductPrice = _querySelector('.form-input-product-price')
    let formInputProductPriceValue = +formInputProductPrice.value
    let isValidSelectCategory = formSelectUnitsWrapper.value != 0
    let isNanPrice = !isNaN(formInputProductPriceValue)

    if (isValid && isValidSelectCategory && isNanPrice) {
        saveInfoNewProduct()

        makeProductsCard()
        resetAllForm()
        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'محصول جدید با موفقیت اضافه شد',
            confirmButtonText: 'باشه'
        })

        let modalNewProduct = _id('new-product');
        let modal = bootstrap.Modal.getInstance(modalNewProduct)
        modal.hide();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}


// remove product
function removeProduct(event) {
    let productId = event.target.dataset.id

    Swal.fire({
        icon: 'warning',
        title: 'ایا از حذف محصول مورد نظر مطمئن هستید؟',
        text: 'در صورت تایید قادر به بازگشت نیست.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله،  حذف کن!',
        cancelButtonText: 'خیر، منصرف شدم',

    }).then((result) => {
        if (result.isConfirmed) {
            _.remove(listProducts, function (product) {
                return product.id == productId;
            });
            setItemLocalStorage(listProductsStr, listProducts)
            productId = getIndexLastIdProducts() + 1
            makeProductsCard()
            listCourseCount.innerHTML = listProducts.length
        }
    })

}

// show InfoProduct for Show on edit mode
function showInForProductForEdit(event) {

    let productId = event.target.dataset.id

    let formSelectCategoryContainerStr = 'form-select-edit-category-container'
    let formSelectCategoryWrapperStr = 'form-select-edit-category-wrapper'
    let targetProduct = _.find(listProducts, function (product) { return product.id == productId })

    let formInputEditProductName = _querySelector('.form-input-edit-product-name')
    let formInputEditProductPrice = _querySelector('.form-input-edit-product-price')
    let formInputEditProductCount = _querySelector('.form-input-edit-product-count')
    let formInputEditProductValueDiscount = _querySelector('.form-input-edit-product-value-discount')
    let formInputEditProductCopenDiscount = _querySelector('.form-input-edit-product-copen-discount')
    let formSelectEditUnitsWrapper = _querySelector('.form-select-edit-units-wrapper')
    let formSelectEditCategoryWrapper = _querySelector('.form-select-edit-category-wrapper')
    let formInputEditProductShortDesc = _querySelector('.form-input-edit-product-shortDesc')

    let productDiscountCheckbox = _id('edit-product-discount-checkbox')
    let collapseCheckboxDiscount = _querySelector('.collapse-checkbox-discount')


    formInputEditProductName.value = targetProduct.name
    formInputEditProductPrice.value = targetProduct.price
    formInputEditProductCount.value = targetProduct.count
    formInputEditProductValueDiscount.value = targetProduct.valueDiscount || ''
    formInputEditProductCopenDiscount.value = targetProduct.copenCode || ''
    formSelectEditUnitsWrapper.value = targetProduct.unit
    formSelectEditCategoryWrapper.value = targetProduct.category
    productDiscountCheckbox.checked = targetProduct.haveDiscount
    formInputEditProductShortDesc.value = targetProduct.shortDesc



    if (productDiscountCheckbox.checked) {
        collapseCheckboxDiscount.classList.add('show')
        formInputEditProductValueDiscount.value = targetProduct.valueDiscount
        formInputEditProductCopenDiscount.value = targetProduct.copenCode
    } else {
        collapseCheckboxDiscount.classList.remove('show')
        formInputEditProductValueDiscount.value = ''
        formInputEditProductCopenDiscount.value = ''
    }

    fillCategoryProducts(formSelectCategoryContainerStr, formSelectCategoryWrapperStr)
    btnEditInfoProduct.setAttribute('data-id', `${productId}`)

}

// get edit info products
function getEditProduct(id) {

    let productId = id

    let formInputEditProductName = _querySelector('.form-input-edit-product-name')
    let formInputEditProductPrice = _querySelector('.form-input-edit-product-price')
    let formInputEditProductCount = _querySelector('.form-input-edit-product-count')
    let formInputEditProductValueDiscount = _querySelector('.form-input-edit-product-value-discount')
    let formInputEditProductCopenDiscount = _querySelector('.form-input-edit-product-copen-discount')
    let formSelectEditUnitsWrapper = _querySelector('.form-select-edit-units-wrapper')
    let formSelectEditCategoryWrapper = _querySelector('.form-select-edit-category-wrapper')
    let formInputEditProductShortDesc = _querySelector('.form-input-edit-product-shortDesc')
    let productImgSrc = getItemLocalStorage('productImgSrc')

    let productDiscountCheckbox = _id('product-discount-checkbox')
    let collapseCheckboxDiscount = _querySelector('.collapse-checkbox-discount')
    let haveDiscount = collapseCheckboxDiscount.classList.contains('show')




    let newInfoProduct = {
        id: productId,
        name: formInputEditProductName.value,
        price: +formInputEditProductPrice.value,
        count: +formInputEditProductCount.value,
        unit: formSelectEditUnitsWrapper.value,
        category: formSelectEditCategoryWrapper.value,
        imgSrc: productImgSrc,
        shortDesc: formInputEditProductShortDesc.value
    }

    if (haveDiscount) {
        productDiscountCheckbox.checked = true
        newInfoProduct.haveDiscount = true
        newInfoProduct.valueDiscount = Number(formInputEditProductValueDiscount.value)
        newInfoProduct.copenCode = formInputEditProductCopenDiscount.value

        formInputEditProductValueDiscount.setAttribute('required', '')
        formInputEditProductCopenDiscount.setAttribute('required', '')

    } else {
        newInfoProduct.haveDiscount = false
        productDiscountCheckbox.checked = false
        newInfoProduct.valueDiscount = 0
        newInfoProduct.copenCode = ''
        formInputEditProductValueDiscount.removeAttribute('required')
        formInputEditProductCopenDiscount.removeAttribute('required')
    }


    return newInfoProduct


}


// get discount value and discount copen for addDiscountToAllProducts func
function getAmountsForGeneralDiscount() {
    let formInputGeneralDiscountValue = _querySelector('.form-input-general-discount-value')
    let formInputGeneralDiscountCopen = _querySelector('.form-input-general-discount-copen')

    let generalDiscount = {
        valueDiscount: formInputGeneralDiscountValue.value,
        copenDiscount: formInputGeneralDiscountCopen.value
    }

    return generalDiscount
}


// add discount to all products
function addDiscountToAllProducts() {
    listProductDiscount = listProducts
    listProducts = []
    let infoDiscountAmount = getAmountsForGeneralDiscount()

    listProductDiscount.forEach(function (product) {
        product.haveDiscount = true
        product.valueDiscount = infoDiscountAmount.valueDiscount,
            product.copenCode = infoDiscountAmount.copenDiscount

        listProducts.push(product)
    })
    setItemLocalStorage(listProductsStr, listProducts)
}

// upadte products with general discount
function updateGeneralDiscount() {
    let isValid = checkValidInputs('form-general-dicsount')
    let modalNewProduct = _id('add-discount-all-product');
    let modal = bootstrap.Modal.getInstance(modalNewProduct)
    modal.hide();

    if (isValid) {
        addDiscountToAllProducts()
        makeProductsCard()
        resetAllForm()
        modal.hide();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }

}

// save new info product
function saveNewInfoProduct(event) {
    let productId = event.target.dataset.id
    let newInfoProduct = getEditProduct(productId)
    listProducts = getItemLocalStorage(listProductsStr)

    _.remove(listProducts, function (product) {
        return product.id == productId;
    });

    listProducts.push(newInfoProduct)
    setItemLocalStorage(listProductsStr, listProducts)
    removeItemLocalStorage('productImgSrc')

}


// submit edit info product save local and array
function submitEditProduct(event) {
    let isValid = checkValidInputs('form-edit-product')
    let formNewInfoProductTeam = _querySelector(".form-edit-product")
    let formSelectEditCategoryWrapper = _querySelector('.form-select-edit-category-wrapper')
    let isValidSelectCategory = formSelectEditCategoryWrapper.value != 0
    let modalEditProfile = _id('edit-product');
    let modal = bootstrap.Modal.getInstance(modalEditProfile)


    if (isValid && isValidSelectCategory) {

        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'محصول  با موفقیت ویرایش  شد',
            confirmButtonText: 'باشه'
        })
        saveNewInfoProduct(event)
        makeProductsCard()
        modal.hide();
        resetAllForm()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}

// save info new category in array
function saveInfoNewCategory(event) {
    event.preventDefault()
    let formCategory = _querySelector('.form-category')
    let categoryNameInput = _querySelector('.category-name-input')
    let categoryNameInputValue = categoryNameInput.value
    let isValid = checkValidInputs('form-category')

    if (isValid) {
        listCategory.push(categoryNameInputValue)
        setItemLocalStorage(listCategoryStr, listCategory)
        makeNewCategory()
        resetFormInputs(formCategory)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }



}

// make box newcategory
function makeNewCategory() {
    let formSelectCategoryContainerStr = 'form-select-category-container'
    let formSelectCategoryWrapperStr = 'form-select-category-wrapper'
    let tagsBoxContainer = _querySelector('.tags-box-container')
    let tagsBoxWrapper = _querySelector('.tags-box-wrapper')
    let tagsBoxFragment = document.createDocumentFragment()

    tagsBoxWrapper.innerHTML = ''
    listCategory.forEach(function (category) {
        tagsBoxWrapper.insertAdjacentHTML('beforeend', `
            <p class="tag-stroe my-0">
                <span class="tag-store__span">${category}</span>
                <button class="btn-close btn-close-white  pb-0" onclick="removeCtegory(event)" data-category="${category}"></button>
            </p>
        `)
        tagsBoxFragment.appendChild(tagsBoxWrapper)
    })
    tagsBoxContainer.appendChild(tagsBoxFragment)
    fillCategoryProducts(formSelectCategoryContainerStr, formSelectCategoryWrapperStr)
}

//remove category 
function removeCtegory(event) {
    let categoryName = event.target.dataset.category
    listCategory = getItemLocalStorage(listCategoryStr)
    _.remove(listCategory, function (category) { return category == categoryName; })

    setItemLocalStorage(listCategoryStr, listCategory)

    makeNewCategory()
}


// get id last of products
function getIndexLastIdProducts() {
    let lengthListProducts = listProducts.length
    let lastProducts = listProducts[lengthListProducts - 1]

    if (lastProducts) {
        return lastProducts.id
    } else {
        return 0
    }

}

// load  page products functin
function loadPageProducts() {
    let formSelectCategoryContainerStr = 'form-select-category-container'
    let formSelectCategoryWrapperStr = 'form-select-category-wrapper'
    listCourseCount = _querySelector('.list__course-count')
    listCategory = getItemLocalStorage(listCategoryStr)
    listProducts = getItemLocalStorage(listProductsStr)

    if (!listCategory) {
        listCategory = []
    }

    if (!listProducts) {
        listProducts = []
    }

    productId = getIndexLastIdProducts() + 1
    makeNewCategory()
    fillCategoryProducts(formSelectCategoryContainerStr, formSelectCategoryWrapperStr)
    makeProductsCard()
}

// add new category event
btnAddNewCategory.addEventListener('click', saveInfoNewCategory)

// load page product
window.addEventListener('load', loadPageProducts)

// save src img product to local
formInputProductImg.addEventListener('change', saveSrcImageProduct)
formInputEditProductImg.addEventListener('change', saveSrcImageProduct)

// add new products event
btnAddNewProduct.addEventListener('click', makeProduct)

// edit info product
btnEditInfoProduct.addEventListener('click', submitEditProduct)

// submit discount to all product event
btnSubmitDiscountAllProduct.addEventListener('click', updateGeneralDiscount)


