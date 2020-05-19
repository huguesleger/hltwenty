import $ from 'jQuery';
import 'bootstrap';


 require('../sass/main.scss');

 jQuery(function($) {

/*--------------------------------------------
    cursor
---------------------------------------------*/ 
function cursor(){
var bigBall = document.querySelector('.circle-cursor--outer');
var smallBall = document.querySelector('.circle-cursor--inner');
var view = document.querySelector('.circle-cursor--view');
var hoverables = document.querySelectorAll('.hoverable');
var circle = document.querySelectorAll('.circle-cursor');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (var i = 0; i < hoverables.length; i++) {
  hoverables[i].addEventListener('mouseenter', onMouseHover);
  hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
   $(circle).css({
    visibility: "visible"
   }) 
  TweenMax.to(bigBall, .4, {
    x: e.clientX - 15,
    y: e.clientY - 15
 });

  TweenMax.to(smallBall, .1, {
    x: e.clientX - 5,
    y: e.clientY - 5
 });
   TweenMax.to(view, .1, {
    x: e.clientX - 50,
    y: e.clientY - 50
 });

}
// Hover an element
function onMouseHover(t) {
    TweenMax.to(bigBall, .3, {
        scale: 2.5,
        backgroundColor: "#fff",
        opacity: 1
    });
    TweenMax.to(smallBall, .3, {
        opacity: 0
    });
        TweenMax.to(view, .3, {
        opacity: 1
    });

        $(".circle-cursor--view").text("");
        $('.circle-cursor--view').text($(t.target).data("cursor-text"));

    
}
function onMouseHoverOut() {
    TweenMax.to(bigBall, .3, {
        scale: 1,
        backgroundColor: "transparent",
        opacity: 0.3
    });
    TweenMax.to(smallBall, .3, {
        opacity: 1
    });
            TweenMax.to(view, .3, {
        opacity: 0
    });
    //  $('.circle-cursor--view').text("");

}
}
/*--------------------------------------------
    smoothScroll
---------------------------------------------*/ 
function smoothScroll() {
 
    
var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#app"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  TweenLite.set(scroller.target, { 
    y: -scroller.y 
  });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;

   // change color btn main
    var _isOnWhiteHeader = false;
    $('.section, .section-light').each(function() {
        var scrollPosition = $(window).scrollTop();
        var header = $('.header').outerHeight();
        var elementTop = $(this).offset().top - header;
        var elementBottom = $(this).outerHeight() + elementTop;
        
        if (scrollPosition > elementTop && scrollPosition < elementBottom) {
        $('.header').addClass('dark');
        _isOnWhiteHeader = true;
        }
        else if(!_isOnWhiteHeader){
            $('.header').removeClass('dark');
        }
    });
    var _isOnWhiteHeader = false;
    $('.section-color').each(function() {
        var scrollPosition = $(window).scrollTop();
        var header = $('.header').outerHeight();
        var elementTop = $(this).offset().top - header;
        var elementBottom = $(this).outerHeight() + elementTop;
        
        if (scrollPosition > elementTop && scrollPosition < elementBottom) {
        $('.logo').addClass('light');
        _isOnWhiteHeader = true;
        }
        else if(!_isOnWhiteHeader){
            $('.logo').removeClass('light');
        }
    });

}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

}
/*--------------------------------------------
    loader
---------------------------------------------*/ 
function lines() {
    var containerLines = $('.wrap-lines.container').width();
    var body = $('body').width();
    var linesOutsideContainer = (body / 2) - (containerLines / 2);
    $('.half-line').css('width', (linesOutsideContainer));
}
/*--------------------------------------------
    loader
---------------------------------------------*/ 
function loader(){
    $('body.home').css('overflow', 'hidden');
    var colorBlock = '#292A2C';

    TweenMax.set(".progress-circle",{opacity:1});
    var l = new TimelineMax();
    l.from(".progress-circle",.6, {
        transformOrigin:"50% 50%",
        autoAlpha:0,
        y:50,
        ease:Expo.easeOut
    }, "0.25")
    .from(".loader-title",.6, {
        transformOrigin:"50% 50%",
        autoAlpha:0,
        y:50,
        ease:Expo.easeOut
    }, "0.75")
    .fromTo(".circle-line", 2, {
        opacity: 0,
        rotation:0,
        transformOrigin:"center",
        strokeDashoffset:"400",
        strokDasharray:"200"},{
        opacity: 1,
        rotation:360,
        strokeDashoffset:"0",
        strokeDasharray:"400"
    })
    .to(".loader", 0.5, {
        opacity: 0,
        display: 'none'
    }, "+=0.25")
    .to("body.home", 0.5, {
        overflow: 'visible'
    }, "-=0.65")
    .to(".lines-intro .before-lines .block-line", 0.2, {
            x: 0,
            background: colorBlock,
    }, "-=0.35")
    .to(".lines-intro .liner .block-line", 0.2, {
            x: 0,
            background: colorBlock,
    }, "-=0.35")
    .to(".lines-intro .after-lines .block-line", 0.2, {
            x: 0,
            background: colorBlock,
    }, "-=0.35");
}
 /*--------------------------------------------
    nav
---------------------------------------------*/ 
function navigation(){
    $('.btn-main').on('click', function (e) {
    e.preventDefault();
    $('.main').toggleClass('is-open');
    $('body').toggleClass('overflow-hidden');
    $('.logo .title-site').toggleClass('dark');
    $('.main-item .item').mouseenter(function(){
        $('.animate').addClass('is-visible');
    });
    $('.main-item .item').mouseleave(function(){
        $('.animate').removeClass('is-visible');
    });
    if($('.main').hasClass('is-open')){
        $('.logo .title-site').css('transition-delay','0.4s');
        setTimeout(function(){
            $('.btn-main').addClass('is-open');
            // $('.logo').addClass('is-open');
            // $('.header').addClass('is-open');
        }, 400); 
    }else {
         $('.logo .title-site').css('transition-delay','0.8s');
                 setTimeout(function(){
            $('.btn-main').removeClass('is-open');
            // $('.logo').removeClass('is-open');
            // $('.header').removeClass('is-open');
        }, 800); 
    }
});

	/* 8. Change menu background */
	// $(document).on('mouseover', '.main-item .item', function(){		
	// 	$(this).addClass('img-active').siblings().removeClass('img-active')
	// });
}
/*--------------------------------------------
    hide title navbar
---------------------------------------------*/ 
function titleNav() {
    var offset = 10;
    $(window).on('scroll', function(){
      if( $(window).scrollTop()>=offset ){
        $('.title-site').addClass('is-hide');
        $('.title-site').css('transition-delay','0s');
      } else {
        $('.title-site').removeClass('is-hide');
        $('.title-site').css('transition-delay','0.8s');
      }
    });
}
/*--------------------------------------------
    introLetters
---------------------------------------------*/ 
function introLetters() {
    var e = function(e) {
        return e.outerWidth(!0)
    }
    var t = function(e){
        return e.outerHeight(!0)
    }
    var init_tl;
    var tl;
    var i = $(".home-slide--intro .desktop h1");
    var r = $(".home-slide--intro .desktop h2");
    var f = $(".wrap-elements");
    r.find('div[class^="words"]').css("width", "");
    r.find('div[class^="word-"]').attr("style", "");
    r.find(".words1").outerWidth(e(r.find(".words1 .word-1")));
    r.find(".words1").outerHeight(t(r.find(".words1 .word-1")));
    f.find('div[class^="element-"]').attr("style","");
    var o = Array.from(i.find(">div:not(.words)"));
    i.find(".words >div:first-child >div").each(function(e, t) {
        o.push($(this))
    });
    var u = e(r.find(".words1 .word-1"));
    var g = e(r.find(".words1 .word-2"));
    var _ = e(r.find(".words1 .word-3"));
    var a = e(r.find(".words1 .word-4"));
    var c = e(f.find(".element-1"));
    var b = e(f.find(".element-3"));
    var d = e(f.find(".element-4"));
    var t = e(f.find(".element-5"));
    var s = e(f.find(".element-6"));
    var h = e(f.find(".element-7"));
    var j = e(f.find(".element-8"));
    var l = e(f.find(".element-9"));
    var m = e(f.find(".element-10"));
    var n = e(f.find(".element-11"));
    var p = e(f.find(".element-12"));


TweenMax.set(".wrap-elements",{opacity:1});

var elements = new TimelineMax();
elements
.to(".lines-intro .before-lines", .2, {
background: 'transparent'  
}, "-=0.35")
.to(".lines-intro .before-lines .block-line", .2, {
background: 'transparent'  
}, "-=0.35")
.to(".lines-intro .liner", .2, {
background: 'transparent'  
}, "-=0.35")
.to(".lines-intro .liner .block-line", .2, {
background: 'transparent'  
}, "-=0.35")
.to(".lines-intro .after-lines", .2, {
background: 'transparent'  
}, "-=0.35")
.to(".lines-intro .after-lines .block-line", .2, {
background: 'transparent'  
}, "-=0.35")
.from(".element-1",.6, {
    transformOrigin:"50% 50%",
    autoAlpha:0,
    rotationX:90,
    x:-60, y:-50,
    rotation:90,
    ease:Expo.easeOut
}, "0")
.from(".element-3",.6, {
    transformOrigin:"50% 50%",
    autoAlpha:0, x:-70, 
    y:100, 
    rotationX:90,
    rotation:-90, 
    ease:Expo.easeOut
}, ".1")
.from(".element-4",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:10, 
    y:-60, 
    rotationX:90, 
    rotation:90, 
    ease:Expo.easeOut
}, ".11")
.from(".element-5",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0,  
    x:-80, 
    y:-60, 
    rotationX:90, 
    rotation:-90, 
    ease:Expo.easeOut
}, ".12")
.from(".element-6",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:-80, 
    y:20, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".13")
