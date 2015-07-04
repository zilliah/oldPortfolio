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

    //------------------------ toggle for .inner-nav  ------------------------
	//get IDs of all sections
	var sectionIDs = [];
	$('section').each(function() {
		sectionIDs.push(this.id);
	});
	//objects for tracking what's open, for .inner-nav and .drop
	var open = {};
	var openDrop = {};
	for (var i = 0; i<sectionIDs.length; i++) {
		open[sectionIDs[i]] = ""; 
		openDrop[sectionIDs[i]] = []; 
	}

	console.log(open)
	console.log(openDrop);


	$(".inner-nav>li").click( function(event) {
		//get sectionID
		var containingSection = $(event.target).closest("section").attr("id");
		
		//if it's an external link, close open section things
		if ($(event.target).attr("target") === "blank") {
			dealWithOpen(containingSection, open);
			open[containingSection] = "";
			return;
		}
		//stop page reloading
		event.preventDefault();

		//get ID of target
		var targetHref = event.target.href;
		targetHref = targetHref.split("#");
		targetHref = targetHref[targetHref.length-1];

		dealWithOpen(containingSection, open);
		//if same thing clicked, remove .open
		if (open[containingSection] === targetHref) {
			open[containingSection] = "";
			return;
		}

		$(event.target).addClass("open");
		$("#" + targetHref).toggle(450);
		open[containingSection] = targetHref;

	}); 

	function dealWithOpen(containingID, tracker) {
		//if something in this section's open already, close it and empty open
		if (tracker[containingID].length) {  
			//remove .open from last thing clicked
			$("#" + containingID + " .open").removeClass("open"); 
			$("#" + tracker[containingID]).toggle(450); 

		}
	}


	// ------------------------------ toggle for .down
	$("ul.down").click( function(event) {
		event.stopPropagation();
		//get sectionID
		//XXX do i want a containing section or a containing dropdown?
		//XXX will need something sectioned b/c can have multiple drops open in different sections
		//XXX sectionKey: [dropdown, openExpn] ?  even though sectionKey isn't suuuuper crucial
		var containingSection = $(event.target).closest("section").attr("id");
		var containingUl = $(event.target).closest("ul").attr("id");
		
		//if it's an external link, open it and leave dropdown open
		//XXX this works b/c dropdowns are currently all links or all expns
		//XXX will need to fix this to deal with open things (as before) if this changes
		if ($(event.target).attr("target") === "blank") {
			openDrop[containingSection] = [];
			return;
		}
		//stop page reloading
		event.preventDefault();

		//get ID of target
		var targetHref = event.target.href;
		targetHref = targetHref.split("#");
		targetHref = targetHref[targetHref.length-1];



		//if same thing clicked, remove .open and close thing
		if (openDrop[containingSection][1] === targetHref) {
			$(event.target).removeClass("open");
			$("#" + targetHref).toggle(450);
			openDrop[containingSection] = [];
			return;
		}

		//if something else open already
		if (openDrop[containingSection].length>0) {
			$("#" + openDrop[containingSection][1]).toggle(450);
			$("." + containingSection + ".down .open").removeClass("open");
		} 

		//open target
		$(event.target).addClass("open");
		$("#" + targetHref).toggle(450);

		//scroll to target if nothing's open 
		if (openDrop[containingSection].length<1) {
			console.log("scrolling to: " + targetHref);
			$("html,body").animate({
				scrollTop: $("#" + targetHref).offset().top
			}, 600);
		}

		openDrop[containingSection] = [containingUl, targetHref];

	});

});

