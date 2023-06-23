//헤더 유틸 토글
$('.linkList').click(function(){   
    $(this).addClass('on').next('.museum-list').toggleClass('on')
    $(this).addClass('on').next('.lang-list').toggleClass('on')
});


//main slide
const $slideWrap=document.querySelector('.slide-area'); //div
const $slideContainer=document.querySelector('.slider-container'); //ul
const $slide=document.querySelectorAll('.slide');
const $next=document.getElementById('next');
const $prev=document.getElementById('prev');
const $pause=document.getElementById('btn-pause'); //멈춤
const $slideCount=$slide.length;
// console.log($sildeCount)
const $pager=document.querySelector('.pager')
const $pagerBtn=document.querySelectorAll('.pager span')
let $currentIndex=0;
let $sliderHeight=0; //슬라이더 높이값
let $timer; //setInterval 변수


for(let i=0;i<$slideCount;i++){
    if($sliderHeight<$slide[i].offsetHeight){
        $sliderHeight=$slide[i].offsetHeight;
    }
}

$slideWrap.style.height=$sliderHeight+'px'
$slideContainer.style.height=$sliderHeight+'px'
for(let j=0;j<$slideCount;j++){
    $slide[j].style.left=j*100+'%'
}

function gotoSlider(idx){
    $slideContainer.classList.add('animated');
    $slideContainer.style.left=-100*idx+'%';
    $currentIndex=idx;
    for(let k=0;k<$pagerBtn.length;k++){
        $pagerBtn[k].classList.remove('active')
    }
    $pagerBtn[idx].classList.add('active')
}
gotoSlider(0)

function startAutoSlide(){
    $timer=setInterval(function(){
        let nextIdx=($currentIndex+1) % $slideCount;
        gotoSlider(nextIdx)
    },4000)
}
startAutoSlide() //열자마자 한번 실행해

//슬라이드에 마우스 올리면 멈추는거 //실행안함
$slideWrap.addEventListener('mouseover',function(){
    clearInterval($timer);
})
$slideWrap.addEventListener('mouseout',function(){
    startAutoSlide();
})

//prev,next,pause
$next.addEventListener('click',function(){
    if($currentIndex==$slideCount-1){
        // $next.classList,add('disabled');
        gotoSlider(0);
    }else{
        gotoSlider($currentIndex+1)
    }
})

$prev.addEventListener('click',function(){
    if($currentIndex==0){
        gotoSlider($slideCount-1);
    }else{
        gotoSlider($currentIndex-1)
    }
})


//span 누르면 넘어가게
for(let y=0;y<$pagerBtn.length;y++){
    $pagerBtn[y].addEventListener('click',function(event){
        clearInterval($timer);
    })
}


// 모달창
$('.find_map').on('click', function () {
    $('.modal').addClass('show-modal');
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.5238506, 126.9804702), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    resizeMap()
    relayout()

    // 지도를 표시하는 div 크기를 변경하는 함수입니다
    function resizeMap() {
        var mapContainer = document.getElementById('map');
        mapContainer.style.width = '500px';
        mapContainer.style.height = '500px';
    }

    function relayout() {

        // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
        // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
        // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
        map.relayout();
    }
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.5238506, 126.9804702), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 title 객체 배열입니다 
    var positions = [
        {
            title: '국립중앙박물관', 
            latlng: new kakao.maps.LatLng(37.5238506, 126.9804702)
        }
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 

    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 


    });
    }
})

$('.modal').on('click', function () {
    $('.modal').removeClass('show-modal');
})


// 메인2 전시 슬라이드
const slideBanner=$('.main_section2 .slider-wrapper .banner-area'); //배너 ul
const slideList=$('.main_section2 .slider-wrapper .banner-area li'); //배너 ul li
const prevBtn=$('.swiper-prev-btn');
const nextBtn=$('.swiper-next-btn');
const stopBtn=$('.swiper-stop-btn');

let slideWidth=slideList.width(); //315px
let setIntervalID;
// console.log(slideWidth);
bannerSlide()
function bannerSlide(){
    setIntervalID=setInterval(()=>{
        slideBanner.stop().animate({left:-(slideWidth+60)},1000, function(){
            $('.main_section2 .slider-wrapper .banner-area li:first').insertAfter('.main_section2 .slider-wrapper .banner-area li:last');
            slideBanner.css({left:0})
        })
    }, 2000)
}

$('.swiper-prev-btn, .swiper-prev-btn,.swiper-stop-btn, .slider-wrapper').on('click mouseover focus', function(){
    clearInterval(setIntervalID)
}) //setInterval 중단시키는거 clearInterval

$('.swiper-prev-btn, .swiper-prev-btn,.swiper-stop-btn, .slider-wrapper').on('mouseout leave', function(){
    bannerSlide()
})
//mouseover focus,leave 탭키 / 마우스 떼면 배너슬라이드 진행시켜
/* 
//stopBtn 이미지 바뀌게
function stopBtn(){
    stopBtn.classList.add('playing');
    slideBanner.stop().animate()
}
stopBtn.click(function(){
    stopBtn()
})
 */

function rightBtn(){
    slideBanner.stop().animate({left:-(slideWidth+60)},500, function(){
        $('.main_section2 .slider-wrapper .banner-area li:first').insertAfter('.main_section2 .slider-wrapper .banner-area li:last');
        slideBanner.css({left:0})
    })
}
function leftBtn(){
    $('.main_section2 .slider-wrapper .banner-area li:last').insertBefore('.main_section2 .slider-wrapper .banner-area li:first');
    slideBanner.css({left:-(slideWidth+60)}).stop().animate({left:0},500)
}