.from(".element-7",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:-150, 
    y:40, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".14")
.from(".element-8",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:50, 
    y:-70, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".15")
.from(".element-9",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:200, 
    y:40, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".16")
.from(".element-10",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:-10, 
    y:90, 
    rotationX:90, 
    rotation:90, 
    ease:Expo.easeOut
}, ".17")
.from(".element-11",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:50, 
    y:50, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".18")
.from(".element-12",.6, {
    transformOrigin:"50% 50%", 
    autoAlpha:0, 
    x:50, 
    y:50, 
    rotationX:90, 
    ease:Expo.easeOut
}, ".19");

    init_tl = new TimelineMax({
        id: "initial",
        delay: 4,
        onComplete: function() {
            tl.play()
        }
    }),
    tl = new TimelineMax({
        paused: !0,
        repeat: -1,
        id: "normal",
        onComplete: function() {}
    });
    var E = "Power1.easeInOut";
    var C = "Power3.easeOut";
    init_tl.addLabel("initial").set(i, {
        opacity: 0,
        y: "-45%"
    }, "initial").to(i, 1,{
        opacity: 1,
        y: "-50%",
        x: "-50%"
    }, "initial").set(o, {
        opacity: 0,
        y: "20px"
    }).add(elements, "-=.5", {      
    }, "initial").fromTo(r, 1, {
        opacity: 0,
        y: "20px"
    }, {
        opacity: 1,
        y: "0",
        ease: E 
    }, "initial").staggerTo(o, 1.2, {
        ease: C,
        y: "0",
        opacity: 1
    }),
    tl.to(r.find(".words1 .word-1"), .5, {
        opacity: 0,
        y: "-10px",
        ease: E
    }, "+=2.2").to(r.find(".words1"), .4, {
        width: g + "px"
    }).set(r.find(".words1 .word-2"), {
        display: "block",
        opacity: 0,
        y: "10px"
    }).to(r.find(".words1 .word-2"), 1, {
        ease: C,
        y: "0",
        opacity: 1
    }).to(f.find(".element-3"), 1, {
        ease: C,
        rotation:360
    }).to(f.find(".element-1"), 1, {
        ease: C,
        rotation:360 
    }).to(f.find(".element-11"), 1, {
        ease: C,
        rotation:360
    }).to(f.find(".element-5"), 1, {
        ease: C,
        rotation:720                        
    }).to(r.find(".words1 .word-2"), .5, {
        opacity: 0,
        y: "-10px",
        ease: E   
    }, "+=2.2").to(r.find(".words1"), .4, {
        width: _ + "px"  
    }).set(r.find(".words1 .word-3"), {
        display: "block",
        opacity: 0,
        y: "10px"     
    }).to(r.find(".words1 .word-3"), 1, {
        ease: C,
        y: "0",
        opacity: 1
    }).to(f.find(".element-4"), 1, {
        ease: C,
        rotation:-360
    }).to(f.find(".element-4"), 1, {
        ease: C,
        rotation:-360             
    }).to(r.find(".words1 .word-3"), .5, {
        opacity: 0,
        y: "-10px",
        ease: E
    }, "+=2.2").to(r.find(".words1"), .4, {
        width: a + "px"
    }).set(r.find(".words1 .word-4"), {
        display: "block",
        opacity: 0,
        y:"10px" 
    }).to(r.find(".words1 .word-4"), 1, {
        ease: C,
        y: "0",
        opacity: 1
    }).to(f.find(".element-12"), 1, {
        ease: C,
        rotation:315 
    }).to(f.find(".element-3"), 1, {
        ease: C,
        rotation:-360
    }).to(f.find(".element-5"), 1, {
        ease: C,
        rotation:-720               
    }).to(r.find(".words1 .word-4"), .5, {
        opacity: 0,
        y:"-10px",
        ease: E
    }, "+=2.2").to(r.find(".words1"), .4, {
        width: u + "px"  
    }).set(r.find(".words1 .word-1"), {
        display: "block",
        opacity: 0,
        y: "10px"
    }).to(r.find(".words1 .word-1"), 1, {
        ease: C,
        y: "0",
        opacity: 1
    }).to(f.find(".element-1"), 1, {
        ease: C,
        rotation:-360
    }).to(f.find(".element-4"), 1, {
        ease: C,
        rotation:360                   
    });
}
 /*--------------------------------------------
    case studies homepage
---------------------------------------------*/ 
function caseStudies(){
    var wrapImg = $('.liner').width() * 2 + 2;
    // var color = $('.section .work-left').attr('data-color');
        // $('.section .work-left').css({
        //     width: wrapImg,
        //     background: color
        // })
    // $('.hoverlay-work .wrap-elements').css({
    //     width:wrapImg
    // })
    $('.section .work-left').each(function(){
        // $(this).css({
        //     width: wrapImg,
        //     background: color
        // })
     var $this = $(this),
            color = $this.attr('data-color');
        $($this).css({
            // width: wrapImg,
            background: color
        })
    }) ;   
}
 /*--------------------------------------------
    case studies slider
---------------------------------------------*/
function caseStudiesSlider(){
    // var slider = $('.case-studies-slider');
    // var itemSlide = slider.find('.item-case-study').length;
    // var item = $('item-case-study');
    // var fisrtItem = $('.item-case-study:first-child');
    // var fisrtItemIsActive = fisrtItem.addClass('is-active');
    // var curSlide = 0;
    // var btn = $('.slide-nav-next');
     var E = "Power1.easeInOut";
     var C = "Power3.easeOut";
    var tl;
    var init_tl;




    init_tl = new TimelineMax({
        id: "initial",
        //delay: 9,
        onComplete: function() {
            tl.play()
        }
    }),


    tl = new TimelineMax({
        paused: !0,
        id: "normal",
        onComplete: function() {}
    });






  var $slider = $(".case-studies-slider"),
      $slideBGs = $(".work-left"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".item-case-study").length-1,
      animating = false,
      animTime = 6000,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;

      changeSlides();
    }, autoSlideDelay);

    // tl.set(".work-left",{
    //     x: "0%"
    // }, "+=2.5")
    // .from(".work-left", 0.8, {
    //     x: "-100%"
    // })
    // .set(".content-img", {
    //     opacity: 1,
    //     y: "0",
    //     ease: E
    // }, "+=0.5")
    // .from(".content-img", 0.5, {
    //     opacity: 0,
    //     y: "20px"
    // })

  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      $slider.css("top");
      $(".item-case-study").removeClass("is-active");
      $(".item-case-study-"+curSlide).addClass("is-active");
      setTimeout(function() {

        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");

    //     init_tl.addLabel("initial").set('.content-img', {
    //     opacity: 0
    // }, "initial").to('.content-img', 1,{
    //     opacity: 1
    // }),
    //     tl.set($slideBGs, {
    //         x: "-100%",
    //         ease: E
    //     }).to($slideBGs, 1.5, {
    //         x: "0%",
    //         ease: C   
    //     });



    //   init_tl.addLabel("initial").set(".work-left", {
    //     x: "-100%"
        
    // }, "initial").to(".work-left", 1,{
    //     x: "0%"
    // }, "initial").fromTo(".content-img", .5, {
    //     opacity: 0,
    //     y: "20px"
    // }, {
    //     opacity: 1,
    //     y: "0",
    //     ease: E
    // }),
    // tl.to(".content-img", .5, {
    //     opacity: 0,
    //     y: "-10px",
    //     ease: E
    // }, "+=3.5").to(".work-left", 1, {
    //      x: "100%"   
    // });
    

    //good timeline
    // init_tl.addLabel("initial").fromTo(".content-img",.5, {
    //     opacity: 0,
    //     y: "20px"
    // }, {
    //     opacity: 1,
    //     y: "0",
    //     ease: E 
    // }),
    // tl.fromTo(".work-left", .8, {
    //      x: "-100%"   
    // }, {
    //      x: "0%" 
    // });  

    //good timeline mieux

    // init_tl.addLabel("initial").set(".content-img", {
    //     opacity: 0,
    //     y: "20px"
    // }, "initial").to(".content-img", .5, {
    //     opacity: 1,
    //     y: "0",
    //     ease: E
    // }),
    // tl.set(".work-left",  {
    //     x: "-100%"
    // }).to(".work-left", .8, {
    //     x: "0%"
    // }).to(".content-img", .5, {
    //     opacity: 0,
    //     y: "20px",
    //     ease: C
    // }).to(".work-left", .8, {
    //     x: "100%"
    // });

    // tl.set(".work-left",{
    //     x: "0%"
    // }, "+=2")
    // .from(".work-left", 0.8, {
    //     x: "-100%"
    // })
    // .set(".content-img", {
    //     opacity: 1,
    //     y: "0",
    //     ease: E
    // }, "+=0.5")
    // .from(".content-img", 0.5, {
    //     opacity: 0,
    //     y: "20px"
    // })
    // tl.set(".work-left", {
    //     x: "0%"
    // }, "+=2")
    // .to(".work-left", 0.8, {
    //     x: "100%"
    // })



    diff = 0;
    autoSlide();
  }
   tl.play()

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

}



