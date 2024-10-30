/* Header */
$(window).scroll(function () {
    if ($(this).scrollTop() >= 30) {
        $("header").addClass("scrolled");
    } else {
        $("header").removeClass("scrolled");
    }
});
$(document).ready(function() {
    if ($(this).scrollTop() >= 30) {
        $("header").addClass("scrolled");
    } else {
        $("header").removeClass("scrolled");
    }
});
/* Menu */
$('body').on('click','*[data-submenu]',function(){
    if($(this).parent().hasClass("show")){
        $(this).parent().removeClass("show");
        $("*[data-submenu]").removeClass("active");
        $("main").removeClass("linear");
    } else {
        $(".nav-item.nav-sub").removeClass("show");
        $("*[data-submenu]").removeClass("active");
        $(this).parent().addClass("show");
        $(this).addClass("active");
        $("main").addClass("linear");
    }
});
$("*").click(function (event) {
    if (!$(event.target).is(".nav-sub-content, .nav-sub-content *, *[data-submenu], *[data-submenu] *")) {
        $(".nav-item.nav-sub").removeClass("show");
        $("*[data-submenu]").removeClass("active");
        $("main").removeClass("linear");
    }
});

$("body").on("click", ".content--navbar .nav-sub .nav-link", function(){
    var parent = $(this).parent();
    if($(this).hasClass("show")){
        $(this).removeClass("show");
        parent.find(".nav-sub-content").slideUp(200);
    } else {
        $(".content--navbar .nav-sub .nav-link").removeClass("show");
        $(".content--navbar .nav-sub .nav-sub-content").slideUp(200);
        $(this).addClass("show");
        parent.find(".nav-sub-content").slideDown(200);
    }
});

$("body").on("click", ".menu--control .menu--linear, .menu--control .top-side .close", function(){
    $("*[data-submenu]").removeClass("active");
    $(".menu--control").removeClass("show");
    $(".mobile-navbar-button").removeClass("show");
    $("nav.content--navbar ul li.nav-item .nav-link").removeClass("show");
    $(".menu--control .nav-sub-content").slideUp(200);
    $("body").removeClass("noscroll");
});

/* Mobile Menu */
$('body').on('click','.mobile-navbar-button',function(){
    $(".menu--control").addClass("show");
    $("body").addClass("noscroll");
    $(this).addClass("show");
});
$(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    if (scrollPosition + windowHeight >= documentHeight - 150) {
        $(".bottom--menu").addClass("end");
    } else {
        $(".bottom--menu").removeClass("end");
    }
});

/* Notification */

$('body').on('click','.it_notification .icon',function(){
    $(".notification-list").toggleClass("show");
    $(this).toggleClass("show");
});
$("*").click(function (event) {
    if (!$(event.target).is(".it_notification .icon, .it_notification .icon *, .notification-list, .notification-list *")) {
        $(".notification-list").removeClass("show");
        $(".it_notification .icon").removeClass("show");
    }
});

/* Order Search */

$('body').on('click','*[data-ordersearch]',function(){
    $(".order--search").addClass("show");
    $("body").addClass("noscroll");
});

$("body").on("click", ".order--linear, .order-search-close", function(){
    $(".order--search").removeClass("show");
    $("body").removeClass("noscroll");
});

/* Main Popular Pack */
$("body").on("click", "*[data-popitab]", function(){
    var popival = $(this).data('popitab');
    $("[data-popitab]").removeClass("active");
    $("[data-popitab='"+popival+"']").addClass("active");
    $(".popular-pack-content .popular-area").removeClass("show");
    $(".popular-pack-content .popular-area[data-popicontent='"+popival+"']").addClass("show");
});

/* Pack List Type */
$("body").on("click", "[data-pack_type]", function(){
    var packtype = $(this).data("pack_type");
    if(packtype == "grid"){
        $(".pack--list-type").addClass("grid");
        $(".pack-list-content").addClass("grid");
        localStorage.setItem("packtype", 1);
    } else {
        $(".pack--list-type").removeClass("grid");
        $(".pack-list-content").removeClass("grid");
        localStorage.setItem("packtype", 0);
    }
});

/* Footer More */
$("body").on("click", ".fn-show-more",function(){
    $(this).parent().find("ul").addClass("more");
    $(this).hide();
});
splide_list = document.querySelectorAll('.splide');
splide_list.forEach(function(splide) {
    new Splide(splide, {
        type: 'loop',
        perPage: splide.dataset.per_page,
        perMove: 2,
        arrows: true,
        padding: {
            left: 0,
            right: 100,
        },
        pagination: true,
        breakpoints: {
            1200: {
                perPage: splide.dataset.per_page_1200,
                padding: {
                    left: 25,
                    right: 25,
                },
            },
            992: {
                perPage: splide.dataset.per_page_992,
                padding: {
                    left: 25,
                    right: 25,
                },
            },
            640: {
                perPage: splide.dataset.per_page_640,
                arrows: false,
                padding: {
                    left: 25,
                    right: 25,
                },
            },
        },
    }).mount();
});
new WOW().init();

function moreLoad(element) {
    $(element).parent().parent().find("li a").show();
    $(element).parent().remove();
}

$('body').on('click', '[data-code_copy]', function() {
    var $this = $(this);
    var code = $this.parent().find('c_code').text();
    navigator.clipboard.writeText(code);
    $this.attr('class', 'eg-checkbox-multiple-line');
    $this.attr("style", "color:#fff");
    setTimeout(() => {
        $this.attr('class', 'eg-file-copy-line');
        $this.attr("style", "");
    }, 500);
});


function getAllClasses(element) {
    let classes = [];
    let elementsToProcess = [element];

    while (elementsToProcess.length > 0) {
        let currentElement = elementsToProcess.shift();
        if (currentElement.classList) {
            classes.push(...currentElement.classList);
        }
        for (let i = 0; i < currentElement.children.length; i++) {
            elementsToProcess.push(currentElement.children[i]);
        }
    }
    return classes;
}    
$('*').on('click','body[class*="showmenu"] .nav-drop',function(event){
    let allClasses = getAllClasses(event.target);
    menu_control = false;
    for (let i = 0; i < allClasses.length; i++) {
        if (allClasses[i].indexOf('drop-menu') > -1) {
            menu_control = true;
        }
    }
    var $this = $(this);
    if ($this.hasClass('showdrop')) {
        if(!menu_control){
            $('.nav-drop').removeClass('showdrop');
        }
        return;
    } else {
        $('.nav-drop').removeClass('showdrop');
        $this.addClass('showdrop');
    }
    event.stopPropagation();
});