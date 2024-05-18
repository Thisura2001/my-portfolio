import CustomerModel from "../Model/CustomerModel.js";
import {Customers, Items} from "../Db/Db.js";

let customerTableClicked;
function loadCustomerTable() {
    $("#CustomerTableBody").empty();
    Customers.forEach((item) => {
        var record = `<tr>
            <th scope="row" class="cusId">${item.customerId}</th>
            <td class="cusName">${item.customerName}</td>
            <td class="cusSalary">${item.salary}</td>
            <td class="cusAddress">${item.address}</td>
        </tr>`;
        $("#CustomerTableBody").append(record);
    });
}
const customerIdRegex = /^\d+$/; // Only digits allowed
const customerNameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
const salaryRegex = /^[\d.\s]+$/;
const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/; // Letters, digits, and some special characters allowed

// Event listener for the "Save Customer" button
$("#btnCustomerSave").on('click', function () {
    let customerId = $("#cus_id").val();
    let customerName = $("#name").val();
    let salary = $("#salary").val();
    let address = $("#address").val();

    if (!customerIdRegex.test(customerId)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Customer Id',
            text: 'Only digits are allowed.'
        })
        return;
    }
    if (!customerNameRegex.test(customerName)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Customer Name',
            text: 'Only letters and spaces are allowed.'
        })
        return;
    }
    if (!salaryRegex.test(salary)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Salary',
            text: 'Only numbers are allowed.'
        })
        return;
    }
    if (!addressRegex.test(address)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Address',
            text: 'Only letters, digits, and some special characters are allowed.'
        })
        return;
    }

    var CustomerObj = new CustomerModel(customerId, customerName, salary, address);
    Customers.push(CustomerObj);
       swal.fire({
           icon: 'success',
           title: 'Customer Added Successfully',
       });
    clearFields();
    loadCustomerTable();
});

$("#CustomerTableBody").on('click','tr',function (){
    let index = $(this).index();
    customerTableClicked = index;

    let customerId = $(this).find(".cusId").text();
    let customerName = $(this).find(".cusName").text();
    let salary = $(this).find(".cusSalary").text();
    let address = $(this).find(".cusAddress").text();

    $("#cus_id").val(customerId);
    $("#name").val(customerName);
    $("#salary").val(salary);
    $("#address").val(address);
});
$("#btnCustomerUpdate").on('click',function (){
    let customerId = $("#cus_id").val();
    let customerName = $("#name").val();
    let salary = $("#salary").val();
    let address = $("#address").val();

    if (!customerIdRegex.test(customerId)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Customer Id',
            text: 'Only digits are allowed.'
        })
        return;
    }
    if (!customerNameRegex.test(customerName)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Customer Name',
            text: 'Only letters and spaces are allowed.'
        })
        return;
    }
    if (!salaryRegex.test(salary)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Salary',
            text: 'Only numbers are allowed.'
        })
        return;
    }
    if (!addressRegex.test(address)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid Address',
            text: 'Only letters, digits, and some special characters are allowed.'
        })
        return;
    }

    Customers[customerTableClicked].customerName =customerName;
    Customers[customerTableClicked].salary =salary;
    Customers[customerTableClicked].address = address;
    swal.fire({
        icon: 'success',
        title: 'Customer Updated Successfully',
    })
    clearFields();
    loadCustomerTable();
});
$("#btnCustomerReset").on('click',function (){
    $("#cus_id").val("");
    $("#name").val("");
    $("#salary").val("");
    $("#address").val("");
});
$("#btnCustomerDelete").on('click',function (){
    Customers.splice(customerTableClicked,1);
    swal.fire({
        icon: 'success',
        title: 'Customer Deleted Successfully',
    })
    clearFields();
    loadCustomerTable();
});

function clearFields() {
    $("#cus_id").val("");
    $("#name").val("");
    $("#salary").val("");
    $("#address").val("");
}