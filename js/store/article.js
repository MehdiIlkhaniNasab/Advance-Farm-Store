// make card article
function makeCardArticle() {

    let ArticleContainer = _querySelector('.article-container')
    let ArticleWrapper = _querySelector('.article-wrapper')
    let ArticleFragment = document.createDocumentFragment()
    let listArticle = getItemLocalStorage('list-article')


    ArticleWrapper.innerHTML = ''
    listArticle.forEach(function (article) {
        ArticleWrapper.insertAdjacentHTML('afterbegin',
            `
            <div class="col-8 col-sm-5 col-lg-4 mb-5  px-2">
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
                    <a href="single-news.html?id=${article.id}" class="cards__link px-4"data-id="${article.id}"> مشاهده خبر  &larr;</a>
                </div>
            </div>
        
        `)
        ArticleFragment.appendChild(ArticleWrapper)
    })
    ArticleContainer.appendChild(ArticleFragment)
}


// load page article
function loadPageArticle() {
    makeCardArticle()
}


// events
window.addEventListener('load', loadPageArticle)