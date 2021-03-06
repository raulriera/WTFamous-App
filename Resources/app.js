// Global variable, keeps the app variables from clashing with libraries
var app = {};

// Englobe everything in here so we don't populate the global scope
(function() {
    
	// Create the welcome screen
	app.welcome_screen = Titanium.UI.createWindow({
		backgroundColor: "#000",
		backgroundImage: "images/background.png",
		top: 0,
		left: 0
	});

	app.play_button = Titanium.UI.createButton({
		title: L("play_button_label"),
		font: {fontFamily:"TrebuchetMS", fontSize: 18, fontWeight: "bold"},
		color: "#fff",
		backgroundImage: 'none',
		backgroundColor: "#4c4c88",
		selectedColor: "#f5ef37",
		borderRadius: 10,
		borderColor: "#fff",
		top: 320,
		left: 30,
		right: 30,
		width: 236,
		height: 47
	});
	
	app.instructions_button = Titanium.UI.createButton({
		title: L("instructions_button_label"),
		font: {fontFamily:"TrebuchetMS", fontSize: 18, fontWeight: "bold"},
		color: "#fff",
		backgroundImage: 'none',
		backgroundColor: "#4c4c88",
		selectedColor: "#f5ef37",
		borderRadius: 10,
		borderColor: "#fff",
		top: 370,
		left: 30,
		right: 30,
		width: 236,
		height: 47
	});
	
	app.about_button = Titanium.UI.createButton({
		title: L("about_button_label"),
		font: {fontFamily:"TrebuchetMS", fontSize: 18, fontWeight: "bold"},
		color: "#fff",
		backgroundImage: 'none',
		backgroundColor: "#4c4c88",
		selectedColor: "#f5ef37",
		borderRadius: 10,
		borderColor: "#fff",
		top: 420,
		left: 30,
		right: 30,
		width: 236,
		height: 47
	});
	
	// Add the UI to the welcome screen
	app.welcome_screen.add(app.play_button);
	app.welcome_screen.add(app.instructions_button);
	app.welcome_screen.add(app.about_button);
	
	// Add the corresponding listeners
	app.play_button.addEventListener("click", function(e) {
		
		if (!Ti.App.Properties.getString("HasBeenInstructed", false)) {
			alert(L("playing_without_instructions"));
		}
		
		// Disable the button
		e.source.enabled = false;
		e.source.title = L("play_button_disabled_label");
		e.source.backgroundColor = "#666";
				
		// Prepare the celebrities window
		app.game_screen = Titanium.UI.createWindow({
			url: "views/celebrities.js",
			backgroundImage: "../images/background_plain.png",
			backgroundColor: "#000",
			zIndex: 2
		});
		
		// Open the window
		app.game_screen.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT, duration: 500});
	});
	
	app.instructions_button.addEventListener("click", function(e) {
				
		// Prepare the instructions window
		app.instructions_screen = Titanium.UI.createWindow({
			backgroundImage: "../images/how_to_background.png",
			url: "views/instructions.js",
			zIndex: 2
		});
		
		// Open the window
		app.instructions_screen.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	});
	
	app.about_button.addEventListener("click", function(e) {
				
		// Prepare the about window
		app.about_screen = Titanium.UI.createWindow({
			backgroundImage: "../images/background_plain.png",
			url: "views/about.js",
			zIndex: 2
		});
		
		// Open the window
		app.about_screen.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	});
	
	// Listen for the event to reanble the play button
	Titanium.App.addEventListener("celebrities_loaded", function(){
		app.play_button.enabled = true;
		app.play_button.title = L("play_button_label");
		app.play_button.backgroundColor ="#4c4c88";
	});
	
})();

// Open the screen
app.welcome_screen.open();

Ti.include("rater.js");
Rater.init("What the Famous?!", 421617929);
Rater.run();