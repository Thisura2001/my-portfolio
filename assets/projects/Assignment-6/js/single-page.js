
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
$("#nav-orders").on('click',function (){
    $("#home").css({display:'none'})
    $("#customer").css({display:'none'})
    $("#items").css({display:'none'})
    $("#orders").css({display:'block'})
});