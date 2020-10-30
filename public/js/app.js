// $(document).ready(function () {
//   $('.btn-add-1').click(function () {
//     console.log('tes');
//     $.ajax({
//       url: '/add-to-cart',
//       success: function (result) {
//         result.map((i) => {
//           const count = 1;
//           $('table tbody tr:last').after(
//             `<tr>
//             <td>${i.product_name}</td>
//             <td>${count}</td>
//             <td>${i.product_price}</td>
//             <td id="total-price">${i.product_price * count}</td>
//             </tr>`
//           );
//           const grand = i.product_price * count;
//           $('#grand-total').text(grand);
//         });
//       },
//     });
//   });
// });

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

let total_price = 0;

function countTotalPricePlus(price) {
  total_price += price;
  $('#grand-total').text(formatNumber(total_price));
}

function countTotalPriceMinus(price) {
  total_price -= price;
  $('#grand-total').text(formatNumber(total_price));
}

function btnPlus(id) {
  $(`#btnMinus-${id}`).prop('disabled', false);

  let qty = parseInt($(`#product-${id}-count`).val());
  qty += 1;
  $(`#product-${id}-count`).val(qty);

  let product_name = $(`#product-${id}-name`).text();
  let product_price = $(`#product-${id}-price`).text();

  if ($(`#product-name-order-${id}`).length) {
    $(`#product-qty-order-${id}`).text(qty);
    $(`#product-total-order-${id}`).text(formatNumber(product_price * qty));
    countTotalPricePlus(parseInt(product_price));
  } else {
    $('table tbody tr:last').after(
      `<tr>
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
    $('table tbody tr:last').remove();
    $(`#btnMinus-${id}`).prop('disabled', true);
  }
}