function slider5(){
var $slider = $(".case-studies-slider");
var $slides = $slider.find(".item-case-study");
var $overlays = $slider.find(".work-left");
var $images = $slider.find(".content-img");
var $navPrev = $(".go-prev");
var $navNext = $(".go-next");
var $startAutoplay = $(".start-autoplay");
var $stopAutoplay = $(".stop-autoplay");
var $lines = $('.bullet-line');
var $wrapBullet = $('.study-bullet');
var $wrapTxt = $('.case-study-txt');
var $slideTitle = $('.case-study-title div');
var $slideDesc = $('.case-study-desc .case-study-excerpt');
var $slideLink = $('.case-study-desc .case-study-link');
var $elements = $('.case-studies-slider .hoverlay-work .wrap-elements');
var slidesNum = $slides.length;
var prevSlideID = null;
var currentSlideID = 0;
var isAnimating = false;
var isAutoPlay = false;
var autoSlideTimeout;
var autoSlideDelay = 6000;
var E = "Power4.easeInOut";
var C = "Power3.easeOut";
var numOfSlides = $(".item-case-study").length-1;
// var sliderPosition = $('#caseStudiesSlider').offset().top;
var sliderPosition2 = $('#caseStudiesSlider').innerHeight();

  $(window).on('scroll', function(){
    if( $(window).scrollTop() >= sliderPosition2 ){
      $('.case-studies-slider').addClass('is-play');
      startAutoPlay();
    } else {
      $('.case-studies-slider').removeClass('is-play');
      stopAutoPlay();
    }


  });
  
function init() {
	// TweenMax.set($overlays, {
    //     x: "0%"
    // });
    	TweenMax.set($overlays, {
		x: "-100%"
    });
        TweenMax.set($elements, {
        opacity: "0",
        y: "-48%"
    });
        TweenMax.set($images, {
        opacity: "0",
        y: "20px"
    });
        TweenMax.set($lines, {
		x: "100%"
    });
    TweenMax.set($slideTitle, {
        y: "100%",
        opacity: "0"
    });
    TweenMax.set($slideDesc, {
        y: "100%",
        opacity: "0"
    });
    TweenMax.set($slideLink, {
        y: "100%",
        opacity: "0"
    });
    TweenMax.set($wrapTxt, {
        zIndex: "0"
    });

	$navPrev.on("click", gotoPrevSlide);
	$navNext.on("click", gotoNextSlide);
	//$startAutoplay.on("click", startAutoPlay);
	$stopAutoplay.on("click", stopAutoPlay);
    gotoSlide(0, 0);
                // startAutoPlay();

}

function gotoPrevSlide() {
	var slideToGo = currentSlideID - 1;
	if (slideToGo <= -1) {
		slideToGo = slidesNum - 1;
	}
    stopAutoPlay();
	gotoSlide(slideToGo, 1, "prev");
}

function gotoNextSlide() {
    var slideToGo = currentSlideID + 1;
	if (slideToGo >= slidesNum) {
		slideToGo = 0;
	}
     stopAutoPlay();
	        gotoSlide(slideToGo, 1, "next");
}

function gotoSlide(slideID, _time, _direction) {
	if (!isAnimating) {
		isAnimating = true;
		prevSlideID = currentSlideID;
		currentSlideID = slideID;
        var $prevSlide = $slides.eq(prevSlideID);
        var $currentSlide = $slides.eq(currentSlideID);
        var $prevOverlay   = $overlays.eq(prevSlideID);
        var $currentOverlay = $overlays.eq(currentSlideID);
        var $prevImg   = $images.eq(prevSlideID);
        var $currentImg = $images.eq(currentSlideID);
        var $prevLine = $lines.eq(prevSlideID);
        var $currentLine = $lines.eq(currentSlideID);
        var $prevBullet = $wrapBullet.eq(prevSlideID);
        var $currentBullet = $wrapBullet.eq(currentSlideID);
        var $prevTxt = $wrapTxt.eq(prevSlideID);
        var $currentTxt = $wrapTxt.eq(currentSlideID);
        var $prevTitle = $slideTitle.eq(prevSlideID);
        var $currentTitle = $slideTitle.eq(currentSlideID);
        var $prevDesc = $slideDesc.eq(prevSlideID);
        var $currentDesc = $slideDesc.eq(currentSlideID);
        var $prevLink = $slideLink.eq(prevSlideID);
        var $currentLink = $slideLink.eq(currentSlideID);
        var $prevElement = $elements.eq(prevSlideID);
        var $currentElement = $elements.eq(currentSlideID);
        $prevSlide.removeClass('is-active');
        $currentSlide.addClass('is-active');
        $prevBullet.removeClass('is-active');
        $currentBullet.addClass('is-active');
        $prevTxt.removeClass('is-active');
        $currentTxt.addClass('is-active');
		var time = 1;
		if (_time !== null) {
			time = _time;
		}
		var direction = "next";
		if (_direction != null) {
			direction = _direction;
		}
		if (direction == "next") {
			// TweenMax.to($prevSlide, time, {
			// 	left: "-100%"
			// });
			// TweenMax.fromTo($currentSlide, time, {
            //     left: "100%",
            //     delay: "2.5"
			// }, {
			// 	left: "0"
            // });

            // 			TweenLite.to($overlay, time, {
			// 	x: "100%"
			// });
			// TweenLite.fromTo($currentOverlay, time, {
			// 	x: "-100%"
			// }, {
			// 	x: "0%"
            // });

            // .set(".content-img", {
            //     opacity: 1,
            //     y: "0",
            //     ease: E
            // }, "+=0.5")
            // .from(".content-img", 0.5, {
            //     opacity: 0,
            //     y: "20px"
            // })

            // tl.set($currentOverlay,{
            //     x: "0%"
            // }, "+=0.5")
            // .from($currentOverlay, 0.8, {
            //     x: "100%"
            // })

            var tl = new TimelineMax({repeat:0});

            // tl.from($prevSlide, time, {
            //     left: "100%" ,
            //     opacity: "0",
            //     visibility: "visible"               
            // }, "+=3.5").to($prevSlide, time, {
            //     left: "-100%",
            //     opacity: "1",
            //     visibility: "visible"
            // })

            TweenMax.to($prevOverlay, 0.8, {
                x: "100%",
                 ease: C
            });
            tl.to($currentOverlay, 0.8, {
                x: "-100%"
            })
			TweenMax.fromTo($currentOverlay, 0.8, {
                x: "-100%"
			}, {
                x: "0%",
                delay: 3,
                ease: E
            });
            TweenMax.to($prevElement, 2, {
                opacity: "0",
                y: "-48%",
                ease: C
            });
            tl.to($currentElement, 2, {
                opacity: "0",
                y: "-48%"
            })
			TweenMax.fromTo($currentElement, 2, {
                opacity: "0",
                y: "-48%"
			}, {
                opacity: "1",
                y: "-50%",
                delay: 3.5,
                ease: E
            });            
            TweenMax.to($prevImg, time, {
                opacity: "0",
                y: "20px"
            });
            TweenMax.fromTo($currentImg, time, {
                opacity: "0",
                y: "20px"
			}, {
                opacity: "1",
                y: "0",
                delay: 3.6,
            });
            TweenMax.to($prevLine, 0.5, {
                x: "100%",
                ease: E
            });
            TweenMax.fromTo($currentLine, 0.5, {
                x: "100%",
                ease: C
            }, {
                x : "0%",
                delay: 3,
                ease: C  
            });
            TweenMax.to($prevBullet, 0.5, {
                opacity: "0.4",
                ease: E
            });
            TweenMax.fromTo($currentBullet, 0.5, {
                opacity: "0.4",
                ease: C
            }, {
                opacity : "1",
                delay: 3,
                ease: C  
            });
            TweenMax.to($prevTxt, 0.5, {
                zIndex: "0"
            });
            TweenMax.fromTo($currentTxt, 0.5, {
                zIndex: "0"
            }, {
                zIndex: "1",
            });
            TweenMax.to($prevTitle, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            });
            TweenMax.fromTo($currentTitle, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            }, {
                y: "0%",
                opacity: "1",
                delay: 3,
                ease: E  
            });
            TweenMax.to($prevDesc, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            });
            TweenMax.fromTo($currentDesc, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            }, {
                y: "0%",
                opacity: "1",
                delay: 3.5,
                ease: E  
            });
            TweenMax.to($prevLink, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            });
            TweenMax.fromTo($currentLink, 2, {
                y: "100%",
                opacity: "0",
                ease: E
            }, {
                y: "0%",
                opacity: "1",
                delay: 3.8,
                ease: E  
            });


		} else {
			// TweenLite.to($prevSlide, time, {
			// 	left: "100%"
			// });
			// TweenLite.fromTo($currentSlide, time, {
			// 	left: "-100%"
			// }, {
			// 	left: "0"
			// });
		}
		TweenLite.delayedCall(time, function() {
            isAnimating = false;
        });
	}
}

