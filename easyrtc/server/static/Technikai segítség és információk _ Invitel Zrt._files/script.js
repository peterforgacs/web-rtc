$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function(){
    /*Keresés*/
    $('#main-menu .others').on('click', '.search-button', function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('body').addClass('search-closed');
            $('#main-menu .background').animate({'border-bottom-width': '0px'}, {duration: 150, queue: false});
            $('#main-menu .search-field').slideUp(100);
        }else{
            $(this).addClass('open');
            $('body').removeClass('search-closed');
            $('#main-menu .background').animate({'border-bottom-width': '80px'}, {duration: 150, queue: false});
            $('#main-menu .search-field').slideDown(100);
            $('input[name="q"]').focus();
        }
    });

    /* passview*/
    $('#passview, #passview-1, #passview-2').click(function(event) {
        if($(this).children('span').hasClass('glyphicon-eye-open')){
            $(this).prev().attr("type",'text');
            $(this).children('span').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }else{
            $(this).prev().attr("type",'password');
            $(this).children('span').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        }
    });

    /*Notifications*/

    $('.others .notification-button').mouseenter(function(){
        dataLayer.push({
                    'event':'activation',
                    'dl_category': 'ertesitesek',
                    'dl_action': 'read',
                    'dl_label': '',
                    });
        $('.others .notification-button span.count').fadeOut();
        $('.others .notification-button').removeClass('open');
        $('.home-notification').fadeOut();
        $.ajax({
                url: base_url + "ajax/notifications/remove"
            });
    });
    $('.others a.notification-button').click(function(){
        dataLayer.push({
                    'event':'activation',
                    'dl_category': 'ertesitesek',
                    'dl_action': 'read',
                    'dl_label': '',
                    });
        $('.others .notification-button span.count').fadeOut();
        $('#dropdown-menu-list #notification-lists-mobil').addClass('open');
        $('body').addClass('open-menu');
        $('header, main, footer').css('z-index', -1);
        $('#dropdown-menu-list .close-menu').hide();
        $('.home-notification').fadeOut();
        $.ajax({
                url: base_url + "ajax/notifications/remove"
            });
    });

    $('#dropdown-menu-list .close-mobil-sub-menu-notification').click(function(){
        $('#dropdown-menu-list #notification-lists-mobil').removeClass('open');
        $('body').removeClass('open-menu');
        $('header, main, footer').css('z-index', 11);
    });


    $('.others .notification-button').mouseleave(function(){
        $(this).find('#notification-lists .dropdown ul li').removeClass('not-read');
        $(this).find('#notification-lists .dropdown ul li').addClass('read');
    });

    $('.home-notification a').click(function(){
        $('.others .notification-button span.count').fadeOut();
        $('.others .notification-button').addClass('open');
        $.ajax({
                url: base_url + "ajax/notifications/remove"
            });
    });

    /*Login - logout*/
    $('.support-button.logout a').click(function(){
        if($('.login-form-home').length > 0){
            $('.login-form-home').addClass('focus');
            $('.login-form-home input[name="identity"]').focus();
        }else
            window.location.href = base_url + '?login=header'
    });

    /* Registration */

    $('.registration .fa-info-circle').click(function(){
        $(".alert-window-registration .modal-title").html($(this).data('title'));
        $(".alert-window-registration img").attr('src', base_url + 'assets/data/' + $(this).data('img'));
        $(".alert-window-registration").modal("show");
    });

    /*Mobil menu*/

    $('#main-menu .hamburger').click(function(){
        $('body').addClass('open-menu');
        $('#main-menu .search-field').slideUp(100);
        $('header, main, footer').animate({left: '-85%'}, 500, function(){
            $('#dropdown-menu-list .close-menu').show();
        });
    });

    $('#dropdown-menu-list .close-menu').click(function(){
        $('header, main, footer').animate({left: 0}, 200, function(){
            $('body').removeClass('open-menu');
        });
    });

    $('#dropdown-menu-list .sub-menu').click(function(){
        $('header, main, footer').css('z-index', -1);
        $(this).next('div').addClass('open');
        $('#dropdown-menu-list .close-menu').hide();
    });

    $('#dropdown-menu-list .close-mobil-sub-menu').click(function(){
        $('header, main, footer').css('z-index', 11);
        $('#dropdown-menu-list .menu > ul > li > div').removeClass('open');
        $('#dropdown-menu-list .close-menu').show();
    });

    if(window.location.hash != ''){
        var anchor = window.location.hash.replace('#', '');
        if(anchor.search('reszletek') >= 0)
            $('body').addClass('open-content');
    }

    $('#content_page aside.left-menu a').click(function(){
        var loc = window.location.href.split('#');
        var href = $(this).attr('href').split('#');
        if(loc[0] != undefined && href[0] != undefined && loc[0] == href[0] && $(this).attr('href').search('reszletek') >= 0)
            window.location.reload();
    });
    
    $('body.open-content #content_page .content-container .mobil.header i').click(function(){
        $('body').removeClass('open-content');
        window.location.hash = '';
    });

    /*Cookie police*/
    $('#cookie-police a').click(function(){
        $.ajax({
            url: base_url + "ajax/cookie-police",
            beforeSend:function(){
                 $('#cookie-police').fadeOut(200);
            }
        });
    });

    /*Adult*/
    $('#adults.modal button').click(function(){
        if($(this).hasClass('young')){
            $.ajax({
                url: base_url + "ajax/adult/young",
                success:function(){
                     $('#adults').modal('hide');
                }
            });
        }else if($(this).hasClass('old')){
            $.ajax({
                url: base_url + "ajax/adult/old",
                success:function(){
                     $('#adults').modal('hide');
                     window.location.reload();
                }
            });
        }
    });

    /* hibaüzenet */
    $('.alarm-close span').click(function(){
        dataLayer.push({
                    'event':'activation',
                    'dl_category': 'rendszeruzenet',
                    'dl_action': 'close',
                    'dl_label': '',
                    });
        $(this).parents(".alarm").hide();
        $.ajax({
                url: base_url + "ajax/sytem-message/" + $(this).data('id')
            });
    });
    $('.alarm .open-details').click(function(){
        $('.alarm-details').slideToggle();
    });

});


function preloader(status){
    if(status){
        $('#black-background').fadeIn(200);
        $('#preloader').fadeIn(300);
    }else{
        $('#black-background').fadeOut(300);
        $('#preloader').fadeOut(200);
    }
}

function alertWindow(status, message){
    $(".js-window .modal-body").html(message);
    $(".js-window").modal("show");
    if(status == 'error'){
        $(".js-window").addClass("error");
        $(".js-window").removeClass("success");
    }else{
        $(".js-window").removeClass("error");
        $(".js-window").addClass("success");
    }
    setTimeout(function(){$(".js-window").modal("hide");}, 8000);
    dataLayer.push({
                        "event": "activation",
                        "dl_category": uri_array[uri_array.length - 1],
                        "dl_action": "alert messages",
                        "dl_label": message,
                    });
}

function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._\-]+[a-zA-Z0-9\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z\.]{2,10}$/;
    return emailPattern.test(elementValue);
  }