// 클릭했을때
nextBtn.click(function(){
    rightBtn()
})
prevBtn.click(function(){
    leftBtn()
})



//main3 tab메뉴
const targetLink=document.querySelectorAll('.notice_contents>ul>li>a');
const tabContent=document.querySelectorAll('.notice_contents>ul>li>ul');
// console.log(tabContent)

for(let i=0; i<targetLink.length;i++){
    targetLink[i].addEventListener('click',function(e){
        // console.log(e); 
        e.preventDefault();
        const orgTarget=e.target.getAttribute('href'); 
        // console.log(orgTarget);
        const tabTarget=orgTarget.replace('#',''); 
        // console.log(tabTarget);


        for(let j=0;j<tabContent.length;j++){
            tabContent[j].style.display='none'; 
        }
        document.getElementById(tabTarget).style.display='block';

        for(let k=0; k<targetLink.length;k++){
            targetLink[k].classList.remove('active');
            e.target.classList.add('active');
        }
    })
}


//메인3 슬라이드
const $slideWrap1=document.querySelector('.main_section3 .slide-area'); //div
const $slideContainer1=document.querySelector('.main_section3 .slide-area .slider-container');
const $slide1=document.querySelectorAll('.slide1');
const $pause1=document.getElementById('btn-pause'); //멈춤
const $slideCount1=$slide1.length;
// console.log($slideWrap1)
const $pager1=document.querySelector('.notice_banner .pager')
const $pager1Btn=document.querySelectorAll('.notice_banner .pager span')
let $currentIndex1=0;
let $sliderHeight1=0; //슬라이더 높이값
let $timer1; //setInterval 변수


for(let i=0;i<$slideCount1;i++){
    if($sliderHeight1<$slide1[i].offsetHeight){
        $sliderHeight1=$slide1[i].offsetHeight;
    }
}

$slideWrap1.style.height=$sliderHeight1+'px'
$slideContainer1.style.height=$sliderHeight1+'px'
for(let j=0;j<$slideCount1;j++){
    $slide1[j].style.left=j*100+'%'
}

function gotoSlider1(idx){
    $slideContainer1.classList.add('animated');
    $slideContainer1.style.left=-100*idx+'%';
    $currentIndex1=idx;
    for(let k=0;k<$pager1Btn.length;k++){
        $pager1Btn[k].classList.remove('active')
    }
    $pager1Btn[idx].classList.add('active')
}
gotoSlider1(0)

function startAutoSlide1(){
    $timer1=setInterval(function(){
        let nextIdx=($currentIndex1+1) % $slideCount1;
        gotoSlider1(nextIdx)
    },2000)
}
startAutoSlide1()

//슬라이드에 마우스 올리면 멈추는거
$slideWrap1.addEventListener('mouseover',function(){
    clearInterval($timer1);
})
$slideWrap1.addEventListener('mouseout',function(){
    startAutoSlide1();
})


//멈춤 다시만들기
$pause1.addEventListener('click',function(){
    clearInterval($timer1)
})


//span 누르면 넘어가게
for(let y=0;y<$pager1Btn.length;y++){
    $pager1Btn[y].addEventListener('click',function(event){
        gotoSlider1(y)
    })
}



//메인4 행사 슬라이드
const slideBanner2=$('.event .slider-wrapper .slides'); //배너 ul
const slideList2=$('.event .slider-wrapper .slides li'); //배너 ul li
const prevBtn2=$('.event .controller .swiper-prev-btn');
const nextBtn2=$('.event .controller .swiper-next-btn');
let slideWidth2=slideList2.width(); //320px
console.log(slideWidth2)

function rightBtn2(){
    slideBanner2.stop().animate({left:-(slideWidth2)},500, function(){
        $('.event .slider-wrapper .slides li:first').insertAfter('.event .slider-wrapper .slides li:last');
        slideBanner2.css({left:0})
    })
}
function leftBtn2(){
    $('.event .slider-wrapper .slides li:last').insertBefore('.event .slider-wrapper .slides li:first');
    slideBanner2.css({left:-(slideWidth2)}).stop().animate({left:0},500)
}

// 클릭했을때
nextBtn2.click(function(){
    rightBtn2()
})
prevBtn2.click(function(){
    leftBtn2()
})




//메인4 온라인 전시관 슬라이드
const slideBanner1=$('.online_exhibition .slider-wrapper .slides'); //배너 ul
const slideList1=$('.online_exhibition .slider-wrapper .slides li'); //배너 ul li
const prevBtn1=$('.online_exhibition .controller .swiper-prev-btn');
const nextBtn1=$('.online_exhibition .controller .swiper-next-btn');
let slideWidth1=slideList1.width(); //670px

function rightBtn1(){
    slideBanner1.stop().animate({left:-(slideWidth1)},500, function(){
        $('.online_exhibition .slider-wrapper .slides li:first').insertAfter('.online_exhibition .slider-wrapper .slides li:last');
        slideBanner1.css({left:0})
    })
}
function leftBtn1(){
    $('.online_exhibition .slider-wrapper .slides li:last').insertBefore('.online_exhibition .slider-wrapper .slides li:first');
    slideBanner1.css({left:-(slideWidth1)}).stop().animate({left:0},500)
}

// 클릭했을때
nextBtn1.click(function(){
    rightBtn1()
})
prevBtn1.click(function(){
    leftBtn1()
})


//푸터 토글
$('.btn-site').click(function(){   
    $(this).next('.linkList').toggleClass('on');

});


/* $('.btn-site').click(function(){   
    $(this).removeClass();
    $(this).addClass('on').next('.linkList').toggleClass('on')
});
 */



