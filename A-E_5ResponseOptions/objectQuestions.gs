function categoryValue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetQuestions = ss.getSheetByName('questions')
  var sheetdataMappingQuetions = ss.getSheetByName('dataMappingQuetions')
  var referenceNumber;
  var categorySheetQuestion = sheetQuestions.getRange('a1').getDisplayValue();
  var categoryNames = sheetdataMappingQuetions.getRange('questionCategoryNames').getDisplayValues();
  var categoryReferenceNumber = sheetdataMappingQuetions.getRange('categoryReferenceNumber').getDisplayValues();

  for (names in categoryNames) {
    if (categorySheetQuestion === categoryNames[names].toString()) {
      referenceNumber = categoryReferenceNumber[names];
      return referenceNumber;
    }
  }
  return referenceNumber
}

function responseTypeValue(i) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetQuestions = ss.getSheetByName('questions')
  var cell = sheetQuestions.getRange('E' + i).getDisplayValue()
  var responseTypes = {'Yes/No':'1',
                       'True/False':'2',
                       'Multiple Choice – Single Answer':'4',
                       'Multiple Choice – Multiple Answer':'5',
                       'Text Only':'6',
                       'Free Form (Essay)':'9'
                      };

  return responseTypes[cell]
}
