
import { Customers, Items, Orders } from "../Db/Db.js";

// Function to clear the table
const clearTable = () => {
    $('#searchOrderTBody').empty();
};

// Function to load the data table based on the selected order ID
const loadDataTable = (orderId) => {
    // Fetch the customerId and date dynamically
    const date = $('#currentDateTime').text();
    console.log("Selected Order ID:", orderId);

    clearTable(); // Clear the table before loading new data

    Orders.forEach(order => {
        if (order.order_id === orderId) {
            const customer = Customers.find(Customers => Customers.customerId === order.customerId);
            const customerId = customer ? customer.customerId : '1';
            const row = `<tr>
                <td>${order.order_id}</td>
                <td>${customerId}</td>
                <td>${date}</td>
                <td>${order.finalTotal}</td>
            </tr>`;
            $('#searchOrderTBody').append(row);
        }
    });
};

// Function to populate order IDs in the dropdown
function getOrderId() {
    console.log("Orders:", Orders);

    if (!Array.isArray(Orders)) {
        console.error("Orders is not an array or not properly loaded");
        return;
    }

    const selectOrderId = $("#SelectOrderId");

    if (selectOrderId.length === 0) {
        console.error("#SelectOrderId element not found");
        return;
    }

    selectOrderId.empty();
    const defaultOption = $('<option>').text('Select Order ID').val('');
    selectOrderId.append(defaultOption);

    Orders.forEach(order => {
        const option = $('<option>').val(order.order_id).text(order.order_id);
        selectOrderId.append(option);
    });
}

$(document).ready(() => {
    $('#SelectOrderId').on('focus', () => {
        getOrderId();
    });

    $('#SelectOrderId').on('change', function() {
        const selectedOrderId = $(this).val();
        if (selectedOrderId) {
            loadDataTable(selectedOrderId);
        }
    });
    getOrderId();
});
