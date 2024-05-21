import { Customers, Items } from "../Db/Db.js";


const loadDataTable = () => {
    $('#itemTableBody').empty();
    Items.forEach(item => {
        const row = `<tr>
        <td>${item.itemCode}</td>
        <td>${item.itemName}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        </tr>`;
        $('#itemTableBody').append(row);
    });
}
function updateCustomerIDs() {
    $('#selectCus_ID').empty();
    const defaultOption = document.createElement("option");

    defaultOption.text = "";
    $('#selectCus_ID').append(defaultOption);

    Customers.forEach(customer => {
        const option = document.createElement("option");
        option.value = JSON.stringify(customer);
        option.text = customer.customerId;
        $('#selectCus_ID').append(option);
    });
}
$('#selectCus_ID').on('focus', () => {
    updateCustomerIDs();
});
function updateItemIDs() {
    $('#select').empty();
    const defaultOption = document.createElement("option");

    defaultOption.text = "Select Item ID";
    $('#select').append(defaultOption);

    Items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.itemCode;
        option.text = item.itemCode;
        $('#select').append(option);
    });
}

$('#select').on('focus', () => {
    updateItemIDs();
});

$('#select').on('change', () => {
    const selectedOption = $('#select option:selected');

    if (selectedOption.length > 0) {
        const itemCode = selectedOption.val();
        const selectedItem = Items.find(item => item.itemCode === itemCode);

        $('#itemName').text(selectedItem.itemName);
        $('#itemQut').text(selectedItem.qty);
        $('#itemPrice').text(selectedItem.price);

        $('#quantity_placeOrder').focus();
    }
});
let lastOrderId = 0;
$("#Order_id").on('click', function () {
    lastOrderId++;
    $("#Order_id").val(lastOrderId);
});
$("#placeOrderBtnReset").on('click',function (){
    $("#selectCus_ID").val("");
    $("#select").val("");
    $("#itemName").text("");
    $("#itemQut").text("");
    $("#itemPrice").text("");
    $("#quantity_placeOrder").val("");
})
$("#btnAdd").on('click', function () {
    let item_id = $("#select").val();
    let quantity = parseInt($("#quantity_placeOrder").val());
    let unit_price = parseFloat($("#itemPrice").text());
    let total = quantity * unit_price;

    let existingRow = $(`#placeOrder-tbody tr[data-item-id="${item_id}"]`);

    let itemDbElement = Items.find(item => item.itemCode === item_id);

    if (existingRow.length) {
        let existingQuantity = parseInt(existingRow.find('.quantity').text());
        let newQuantity = existingQuantity + quantity;
        let newTotal = newQuantity * unit_price;

        if (itemDbElement && newQuantity <= itemDbElement.qty) {
            existingRow.find('.quantity').text(newQuantity);
            existingRow.find('.price').text(newTotal);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'The quantity is not enough!',
                text: 'Something went wrong!'
            });
        }
    } else {
        if (itemDbElement && itemDbElement.qty >= quantity) {
            let record = `
        <tr data-item-id="${item_id}">
            <td class="item_id">${item_id}</td>
            <td class="item_price">${unit_price}</td>
            <td class="quantity">${quantity}</td>
            <td class="price">${total}</td>
            <td class="button">
                <button class="removeButton" type="button">
                    <i class="fa-brands fa-remove"></i>
                </button>
            </td>
        </tr>`;

            $("#placeOrder-tbody").append(record);
            ClearFields();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'We Don\'t have that much Quantity!',
                text: 'Something went wrong!'
            });
        }
    }

    let netTot = 0;

    function updateNetTotal() {
        netTot = 0;
        $("#placeOrder-tbody tr").each(function() {
            netTot += parseFloat($(this).find('.price').text());
        });
        $("#tot").text(netTot.toFixed(2));
    }

    updateNetTotal();

    $(".removeButton").on("click", function() {
        $(this).closest('tr').remove();
        updateNetTotal();
    });


    $('#itemName').text("______________________________");
    $('#itemQut').text("_____________");
    $('#itemPrice').text("___________");
});
$("#place_Order").on('click',()=>{
    let amount = parseFloat($('#amount').val());
    let netTotal = parseFloat($('#tot').text());

    $("#placeOrder-tbody tr").each(function() {
        let quantity = parseFloat($(this).find('.quantity').text());
        let item_id = $(this).find('.item_id').text();

        let index = Items.findIndex(item => item.itemCode === item_id);

        if (index !== -1) {
            let newQuantity = Items[index].qty - quantity;

            if (newQuantity >= 0) {
                Items[index].qty = newQuantity;
            } else {
                // Handle the case where the new quantity would be negative (out of stock)
                console.log("Error: Not enough quantity in stock for item with ID " + item_id);
            }
        } else {
            console.log("Item not found in item_db.");
        }
    });

    if (amount >= netTotal) {
        let cash = amount - netTotal;
        Swal.fire({
            icon: 'success',
            title: `Order Successful! \n Cash: ${cash.toFixed(2)}`,
            showConfirmButton: true
        });
       clearPlaceOrderTable();

        let date = $('#currentDateTime').text();
        let orderID = $('#Order_id').text();
        let cusID = $('#selectCus_ID').val();

        let recode = `<tr>
            <td class='OrderId'>${orderID}</td>
            <td class='customerId'>${cusID}</td>
            <td class='date'>${date}</td>
            <td class='net_total'>${netTotal}</td>
</tr>`
        $("#tblSearchOrder").append(recode);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'The amount is not enough!',
            text: 'Something went wrong!'
        });
    }
    loadDataTable();
});

function ClearFields() {
    $("#selectCus_ID").val("");
    $("#select").val("");
    $("#itemName").text("");
    $("#itemQut").text("");
    $("#itemPrice").text("");
    $("#quantity_placeOrder").val("");
}
window.onload = () => {
    updateCustomerIDs();
    updateItemIDs();
}
function clearPlaceOrderTable() {
    $('#placeOrder-tbody').empty();
    $('#tot').text(0.0);
    $('#amount').val("");
}
