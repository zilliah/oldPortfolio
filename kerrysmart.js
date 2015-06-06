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

	});

	//scroll to section when click on a section
	$("section").click( function() {
		currentSection = this.id;
		//console.log("scrolling to: " + currentSection);
		$("html,body").animate({
			scrollTop: $("#" + currentSection).offset().top
		}, 600);
	});


	//toggle contents of inner nav links
	var openDetail = ""; 
	var openExpn = "";
	$(".inner-nav li").click( function(event) {

		//check if is link for expn
		//currently	running twice for expns (bubbling)


		console.log("it went");

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

	});
});