function play(){
    gotoNextSlide();
    TweenLite.delayedCall(12, play);

// tl.play()

}

function startAutoPlay(immediate) {
	if (immediate != null) {
		immediate = false;
	}
    
	if (immediate) {
         gotoNextSlide();
    }
    //      setTimeout(function() {

    //      play();
    //   }, 3000);
    TweenLite.delayedCall(12, play);
 }

  
//   function autoSlide() {
//     autoSlideTimeout = setTimeout(function() {
//       currentSlideID++;
//       if (currentSlideID > numOfSlides) currentSlideID = 0;

//       gotoNextSlide();
//     }, autoSlideDelay);



//   };
  
//   autoSlide();

function stopAutoPlay() {
  isAutoPlay = false;
	TweenLite.killDelayedCallsTo(play);
}
init();

}
  /*--------------------------------------------
    scroll reveal
---------------------------------------------*/
// function scrollReveal() {
//   window.sr = ScrollReveal();
//   sr.reveal('.perso', {
//     duration   : 600,
//     distance   : '60px',
//     easing     : 'ease-out',
//     origin     : 'bottom',
//     reset      : true,
//     scale      : 1,
//     viewFactor : 0,
//     afterReveal  : function() {
//         revealChildren,
//     $(".element-perso").addClass("is-move");
//   }
//   }, 150);
  
