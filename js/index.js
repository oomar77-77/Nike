let nextBtn = document.querySelector(".buttons button.next"),
    prevBtn = document.querySelector(".buttons button.prev"),
    logoImg = document.querySelector(".navbar-brand img"),
    Icon = document.querySelector('link[rel="icon"]'),
    correctLogoImgs = document.querySelectorAll(".title img"),
    navEle = document.querySelector("nav.navbar"),
    navLinks = document.querySelectorAll(".nav-link"),
    sectionArr = document.querySelectorAll("section , header"),
    latestContainer = document.querySelector("#Latest .content"),
    popupBoxes = document.querySelectorAll(".popup .box"),
    cartProducts = [],
    featuredContainer = document.querySelector("#Featured .content .row"),
    loadingpageEle = document.querySelector(".loadingpage");
homePage = document.querySelector("header");
checkScrollNav();




if (localStorage.getItem('cartProducts') == null) {
    updateLocalStorage();
} else {
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
}

nextBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector("#SC-Carousel .sc-carousel-inner .sc-carousel-item.active"),
        newSlide = currentSlide.nextElementSibling ?? document.querySelector(".sc-carousel-item:first-child");
    currentSlide.classList.remove("active");
    newSlide.classList.add("active");
    changeMainColor(newSlide.dataset.colorName);
    updateIconImg(newSlide.dataset.colorName);
    updateImg(newSlide.dataset.colorName, logoImg, `logo`);
    correctLogoImgs.forEach(function (correctImg) {
        updateImg(newSlide.dataset.colorName, correctImg, `correct`);
    });
});
prevBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector("#SC-Carousel .sc-carousel-inner .sc-carousel-item.active"),
        newSlide = currentSlide.previousElementSibling ?? document.querySelector(".sc-carousel-item:last-child");
    currentSlide.classList.remove("active");
    newSlide.classList.add("active");
    changeMainColor(newSlide.dataset.colorName);
    updateIconImg(newSlide.dataset.colorName);
    updateImg(newSlide.dataset.colorName, logoImg, `logo`);
    correctLogoImgs.forEach(function (correctImg) {
        updateImg(newSlide.dataset.colorName, correctImg, `correct`);
    });
});
window.addEventListener("scroll", function () {
    checkScrollNav();

    sectionArr.forEach(function (section) {
        updateNavLink(section.id);
    });
});
navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
        e.preventDefault();
        let currentLink = navEle.querySelector(".nav-link.active");
        currentLink.classList.remove('active');
        navLink.classList.add('active');
        let currentId = navLink.getAttribute('href'),
            currentSection = document.querySelector(currentId),
            topOfSection = currentSection.offsetTop,
            heightOfNav = navEle.clientHeight,
            sectionScrollTo = topOfSection - heightOfNav;
        window.scrollTo(0, sectionScrollTo);
    });
});




window.addEventListener("DOMContentLoaded", function () {
    loadingpageEle.classList.add('hide');
    setTimeout(function () {
        loadingpageEle.classList.add('d-none');
    }, 1000);
});

latest.forEach(function (product) {

    let isProductInCart = checkProductcart(product.id);
    latestContainer.innerHTML += ` 
<div
 class="product mainBorder p-3 rounded-3 mb-3 "
 data-selected-size = "${isProductInCart?.size ?? product.sizes[0]}"
 data-selected-color =  "${isProductInCart?.size ?? product.colors[0]}"
 data-product-id="${product.id}">
        <div class="row">
            <div
                class="col-lg-6 part1 d-flex align-items-center">
                <div class="item">
                    <div class="row h-100 align-items-center">
                        <div
                            class="col-md-2 col-xl-2 box1 h-100  d-flex flex-column justify-content-center">
                            <div
                                class="item h-100 d-flex flex-column justify-content-center">
                                <ul
                                    class="list-unstyled d-flex flex-row column-gap-3 flex-md-column row-gap-md-3 column-gap-md-0 align-items-md-center mb-md-4 mb-lg-0">
                                   ${prepareImagesList(product.images)}
                                </ul>
                            </div>
                        </div>
                        <div class=" col-md-10 col-xl-10  box2">
                            <div class="item">
                                <div class="selectedImg">
                                    <img
                                        src="./images/products/${product.images[0]}"
                                        alt="product1-1"
                                        class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 part2">
                <div class="item">
                    <h2 class="main-color fw-semibold"> ${product.name}
                        Shoes</h2>
                    <p class="vip">${product.description}</p>
                    <div class="price d-flex">
                        <div class="label me-3 ">
                            <h6>price :</h6>
                        </div>
                        <div class="value">
                           ${preparePrice(product.price, product.discount)}
                        </div>
                    </div>
                    <div class="size d-flex">
                        <div class="label me-3 ">
                            <h6>size :</h6>
                        </div>
                        <div class="value">
                            <ul
                                class="list-unstyled d-flex column-gap-2">
                               ${prepareSizesList(product.sizes, isProductInCart)}
                            </ul>
                        </div>
                    </div>
                </div>
                ${(isProductInCart == null) ?
            ` <button class="btn main-button" onclick="addToCart(${product.id}, this)">Add To
                    Cart</button>`:
            `<button class="btn main-button remove" onclick="removeFromCart(${product.id}, this)">Remove From
                Cart</button>`
        }
               
            </div>
        </div>
    </div>`
});

features.forEach(function (product) {
    featuredContainer.innerHTML += `
<div class="col-lg-3 col-sm-6">
        <div class="item">
            <div
                class="product bg-light rounded-3 px-3 py-4">
                <p class="discount ${(product.discount == 0) ? 'd-none' : ''} ">-${product.discount * 100}%</p>
                <div class="head">
                    <div class="selectedImg">
                        <img src="./images/products/${product.images[0]}"
                            alt="1-1" class="img-fluid">
                    </div>
                    <div class="cover">
                        <i
                            class=" fa-solid fa-magnifying-glass d-flex align-items-center justify-content-center" onclick="showProduct(${product.id})"></i>
                    </div>
                    <ul
                        class="list-unstyled d-flex align-items-center justify-content-center column-gap-2">
                       ${prepareLiList(product.images)}
                    </ul>
                </div>
                <div
                    class="body d-flex align-items-center justify-content-center flex-column">
                    <h5 class="fontText">${product.name}</h5>
                   ${preparePrice(product.price, product.discount)}
                </div>
            </div>
        </div>
    </div>`
});


popupBoxes.forEach(function (box) {
    box.addEventListener('click', function (e) {
        e.stopPropagation();
    })
})



