import $ from 'jQuery';
import 'bootstrap';
import Rellax from '../js/rellax';
import ScrollReveal from '../js/scrollReveal';
import Swiper from '../js/plugins';


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
  document.addEventListener("click", onClick);  
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
  $('[data-toggle="tooltip"]').tooltip('hide'); 
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onClick() {
    scroller.resizeRequest++;
    $('.btn-filter').on('click', function(){
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
          }
      });
}
}
/*--------------------------------------------
    Lines
---------------------------------------------*/ 
function lines() {
    var containerLines = $('.wrap-lines.container').width();
    var body = $('body').width();
    var linesOutsideContainer = (body / 2) - (containerLines/ 2);
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
    // effet-menu-grid
    $('.wrap-grid').addClass('is-active')

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
        }, 400);
    }else {
         $('.logo .title-site').css('transition-delay','0.8s');
                 setTimeout(function(){
            $('.btn-main').removeClass('is-open');
        }, 800); 
        $('.wrap-grid').removeClass('is-active');
    }
});
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
    }, "+=0.5").to(r.find(".words1"), .4, {
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
    }, "+=0.5").to(r.find(".words1"), .4, {
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
    }, "+=0.5").to(r.find(".words1"), .4, {
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
    }, "+=0.5").to(r.find(".words1"), .4, {
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
    case studies bg color
---------------------------------------------*/ 
function caseStudies(){
    $('.section .work-left').each(function(){
     var $this = $(this),
            color = $this.attr('data-color');
        $($this).css({
            background: color
        })
    }) ;   
}
 /*--------------------------------------------
    case studies slider
---------------------------------------------*/
function caseStudiesSlider(){
var $slider = $(".case-studies-slider");
var $slides = $slider.find(".item-case-study");
var $overlays = $slider.find(".work-left");
var $images = $slider.find(".content-img");
var $navPrev = $(".go-prev");
var $navNext = $(".go-next");
var $startAutoplay = $(".start-autoplay");
var $stopAutoplay = $(".stop-autoplay");
var $lines = $('.bar-line');
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
var numOfSlides = $(".item-case-study").length;
var sliderPosition2 = $('#caseStudiesSlider').innerHeight();

//   $(window).on('scroll', function(){
//     if( $(window).scrollTop() >= sliderPosition2 ){
//       $('.case-studies-slider').addClass('is-play');
//       startAutoPlay();
//     } else {
//       $('.case-studies-slider').removeClass('is-play');
//       stopAutoPlay();
//     }
//   });



function init() {
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
	$stopAutoplay.on("click", stopAutoPlay);
    gotoSlide(0, 0);

}

function gotoPrevSlide() {
	var slideToGo = currentSlideID - 1;
	if (slideToGo <= -1) {
		slideToGo = slidesNum - 1;
	}
    stopAutoPlay();
    startAutoPlay();
    gotoSlide(slideToGo, 1, "prev");
}

function gotoNextSlide() {
    var slideToGo = currentSlideID + 1;
	if (slideToGo >= slidesNum) {
		slideToGo = 0;
	}
    stopAutoPlay();
    startAutoPlay();
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
        $prevTxt.removeClass('is-active');
        $currentTxt.addClass('is-active');
        var numberSlide = '0'+(slideID +1);
        var numberSlideString = numberSlide.toString();
        var time = 1;
		if (_time !== null) {
			time = _time;
		}
		var direction = "next";
		if (_direction != null) {
			direction = _direction;
		}
		if (direction == "next" || direction == "prev") {
            var tl = new TimelineMax({repeat:0});

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
            TweenMax.to(".bar-line", 0.5, {
                scaleY: (slideID +1) / numOfSlides,
                ease: E,
                // delay: 1,
            });
            TweenMax.fromTo("bar-line", 0.5, {
                scaleY: (slideID) / numOfSlides,
                ease: C
            }, {
                scaleY: (slideID +1) / numOfSlides,
                ease: C  
            });
            TweenMax.to(".bullet-number-first", 0.5, {
                text: numberSlideString,
                ease: E,
                // delay: 1,
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
        }
		TweenLite.delayedCall(time, function() {
            isAnimating = false;
        });
	}
}

function play(){
    gotoNextSlide();
    TweenLite.delayedCall(12, play);
}

function startAutoPlay(immediate) {
	if (immediate != null) {
		immediate = false;
	}
    
	if (immediate) {
         gotoNextSlide();
    }
    TweenLite.delayedCall(12, play);
}

function stopAutoPlay() {
  isAutoPlay = false;
	TweenLite.killDelayedCallsTo(play);
}
    init();
    startAutoPlay();
}
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
       $('.contact-me').append($('<div class="send-email anim-pulse"></div>'));
    }
}
  /*--------------------------------------------
    parallax
---------------------------------------------*/
function parallax() {
    var rellax = new Rellax('.rellax');
}
  /*--------------------------------------------
    works masonry
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
    tooltip number works categories filter case-studies
---------------------------------------------*/
function tooltipNumberWorks(){
        $('[data-toggle="tooltip"]').tooltip();
} 
  /*--------------------------------------------
    swiper slider case study
---------------------------------------------*/
function swiperCaseStudy() {
    var padding = $('.wrap-lines.container').width();
    var body = $('body').width();
    var linesOutsideContainer = (body / 2) - (padding / 2);
    var swiper = new Swiper('.swiper-container', {
        slidesPerView:  1,
        spaceBetween: 30,
        keyboardControl: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: true,
        //   },
        keyboard: {
            enabled: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // var mySwiper = document.querySelector('.swiper-container').swiper

    // $(".swiper-container").mouseenter(function() {
    //     mySwiper.autoplay.stop();
    //   });
    
    //   $(".swiper-container").mouseleave(function() {
    //     mySwiper.autoplay.start();
    //   });
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
    enter content case study
---------------------------------------------*/
function enterContentCaseStudy(){
    $('.goto-link').on('click', function(){
      $('html, body').animate({scrollTop: $(this.hash).offset().top}, 800);
      return false;
    });
  }
/*--------------------------------------------
    magnific popup case study illustration
---------------------------------------------*/
function magnificPopupIllustration() {
	$('.illu-popup').magnificPopup({
        tClose: '',
        type: 'image',
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        // closeBtnInside: false,
        callbacks: {
            open: function() {
                $('button').addClass('hoverable');
            },
        },
        gallery: {
          tPrev: '',
          tNext: '',
          // options for gallery
          enabled: true
        },
        zoom: {
          enabled: true, // By default it's false, so don't forget to enable it
          duration: 800, // duration of the effect, in milliseconds
          easing: 'cubic-bezier(.86, 0, .07, 1)', // CSS transition easing function
          // The "opener" function should return the element from which popup will be zoomed in
          // and to which popup will be scaled down
          // By defailt it looks for an image tag:
          opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
  });
}
  /*--------------------------------------------
    scroll reveal
---------------------------------------------*/
function scrollReveal() {
    window.sr = ScrollReveal();
  sr.reveal('.reveal', {
      duration   : 800,
      delay      : 600,
      distance   : '90px',
      easing     : 'ease-in-out',
      origin     : 'bottom',
      reset      : false,
      opacity    : 0,
      scale      : 1,
      viewFactor : 0,
  });
  };
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
    caseStudiesSlider();
    goToTop();
    contactForm();
    headerContact();
    parallax();
    confirmContact();
    swiperCaseStudy();
    imgPosition();
    countAbout();
    titleOpacity();
    enterContentCaseStudy();
    magnificPopupIllustration();
    tooltipNumberWorks();
    scrollReveal();
});

$(window).on('load', function(){
    gridWorks();
});

$(window).resize(function() {
    lines();
  });

});