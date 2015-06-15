$(document).ready(function() {

	//scrolling from corner nav
	$(".corner").click( function() {
		event.preventDefault();
		var sectionLink = event.target.href;
		var sectionName = sectionLink.split("#");
		sectionName = sectionName[1];
		$("html,body").animate({
			scrollTop: $("#" + sectionName).offset().top
		}, 600);
		console.log("scrolling to: " + sectionName);
	});


	var currentSection = "";
	//scroll to section when click on a section
	$("section").click( function() {
		currentSection = this.id;
		//console.log("scrolling to: " + currentSection);
		$("html,body").animate({
			scrollTop: $("#" + currentSection).offset().top
		}, 600);
		console.log("scrolling to: " + currentSection);
	});


	//toggle contents of inner nav links
	var openDetail = ""; 
	var openExpn = "";
	$(".inner-nav li").click( function(event) {

		//get id for clicked
		var aimFull = event.target.href;
		var aim = aimFull.split("#");
		//check if link is external
		if (aim.length > 1) {
			//stop page reloading
			event.preventDefault();
			aim = aim[aim.length-1];
			//console.log("aim: " + aim);
			//console.log("openDetail: " + openDetail);
			//do nothing if openng the same one
			if (aim == openDetail) { //same thing clicked
				$("#" + openDetail).toggle(450);
				openDetail = "";
				return;
			} else { //differnt thing
				//close open detail
				$("#" + openDetail).toggle(450);
				$("#" + aim).toggle(450);
				//list as open (without #)
				openDetail = aim;
			}
		} else { //external link
			//close open detail
			$("#" + openDetail).toggle(450);
			openDetail = "";
		}
		
		//stop event bubbling if it's inside a dropdown
		if ($(event.target).hasClass("stop")) {
			event.stopPropagation();
		}

	});

	//rewrite toggle fxn to only collapse if click in the same section
	//currentSection gives class of current section so there's that




});

