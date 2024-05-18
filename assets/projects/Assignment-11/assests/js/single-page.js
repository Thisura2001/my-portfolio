
$("#home").css({display:'block'})
$("#customer").css({display:'none'})
$("#items").css({display:'none'})
$("#orders").css({display:'none'})
$("#nav-home").on('click',function (){
    $("#home").css({display:'block'})
    $("#customer").css({display:'none'})
    $("#items").css({display:'none'})
    $("#orders").css({display:'none'})
});

$("#nav-customer").on('click',function (){
    $("#home").css({display:'none'})
    $("#customer").css({display:'block'})
    $("#items").css({display:'none'})
    $("#orders").css({display:'none'})
});
$("#nav-item").on('click',function (){
    $("#home").css({display:'none'})
    $("#customer").css({display:'none'})
    $("#items").css({display:'block'})
    $("#orders").css({display:'none'})
});
$("#nav-orders").on('click', ()=>{
    $("#home").css({display:'none'})
    $("#customer").css({display:'none'})
    $("#items").css({display:'none'})
    $("#orders").css({display:'block'})
});
function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    document.getElementById('currentDateTime').textContent = `${year}-${month}-${day}`;
}

// Update the date every day at midnight
function scheduleDateUpdate() {
    const now = new Date();
    const delay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    setTimeout(() => {
        updateDate();
        scheduleDateUpdate();
    }, delay);
}
updateDate();
scheduleDateUpdate();