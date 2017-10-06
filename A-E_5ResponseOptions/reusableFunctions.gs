function timestamp() {
  var date = new Date();
  var time = date.getTime();
  return time
}

function valueFromHeaderTitle(sheetName, header, indexColumn) {
  //returns a value based on the header string and whether need a value for an array index or spreadsheet column
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName)
  var range = sheet.getRange('a3:n3').getDisplayValues() //these are the headers
  var colValue;
  for (values in range)
  {
    switch (indexColumn) {

    //this is to return the value for sheet column using an array that is missing an '' @ index[0]
    case 'column':
        colValue = range[values].indexOf(header) + 1;
        break;

    //this is to return the value for array index
    case 'index':
        colValue = range[values].indexOf(header);
        break;
    }
  }
  return colValue
}

function questionsHeader(){
  var headers = ['Question Reference Number',
                   'Question Text',
                   'Response Type',
                   'Correct Answer',
                   'Answer Explanation',
                   'Category',
                   'Active',
                   //'Author',
                   'Culture Id',
                   'Default Language',
                   'Multiple Choice Random Answer Selection',
                   'Multiple Choice Answers to Always Display',
                   'Question Type'
                   //'Evaluation Type'
                ]
  return headers
}

function answersHeader(){
  var headers = ['Question Reference Number',
               'Response Order',
               'MC Response Choice/Text Correct Answer',
               'Multiple Choice Correct Response',
               'Always Display Response',
               'Culture Id']
  return headers
}

function colLetterFromValue(value){
  var colLetter = ['',
                  'a',
                  'b',
                  'c',
                  'd',
                  'e',
                  'f',
                  'g',
                  'h',
                  'i',
                  'j',
                  'k',
                  'l',
                  'm',
                  'n',
                  'o',
                  'p',
                  'q',
                  'r',
                  's',
                  't',
                  'u',
                  'v',
                  'w',
                  'x',
                  'y',
                  'z']

  return colLetter[value]
}

function sheetConstants() {
 var sheetName = 'questions'
 var sheetObj = {
   sheetName: sheetName,
   cellA1: valuesInRange(sheetName, 'A1')
 }
 return sheetObj
}

function objConstants(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName)
  var column = 'column'
  var obj = {
             firstRow: 6,
             lastRow: sheet.getLastRow(),
             author: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Author',column)), //2: call function w/ an array of the alphabet... or return column number... and use that rather than calling a1 notation... this way my array becomes dynamic and i don't have to update the array if the worksheet changes
             number: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Q. No.',column)),
             topicName: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Sprinklr Platform Topic Name',column)),
             videoName: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Video File Name',column)),
             questionType: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Question Type',column)),
             question: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Question',column)),
             choiceA: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Choice A',column)),
             choiceB: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Choice B',column)),
             choiceC: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Choice C',column)),
             choiceD: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Choice D',column)),
             choiceE: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Choice E',column)),
             answer: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Answer',column)),
             explanation: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Answer Explanation',column)),
             questionPool: colLetterFromValue(valueFromHeaderTitle(sheetName, 'Question Pool',column))
            };
  return obj
}

function quizRange(constants){
  var range = constants.author + constants.firstRow + ':' + constants.questionPool + constants.lastRow
  return range
}

function specificRange(constants, colStart, colEnd) {
  var range = colStart + constants.firstRow + ':' + colEnd + constants.lastRow
  return range
}

function valuesInRange(sheetName, range) {
  //returns values in range as an array
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var range = sheet.getRange(range);
  var array = range.getDisplayValues();
  return array;
}

function verifyUser(username) {
  var array = ['john.doe@gmail.com'] //array of admin emails
  var userIndex = array.indexOf(username);

  if (userIndex > -1) {
    return true;
  } else {
    return false;
  }
}

function isActiveCellInRange(sheetName, range) {
  //1 get the active cell
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var activeCell = activeSheet.getActiveCell();
  var activeCellNotation = activeCell.getA1Notation();

  //2 set range on questions sheet
  var getRange = activeSheet.getRange(range)

  //3 determine if active cell falls inside range
  //active column is greater than rangeStartColumn AND active column is less than getLastColumn
  if ((activeCell.getColumn() >= getRange.getColumn()) && (activeCell.getColumn() <= getRange.getLastColumn()) &&
  //active row is greater than rangeStartRow AND active row is less than getLastRow
  (activeCell.getRowIndex() >= getRange.getRowIndex()) && (activeCell.getRowIndex() <= getRange.getLastRow())){
    return true
  } else {
    return false
  }
}

function cellInActiveCellRow(column) {
  var ss = SpreadsheetApp.getActive()
  var activeCell = SpreadsheetApp.getActive().getActiveCell();
  var activeCellRow = activeCell.getRow();
  var cell = ss.getRange(column + activeCellRow)
  return cell
}

function showAlert(text){
  var ui = SpreadsheetApp.getUi();
  var prompt = ui.alert(text, ui.ButtonSet.OK)
}

function valuesInRow(sheetName, rowStart, colStart, numRows, numColumns) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  var range = sheet.getRange(rowStart, colStart, numRows, numColumns)
  return range;
} 
