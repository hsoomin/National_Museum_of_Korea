$(document).ready(function() {
    $('.board-list-header > ul > li').click(function() {
        $('.board-list-header > ul > li').removeClass('active');
        $(this).addClass('active');
    });
});