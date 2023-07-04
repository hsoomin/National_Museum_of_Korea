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


//main banner slide
const $slideWrap=document.querySelector('.slide-area');
const $slideContainer=document.querySelector('.slider-container');
const $slide=document.querySelectorAll('.slide');
const $next=document.getElementById('next');
const $prev=document.getElementById('prev'); 
const $slideCount=$slide.length;
const $pager=document.querySelector('.pager')
const $pagerBtn=document.querySelectorAll('.pager span')
let $currentIndex=0;
let $sliderHeight=0; 
let $timer; 


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
startAutoSlide()

//prev,next
$next.addEventListener('click',function(){
    if($currentIndex==$slideCount-1){
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

//pauseBtn
const $pauseBtn=document.getElementById('main-btn-pause');
let isPaused = false;

$pauseBtn.addEventListener('click', function() {
    if (isPaused) {
        startAutoSlide();
        $pauseBtn.style.backgroundImage = 'url(./images/main_btn_stop.png)';
    } else {
        clearInterval($timer);
        $pauseBtn.style.backgroundImage = 'url(./images/main_btn_play.png)';
    }
    isPaused = !isPaused;
});

//span 누르면 넘어가게
for(let y=0;y<$pagerBtn.length;y++){
    $pagerBtn[y].addEventListener('click',function(event){
        let pageNum=event.target.innerText-1;
        gotoSlider(pageNum)
    })
}


// 오시는길 모달
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
const slideBanner=$('.main_section2 .slider-wrapper .banner-area'); 
const slideList=$('.main_section2 .slider-wrapper .banner-area li'); 
const prevBtn=$('.prev-btn');
const nextBtn=$('.next-btn');
const stopBtn=$('.stop-btn');

let slideWidth=slideList.width();
let setIntervalID;

bannerSlide()
function bannerSlide(){
    setIntervalID=setInterval(()=>{
        slideBanner.stop().animate({left:-(slideWidth+60)},1000, function(){
            $('.main_section2 .slider-wrapper .banner-area li:first').insertAfter('.main_section2 .slider-wrapper .banner-area li:last');
            slideBanner.css({left:0})
        })
    }, 2000)
}

function rightBtn(){
    slideBanner.stop().animate({left:-(slideWidth+60)},300, function(){
        $('.main_section2 .slider-wrapper .banner-area li:first').insertAfter('.main_section2 .slider-wrapper .banner-area li:last');
        slideBanner.css({left:0})
    })
}
function leftBtn(){
    $('.main_section2 .slider-wrapper .banner-area li:last').insertBefore('.main_section2 .slider-wrapper .banner-area li:first');
    slideBanner.css({left:-(slideWidth+60)}).stop().animate({left:0},300)
}

// nextBtn,prevBtn
nextBtn.click(function(){
    rightBtn()
})

prevBtn.click(function(){
    leftBtn()
})

// //수정하기///////////////////////////
stopBtn.click(function(){
    if (setIntervalID) {
        clearInterval(setIntervalID);
        $('.stop-btn').css("background", "url(./images/btn_swiper_play.png)");
    } else {
        bannerSlide();
        $('.stop-btn').css("background", "url(./images/btn_swiper_stop.png)");
    }
});


//main3 tab메뉴
const targetLink=document.querySelectorAll('.notice_contents>ul>li>a');
const tabContent=document.querySelectorAll('.notice_contents>ul>li>ul');

for(let i=0; i<targetLink.length;i++){
    targetLink[i].addEventListener('click',function(e){
        e.preventDefault();
        const orgTarget=e.target.getAttribute('href'); 
        const tabTarget=orgTarget.replace('#',''); 


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


//main3 알립니다 슬라이드
const banner = $('.notice_slider-container>li');
const button = $('.buttonList>li');
let cnt = 0;
let intervalId;

timer();
  function timer() {
    intervalId = setInterval(function(){
      let prev = banner.eq(cnt);
      let prevBtn = button.eq(cnt);
      move(prev,0,'-100%');
      prevBtn.removeClass('active');
      cnt++;
      if (cnt==3) cnt=0;
      let next=banner.eq(cnt);
      move(next,'100%',0);
      let nextBtn = button.eq(cnt);
      nextBtn.addClass('active');
    }, 4000);
  }

function move(tg,start,end){  //위치 잡은거
	tg.css('left',start).stop().animate({left:end},500)
}

//버튼리스트
button.click(function(){
    let tg=$(this);
    let i=$('.buttonList>li').index(this);
    button.removeClass('active')
    tg.addClass('active')
    
    if(cnt>i){
        let cntEl=banner.eq(cnt);
        let nextEl=banner.eq(i);
        cntEl.css('left',0).stop().animate({left:'100%'},500);
        nextEl.css('left','-100%').stop().animate({left:0},500);
        cnt=i; 
        
    }else if(cnt<i){
        let cntEl=banner.eq(cnt);
        let nextEl=banner.eq(i);
        cntEl.css('left',0).stop().animate({left:'-100%'},500);
        nextEl.css('left','100%').stop().animate({left:0},500);
        cnt=i;
    }else if(cnt==i) 
    return;
})

const pauseBtn = $('#main3-btn-pause');

pauseBtn.click(function() {
  if ($(this).hasClass('paused')) {
    intervalId=setInterval(function() {
      let prev=banner.eq(cnt);
      let prevBtn=button.eq(cnt);
      move(prev,0,'-100%');
      prevBtn.removeClass('active');
      cnt++;
      if (cnt==3) cnt=0;
      let next=banner.eq(cnt);
      move(next,'100%',0);

      let nextBtn=button.eq(cnt);
      nextBtn.addClass('active');
    }, 4000);

    $(this).removeClass('paused');
    $(this).css("background", "url(./images/main_btn_stop.png)");
  }else {
    clearInterval(intervalId);
    $(this).addClass('paused');
    $(this).css("background", "url(./images/main_btn_play.png)");
  }
});


//메인4 행사 슬라이드
const slideBanner2=$('.event .slider-wrapper .slides'); 
const slideList2=$('.event .slider-wrapper .slides li'); 
const prevBtn2=$('.event-prev-btn');
const nextBtn2=$('.event-next-btn');
let slideWidth2=slideList2.width();

let cntPage=$('.event-current-page');
let ttlPage=$('.event-ttl-page');
let cntNumber = 1;
let ttlPageNumber=2;


function rightBtn2(){
    slideBanner2.stop().animate({left:-(slideWidth2)},500, function(){
        $('.event .slider-wrapper .slides li:first').insertAfter('.event .slider-wrapper .slides li:last');
        slideBanner2.css({left:0})
        
        cntNumber++;
        if (cntNumber>ttlPageNumber) {
          cntNumber=1;
        }
        cntPage.text(cntNumber);
    })
}
function leftBtn2(){
    $('.event .slider-wrapper .slides li:last').insertBefore('.event .slider-wrapper .slides li:first');
    slideBanner2.css({left:-(slideWidth2)}).stop().animate({left:0},500);
    
    cntNumber--;
    if(cntNumber<1){
        cntNumber=ttlPageNumber;
    }
    cntPage.text(cntNumber);
}


nextBtn2.click(function(){
    rightBtn2()
    
})
prevBtn2.click(function(){
    leftBtn2()
})


//메인4 온라인 전시관 슬라이드
const slideBanner1=$('.online_exhibition .slider-wrapper .slides'); 
const slideList1=$('.online_exhibition .slider-wrapper .slides li'); 
const prevBtn1=$('.online-prev-btn');
const nextBtn1=$('.online-next-btn');
let slideWidth1=slideList1.width(); 

let onCntPage=$('.online-current-page');
let onTtlPage=$('.online-ttl-page');
let onCntNumber = 1;
let onTtlPageNumber=7;

function rightBtn1(){
    slideBanner1.stop().animate({left:-(slideWidth1)},500, function(){
        $('.online_exhibition .slider-wrapper .slides li:first').insertAfter('.online_exhibition .slider-wrapper .slides li:last');
        slideBanner1.css({left:0})

        onCntNumber++;
        if(onCntNumber>onTtlPageNumber) {
            onCntNumber=1;
        }
        onCntPage.text(onCntNumber);
    })
}

function leftBtn1(){
    $('.online_exhibition .slider-wrapper .slides li:last').insertBefore('.online_exhibition .slider-wrapper .slides li:first');
    slideBanner1.css({left:-(slideWidth1)}).stop().animate({left:0},500)
    
    onCntNumber--;
    if (onCntNumber < 1) {
        onCntNumber = onTtlPageNumber;
    }
    onCntPage.text(onCntNumber);
}

nextBtn1.click(function(){
    rightBtn1()
})
prevBtn1.click(function(){
    leftBtn1()
})


//footer 토글
$('.footer_center_left .familySite .btn-site').click(function() {
    let linkList = $(this).next('.linkList');
    let btnSite = $(this);

    $('.linkList').not(linkList).removeClass('on');
    $('.btn-site').not(btnSite).removeClass('on');

    linkList.toggleClass('on');
    btnSite.toggleClass('on')
});
