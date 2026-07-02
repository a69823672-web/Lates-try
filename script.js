const productsContainer = document.getElementById("products");
const buttons = document.querySelectorAll(".category");

let allProducts = [];

async function loadProducts() {
    try {

        const response = await fetch("products/products.json");

        allProducts = await response.json();

        showProducts("همه");

    } catch (error) {

        productsContainer.innerHTML = `
            <div class="card">
                <div class="product-name">
                    منویی یافت نشد.
                </div>
            </div>
        `;

    }
}

function showProducts(category) {

    productsContainer.innerHTML = "";

    let list = allProducts;

    if (category !== "همه") {

        list = allProducts.filter(item => item.category === category);

    }

    if (list.length === 0) {

        productsContainer.innerHTML = `
            <div class="card">
                <div class="product-name">
                    آیتمی وجود ندارد.
                </div>
            </div>
        `;

        return;

    }

    list.forEach(item => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="product-name">
                ${item.name}
            </div>

            <div class="product-price">
                ${item.price} تومان
            </div>
        `;

        productsContainer.appendChild(card);

    });

}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        showProducts(button.dataset.category);

    });

});

loadProducts();
