// Global variable, keeps the app variables from clashing with libraries
var module = {};

var indWin = null;
var actInd = null;
function showIndicator() {
	// window container
	indWin = Titanium.UI.createWindow({
		height: 120,
		width: 120
	});

	// black view
	var indView = Titanium.UI.createView({
		height: 60,
		width: 60,
		backgroundColor:'#000',
		borderRadius:10,
		opacity: 0.6
	});
	indWin.add(indView);

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height: 25,
		width: 25,
		top: 47
	});
	indWin.add(actInd);

	// message
	var message = Titanium.UI.createLabel({
		text: L("celebrity_thinking"),
		color: '#fff',
		width: 'auto',
		height: 'auto',
		font: {fontSize:16,fontWeight:'bold'},
		bottom: 15
	});
	//indWin.add(message);
	indWin.open();
	actInd.show();

};

function hideIndicator() {
	actInd.hide();
	indWin.close({opacity:0,duration:500});
}

// Englobe everything in here so we don't populate the global scope
(function() {
	// Store a reference to the current window
	module.window = Titanium.UI.currentWindow;
	
	var close_button = Titanium.UI.createButton({
		backgroundImage: "../images/close_button.png",
		top: 5,
		right: 5,
		width: 44,
		height: 44,
		zIndex: 10
	});
	
	close_button.addEventListener("click", function(e){
		// Renable the play button
		Titanium.App.fireEvent('celebrities_loaded');
		// Close the current window
		module.window.close({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	});
	
	// Store all the possible faces in an array
	module.celebrities = [];
	module.celebrity_faces = [];
	
	// For each celebrity found in the celebrities directory
	for (var i=0; i <= 4; i++){
		// Create an celebrity object
		module.celebrity = Titanium.UI.createView({
			backgroundImage: "../characters/" + i + "/background.png"
		});
		
		var character_face = Titanium.UI.createImageView({
			images: ["../characters/" + i + "/face.png", 
					 "../characters/" + i + "/face.png", 
					 "../characters/" + i + "/face_closed.png",
					 "../characters/" + i + "/face.png",
					 "../characters/" + i + "/face.png"],
			width: 320,
			height: 480,
			duration: 500
		});
		// Start the blinking animation
		character_face.start();
		
		var character_name = Titanium.UI.createLabel({
			text: L("celebrity_" + i + "_name"),
			font: {fontFamily:"SF Fedora", fontSize: 32},
			bottom: 10,
			left: 10,
			right: 10,
			height: 60,
			width: 300,
			textAlign: "center",
			color: "#fff",
			shadowColor: "#000"
		});
		
		module.celebrity.add(character_face, character_name);
		// Add the celebrity to the array
		module.celebrities.push(module.celebrity);
		module.celebrity_faces.push(character_face);
	}
	
	// Create the next celebrity object
	module.celebrity = Titanium.UI.createView({
		backgroundImage: "../characters/background.png"
	});
	
	// Add the next celebrity to the array
	module.celebrities.push(module.celebrity);
	
	// Create the scroll view
	module.faces_view = Titanium.UI.createScrollableView({
		views: module.celebrities,
		showPagingControl: true,
		currentPage: 0
	});
	
	// Create the "please wait" function
	function thinking_please_wait(e){
		// Store the current character
		Titanium.App.Properties.setInt('current_position', module.faces_view.currentPage);
				
		// Scroll to the current view
		module.faces_view.scrollToView(Titanium.App.Properties.getInt('current_position'));
		
		// Store the current page of the scroller into something more readable	
		var currentPage = module.faces_view.currentPage;
		
		// Create the answer dialog
		var alert_dialog = Titanium.UI.createAlertDialog();
		
		// Only do this if the user is not on the last page
		if (currentPage !== (module.celebrities.length-1)) {
			
			// Show the indicator
			showIndicator();
			
			// Prevent the scrollable from scrolling
			module.faces_view.touchEnabled = false;

			// The sound to play when the character is "thinking"
			module.waiting_music = Titanium.Media.createSound({
				url: "../characters/" + currentPage + "/waiting.wav",
				preload: true
			});

			// Disable the shake event so it can't be used more than once
			Titanium.Gesture.removeEventListener("shake", thinking_please_wait);

			// Possible answers
			Ti.include("celebrity_answers.js");
			
			// Play the waiting sound
			module.waiting_music.play();
			
			// Wait for the music to stop so we can release it
			module.waiting_music.addEventListener("complete", function(e){
				e.source.release();
			});
			
			// Animate the head of the character
			module.celebrity_faces[currentPage].animate({top: 15, duration: 1200, curve: Titanium.UI.ANIMATION_CURVE_LINEAR}, function()
			{
				module.celebrity_faces[currentPage].animate({top: -10, duration: 1200}, function()
				{
					module.celebrity_faces[currentPage].animate({top: 15, duration: 1200},   function()
					{
						module.celebrity_faces[currentPage].animate({top: -10, duration: 1200, curve: Titanium.UI.ANIMATION_CURVE_LINEAR}, function()
						{
							module.celebrity_faces[currentPage].animate({top: 15, duration: 1200},   function()
							{
								module.celebrity_faces[currentPage].animate({top: 0, duration: 1000, curve: Titanium.UI.ANIMATION_CURVE_LINEAR});
							});
						});
					});
				});
			});
			
			// Wait 7 seconds to show the answer back to the user
			setTimeout(function() {
				// Reenable the scrollable from scrolling
				module.faces_view.touchEnabled = true;

				// Show the answer dialog
				alert_dialog.message = possible_answers[currentPage][Math.floor(Math.random()*possible_answers[currentPage].length)];
				alert_dialog.show();
				
				// Hide the indicator
				hideIndicator();
				
				// Renable the shake gesture
				Titanium.Gesture.addEventListener("shake", thinking_please_wait);
			}, 7000);
		} else {			
			alert_dialog.message = L("celebrity_next_possible_answer");
			alert_dialog.show();
		}
		
	}

	// Listen for when the phone is shaked
	Titanium.Gesture.addEventListener("shake", thinking_please_wait);
	
	// Add the UI
	module.faces_view.add(close_button);
	module.window.add(module.faces_view);
	
	// Scroll to the last viewed character
	module.faces_view.scrollToView(Titanium.App.Properties.getInt('current_position'));
	
})();

