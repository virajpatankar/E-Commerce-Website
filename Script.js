/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        brand: "Samsung",
        name: "Galaxy A56 5G",
        price: 34999,
        oldPrice: 38999,
        rating: 4.6,
        specs: "8GB RAM • 128GB • AMOLED",
        badge: "BEST SELLER",
        image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 2,
        brand: "Apple",
        name: "iPhone 16",
        price: 69999,
        oldPrice: 74999,
        rating: 4.8,
        specs: "128GB • A18 Chip • 48MP",
        badge: "HOT",
        image:
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 3,
        brand: "OnePlus",
        name: "OnePlus 13 5G",
        price: 69999,
        oldPrice: 74999,
        rating: 4.7,
        specs: "12GB RAM • 256GB • 6000mAh",
        badge: "NEW",
        image:
        "https://images.unsplash.com/photo-1609252925148-b0f1b8e1d1e7?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 4,
        brand: "Google",
        name: "Pixel 9",
        price: 74999,
        oldPrice: 79999,
        rating: 4.5,
        specs: "12GB RAM • 256GB • AI Camera",
        badge: "AI PICK",
        image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 5,
        brand: "Samsung",
        name: "Galaxy S25",
        price: 80999,
        oldPrice: 85999,
        rating: 4.7,
        specs: "12GB RAM • 256GB • AMOLED",
        badge: "PREMIUM",
        image:
        "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 6,
        brand: "Apple",
        name: "iPhone 16 Pro",
        price: 109999,
        oldPrice: 119999,
        rating: 4.9,
        specs: "128GB • Pro Camera • Titanium",
        badge: "PRO",
        image:
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 7,
        brand: "OnePlus",
        name: "OnePlus 13R",
        price: 42999,
        oldPrice: 47999,
        rating: 4.6,
        specs: "12GB RAM • 256GB • 6000mAh",
        badge: "DEAL",
        image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: 8,
        brand: "Google",
        name: "Pixel 9 Pro",
        price: 99999,
        oldPrice: 109999,
        rating: 4.8,
        specs: "16GB RAM • 256GB • Pro AI",
        badge: "TOP RATED",
        image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85"
    }

];


/* ================= VARIABLES ================= */

let cart =
    JSON.parse(
        localStorage.getItem("novacart_cart")
    ) || [];


let activeCategory = "All";


const productGrid =
    document.getElementById("productGrid");


const resultCount =
    document.getElementById("resultCount");


const emptyState =
    document.getElementById("emptyState");


const cartPanel =
    document.getElementById("cartPanel");


const overlay =
    document.getElementById("overlay");


const cartItems =
    document.getElementById("cartItems");


const cartEmpty =
    document.getElementById("cartEmpty");


const subtotal =
    document.getElementById("subtotal");


const cartCount =
    document.getElementById("cartCount");


/* ================= MONEY ================= */

function money(amount) {

    return "₹" +
        amount.toLocaleString("en-IN");

}


/* ================= DISPLAY PRODUCTS ================= */

function renderProducts(list = products) {

    productGrid.innerHTML = "";

    resultCount.textContent =
        `${list.length} products`;


    if (list.length === 0) {

        emptyState.classList.remove("hidden");

        return;

    }


    emptyState.classList.add("hidden");


    list.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span class="badge">
                    ${product.badge}
                </span>

                <button class="heart">
                    ♡
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="brand">
                    ${product.brand}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="spec">
                    ${product.specs}
                </p>

                <div class="rating">

                    ⭐ ${product.rating}

                    <span class="muted">
                        • 1.2k reviews
                    </span>

                </div>


                <div class="price-row">

                    <div>

                        <span class="price">
                            ${money(product.price)}
                        </span>

                        <span class="old">
                            ${money(product.oldPrice)}
                        </span>

                    </div>


                    <button
                        class="add-btn"
                        data-id="${product.id}"
                    >
                        Add +
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(card);

    });

}


/* ================= CART ================= */

