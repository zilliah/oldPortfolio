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


	//hide/show email
	$("#things").click( function() {
		$(".detail.contact").toggle(450);
		$("html,body").animate({
			scrollTop: $("#contact").offset().top
		}, 600);
	});



	//hide/show details when inner nav menu clicked
	/*
	$(".inner-nav li").click( function() {
		console.log("inner nav clicked");
		var thingClicked = event.target.id;
		console.log(thingClicked + " clicked");

		//mark as active tab

		//close other open things
		//in this section only?
	});
*/
	//open details
	var openDetail = [];
	var openExpn = [];

	//example for other projects section
	//IDs of target elemets to open are in href
	$(".inner-nav li").click( function() {
		//$(event.target).addClass("active");
		


		var aimFull = event.target.href;
		var aim = aimFull.split("#");
		aim = aim[aim.length-1];
		openDetail.push(aim);

		$("#" + aim).toggle(450);
	});
});

