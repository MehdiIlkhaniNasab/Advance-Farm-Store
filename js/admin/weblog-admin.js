let listArticle = []
let listTagArticle = []
let listArticleStr = 'list-article'
let listTagArticleStr = 'list-tag-article'
let newTagsBoxContainer = _querySelector('.new-tags-box-container')
let newTagsBoxWrapper = _querySelector('.new-tags-box-wrapper')
let articleCurrentDate = _id('input-new-article-date')
let btnModalNewArticle = _id('btn-modal-new-article')
let btnAddNewArticle = _id('btn-add-new-article')
let btnEditInfoArticle = _id('btn-edit-info-article')
let articleName = _id('input-new-article-name')
let articleAuthor = _id('input-new-article-author')
let articleTags = _id('input-new-article-tags')
let editArticleTags = _id('input-edit-article-tags')
let articleImg = _id('input-new-article-img')
let editArticleImg = _id('input-edit-article-img')
let articleShortDesc = _id('input-new-article-short-desc')
let articleLongDesc = _id('input-new-article-long-desc')
let articleId = 0
let isEditMode = false

// get Info of new article from author
function getInfoNewArticle() {

    let imgArticleSrc = getItemLocalStorage('articleImgSrc')
    let infoArticle = {
        id: articleId,
        name: articleName.value,
        author: articleAuthor.value,
        date: articleCurrentDate.value,
        tags: listTagArticle,
        imgSrc: imgArticleSrc,
        shortDesc: articleShortDesc.value,
        longDesc: articleLongDesc.value,
        countVisited: 0,
        comments:[]

    }
    articleId++
    
    return infoArticle
}


// save info new article to array 
function saveInfoNewArticle() {

    let infoArticle = getInfoNewArticle()
    listArticle.push(infoArticle)
    setItemLocalStorage(listArticleStr, listArticle)
    removeItemLocalStorage('articleImgSrc')

    listTagArticle = []
    setItemLocalStorage(listTagArticleStr, listTagArticle)

    
    resetAllForm()
}


// add new article to dom
function addNewArticle() {

    let isValid = checkValidInputs('form-new-article')
    let modalNewArticle = _id('new-article');
    let modal = bootstrap.Modal.getInstance(modalNewArticle)

    if (isValid) {

        saveInfoNewArticle()
        makeCardNewArticle()
        makeBoxTagArticle(newTagsBoxContainer, newTagsBoxWrapper, listTagArticle)
        modal.hide();
        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'مقاله  با موفقیت اضافه  شد',
            confirmButtonText: 'باشه'
        })

    } else {
        Swal.fire({
            icon: 'error',
            title: 'اووه!! اطلاعات معتبر نیست.',
            text: 'لطفا تمام فیلد  ها را پر کنید',
            confirmButtonText: 'باشه'
        })
    }
}

