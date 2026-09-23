function changeMainColor(colorName) {
    let html = document.querySelector("html");
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
    html.style.setProperty(`--main-color`, newColor)
}
function updateIconImg(imgName) {
    let currentSrc = logoImg.src,
        currentSrcArr = currentSrc.split(`/`),
        newSrc;
    currentSrcArr[currentSrcArr.length - 1] = `${imgName}-logo.png`;
    newSrc = currentSrcArr.join(`/`);
    Icon.setAttribute(`href`, newSrc);
};
function updateImg(imgName, imgEle, commonName) {
    let currentSrc = imgEle.src,
        currentSrcArr = currentSrc.split(`/`),
        newSrc;
    currentSrcArr[currentSrcArr.length - 1] = `${imgName}-${commonName}.png`;
    newSrc = currentSrcArr.join(`/`);
    imgEle.setAttribute(`src`, newSrc);
};


function checkScrollNav() {
    if (window.scrollY > 10) {
        navEle.classList.add("scrolled");
    }
    else {
        navEle.classList.remove("scrolled");
    }
}
function updateNavLink(sectionId) {
    let section = document.querySelector(`#${sectionId}`);
    let sectionTop = section.offsetTop - navEle.clientHeight;
    let sectionBottom = sectionTop + section.clientHeight;

    if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
        let navlinkOfSection = document.querySelector(`a[href="#${sectionId}"]`);
        let currentLink = document.querySelector(".nav-link.active");
        if (currentLink !== navlinkOfSection) {
            currentLink.classList.remove("active");
            navlinkOfSection.classList.add("active");
        }
    }
}


function prepareImagesList(imagesList, isProduct = false) {
    let liElements = "";
    imagesList.forEach(function (image) {
        liElements += `<li
                                        class="${(isProduct) ? '' : 'mainBorder rounded-3'} p-2 "><img
                                            src="./images/products/${image}"
                                            alt="product1-1"
                                            class="img-fluid" onclick="changeSelectedImg('${image}' , this)"></li>`
    });


    return liElements;
}


function preparePrice(price, discount) {
    return `
    <p class="mb-0">
                <span
        class="main-color text-decoration-line-through ${(discount == 0) ? 'd-none' : ''}">
        ${price}<sup>$</sup></span>
        <span>
        ${(price * (1 - discount)).toFixed(2)}<sup>$</sup></span>

    </p>`;
}


function prepareSizesList(sizesList, isProductInCart = null) {
    let liElements = "";
    sizesList.forEach(function (size, index) {
        if (isProductInCart == null) {
            liElements += `
            <li
                class="main-button ${(index == 0) ? 'active' : ''}"
                onclick="changeActive(this); updateSize('${size}', this);">
                ${size}
            </li>
        `;
        } else {
            liElements += `
            <li
                class="main-button ${(isProductInCart.size == size) ? 'active' : ''}"
                onclick="changeActive(this); updateSize('${size}', this);">
                ${size}
            </li>
        `;
        }

    });

    return liElements;
}

function prepareColorssList(colorsList, isProductInCart = null) {

    let liElements = "";
    colorsList.forEach(function (color, index) {
        if (isProductInCart == null) {
            liElements += `   <li class="main-button rounded-circle ${(index == 0) ? 'active' : ''}"
                                            onclick="changeActive(this); updateColor('${color}', this);"
                                            style="background-color:${color};"></li>`

        } else {
            liElements += `   <li class="main-button rounded-circle ${(isProductInCart.color == color) ? 'active' : ''}"
                                            onclick="changeActive(this); updateColor('${color}', this);"
                                            style="background-color:${color};"></li>`
        }

    });

    return liElements;
}

function prepareLiList(imagesList) {
    let liElements = "";
    imagesList.forEach(function (image, index) {
        liElements += `<li
                            class="main-button rounded-circle ${(index == 0) ? 'active' : ''}" onclick="changeSelectedImg('${image}' , this); changeActive(this)"></li>`
    });


    return liElements;
}


function changeSelectedImg(imgName, that) {
    let selectedImg = that.closest('.product').querySelector(".selectedImg img");
    srcArr = selectedImg.src.split('/');
    srcArr[srcArr.length - 1] = imgName;
    selectedImg.setAttribute('src', srcArr.join('/'));
}

function changeActive(that) {
    let currentActive = that.parentElement.querySelector(".active");
    currentActive.classList.remove("active");
    that.classList.add("active");
}

function openPopup(popupName) {
    let popupEle = document.querySelector(`.popup[data-popup-name = "${popupName}"]`);
    popupEle.classList.add('active');
    setTimeout(function () {
        popupEle.classList.add('show');
    }, 1);
}

function closePopUp() {
    let popupEle = document.querySelector('.popup.active');
    popupEle.classList.remove('show');
    setTimeout(function () {
        popupEle.classList.remove('active');
    }, 1);
}
function getProduct(productId) {
    return products.filter(product => product.id == productId)[0];
}

function checkProductcart(productId) {
    let result = cartProducts.filter((product) => product.id == productId);
    return result.length == 1 ? result[0] : null;
}

