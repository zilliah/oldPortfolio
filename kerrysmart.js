$(document).ready(function() {

	//scrolling from nav elements
	$("#nav-dev").click( function() {
		$("html,body").animate({
			scrollTop: $("#dev").offset().top
		}, 600);
	});

	$("#nav-visual").click( function() {
		$("html,body").animate({
			scrollTop: $("#visual").offset().top
		}, 600);
	});

	$("#nav-knit").click( function() {
		$("html,body").animate({
			scrollTop: $("#knitting").offset().top
		}, 600);
	});

	$("#nav-other").click( function() {
		$("html,body").animate({
			scrollTop: $("#other").offset().top
		}, 600);
	});

	$("#nav-contact").click( function() {
		$("html,body").animate({
			scrollTop: $("#contact").offset().top
		}, 600);
	});


	//hide/show
	var isShown = false;
	$("#things").click( function() {
		if (!isShown) {
			console.log("nothing yet, putting it in");
			$(".detail").css("display","inline");
			isShown = true;
		} else {
			console.log("hide it again");
			$(".detail").css("display","none");
			isShown = false;
		}
	});




});

