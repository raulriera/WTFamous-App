var window = Titanium.UI.currentWindow;

var step1_label = Titanium.UI.createLabel({
	text: L("step1_label"),
	font: {fontFamily:"SF Fedora", fontSize: 30},
	top: 35,
	left: 10,
	height: 40,
	width: 150,
	textAlign: "center"
});

var step2_label = Titanium.UI.createLabel({
	text: L("step2_label"),
	font: {fontFamily:"SF Fedora", fontSize: 30},
	top: 220,
	left: 150,
	height: 40
});

var step3_label = Titanium.UI.createLabel({
	text: L("step3_label"),
	font: {fontFamily:"SF Fedora", fontSize: 50},
	top: 365,
	left: 160,
	height: 60,
	color: "#363277"
});

var close_button = Titanium.UI.createButton({
	backgroundImage: "../images/close_button.png",
	top: 5,
	right: 5,
	width: 44,
	height: 44
});

close_button.addEventListener("click", function(e){
	window.close({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

window.add(close_button, step1_label, step2_label, step3_label);

// Mark as instructed
Ti.App.Properties.setString("HasBeenInstructed", true);