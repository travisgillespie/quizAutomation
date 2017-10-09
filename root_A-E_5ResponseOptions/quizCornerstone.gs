function dataLoadSheet(id, sheetName, constant, timestamp, headers, obj){
  var ss = SpreadsheetApp
  var openFile = ss.openById(id)
  var getSheet = openFile.getSheetByName(sheetName)
  var loopMax = constant.lastRow - constant.firstRow;
  var category = categoryValue().toString()
  var appendData;

  appendData = getSheet.appendRow(headers)

  switch (sheetName) {
   case 'Questions':
     cornerstoneQuestions(getSheet, obj, appendData, loopMax, timestamp, category);
     break;
   case 'Answers':
     cornerstoneAnswers(getSheet, obj, appendData, loopMax, timestamp)
     break;
  }
}