//     var revealChildren = sr.reveal('.perso-head-1, .perso-head-2, .perso-head-3', {
//     duration   : 500,
//     scale      : 1,
//     distance   : '60px',
//     origin     : 'bottom',
//     reset      : true,
//     easing     : 'ease-out',
//     viewFactor : 1,
//   }, 75);


// };

  /*--------------------------------------------
    scrollPerso
---------------------------------------------*/ 
// function scrollPerso(){
				
// 	//Parallax & fade on scroll	
//     //     var perso = $('.graphisme-img').innerHeight();
// 	//   $(document).on('scroll', function(){
//     //     if( $(document).scrollTop() >= perso ){
//     //   $('.element-perso').addClass('is-move');
//     // } else {
//     //   $('.element-perso').removeClass('is-move');
//     // }
//     //   }); 
 
// // $(document).on('scroll', function() {
// //     var header = $('.element-perso');
// // var hieghtThreshold = $(".section-graphisme").offset().top + 100 ;
// // var hieghtThreshold_end  = $(".section-graphisme").offset().top + $(".section-graphisme").height() ;
// //     var scroll = $(window).scrollTop();

// //     if (scroll >= hieghtThreshold  && scroll <=  hieghtThreshold_end ) {
// //         header.addClass('is-move');
// //     } else {
// //         header.removeClass('is-move');
// //     }
// //   });