// makes card new article 
function makeCardNewArticle() {
    let articlesContainer = _querySelector('.articles')
    let articlesListWrapper = _querySelector('.articles__list')
    let articleFragment = document.createDocumentFragment()

    articlesListWrapper.innerHTML = ''
    listArticle.forEach(function (article) {
        articlesListWrapper.insertAdjacentHTML('beforeend',
            `
            <div class="articles__item">
                <img src="${article.imgSrc}" alt="product-img-1"
                    class="articles__img">
                <div class="articles__details w-100">
                    <div class="articles__info">
                        <h3 class="articles__name">${article.name}</h3>
                        <p class="articles__short-desc ellipse-text">
                        ${article.shortDesc}
                        </p>
                    </div>
                    <div class="articles__tags ">
                        <div class="articles__boxes">
                            <div class=" articles__category-box d-flex gap-2 align-items-center">
                                <svg class="icon  articles__icon ">
                                    <use xlink:href="../../fonts/sprite.svg#icon-clip"></use>
                                </svg>
                                <p class="articles__tag-text articles__category my-0">
                                    <span>دسته بندی :</span>
                                    <span class="articles__category-value">${article.tags[0] || 'ندارد'}</span>
                                </p>

                            </div>
                            <div class=" articles__visited-box d-flex gap-2 align-items-center">
                                <svg class="icon  articles__icon ">
                                    <use xlink:href="../../fonts/sprite.svg#icon-user"></use>
                                </svg>
                                <p class="articles__tag-text articles__visited my-0">
                                    <span>تعداد بازدید :</span>
                                    <span class="articles__visited-count">${article.countVisited}</span>
                                </p>
                            </div>
                        </div>
                        <div class="articles__btns">
                            <button class="btn btn-danger btn-lg" data-id="${article.id}" onclick="removeArticle(event)">حذف</button>
                            <button class="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#edit-article"onclick="showInfoArticleForEdit(event)" data-id="${article.id}">ویرایش</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        )
        articleFragment.appendChild(articlesListWrapper)
    })
    articlesContainer.appendChild(articleFragment)

}


// remove article box 
function removeArticle(event) {
    let targetArticleId = event.target.dataset.id

    Swal.fire({
        icon: 'warning',
        title: 'ایا از حذف مقاله مورد نظر مطمئن هستید؟',
        text: 'در صورت تایید قادر به بازگشت نیست.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله،  حذف کن!',
        cancelButtonText: 'خیر، منصرف شدم',

    }).then((result) => {
        if (result.isConfirmed) {
            _.remove(listArticle, function (article) {
                return article.id == targetArticleId;
            });
            setItemLocalStorage(listArticleStr, listArticle)
            makeCardNewArticle()
            productId = getIndexLastIdArticle() + 1
        }
    })
}


// show info article for edit mode
function showInfoArticleForEdit(event) {
    isEditMode = true

    let targetArticleId = event.target.dataset.id

    let editArticleName = _id('input-edit-article-name')
    let editArticleAuthor = _id('input-edit-article-author')

    let editArticleShortDesc = _id('input-edit-article-short-desc')
    let editArticleLongDesc = _id('input-edit-article-long-desc')
    let editArticleCurrentDate = _id('input-edit-article-date')

    let editTagsBoxContainer = _querySelector('.edit-tags-box-container')
    let editTagsBoxWrapper = _querySelector('.edit-tags-box-wrapper')

    let oldInfoArticle = _.find(listArticle, function (article) { return article.id == targetArticleId })

    editArticleName.value = oldInfoArticle.name
    editArticleAuthor.value = oldInfoArticle.author
    editArticleTags.value = ''
    editArticleCurrentDate.value = oldInfoArticle.date
    editArticleShortDesc.value = oldInfoArticle.shortDesc
    editArticleLongDesc.value = oldInfoArticle.longDesc

    listTagArticle = oldInfoArticle.tags
    makeBoxTagArticle(editTagsBoxContainer, editTagsBoxWrapper, listTagArticle)
    btnEditInfoArticle.setAttribute('data-id', `${targetArticleId}`)
}

// save new info article
function getNewinfoArticle(id) {
    let targetArticleId = id
    let targetAtricle = _.find(listArticle, function (article) { return article.id == targetArticleId })

    let editArticleName = _id('input-edit-article-name')
    let editArticleAuthor = _id('input-edit-article-author')
    let editArticleShortDesc = _id('input-edit-article-short-desc')
    let editArticleLongDesc = _id('input-edit-article-long-desc')
    let editArticleCurrentDate = _id('input-edit-article-date')

    let imgArticleSrc = getItemLocalStorage('articleImgSrc')

    let newInfoArticle = {
        id: targetArticleId,
        name: editArticleName.value,
        author: editArticleAuthor.value,
        date: editArticleCurrentDate.value,
        tags: targetAtricle.tags,
        imgSrc: imgArticleSrc,
        shortDesc: editArticleShortDesc.value,
        longDesc: editArticleLongDesc.value,
        countVisited: 0,
        comments: targetAtricle.comments
    }
    console.log(targetAtricle);
    return newInfoArticle


}

// edit Article function
function editArticle(event) {
    let targetArticleId = event.target.dataset.id
    let newInfoArticle = getNewinfoArticle(targetArticleId)
    _.remove(listArticle, function (article) {
        return article.id == targetArticleId;
    });

    listArticle.push(newInfoArticle)
    setItemLocalStorage(listArticleStr, listArticle)
    removeItemLocalStorage('articleImgSrc')
    listTagArticle = []
    setItemLocalStorage(listTagArticleStr, listTagArticle)
}

// submit edit info article
function submitEditInfoArticle(event) {
    let isValid = checkValidInputs('form-edit-article')
    let modalEditArticle = _id('edit-article');
    let modal = bootstrap.Modal.getInstance(modalEditArticle)
    if (isValid) {

        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'محصول  با موفقیت ویرایش  شد',
            confirmButtonText: 'باشه'
        })
        editArticle(event)
        makeCardNewArticle()
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

// add new tags for article 
function addNewTagsArticle(event) {
    let inputTags = event.target
    let isAccept = event.keyCode == 32 || event.keyCode == 13
    
    if (isAccept) {
        saveTagsArticleToArray(inputTags)
        if (isEditMode) {
            let editTagsBoxContainer = _querySelector('.edit-tags-box-container')
            let editTagsBoxWrapper = _querySelector('.edit-tags-box-wrapper')
            makeBoxTagArticle(editTagsBoxContainer, editTagsBoxWrapper, listTagArticle)

        } else {
            makeBoxTagArticle(newTagsBoxContainer, newTagsBoxWrapper, listTagArticle)
        }
    }
}


// make box tag article
function makeBoxTagArticle(tagsBoxContainer, tagsBoxWrapper, array) {

    let tagsBoxFragment = document.createDocumentFragment()

    tagsBoxWrapper.innerHTML = ''
    array.forEach(function (tag) {
        tagsBoxWrapper.insertAdjacentHTML('afterbegin', `
            <p class="tag-stroe my-0">
                <span class="tag-store__span">${tag}</span>
                <button type="button" class="btn-close btn-close-white pb-0" onclick="removeTagArticle(event)"  data-name="${tag}"></button>
            </p>
        `)
        tagsBoxFragment.appendChild(tagsBoxWrapper)
    })
    tagsBoxContainer.appendChild(tagsBoxFragment)

}

// remove box tag article
function removeTagArticle(event) {

    let targetTagName = event.target.dataset.name

    _.remove(listTagArticle, function (tag) {
        return tag === targetTagName;
    });
    setItemLocalStorage(listTagArticleStr, listTagArticle)
    if (isEditMode) {
        let editTagsBoxContainer = _querySelector('.edit-tags-box-container')
        let editTagsBoxWrapper = _querySelector('.edit-tags-box-wrapper')
        makeBoxTagArticle(editTagsBoxContainer, editTagsBoxWrapper, listTagArticle)

    } else {
        makeBoxTagArticle(newTagsBoxContainer, newTagsBoxWrapper, listTagArticle)
    }
}

// save tags article to array
function saveTagsArticleToArray(inputArticleTags) {
    let newTag = inputArticleTags.value.trim()

    listTagArticle.push(newTag)
    _.remove(listTagArticle, function (tag) {
        return tag == '';
    });
    setItemLocalStorage(listTagArticleStr, listTagArticle)

    inputArticleTags.value = ''

}

// save img article src uploded
let saveSrcImageArticle = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        setItemLocalStorage('articleImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};



// the reset value of input and put current time in input time
function settingPrimaryModal() {
    isEditMode = false
    listTagArticle = []
    newTagsBoxWrapper.innerHTML = ''
    resetAllForm()
    articleCurrentDate.value = getCurrentDate()
   
    removeItemLocalStorage(listTagArticleStr)
}

// get current time  
function getCurrentDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);

    return today
}


// get id last of articcle
function getIndexLastIdArticle(){
    let lengthListArticle = listArticle.length
    let lastArticle = listArticle[lengthListArticle - 1]

    if(lastArticle){
        return lastArticle.id
    }else{
        return 0
    }

}

// load webload page func
function loadWeblogPage() {
    listTagArticle = getItemLocalStorage(listTagArticleStr)
    listArticle = getItemLocalStorage(listArticleStr)
    if (!listTagArticle) {
        listTagArticle = []
    }

    if (!listArticle) {
        listArticle = []
    }

    
    productId = getIndexLastIdArticle() + 1
    makeCardNewArticle()

}


//  load for weblog page event
window.addEventListener('load', loadWeblogPage)


// pre setting for modal new article event
btnModalNewArticle.addEventListener('click', settingPrimaryModal)
btnAddNewArticle.addEventListener('click', addNewArticle)

// save src of new article event
articleImg.addEventListener('change', saveSrcImageArticle)
editArticleImg.addEventListener('change', saveSrcImageArticle)


// new tags article event
articleTags.addEventListener('keyup', addNewTagsArticle)
editArticleTags.addEventListener('keyup', addNewTagsArticle)
// edit info article event
btnEditInfoArticle.addEventListener('click', submitEditInfoArticle)