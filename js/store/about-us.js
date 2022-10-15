let listTeam

// make card member of team
function makeCardMember() {
    let teamContainer = _querySelector('.team-container')
    let teamWrapper = _querySelector('.team-wrapper')
    let teamFragment = document.createDocumentFragment()
    teamWrapper.innerHTML = ''
    listTeam.forEach(function (member) {
        teamWrapper.insertAdjacentHTML('beforeend',
            `   
        <div class="col-9 col-sm-6 col-md-4">
            <div class="card position-relative">
                <img class="card-img-top" src="${member.imgSrc}" alt="${member.name} image">
                <div class="social card-img-overlay  ">
                    <svg class="social__icon">
                        <use xlink:href="../../fonts/sprite.svg#icon-instagram"></use>
                    </svg>
                    <svg class="social__icon">
                        <use xlink:href="../../fonts/sprite.svg#icon-telegram"></use>
                    </svg>
                    <svg class="social__icon">
                        <use xlink:href="../../fonts/sprite.svg#icon-linkedin2"></use>
                    </svg>
                </div>
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold fs-3">${member.name}</h4>
                    <p class="card-text">${member.role}</p>
                </div>
            </div>
        </div>
    `)
        teamFragment.appendChild(teamWrapper)
    })
    teamContainer.appendChild(teamFragment)
}


// make our team info Slider
function makeOurTeamInfoSlider() {

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


// slider header
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



// load page About fun
function loadAboutPage() {
    listTeam = getItemLocalStorage('list-team')
    if (!listTeam) {
        listTeam = []
    }
    makeOurTeamInfoSlider()
    makeCardMember()
}

// events
window.addEventListener('load', loadAboutPage)