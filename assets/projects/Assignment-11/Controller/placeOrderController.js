import { Customers, Items,Orders } from "../Db/Db.js";
import PlaceOrderModel from "../Model/PlaceOrderModel.js";
import ItemModel from "../Model/ItemModel.js";
import CustomerModel from "../Model/ItemModel.js";


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

    defaultOption.text = "Select Customer ID";
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
$("#placeOrderBtnReset").on('click',function (){
    $("#selectCus_ID").val("");
    $("#select").val("");
    $("#itemName").text("");
    $("#itemQut").text("");
    $("#itemPrice").text("");
    $("#quantity_placeOrder").val("");
})
let currentOrderId = Orders.length > 0 ? String(Number(Orders[Orders.length - 1].order_id) + 1).padStart(3, '0') : '001';

// Function to generate the next order ID
function generateOrderId() {
    const nextOrderId = currentOrderId;
    currentOrderId = String(Number(currentOrderId) + 1).padStart(3, '0');
    return nextOrderId;
}

$("#Order_id").val(generateOrderId());
$("#btnAdd").on('click', function () {
    let item_id = $("#select").val();
    let quantity = parseInt($("#quantity_placeOrder").val());
    let unit_price = parseFloat($("#itemPrice").text());
    let total = quantity * unit_price;
    let discount = total * 0.20;

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
        $("#dis").text("The amount saved by the 20% discount: = Rs."+(netTot * 0.20).toFixed(2));
        $("#final").text("New Total Rs:"+(netTot - (netTot * 0.20)).toFixed(2));
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
$("#place_Order").on('click', () => {
    let amount = parseFloat($('#amount').val());
    let netTotal = parseFloat($('#tot').text());
    let discount = netTotal * 0.20; // Calculate 20% discount
    let order_id = $("#Order_id").val();
    let finalTotal = netTotal - discount; // Calculate final total after discount
    let orderItems = [];

    if (amount >= finalTotal) {
        $("#placeOrder-tbody tr").each(function () {
            let quantity = parseFloat($(this).find('.quantity').text());
            let item_id = $(this).find('.item_id').text();
            let unit_price = parseFloat($(this).find('.item_price').text());
            let total = parseFloat($(this).find('.price').text());

            let index = Items.findIndex(item => item.itemCode === item_id);

            if (index !== -1) {
                let newQuantity = Items[index].qty - quantity;

                if (newQuantity >= 0) {
                    Items[index].qty = newQuantity;
                    // Collect item details for the order
                    orderItems.push({
                        item_id: item_id,
                        unit_price: unit_price,
                        quantity: quantity,
                        total: total
                    });
                } else {
                    console.log("Error: Not enough quantity in stock for item with ID " + item_id);
                }
            } else {
                console.log("Item not found in item_db.");
            }
        });

        let newOrder = new PlaceOrderModel(order_id, orderItems, netTotal, discount, finalTotal);
        Orders.push(newOrder);

        let cash = amount - finalTotal;
        Swal.fire({
            icon: 'success',
            title: `Order Successful! \n Cash: ${cash.toFixed(2)}`,
            showConfirmButton: true
        });

        $("#Order_id").val(generateOrderId());
        clearPlaceOrderTable();
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
    $('#dis').text("");
    $('#final').text("");
}
