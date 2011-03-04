var window = Titanium.UI.currentWindow;

var about_title = Titanium.UI.createLabel({
	text: L("about_title"),
	font: {fontFamily:"SF Fedora", fontSize: 35},
	top: 35,
	left: 10,
	right: 10,
	height: 60,
	width: 280,
	textAlign: "center"
});

var about_text = Titanium.UI.createLabel({
	text: L("about_text"),
	font: {fontFamily:"ArialRoundedMTBold", fontSize: 14},
	top: 100,
	left: 20,
	right: 20,
	height: "auto",
	color: "#4b4b4b",
	shadowColor: "#fff",
	textAlign: "center"
});

var close_button = Titanium.UI.createButton({
	backgroundImage: "../images/close_button.png",
	top: 5,
	right: 5,
	width: 44,
	height: 44
});

// Create the table view that will hold the share options
var share_tableview = Ti.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	bottom: 20,
	height: 140,
	backgroundColor: "transparent",
	headerTitle: L("share_tableview_header"),
	scrollable: false
});

// Create the rate this app row
var rate_app_row = Ti.UI.createTableViewRow({
	leftImage: "../images/rate_us.png",
	title: L("rate_app_message"),
	backgroundColor: "#fff",
	url: "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=421617929"
});

var tweet_app_row = Ti.UI.createTableViewRow({
	leftImage: "../images/tweet_us.png",
	title: L("tweet_app_message"),
	backgroundColor: "#fff",
	url: "twitter://post?message=" + L("share_twitter_tweet")
});

share_tableview.data = [rate_app_row, tweet_app_row];

// Listen for everytime a row is clicked
share_tableview.addEventListener("click", function(e){
	
	// Store this so it can be accessed later
	var share_url = e.rowData.url;
	
	// Create an option dialog
	var dialog = Titanium.UI.createOptionDialog({
		options: [L("open_external_link_ok"), L("open_external_link_cancel")],
		cancel: 1,
		title: L("open_external_link")
	});
	
	// Open the dialog
	dialog.show();
	
	// Add an event listener
	dialog.addEventListener('click',function(e)
	{
		if(e.index === 0) {
			Ti.Platform.openURL(share_url);
		}
	});
 	
});

close_button.addEventListener("click", function(e){
	window.close({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

window.add(close_button, about_title, about_text, share_tableview);