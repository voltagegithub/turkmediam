$(document).ready(function () {
  $(".popularPackages__filter button").on("click", function () {
    var filterValue = $(this).data("filter");
    $(".popularPackages__filter button").removeClass("active");
    $(this).addClass("active");
    $(".popularPackages__wrapper").removeClass("active");
    $('.popularPackages__wrapper[data-filter="' + filterValue + '"]').addClass("active");
  });
});

$(document).ready(function () {
  $(".howBuy__step-item").on("click", function () {
    var filterValue = $(this).data("filter");
    $(".howBuy__step-item").removeClass("active");
    $(this).addClass("active");
    $(".howBuy__content").removeClass("active");
    $('.howBuy__content[data-filter="' + filterValue + '"]').addClass("active");
  });
});

$(document).ready(function () {
  $(".payment-control").on("click", function () {
    var paymentValue = $(this).data("payment");
    $(".payment__head").removeClass("active");
    $('.payment__head[data-payment="' + paymentValue + '"]').addClass("active");
    $(".payment__item").removeClass("active");
    $('.payment__item[data-payment="' + paymentValue + '"]').addClass("active");
    if (paymentValue != 1) {
      $(".cart__wrapper").removeClass("d-none");
    } else {
      $(".cart__wrapper").addClass("d-none");
    }
  });
});




function toggleActiveClass(containerClass) {
  $(containerClass).on("click", function () {
    $(containerClass).removeClass("active");
    $(this).addClass("active");
  });
}

toggleActiveClass(".payment__methods-item");
toggleActiveClass(".dashboardBalance__item");


$(document).ready(function () {
  $(".packages__filter-btn").on("click", function () {
    var filterValue = $(this).data("filter");
    $(".packages__filter-btn").removeClass("active");
    $(this).addClass("active");
    $(".packages__features-item, .packages__right-item").each(function () {
      $(this).toggleClass("d-none", $(this).data("filter") !== filterValue);
    });
  });
});

$(document).ready(function () {
  $(".paymentController").on("click", function () {
    var stepValue = $(this).data("step");
    $(".paymentContent").removeClass("active");
    $('.paymentContent[data-step="' + stepValue + '"]').addClass("active");
    $(".paymentStep__step").removeClass("active");
    for (var i = 1; i <= stepValue; i++) {
      $('.paymentStep__step[data-step="' + i + '"]').addClass("active");
    }
  });
});

// $(document).ready(function () {
//   $(".fastselect").click(function (e) {
//     e.stopPropagation();
//     $(this).toggleClass("active");
//   });

// });

$(document).ready(function () {
  $(".howBuy__nav-item").click(function () {
    var filterValue = $(this).data("filter");
    $(".howBuy__nav-item").removeClass("active");
    $(this).addClass("active");
    $(".howBuy__content").removeClass("active");
    $('.howBuy__content[data-filter="' + filterValue + '"]').addClass("active");
  });
});

$(document).ready(function () {
  $(".registerTarget").on("click", function () {
    if ($("#register").hasClass("d-none")) {
      $("#register").removeClass("d-none");
    }
    $("#login").addClass("d-none");
  });

  $(".loginTarget").on("click", function () {
    if ($("#login").hasClass("d-none")) {
      $("#login").removeClass("d-none");
    }
    $("#register").addClass("d-none");
  });
});

$(document).ready(function () {
    $(".footer__list").each(function () {
      var $list = $(this);
      var $items = $list.find(".footer__list-item");
  
      if ($items.length > 5) {
        $items.slice(5).hide();
        var $button = $('<button type="button" class="footer__list-more">Daha Fazla Göster</button>');
        $list.append($button);
  
        $button.on("click", function () {
          if ($button.text() === "Daha Fazla Göster") {
            $items.slice(5).slideDown();
            $button.text("Daha Az Göster");
          } else {
            $items.slice(5).slideUp();
            $button.text("Daha Fazla Göster");
          }
        });
      }
    });
  });