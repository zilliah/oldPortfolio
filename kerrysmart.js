$(document).ready(function() {

    

	//scrolling from corner nav
	$(".corner").click( function(event) {
		event.preventDefault();
		var sectionLink = event.target.href;
        console.log(sectionLink);
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
		
			//remove open .expns
			if (openDrop[containingID].length) {
				$("#" + openDrop[containingID][1]).toggle(450);
				openDrop[containingID] = [];
			}
		}
	}


	// ------------------------------ toggle for .down
	$("ul.down").click( function(event) {
		event.stopPropagation();
		//get sectionID
		//sectionKey: [dropdown, openExpn]
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
		if (openDrop[containingSection].length) {
			$("#" + openDrop[containingSection][1]).toggle(450);
			$("." + containingSection + ".down .open").removeClass("open");
		} 

		//open target
		$(event.target).addClass("open");
		$("#" + targetHref).toggle(450);

		//scroll to target if nothing's open 
		if (openDrop[containingSection].length<1) {
			$("html,body").animate({
				scrollTop: $("#" + targetHref).offset().top
			}, 600);
		}

		openDrop[containingSection] = [containingUl, targetHref];

	});

});

