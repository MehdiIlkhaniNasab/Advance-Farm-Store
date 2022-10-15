let btnSendComment = _querySelector('#btn-send-comment')
let targetArticle
let commentId = 0


// get current time  
function getCurrentDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);

    return today
}

// info target article
function getDetailsTargetArticle() {

    let urlSearch = location.search
    let urlSearchParam = new URLSearchParams(urlSearch)
    let targetArticleId = urlSearchParam.get('id')

    let listArticle = getItemLocalStorage('list-article')
    let targetArticle = _.find(listArticle, function (article) { return article.id == targetArticleId });

    return targetArticle
}


// put article details in dom
function putArticleDetails() {

    let articleWrapper = _querySelector('.article-wrapper')


    articleWrapper.insertAdjacentHTML('afterbegin', `
                <div class="col-8 ">
                    <div class="article__details">
                        <img src="${targetArticle.imgSrc}" alt="article photo" class="article__img">
                        <p class="article__admin-date  ">
                            <span class="article__admin-name ">
                                <svg class="article__icon">
                                    <use xlink:href="../../fonts/sprite.svg#icon-user"></use>
                                </svg>
                               ${targetArticle.author}
                            </span>
                            <span class="article__date ">
                                <svg class="article__icon">
                                    <use xlink:href="../../fonts/sprite.svg#icon-calendar"></use>
                                </svg>
                                ${targetArticle.date}
                            </span>
                        </p>
                        <h2 class="article__title">  ${targetArticle.name}</h2>
                        <p class="article__text ">
                        ${targetArticle.longDesc}
                        </p>
                    </div>
                </div>
    
    `)


}


// put recent post article in dom
function putRecentPostArticle() {
    let listArticle = getItemLocalStorage('list-article')
    listArticle = _.slice(listArticle, -5)
    let recentPostContainer = _querySelector('.recent-posts-container')
    let recentPostWrapper = _querySelector('.recent-posts-wrapper')
    let recentPostFragment = document.createDocumentFragment()
    recentPostWrapper.innerHTML = ''
    recentPostWrapper.insertAdjacentHTML('afterbegin', `<h3 class="recent-post__title">پست های اخیر</h3>`)
    listArticle.forEach(function (article) {
        recentPostWrapper.insertAdjacentHTML('beforeend', `
        <ul class="list">
            <li class="list__item">
                <a href="single-news.html?id=${article.id}" class="list__link">
                    ${article.name}
                </a>
            </li>
        </ul>
        `)
        recentPostFragment.appendChild(recentPostWrapper)
    })
    recentPostContainer.appendChild(recentPostFragment)
}


// put tags  article in dom
function putTagsOfArticle() {

    let tagsArticle = targetArticle.tags
    let tagsContainer = _querySelector('.tags-container')
    let tagsWrapper = _querySelector('.tags-wrapper')
    let tagsFragment = document.createDocumentFragment()
    tagsWrapper.innerHTML = ''
    tagsWrapper.insertAdjacentHTML('afterbegin', ` <h3 class="tags__title">تگ ها</h3>`)
    tagsArticle.forEach(function (tag) {
        tagsWrapper.insertAdjacentHTML('beforeend', `
        <span class="tags_name">${tag}</span>
        `)
        tagsFragment.appendChild(tagsWrapper)
    })
    tagsContainer.appendChild(tagsFragment)
}



// get details comment 
function getDetailsComment() {
    let currentDate = getCurrentDate()
    let inputCommentName = _querySelector('.input-comment-name')
    let inputCommentEmail = _querySelector('.input-comment-email')
    let inputCommentText = _querySelector('.input-comment-text')

    let infoComment = {
        id: commentId,
        name: inputCommentName.value.trim(),
        email: inputCommentEmail.value.trim(),
        text: inputCommentText.value.trim(),
        date: currentDate,
    }

    commentId++

    return infoComment
}

// save deatils comment into array article comment
function saveInfoCommentInArray() {
    let listArticle = getItemLocalStorage('list-article')

    let commentsArticle = targetArticle.comments
    let infoComment = getDetailsComment()
    commentsArticle.push(infoComment)
    _.remove(listArticle, function (article) {
        return article.id == targetArticle.id;
    });

    listArticle.push(targetArticle)

    setItemLocalStorage('list-article', listArticle)

}

// submit new comment 
function submitNewComment() {
    let isValid = checkValidInputs('form-send-comment')

    if (isValid) {
        saveInfoCommentInArray()
        makeCardComment()
        resetAllForm()
        Swal.fire({
            icon: 'success',
            title: 'موفقیت',
            text: 'کامنت شما با موفقیت ارسال شد',
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

// make box comment and append to  dom
function makeCardComment() {
    let targetArticleComment = targetArticle.comments
    let commentsContainer = _querySelector('.comments__container')
    let commentsWrapper = _querySelector('.comments__wrapper')
    let commentsFragment = document.createDocumentFragment()

    commentsWrapper.innerHTML = ''
    commentsWrapper.insertAdjacentHTML('afterbegin', `  <h3 class="comments__title">${targetArticleComment.length} کامنت</h3>`)
    targetArticleComment.forEach(function (comment) {
        commentsWrapper.insertAdjacentHTML('beforeend', `
       
        <div class="comments__box my-4">
            <img src="../../img/store/avaters/avatar4.png" alt="photo user" srcset=""
                class="comments__img">
            <div class="comments__content">
                <p class="comments_top mb-4">
                    <span class="comments__name">${comment.name}</span>
                    <span class="comments__date">${comment.date} </span>
                </p>
                <p class="comments__text paragraph">
                    ${comment.text}
                </p>
            </div>
        </div>
        `)
        commentsFragment.appendChild(commentsWrapper)
    })
    commentsContainer.appendChild(commentsFragment)
}


// load single news page
function lodaPageSingleNews() {
    targetArticle = getDetailsTargetArticle()
    let commentsArticle

    if (targetArticle) {
        console.log(targetArticle);
        commentsArticle = targetArticle.comments
        commentId = commentsArticle.length
        putArticleDetails()
        putRecentPostArticle()
        putTagsOfArticle()
        makeCardComment()
        resetAllForm()
    } else {
        window.location.href = '404.html'
    }
}


window.addEventListener('load', lodaPageSingleNews)

btnSendComment.addEventListener('click', submitNewComment)