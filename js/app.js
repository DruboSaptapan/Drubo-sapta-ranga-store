const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  /* show ratings in the UI */

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;

    // const productRatingOutput = rateProduct(product.rating.rate)

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div class="my-3">
        <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Rate: ${product.rating.rate}</p>
      
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }

  // function rateProduct(rating) {
  //   console.log(rating)
  //   let star = `<i class="fas fa-star"></i>`
  //   let halfStar = `<i class="fas fa-star-half-alt"></i>`
    
  //   let productRating = 1;
  //   productRating == 5 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}`
  //   : productRating >= 4.5 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}${halfStar}`
  //   : productRating == 4 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}`
  //   : productRating >= 3.5 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}${halfStar}`
  //   : productRating == 3 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}`
  //   : productRating >= 2.5 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}${halfStar}`
  //   : productRating == 2 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}`
  //   : productRating >= 1.5 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}${halfStar}`
  //   : productRating == 1 ?document.getElementById('rating').innerHTML = `${star.repeat(rating)}`
  //   :`${halfStar}`
  // }

};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  // console.log(grandTotal)
};