function showProduct(productId) {
    let isProductInCart = checkProductcart(productId);

    let product = getProduct(productId),
        popupProduct = document.querySelector('.popup[data-popup-name="product"] .box');

    popupProduct.innerHTML = `<div 
    class="row product"
    data-selected-size = "${isProductInCart?.size ?? product.sizes[0]}"
 data-selected-color = "${isProductInCart?.color ?? product.colors[0]}">
                    <div class="col-md-6">
                        <div class="item">
                            <div class="selectedImg">
                                <img src="./images/products/${product.images[0]}" alt="1-1"
                                    class="img-fluid">
                            </div>
                            <ul class="list-unstyled d-flex mb-0">
                               ${prepareImagesList(product.images, true)}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="item">
                            <h4>${product.name}</h4>
                           ${preparePrice(product.price, product.discount)}
                            <hr>
                            <p>${product.description}</p>
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
                            <div class="color d-flex">
                                <div class="label me-3 ">
                                    <h6>size :</h6>
                                </div>
                                <div class="value">
                                    <ul
                                        class="list-unstyled d-flex column-gap-2">
                                       ${prepareColorssList(product.colors, isProductInCart)}
                                    </ul>
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
                </div>`;
    openPopup('product');
}
function addToCart(productId, that) {
    let productEle = that.closest('.product');
    let newOrder = {
        id: productId,
        size: productEle.dataset.selectedSize,
        color: productEle.dataset.selectedColor,
    };
    cartProducts.push(newOrder);
    updateLocalStorage();
    toggleOrderBtn(that, 'remove');
    that.setAttribute('onclick', `removeFromCart(${productId} , this)`);
}


function removeFromCart(productId, that) {
    cartProducts = cartProducts.filter((product) => product.id != productId);
    updateLocalStorage();
    toggleOrderBtn(that, 'add');
    that.setAttribute('onclick', `addToCart(${productId} , this)`);
}

function toggleOrderBtn(btn, status) {
    if (status == 'add') {
        btn.classList.remove('remove');
        btn.textContent = 'Add To Cart';

    } else if (status == 'remove') {
        btn.classList.add('remove');
        btn.textContent = 'Remove From Cart';
    }
}

function updateLocalStorage() {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

function updateSize(size, that) {
    let productEle = that.closest('.product');
    productEle.dataset.selectedSize = size;
}
function updateColor(color, that) {
    let productEle = that.closest('.product');
    productEle.dataset.selectedColor = color;
}
function showCart() {

    let productPopupEle = document.querySelector('.popup[data-popup-name="shop"] .row');

    if (cartProducts.length == 0) {
        productPopupEle.innerHTML = `<p class="alert alert-warning text-center">There are no products</p>`;
        openPopup('shop');
        return;
    }
    productPopupEle.innerHTML = "";
    cartProducts.forEach(function (cartProduct) {

        let product = getProduct(cartProduct.id);

        productPopupEle.innerHTML += `
            <div class="col-sm-6 col-lg-4 mb-3">
                <div class="item">

                    <div 
                        class="product bg-light px-3 py-4 rounded-3" 
                        data-product-id="${product.id}"
                    >

                        <img 
                            src="./images/products/${product.images[0]}"
                            alt="1-1"
                            class="img-fluid"
                        >

                        <h5>${product.name.slice(0, 10)}...</h5>

                        <div class="price d-flex">
                            <div class="label me-3">
                                <h6>price :</h6>
                            </div>

                            <div class="value">
                                ${preparePrice(product.price, product.discount)}
                            </div>
                        </div>

                        <div class="size d-flex">
                            <div class="label me-3">
                                <h6>size :</h6>
                            </div>

                            <div class="value">
                                <ul class="list-unstyled d-flex column-gap-2">
                                    ${prepareSizesList([cartProduct.size])}
                                </ul>
                            </div>
                        </div>

                        <div class="color d-flex">
                            <div class="label me-3">
                                <h6>color :</h6>
                            </div>

                            <div class="value">
                                <ul class="list-unstyled d-flex column-gap-2">
                                    ${prepareColorssList([cartProduct.color])}
                                </ul>
                            </div>
                        </div>

                        <button 
                            class="btn btn-danger w-100 mt-3" 
                            onclick="removeFromShop(${product.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            </div>
        `;
    });
    openPopup('shop');
}
function removeFromShop(productId) {
    let productEle = document.querySelector(
        `.popup[data-popup-name="shop"] .row .product[data-product-id="${productId}"]`
    );
    let latestProductBtn = document.querySelector(
        `#Latest .product[data-product-id="${productId}"] button`
    );
    if (productEle) {
        productEle.parentElement.parentElement.remove();
    }
    cartProducts = cartProducts.filter(product => product.id != productId);
    updateLocalStorage();
    if (latestProductBtn) {
        latestProductBtn.classList.remove('remove');
        latestProductBtn.innerText = 'Add To Cart';
        latestProductBtn.setAttribute(
            'onclick',
            `addToCart(${productId}, this)`
        );
    }
    let productPopupEle = document.querySelector(
        '.popup[data-popup-name="shop"] .row'
    );

    if (cartProducts.length === 0 && productPopupEle) {
        productPopupEle.innerHTML = `
            <p class="alert alert-warning text-center">
                There are no products
            </p>
        `;
    }
}
