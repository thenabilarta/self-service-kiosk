// Init total price text
let total_price = parseInt($('#grand-total').text());

// Formatting the number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Disable check order after click
$('.btn-check-order').click(function () {
  $('.btn-check-order').prop('disabled', true);

  $.ajax({
    url: '/get-order',
    success: function (result) {
      result.map((i) => {
        // Check if product already exist on the order table
        if ($(`#product-name-order-${i.id}`).length) {
          console.log('tes');
          // get qty of product from main table
          let qty = parseInt($(`#product-${i.id}-count`).val());

          // add qty of product
          qty += i.product_qty;

          // Update count on main and order table
          $(`#product-${i.id}-count`).val(qty);
          $(`#product-qty-order-${i.id}`).text(qty);

          // update total price of product on order table
          let total_price_product = qty * i.product_price;
          $(`#product-total-order-${i.id}`).text(
            formatNumber(total_price_product)
          );

          // Add total price of product to grand total
          countTotalPricePlus(i.product_price * i.product_qty);
        } else {
          // if product doesn't exist on the order table, add row
          $('table tbody tr:last').after(
            `<tr id="table-row-${i.id}">
              <td id="product-name-order-${i.id}">${i.product_name}</td>
              <td id="product-qty-order-${i.id}">${i.product_qty}</td>
              <td>${formatNumber(i.product_price)}</td>
              <td id="product-total-order-${i.id}">${formatNumber(
              i.product_price * i.product_qty
            )}</td>
            </tr>`
          );

          // Add total price of product to grand total
          countTotalPricePlus(i.product_price * i.product_qty);
        }

        //  Update total count on the main table
        $(`#product-${i.id}-count`).val(i.product_qty);

        // Enable minus total count on the main table
        $(`#btnMinus-${i.id}`).prop('disabled', false);
      });
    },
  });
});

function countTotalPricePlus(price) {
  total_price += price;
  $('#grand-total').text(formatNumber(total_price));
}

function countTotalPriceMinus(price) {
  total_price -= price;
  $('#grand-total').text(formatNumber(total_price));
}

function btnPlus(id) {
  // enable minus button
  $(`#btnMinus-${id}`).prop('disabled', false);

  // add value to product menu
  let qty = parseInt($(`#product-${id}-count`).val());
  qty += 1;
  $(`#product-${id}-count`).val(qty);

  // Get value of product menu
  let product_name = $(`#product-${id}-name`).text();
  let product_price = $(`#product-${id}-price`).text();

  // Insert data from product menu to order panel
  if ($(`#product-name-order-${id}`).length) {
    $(`#product-qty-order-${id}`).text(qty);
    $(`#product-total-order-${id}`).text(formatNumber(product_price * qty));
    countTotalPricePlus(parseInt(product_price));
  } else {
    $('table tbody tr:last').after(
      `<tr id="table-row-${id}">
        <td id="product-name-order-${id}">${product_name}</td>
        <td id="product-qty-order-${id}">${qty}</td>
        <td>${formatNumber(product_price)}</td>
        <td id="product-total-order-${id}">${formatNumber(
        product_price * qty
      )}</td>
      </tr>`
    );
    countTotalPricePlus(parseInt(product_price));
  }
}

function btnMinus(id) {
  let qty = parseInt($(`#product-${id}-count`).val());
  if (qty > 0) {
    qty -= 1;
  }
  $(`#product-${id}-count`).val(qty);

  let product_price = $(`#product-${id}-price`).text();

  if ($(`#product-name-order-${id}`).length) {
    $(`#product-qty-order-${id}`).text(qty);
    $(`#product-total-order-${id}`).text(formatNumber(product_price * qty));
    countTotalPriceMinus(parseInt(product_price));
  }

  if (qty === 0) {
    $(`#table-row-${id}`).remove();
    $(`#btnMinus-${id}`).prop('disabled', true);
  }
}
