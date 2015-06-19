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


	var currentSection = "";
	//scroll to section when click on a section
	$("section").click( function() {
		currentSection = this.id;
		//console.log("scrolling to: " + currentSection);
		$("html,body").animate({
			scrollTop: $("#" + currentSection).offset().top
		}, 600);
	});

/*
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

	});*/

	//rewrite toggle fxn to only collapse if click in the same section
	//currentSection gives class of current section so there's that

	//get IDs of all sections
	var sectionIDs = [];
	$('section').each(function() {
		sectionIDs.push(this.id);
	});
	//object for tracking what's open
	var open = {};
	for (var i = 0; i<sectionIDs.length; i++) {
		open[sectionIDs[i]] = ""; 
	}

	$(".inner-nav>li").click( function(event) {
		//get sectionID
		var containingSection = $(event.target).closest("section").attr("id");
		
		//if it's an external link, close open section things
		if ($(event.target).attr("target") === "blank") {
			dealWithOpen(containingSection);
			open[containingSection] = "";
			return;
		}
		//stop page reloading
		event.preventDefault();

		//get ID of target
		var targetHref = event.target.href;
		targetHref = targetHref.split("#");
		targetHref = targetHref[targetHref.length-1];

		dealWithOpen(containingSection);
		//if same thing clicked, remove .open
		if (open[containingSection] === targetHref) {
			open[containingSection] = "";
			return;
		}

		$(event.target).addClass("open");
		$("#" + targetHref).toggle(450);
		open[containingSection] = targetHref;

	}); 

	function dealWithOpen(containingID) {
		//if something in this section's open already, close it and empty open
		if (open[containingID].length) {  
			//remove .open from last thing clicked
			$("#" + containingID + " .open").removeClass("open"); 
			$("#" + open[containingID]).toggle(450); 

		}
	}


});