// /*! Scroll Reveal Animations */
// window.sr = ScrollReveal();



// 	/* Scroll Animation */
// 	  sr.reveal('.perso', {
//     duration   : 2000,
//     distance   : '100%',
//     easing     : 'ease-out',
//     origin     : 'bottom',
//     reset      : true,
//     viewFactor : 0,
//     afterReveal  : revealChildren,
//   }, 650);

//       var revealChildren = sr.reveal('.perso-head-1, .perso-head-2, .perso-head-3, .perso-bottom, .perso-caps', {
//     duration   : 2000,
//     distance   : '100%',
//     origin     : 'bottom',
//     reset      : true,
//     viewFactor : 1,
//     easing     : 'ease-out',
//   }, 675);

// }
  /*--------------------------------------------
    go top
---------------------------------------------*/ 
function goToTop() {
    $(".gotop").on("click", function(e) {
        $(window).scrollTop(),
        e.preventDefault(),
        $("html,body").animate({
            scrollTop: 0
        }, 900)
    });
}
  /*--------------------------------------------
    formulaire contact
---------------------------------------------*/
function contactForm() {
    // $('.wrap-form-contact input').on("focus blur", function() {
    //     if ($(this).val().length > 0 || $('.wrap-form-contact input').is(':focus')) {
    //       $(this).siblings().addClass('active');
    //       $(this).parent().addClass('active');
      
    //     } else {
    //       $(this).siblings().removeClass('active').addClass('not');
    //       $(this).parent().removeClass('active').addClass('not');
    //     }
      
    //     if ($(this).val().length < 2 && $('.wrap-form-contact input').is(':focus') != true && $(this).is(':invalid') || $(this).is(':invalid') && $('.wrap-form-contact input').is(':focus') != true) {
    //       $(this).parent().addClass('invalid');
    //       $(this).siblings().addClass('invalid');
    //     } else {
    //       $(this).parent().removeClass('invalid');
    //       $(this).siblings().removeClass('invalid');
    //     }
      
    //     if ($(this).val().length > 0 && $(this).is(':valid') && $('.wrap-form-contact input').is(':focus') != true) {
    //       $(this).parent().addClass('valid');
    //       $(this).siblings().addClass('valid');
    //     } else {
    //       $(this).parent().removeClass('valid');
    //       $(this).siblings().removeClass('valid');
    //     }
      
    //   });

        $('.wrap-form-contact input, .wrap-form-contact textarea').on("focus blur", function() {
        if  ($('.wrap-form-contact input, .wrap-form-contact textarea').is(':focus')) {
          $(this).siblings().addClass('active');
          $(this).parent().addClass('active');
      
        } else if ($(this).val().length > 0 ) {
            $('.wrap-form-contact .input-wrap').removeClass('active');
        } else {
          $(this).siblings().removeClass('active');
          $(this).parent().removeClass('active');
        }
          
      });    
} 
  /*--------------------------------------------
    header contact
---------------------------------------------*/
function headerContact() {
    var heroContact = $('.hero-contact .hero-content'); 
    var position = $('.hero-contact .hero-content').attr('data-position');
    $(heroContact).css({
        backgroundPosition: 100 +'%' + position + '%'
    })
  
    // $(document).on('scroll', function(){
    //     var opacity = 1;
    //     var heroContact = $('.hero-contact').outerHeight() / 2;
    //     var contactTitle = $('.hero-contact .hero-title h1');

    //     if(heroContact < $(document).scrollTop()){
    //         opacity = 0;
    //         }else {    
    //         opacity = opacity - ( $(document).scrollTop() / heroContact ); 
    //         }
    //         contactTitle.css('opacity', opacity);
    // });
}
  /*--------------------------------------------
    header title opacity
---------------------------------------------*/
function titleOpacity() {
    $(document).on('scroll', function(){
        var opacity = 1;
        var heroContent = $('.hero-content').outerHeight() / 2;
        var heroTitle = $('.hero-title');
    
        if(heroContent < $(document).scrollTop()){
            opacity = 0;
            }else {    
            opacity = opacity - ( $(document).scrollTop() / heroContent ); 
            }
            heroTitle.css('opacity', opacity);
    });
}
  /*--------------------------------------------
    message confirm contact
---------------------------------------------*/
function confirmContact() {
    if ($('.contact-me div').hasClass('wpforms-confirmation-container-full')){
       $('.contact-me').addClass('no-shadow');
       $('.contact-me').append($('<div class="send-email animated infinite pulse delay-2s slower"></div>'));
    }

    // setTimeout(function(){
    //     $('.wpforms-confirmation-container-full').addClass('is-hide');
    //     // $(location).attr('href', '//localhost:3000');
    //   }, 10000);
}
  /*--------------------------------------------
    parallax
---------------------------------------------*/
function parallax() {
    var rellax = new Rellax('.rellax');
}
  /*--------------------------------------------
    works masnory
---------------------------------------------*/
function gridWorks(){
    var $gridt = $('.works');
    $gridt.isotope({
          itemSelector: '.grid-item',
          percentPosition: true
    });
    $('.wrap-btn-filter').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $gridt.isotope({
            filter: filterValue
        });
        $(this).addClass('active').siblings().removeClass('active');
    });
}
  /*--------------------------------------------
    swiper slider case study
---------------------------------------------*/
function swiperCaseStudy() {
    var padding = $('.wrap-lines.container').width();
    var body = $('body').width();
    var linesOutsideContainer = (body / 2) - (padding / 2);
    // $('.swiper-container').css('margin-left', (linesOutsideContainer)-2);
    // $('.swiper-container').css('margin-right', (linesOutsideContainer)+4);

    var swiper = new Swiper('.swiper-container', {
        slidesPerView:  1,
        // slidesPerColumn: 1,
        //grabCursor: true,
        spaceBetween: 30,
        keyboardControl: true,
        //centeredSlides: true,
        //width: 1080,

        //centerSlidesBounds: true,
        //slidesPerGroupSkip: 1,
        //slidesPerGroup: 1,
        // loop: false,
        // loopFillGroupWithBlank: true,
        //slidesOffsetBefore: 0,
        keyboard: {
            enabled: true
        },
        pagination: {
            el: '.swiper-pagination',
            // bulletClass: 'hoverable',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //swiper.width

    // swiper.on('setTranslate', function () {
    //     // swiper.slides[1].css('translate3d', 0, 0 ,0)
    //   });

    // swiper.slides[1].on('setTranslate', function(){
    //     this.css('translate3d', 0, 0 ,0);
    // });

}
  /*--------------------------------------------
    img full-width case study
---------------------------------------------*/
function imgPosition() {
    var img = $('.img-full-width-case-study .img-content'); 
    var position = $('.img-full-width-case-study .img-content').attr('data-position');
    $(img).css({
        backgroundPosition: 100 +'%' + position + '%'
    });
}
/*--------------------------------------------
    count number about
---------------------------------------------*/
function countAbout() {
    var presentation = $('.presentation-about').outerHeight() / 2;
    if($('.number-about').length){
        var number = $('.number-about').offset().top;
   }
        var offset = number - presentation;
        $(document).on('scroll', function(){
            if($(document).scrollTop() >= offset){
            $('.number p').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-number');
                    $(document).off("scroll");
                $({ countNum: $this.text()}).animate({
                countNum: countTo
                },
                {
                duration: 4000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                    // $(window).off("scroll");
                },
                complete: function() {
                    $this.text(this.countNum);
                }
                });
            });
            }
        });
  }
/*--------------------------------------------
    load function
---------------------------------------------*/ 
$(document).ready(function() {
    cursor();
    smoothScroll();
    lines();
    loader();
    navigation();
    titleNav();
    introLetters();
    caseStudies();
    // caseStudiesSlider();
    // workSlider2();
    // workSlider4();
    slider5();
    // scrollReveal();
    // scrollPerso();
    goToTop();
    contactForm();
    headerContact();
    parallax();
    confirmContact();
    gridWorks();
    swiperCaseStudy();
    imgPosition();
    countAbout();
    titleOpacity();
});

$(window).resize(function() {
    lines();
  });


});