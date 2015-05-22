$(document).ready(function() {

	//scrolling from nav elements
	$("#nav-dev").click( function() {
		$("html,body").animate({
			scrollTop: $("#dev").offset().top
		}, 600);
	});

	$("#nav-knit").click( function() {
		$("html,body").animate({
			scrollTop: $("#knitting").offset().top
		}, 600);
	});

	$("#nav-contact").click( function() {
		$("html,body").animate({
			scrollTop: $("#contact").offset().top
		}, 600);
	});


	//contact form
	$("#contact-form").click( function() {
		
	});


});

