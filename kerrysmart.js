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
		open[sectionIDs[i]] = []; //empty array unless something's open
	}
	console.log(open);
	//open{ sectionName: [idclicked, href clicked]}

	$(".inner-nav>li").click( function(event) {  //TODO if this selection works, get rid of .inner-nav, should only select top-level things
		
		//if it's an external link, don't toggle anything 
		//XXX or do i want external links to close open things in section?
		//XXX for now, do nothing, i can make it something else if i feel like it
		if ($(event.target).attr("target") === "blank") {
			console.log("external link");
			return;
		}
		//stop page reloading
		event.preventDefault();

		//get sectionID
		var containingSection = $(event.target).closest("section").attr("id");
/*		console.log("containting section: " + containingSection);*/

		//mark nav as open
		$(event.target).addClass("open");

		//get ID of target
		var targetID = event.target.id;
		var targetHref = event.target.href;
		targetHref = targetHref.split("#");
		targetHref = targetHref[targetHref.length-1];
		console.log("target ID: " + targetID);  
		console.log("target href: " + targetHref);


		//if something in this section's open already, close it and empty open
		if (open[containingSection].length) {  
			console.log("something was open already");
			//close it
			

			//remove .open from last thing clicked
			$("#" + open[containingSection[0]]).removeClass("open"); 
			console.log("removing class from: #" + open[containingSection[0]]);


			$("#" + open[containingSection[1]]).toggle(450); 
			//if you clicked the same thing, don't do anything else
			if (open[containingSection[1]] === targetHref) {
				console.log("same thing");
				$(event.target).removeClass("open");
				open[containingSection] = [];
				return;
			}
			open[containingSection] = [];

		}


		$("#" + targetHref).toggle(450);
		open[containingSection] = [targetID, targetHref];
		console.log(open[containingSection]);
		console.log(open);

	}); 




});

