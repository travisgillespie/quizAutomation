function verifyAdmin() {
  SpreadsheetApp.getUi().createAddonMenu()
  .addItem("Verify Admin", "adminMenu")
  .addToUi();
}

function adminMenu(){
  var user = Session.getActiveUser().getEmail();
  var verifyEmail = verifyUser(user);
  if (verifyEmail) {
    SpreadsheetApp.getUi().createMenu("Admin")
    .addItem("Format Captivate", "captivateObject")
    .addItem("Format Cornerstone", "cornerStoneObject")
    .addItem('Format All', 'formatAll')
//    .addItem('Enable Drive Api', 'openUrl')
    .addToUi();
  } else {
    showAlert("Unfortunately we're unable to verify your admin status. \nPlease contact travis.gillespie@sprinklr.com for admin status.")
  }
}

/*
function openUrl(){
showURL('https://console.developers.google.com/apis/api/drive/overview')
}
*/

function showURL(href){
  var app = UiApp.createApplication().setHeight(50).setWidth(200);
  app.setTitle("Show URL");
  var link = app.createAnchor('open ', href).setId("link");
  app.add(link);
  var doc = SpreadsheetApp.getActive();
  doc.show(app);
}
