// Pack List Rank
$('body').on('click','*[data-pack_rank]',function(){
    var type = $(this).data("pack_rank");
    var order = $(this).data("rate");
    var items = $(".pack--list .pack--item");
    switch (type) {
        case "quantity":
            items.sort(function(a, b) {
                var aValue = $(a).data("quantity");
                var bValue = $(b).data("quantity");
                return order === "asc" ? aValue - bValue : bValue - aValue;
            });
            break;
        case "price":
            items.sort(function(a, b) {
                var aValue = $(a).data("price");
                var bValue = $(b).data("price");
                return order === "asc" ? aValue - bValue : bValue - aValue;
            });
            break;
        default:
            break;
    }
    $(".pack--list").empty().append(items);
});

function data_compilation(response){
    if(response.statu){
        if(response.balance_order){
            $('input[name="order[balance_token]"]').val(response.balance_order.token);
            $('.full-alert').addClass("show");
            $('.full-alert').find(".description").html(response.balance_order.text);
        }
        if(response.alert){
            console.log(response.alert);
            toastify_start({
                text: response.alert.text,
                duration: 3000,
                close: true,
                gravity: "top", 
                position: 'center', 
                stopOnFocus: true,
                class: response.alert.statu,
                style: {
                    background: response.alert.statu,
                },
            });
        }
        if(response.favorite_change){
            switch (response.favorite_change) {
                case 'delete':
                    $('*[data-favori_package="'+response.package_id+'"]').removeClass("active");
                    break;
                case 'add':
                    $('*[data-favori_package="'+response.package_id+'"]').addClass("active");
                    break;
            }
        }
        if(response.cart_add){
            $(".full-alert").addClass("show");
        }
        if(response.html_element){
            $('*[data-outhtml="'+response.html_element+'"]').html(response.html_output);
        }
        if(response.verify_email_adress){
            $('*[data-verify="mail"]').removeClass("d-block").addClass("d-none");
            $('*[data-verify="code"]').removeClass("d-none").addClass("d-block");
            $('*[data-verify="code"]').find('input[name="customer[mail]"]').val(response.verify_email_adress);
        }
        if(response.forgot_password_code){
            $('*[data-forgat="request"]').addClass("d-none");
            $('*[data-forgat="code"]').removeClass("d-none");
            $('input[name="customer[forgot_mail]"]').val(response.forgot_password_code);
        }
        if(response.forgot_password_new){            
            $('*[data-forgat="request"]').removeClass("d-none").attr("style","");
            $('*[data-forgat="code"]').removeClass("d-none").attr("style","");
            $('*[data-forgat="newpass"]').removeClass("d-none");
            $('*[data-forgat="newpass"]').find("b").html(response.forgot_password_new);
            setTimeout(function(){
                $('*[data-forgat="newpass"]').addClass("d-none").attr("style","");
                $('*[data-forgat="code"]').addClass("d-none").attr("style","");
                $('*[data-forgat="request"]').addClass("d-none").attr("style","");
            },10000);
        }
        if(response.cart_detail){
            if(response.cart_detail.cart_count < 1){
                $("*[data-cart_action] .coupon").addClass("d-none");                
                $("*[data-cart_action] button[data-next_button]").removeClass("butto-success");
                $("*[data-cart_action] button[data-next_button]").addClass("butto-light");
                $("*[data-cart_action] button[data-next_button]").html("Your Cart is Empty!");
            } else {
                $("*[data-cart_action] .coupon").removeClass("d-none");
                $("*[data-cart_action] button[data-next_button]").removeClass("butto-light");
                $("*[data-cart_action] button[data-next_button]").addClass("butto-success");
            }
            $('*[data-cart_detail="cart_price"]').html(response.cart_detail.amount_detail.cart_price_view);
            $('*[data-cart_detail="service_price"]').html(response.cart_detail.amount_detail.service_price_view);
            $('*[data-cart_detail="cart_count"]').html(response.cart_detail.cart_count);
            $('*[data-cart_detail="total_price"]').html(response.cart_detail.amount_detail.total_price_view);
            $('*[data-cart_detail="total_price_back"]').html(response.cart_detail.amount_detail.total_price_view);
            $('*[data-cart_detail="discount_price"]').html(response.cart_detail.amount_detail.discount_price_view);
        }
        if(response.customer_register_action || response.customer_login_action || response.redirect){
            $('body').addClass("none_click");
            setTimeout(function(){
                window.location.href = response.redirect;                
            },response.redirect_time ? response.redirect_time : 3000);
            return true;
        }

        if(response.coupon_add){
            if(response.cart_detail.amount_detail.discount_price > 0){
                $('input[name="order[coupon_code]"]').prop("readonly",true);
                $('*[data-cart_coupon_code]').html($('*[data-cart_coupon_code]').attr("data-remove_text"));
                $('*[data-cart_coupon_code]').attr("data-cart_coupon_code","success");
            }
        }
        if(response.freetool_process_token){
            startFreeCountdown(response.freetool_process_token,response.freetool_delay_minute);
        }
        if(response.freetool_process_success){     
            startFreeCountdown("finished",response.freetool_process_success);
        }
    } else if(response.jsonStatu){
    }
    
}
$('body').on('submit', '.ns_ajax_form', function (event) {  
    event.preventDefault();
    if(this.dataset.ns_statu && this.dataset.ns_statu == "none_click")
        return false;  
    $('body').addClass("none_click");
    const ns_data = $(this).serialize();
    const submit_url = this.dataset.ns_action;
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            $('body').removeClass("none_click");
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});