function saveCart() {

    localStorage.setItem(
        "novacart_cart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.qty++;

    }

    else {

        cart.push({
            id: id,
            qty: 1
        });

    }


    saveCart();

    renderCart();

    openCart();

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.qty += change;


    if (item.qty <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    renderCart();

}


/* ================= RENDER CART ================= */

function renderCart() {

    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        if (!product) return;


        total +=
            product.price * item.qty;


        count += item.qty;


        const row =
            document.createElement("div");


        row.className =
            "cart-item";


        row.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${money(product.price)}
                </p>


                <div class="qty">

                    <button
                        data-minus="${product.id}"
                    >
                        −
                    </button>

                    <b>
                        ${item.qty}
                    </b>

                    <button
                        data-plus="${product.id}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove"
                    data-remove="${product.id}"
                >
                    Remove
                </button>

            </div>


            <strong>
                ${money(
                    product.price *
                    item.qty
                )}
            </strong>

        `;


        cartItems.appendChild(row);

    });


    cartCount.textContent = count;

    subtotal.textContent =
        money(total);


    document.getElementById(
        "checkoutTotal"
    ).textContent = money(total);


    if (cart.length === 0) {

        cartEmpty.classList.remove(
            "hidden"
        );

    }

    else {

        cartEmpty.classList.add(
            "hidden"
        );

    }

}


/* ================= OPEN CART ================= */

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.remove("hidden");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    cartPanel.classList.remove("open");

    overlay.classList.add("hidden");

}


/* ================= SEARCH ================= */

function filterProducts() {

    const desktopSearch =
        document.getElementById(
            "searchInput"
        ).value;


    const mobileSearch =
        document.getElementById(
            "mobileSearchInput"
        ).value;


    const query =
        (
            desktopSearch ||
            mobileSearch
        )
        .toLowerCase()
        .trim();


    const filtered =
        products.filter(product => {

            const categoryMatch =
                activeCategory === "All" ||
                product.brand ===
                activeCategory;


            const searchMatch =
                !query ||

                (
                    product.brand +
                    " " +
                    product.name +
                    " " +
                    product.specs
                )
                .toLowerCase()
                .includes(query);


            return (
                categoryMatch &&
                searchMatch
            );

        });


    renderProducts(filtered);

}


/* ================= CATEGORY ================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                this.classList.add(
                    "active"
                );


                activeCategory =
                    this.dataset.category;


                filterProducts();

            }
        );

    });


/* ================= ADD TO CART ================= */

document.addEventListener(
    "click",
    function(event) {

        const addButton =
            event.target.closest(
                ".add-btn"
            );


        if (addButton) {

            addToCart(
                Number(
                    addButton.dataset.id
                )
            );

        }


        const plus =
            event.target.closest(
                "[data-plus]"
            );


        if (plus) {

            changeQuantity(
                Number(
                    plus.dataset.plus
                ),
                1
            );

        }


        const minus =
            event.target.closest(
                "[data-minus]"
            );


        if (minus) {

            changeQuantity(
                Number(
                    minus.dataset.minus
                ),
                -1
            );

        }


        const remove =
            event.target.closest(
                "[data-remove]"
            );


        if (remove) {

            cart =
                cart.filter(
                    item =>
                        item.id !==
                        Number(
                            remove.dataset.remove
                        )
                );


            saveCart();

            renderCart();

        }

    }
);


/* ================= SEARCH EVENTS ================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        filterProducts
    );


document
    .getElementById("mobileSearchInput")
    .addEventListener(
        "input",
        function() {

            document.getElementById(
                "searchInput"
            ).value = this.value;


            filterProducts();

        }
    );


/* ================= CART EVENTS ================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


/* ================= DEALS ================= */

document
    .getElementById("viewDeals")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ================= CHECKOUT ================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.remove(
                    "hidden"
                );


            closeCart();

        }
    );


/* ================= CLOSE CHECKOUT ================= */

document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.add(
                    "hidden"
                );

        }
    );


/* ================= PLACE ORDER ================= */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value;


            const payment =
                document.getElementById(
                    "payment"
                ).value;


            const orderId =
                "NC" +
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                );


            document.getElementById(
                "orderId"
            ).textContent =
                orderId;


            document.getElementById(
                "orderMessage"
            ).textContent =
                `Thanks ${name}! Your ${payment} order has been placed successfully.`;


            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.add(
                    "hidden"
                );


            document
                .getElementById(
                    "successModal"
                )
                .classList.remove(
                    "hidden"
                );


            cart = [];


            saveCart();

            renderCart();


            this.reset();

        }
    );


/* ================= CONTINUE SHOPPING ================= */

document
    .getElementById(
        "continueShopping"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "successModal"
                )
                .classList.add(
                    "hidden"
                );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


/* ================= MOBILE MENU ================= */

document
    .getElementById("menuBtn")
    .addEventListener(
        "click",
        function() {

            document
                .querySelector(
                    ".mobile-search"
                )
                .classList.toggle(
                    "hidden"
                );

        }
    );


/* ================= INITIAL LOAD ================= */

renderProducts();

renderCart();