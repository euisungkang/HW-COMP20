$(document).ready(function () {
    $(window).scroll(function () {
        $('.artistBox').each(function (i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > bottom_of_object) {
            $(this).animate({ 'opacity': '1' }, 400);
        }
        });
    });
});