$('body').on('click','*[data-close_head]',function(){
    $(this).addClass("active");
    const ns_data = {
        ns_action_theme: "close_head"
    };       
    submit_url = this.dataset.close_head;         
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        success: function (response) {
            $('.notification--header').remove();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});
/** SİLİNECEK */
$('body').on('submit', '.ns_ajax_form_test', function (event) {
    event.preventDefault();
    const ns_data = $(this).serialize();
    const submit_url = this.dataset.ns_action+"?conError=1";
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        /*dataType: "json",*/
        success: function (response) {
            console.log(response);
            alert(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});

$('body').on('click', '*[data-removecartitem]',function(){
    const ns_data = {ns_action:'remove_cart', key:this.dataset.removecartitem};
    const submit_url = this.dataset.ns_action+"?conError=1";
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});
$('body').on('click','*[data-favori_package]',function(){
    const submit_url = this.dataset.ns_action;
    const ns_data = {
        ns_action_theme:'add_favori',
        package_id:this.dataset.favori_package
    }
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    })
})
$('body').on('click','*[data-cart_coupon_code]',function(){
    code = $('input[name="order[coupon_code]"]').val();
    const submit_url = this.dataset.ns_action+"?conError=1";
    switch (this.dataset.cart_coupon_code) {
        case 'success':
            $('input[name="order[coupon_code]"]').val("");
            $('input[name="order[coupon_code]"]').prop("readonly",false);
            ns_data = {ns_action:'remove_coupon'};
            $(this).attr("data-cart_coupon_code","");
            $(this).html(this.dataset.apply_text);
            $(this).removeClass("butto-success");
            break;    
        default:
            ns_data = {ns_action:'add_coupon', code:code};
            break;
    }
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});
$('body').on('click','*[data-dial-code]',function(){
    if($('input[name="customer[phone_code]"]').length>0){
        $('input[name="customer[phone_code]"]').val($(this).attr("data-dial-code"));
        $('input[name="customer[country_code]"]').val($(this).attr("data-country-code"));
    }
});
$("body").on("click", ".selected-payment .item", function(){
	$(".selected-payment .item").removeClass("selected");
	$(this).addClass("selected");
    if($('input[name="order[payment_method]"]').length)
    $('input[name="order[payment_method]"]').val(this.dataset.uniq);
    const submit_url = this.dataset.ns_action;    
    $('.select-payment-desc p').html(this.dataset.description);
    ns_data = {ns_action:'select_payment', uniq:this.dataset.uniq};
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});
$("body").on("click", ".select-payment-method  .item", function(){
	$(".select-payment-method  .item").removeClass("selected");
	$(this).addClass("selected");
    if($('input[name="order[payment_method]"]').length)
    $('input[name="order[payment_method]"]').val(this.dataset.funds_method);
    const submit_url = this.dataset.ns_action;    
    $('.select-payment-desc p').html(this.dataset.description);
    ns_data = {ns_action:'select_payment', uniq:this.dataset.funds_method};
    $.ajax({
        type: 'POST',
        url: submit_url,
        data: ns_data,
        dataType: "json",
        success: function (response) {
            data_compilation(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
});
$('body').on('change','select[name="customer[type]"]',function(){
    switch (this.value) {
        case 'corporate':
            $('input[name="customer[name]"]').prop("placeholder","Firma Adı");
            $('#customerCorporate').removeClass("d-none");
            break;    
        default:
            $('input[name="customer[name]"]').prop("placeholder","Adınız Soyadınız");
            $('#customerCorporate').addClass("d-none");
            break;
    }
});
$('body').on('change','select[name="order[customer_type]"]',function(){
    switch (this.value) {
        case 'corporate':
            $('input[name="order[customer_name]"]').prop("placeholder","Firma Adı");
            $('#customerCorporate').removeClass("d-none");
            break;    
        default:
            $('input[name="order[customer_name]"]').prop("placeholder","Adınız Soyadınız");
            $('#customerCorporate').addClass("d-none");
            break;
    }
});
$("body").on("click", "[step-next]", function(){
    $(".order-step-area .step-one").slideUp(200);
    $(".order-step-area .step-two").slideDown(200);

});
$("body").on("click", "[step-prev]", function(){
    $(".order-step-area .step-one").slideDown(200);
    $(".order-step-area .step-two").slideUp(200);
});
function toastify_start(toastify) {
    Toastify({
        newWindow: !0,
        text: toastify.text ? toastify.text:'Hatalı bir işlem gerçekleştirdiniz!',
        gravity: toastify.gravity ? toastify.gravity:'bottom',
        position: toastify.position ? toastify.position:'right',
        className: toastify.class ? "bg-"+toastify.class:'bg-danger',
        stopOnFocus: !0,
        offset: { x: 50, y: 10 },
        duration: toastify.duration ? toastify.duration:3000,
        close: toastify.close ? true:false,
    }).showToast();
}
$('body').on('click','*[data-fast_order_select]',function(){
    var fast_type = this.dataset.fast_order_select;
    var submit_url = document.querySelector(".fastOrder").dataset.submit_url;
    if(!$(this).hasClass("active")){
        switch (fast_type) {
            case 'platform':
                var ns_fast_data = {
                    ns_tax: this.dataset.id,
                    ns_type: fast_type,
                    ns_action: "fast_order_next"
                };                 
                $('*[data-fast_order_area="platform_list"]').find(".desc").text(this.dataset.name);
                $('*[data-fast_order_area="category_list"]').addClass("active");
                $('*[data-fast_order_area="category_list"]').find(".desc").text("Seçim Yapılmadı");
                $('*[data-fast_order_area="package_list"]').attr("style","opacity: 0.6;pointer-events: none;");   
                $('*[data-fast_order_area="package_list"]').removeClass("active");
                $('*[data-fast_order_area="package_list"]').find(".desc").text("Seçim Yapılmadı");
                $('*[data-fast_order_area="fast_buy_button"]').attr("style","opacity: 0.4;pointer-events: none;");  
                $('*[data-fast_order_area="fast_buy_button"]').find("span").html($('*[data-fast_order_area="fast_buy_button"]').attr("data-text"));    
                break;
            case 'category':                         
                $('*[data-fast_order_area="category_list"]').find(".desc").text(this.dataset.name);
                $('*[data-fast_order_area="package_list"]').addClass("active"); 
                $('*[data-fast_order_area="package_list"]').find(".desc").text("Seçim Yapılmadı!");
                $('*[data-fast_order_area="package_list"]').attr("style","opacity: 0.6;pointer-events: none;");   
                $('*[data-fast_order_area="fast_buy_button"]').attr("style","opacity: 0.4;pointer-events: none;");
                $('*[data-fast_order_area="fast_buy_button"]').find("span").html($('*[data-fast_order_area="fast_buy_button"]').attr("data-text"));    
                var ns_fast_data = {
                    ns_tax: this.dataset.id,
                    ns_type: fast_type,
                    ns_action: "fast_order_next"
                }; 
                break;
            case 'package':
                $('*[data-fast_order_area="fast_buy_button"]').attr("style","");
                $('*[data-fast_order_area="package_list"]').find(".desc").text(this.dataset.name);
                $('*[data-fast_order_area="fast_buy_button"]').attr("data-fast_order_url",this.dataset.id);                
                $('*[data-fast_order_area="fast_buy_button"]').find("span").html($('*[data-fast_order_area="fast_buy_button"]').attr("data-text")+" ("+this.dataset.price+")");
                $('*[data-fast_order_area="package_list"]').find(".fastDrop").removeClass("show");
                return false;
                break;		
            case 'fast_buy_button':
                const fast_order_url = this.dataset.fast_order_url;
                if(fast_order_url.length > 5){
                    window.location.href = fast_order_url;
                    return false;
                }
                break;
        }                    
        $.ajax({
            type: 'POST',
            url: submit_url,
            data: ns_fast_data,
            dataType: 'JSON',
            success: function (response) {
                if(response.fast_area){
                    $('*[data-fast_order_area="'+response.fast_area+'"]').html(response.fast_content);
                    $('*[data-fast_order_area="'+response.fast_area+'"]').attr("style","");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }  
});

$('body').on('click','*[data-coupon_copy]',function(){
    var copyText = $(this).parent().find(".text span").text();
    navigator.clipboard.writeText(copyText);
    this.style = 'background: #FF9800;color: #fff;';
    setTimeout(() => {
        document.querySelector('.copy').style = '';
    },220);
});

$("[data-freeinp]").on("input", function () {
    if ($("[data-freeinp='userinfo']").val().length > 3 && $("[data-freeinp='amount']").val() !== "") {
        $(".free-start-btn").prop("disabled", false);
    } else {
        $(".free-start-btn").prop("disabled", true);
    }
});
function startFreeCountdown(token, minutesToWait) {
    $('*[data-free_step="process_enter_area"]').slideUp(100);
    $('*[data-free_step="process_waiting_area"]').slideDown(100);    
    const timer = document.getElementById("progress-bar"); 
    switch (token) {
        case 'finished':
            alert("ıo");
            timer.setAttribute("aria-valuenow", 100);
            timer.style.background =   "#0ea77a";
            timer.style.width =   "100%";
            $('*[data-free_step="process_enter_area"]').remove();
            $('*[data-free_step="process_waiting_area"] #prepare').text(minutesToWait.head);
            $('*[data-free_step="process_waiting_area"] #timer').text(minutesToWait.text);
            break;        
        default:                
            const minutesToWaitInt = minutesToWait ? parseInt(minutesToWait):0.2;
            const endDate = new Date(Date.now() + minutesToWaitInt * 60 * 1000);
            const remainingTimeStart = endDate.getTime() - new Date().getTime();
            const timers = setInterval(function () {
                const now = new Date().getTime();
                const t = endDate - now;
                if (t >= 0) {
                    const setValue = (100 - parseInt((t / remainingTimeStart) * 100)).toString();
                    const percentage = timer.querySelector("span");    
                    timer.setAttribute("aria-valuenow", setValue);
                    timer.style.width =   setValue+"%";
                    $('*[data-free_count]').text((Math.floor(t / 1000 / 60)).toString().padStart(2, '0') + ":" + (Math.floor(t / 1000) % 60).toString().padStart(2, '0'));       
                    $('*[data-free_step="process_enter_area"]').find('button[type="submit"]').prop("disabled", true);
                } else {
                    $('input[name="freetool[token]"]').val(token);
                    clearInterval(timers);
                    $('*[data-free_step="process_enter_area"]').find('button[type="submit"]').prop("disabled", false);
                    $('*[data-free_step="process_enter_area"]').find('button[type="submit"]').click();                                        
                }
            }, 1000);
            break;
    }
}
$('body').on('click','*[data-cart_step]',function(){
    switch (this.dataset.cart_step) {
        case 'two':
            $('.step-one').slideUp();
            $('.step-two').slideDown(100);
            break;    
        default:
            $('.step-two').slideUp(300);
            $('.step-one').slideDown(200);
            break;
    }
});

$('body').on('click','*[data-ns_modal_open]',function(){
    var ns_modal_open = this.dataset.ns_modal_open;
    var modal = document.getElementById(ns_modal_open);
    modal.style.display = "block";
});
$('body').on('click','.ns-closeBtn',function(){
    var modal = this.parentElement.parentElement;
    modal.style.display = "none";
});
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.getElementsByClassName("ns-modal");
    window.onclick = function(event) {
        for (var i = 0; i < modals.length; i++) {
            if (event.target == modals[i]) {
                modals[i].style.display = "none";
            }
        }
    }
});