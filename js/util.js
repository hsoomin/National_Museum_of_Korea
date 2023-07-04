//header util 토글
$('.museum').click(function(){
    $(this).toggleClass('on').next('.museum-list').toggleClass('on');
});
$('.museum-list').mouseleave(function(){
    $(this).removeClass('on');
});
$('.language').click(function(){
    $(this).toggleClass('on').next('.lang-list').toggleClass('on');
});
$('.lang-list').mouseleave(function(){
    $(this).removeClass('on');
});


//footer 토글
$('.footer_center_left .familySite .btn-site').click(function() {
    let linkList = $(this).next('.linkList');
    let btnSite = $(this);

    $('.linkList').not(linkList).removeClass('on');
    $('.btn-site').not(btnSite).removeClass('on');

    linkList.toggleClass('on');
    btnSite.toggleClass('on')
});
