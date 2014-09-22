jQuery(function ($) {
    "use strict";
    /*	Table OF Contents
	==========================
	1-Navigation
	2-Masonry
	3-Sliders/Carousels
	4-Animations
	5-Contact form Validation
	6-Google Map
	*/
	
	
	$('.sb_input').focus(function(){
			$('label[for='+$(this).attr("id")+']').hide();
	});
	$('.sb_input').blur(function(){
		if($(this).val()===""){
			$('label[for='+$(this).attr("id")+']').show();
		}
	});
	
	$('.parallax_one').parallax("50%", 0.4);
	$('.parallax_two').parallax("50%", 0.4);
    /*================
	1-Navigation
	=================*/
    $(".navbar-nav a[href^='#'],.site_map a[href^='#'],.scrollTo").click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 30
        }, 1500,"easeInOutExpo");
        return false;
    });
    $(window).scroll(function () {
        if($(".navbar-nav").offset().top >= 250) {
            $(".toTop").show();
        } else {
            $(".toTop").hide();
        }
    });
    $(".toTop").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    $("#sticktop").sticky({
        topSpacing: 0
    });
    /*================
	2-Masonry Grid
	=================*/
    if($('.masonry-container').length) {
        $('.masonry-container').waitForImages(function () {
            $('.masonry-container').masonry({
                itemSelector: '.masonry-item'
            });
        });
    }
    /*================
	3-Sliders/Carousels
	=================*/
	
	if($('.vegas-slides').length){
		var vegas_BG_imgs = [],
		$vegas_img = $('.vegas-slides li img'),
		vegas_slide_length= $('.vegas-slides li').length;
		
		for (var i=0; i < vegas_slide_length; i++) {
			var new_vegas_img = {};
			new_vegas_img['src'] = $vegas_img.eq(i).attr('src');
			new_vegas_img['fade'] =$vegas_img.eq(i).attr('data-fade');
			vegas_BG_imgs.push(new_vegas_img);
		}
		$.vegas('slideshow', {
			backgrounds:vegas_BG_imgs,
		});
	}
	
	
	
    $(window).on("resize", function () {
       
        $('#projects_1').carouFredSel({
            width: "100%",
            circular: false,
            infinite: false,
            auto: false,
            align: false,
			synchronise:"#projects_2",
            scroll: {
                items: 1,
                easing: "linear"
            },
            prev: {button: "#portfolio-prev",key: "left"},
            next: {button: "#portfolio-next",key: "right"},
        });
		$('#projects_2').carouFredSel({
            width: "100%",
            circular: false,
            infinite: false,
            auto: false,
            align: false,
        });
    }).resize();
    $(".testimonial").owlCarousel({
        slideSpeed: 800,
        paginationSpeed: 500,
        singleItem: true,
        navigation: false,
		transitionStyle : "backSlide"
    });
    $(".post-slider").owlCarousel({
        slideSpeed: 800,
        paginationSpeed: 500,
        singleItem: true,
        navigation: false,
    });
    /*================
	4-Animations
	=================*/
    $('.welcome-box').hover(function () {
        $(this).siblings('.box_info').removeClass('fadeOutUp').addClass('fadeInDown').css('opacity', '1');
    }, function () {
        $(this).siblings('.box_info').removeClass('fadeInDown').addClass('fadeOutUp').css('opacity', '0');
    });
    $('.socials li a').hover(function () {
        $(this).siblings('h5').removeClass('fadeOutUp').addClass('fadeInDown').css('opacity', '1');
    }, function () {
        $(this).siblings('h5').removeClass('fadeInDown').addClass('fadeOutUp').css('opacity', '0');
    });
    $('.view_map').click(function (e) {
        e.preventDefault();
        $('.get_direction').removeClass('rollOut').addClass('rollIn').css('opacity', '1');
        $('.fadeONMapShow').removeClass('rollIn').addClass('rollOut').css('opacity', '0');
    });
    $('.back_toNormal').click(function (e) {
        e.preventDefault();
        $('.get_direction').removeClass('rollIn').addClass('rollOut').css('opacity', '0');
        $('.fadeONMapShow').removeClass('rollOut').addClass('rollIn').css('opacity', '1');
    });
	
    /*=======================
	5-Contact Form validation
	=======================*/
	 function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
	
	


    $("#contactform").submit(function () {
        var name = $("#cf_name").val();
        var email = $("#cf_email").val();
        var subject = $("#cf_subject").val();
        var message = $("#cf_message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        if (name === '' || !IsEmail(email) || subject === '' || message === '') {
            $('#valid-issue').html('Please Provide Valid Information').slideDown();
        } else {
            $.ajax({
                type: "POST",
                url: "assets/php/submit.php",
                data: dataString,
                success: function () {
                    $('#contactform').slideUp();
                    $('#valid-issue').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').slideDown();
                }
            });
        }
        return false;
    });
	
	
	
	
	
	/*=======================
	6-Contact Google Map
	=======================*/
    if($('#contact-map').length) {
        var directionsDisplay,
            mapZoomLvl = $('#contact-map').data('zoomlvl'),
            map_address = $('#contact-map').data('address'),
            directionsService = new google.maps.DirectionsService();
        google.maps.event.addDomListener(window, 'load', initialize);
        $('#direction_trigger').click(function (e) {
            e.preventDefault();
            calcRoute();
        });
    }

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById("contact-map"), {
            mapTypeId: google.maps.MapTypeId.type,
            scrollwheel: false,
            draggable: false,
            //center: map_address,
            zoom: mapZoomLvl,
            styles: [{
                "stylers": [{
                    "hue": "#ff1a00"
                }, {
                    "invert_lightness": true
                }, {
                    "saturation": -100
                }, {
                    "lightness": 33
                }, {
                    "gamma": 0.5
                }]
            }],
        });
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': map_address
        }, function (results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            }
            /*else {
				console.log("Geocode was not successful for the following reason: " + status);
			}*/
        });
        directionsDisplay.setMap(map);
    } /*end initialize*/

    function calcRoute() {
        var start = map_address,
            end = $('#direction-input').val(),
            request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
        directionsService.route(request, function (response, status) {
            if(status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    } /*end calRoute*/
	
});