$(document).ready(function() {
    var addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    var productNameElements = document.querySelectorAll('.productName');
    var cartOrderAmtElements = document.querySelectorAll('.productPrice');
    var cartAlert = document.querySelector('.cart-alert');


    addToCartBtns.forEach(function(addToCartBtn, cartIndex){

        addToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();
        cartAlert.classList.add('active');
        setTimeout(function() {
            cartAlert.classList.remove('active');
          }, 1800);
        var productName =(productNameElements[cartIndex].textContent);
        var cartOrderAmtText = cartOrderAmtElements[cartIndex].textContent;
      var cartOrderAmt = parseInt(cartOrderAmtText) || 0; // Default to 0 if not a number
        
        
        var newOrder = new Object();
        newOrder.name = productName
        newOrder.amount = cartOrderAmt

        var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

        cartItems.push(newOrder);

        localStorage.setItem("CartItems", JSON.stringify(cartItems))

  displayCartItems();

    })
})
});


// EMPTY CART
var emptyCart = document.getElementById('empty-cart');
emptyCart.addEventListener('click', () => {
    var confirmEmpty = confirm('Are you sure you want to empty the cart?');
    if (confirmEmpty) {
        localStorage.removeItem("CartItems");
        displayCartItems();
    }
});

// DISPLAYING ITEMS IN CART
function displayCartItems() {
    // Get the cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

    // Get the container element
    var container = document.getElementById('cart-items');
    var totalAmountElement = document.getElementById('total-amount');
    var totalAmount = 0;

    // Clear the container first
    container.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = '<img style="opacity: 0.5; margin-top: 100px;" src="https://foreverliving.gr/static/img/cartEmpty.png" alt="Cart is empty">';
        totalAmountElement.style.display = 'none';
    } else {
        // Iterate over the cart items and create HTML for each item
        cartItems.forEach(function(item) {
            var itemHtml = `
            <div class="cart-item d-flex justify-content-between px-2">
            <span>${item.name}</span>
            <span>${item.amount.toFixed(2)}</span></div><hr>`;
            container.insertAdjacentHTML('beforeend', itemHtml);
            totalAmount += item.amount;
        });

        // Display the total amount
        totalAmountElement.innerHTML = `<span>Total:</span><span class="float-end">$${totalAmount.toFixed(2)}</span>`;
        totalAmountElement.style.display = 'block';
    }

    // Add click event listener to 'place-order' button if not already added
    var placeOrderButton = document.getElementById('place-order');
    if (totalAmount==0) {
        placeOrderButton.addEventListener('click', () => {
            document.getElementById('order-card').innerHTML = `<div class="bg-white p-5 fw-3 fs-5" id="order-card-content">
            <div class="btn btn-lg d-block float-end" id="close-order-card">OK</div>
            Your total is <span class="text-danger fw-3 fs-5">$${totalAmount.toFixed(2)}</span> <br>Please fill the cart</div>`;
            document.getElementById('order-card').style.display = 'block'
            closeOrderCard();
          });
        }
        else{
            placeOrderButton.addEventListener('click', () => {
                document.getElementById('order-card').innerHTML = `<div class="bg-white p-5 fw-3 fs-5" id="order-card-content">
                <div class="btn btn-lg d-block float-end" id="close-order-card">OK</div>
                Your total is <span class="text-success fw-3 fs-5">$${totalAmount.toFixed(2)}</span> <br>Order has been placed!</div>`;
                document.getElementById('order-card').style.display = 'block'
                closeOrderCard();
              });
            //   placeOrderButton.setAttribute('data-event-added', 'true');
        }
        closeOrderCard();
}

// Function to close the order card
function closeOrderCard() {
    var closeBtn = document.getElementById('close-order-card');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('order-card').style.display = 'none';
        });
    }
}

// Call the function to display the cart items when the page loads
displayCartItems();
closeOrderCard();