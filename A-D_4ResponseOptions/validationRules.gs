function a1Range(sheetName, key1, key2) {
  var constants = objConstants(sheetName)
  var keyStart = constants + '.' + key1
  var keyEnd = constants + '.' + key2
  var firstRow = constants.firstRow
  var lastRow = constants.lastRow
  return keyStart+firstRow + ':' + keyEnd+lastRow
}

function validationRules(event) {
  var ss = SpreadsheetApp.getActive()
  var activeCell = SpreadsheetApp.getActive().getActiveCell();
  var activeCellRow = activeCell.getRow();
  var sheetName = 'questions'
  var constants = objConstants(sheetName)
  var colQuestionType = constants.questionType
  var colAnswer = constants.answer
  var firstRow = constants.firstRow
  var lastRow = constants.lastRow
  var rangeQuestionType = colQuestionType+firstRow + ':' + colQuestionType+lastRow
  var rangeAnswer = colAnswer+firstRow + ':' + colAnswer+lastRow
  var activecellColQuestionType = isActiveCellInRange(sheetName, rangeQuestionType) //questionType
  var activecellColAnswer = isActiveCellInRange(sheetName, rangeAnswer) //Answer

  if (activecellColQuestionType) {
    dataValidation(event);
  }

  if (activecellColAnswer) {
    dataValidation(event);
  }
}

function clearValidationRules() {
  var sheetName = 'questions'
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var range = sheet.getRange(a1Range(sheetName, 'answer', 'answer')); //Answer
  range.clear({validationsOnly: true});
}

function dataValidation(event) {
  //sets validation rule on the Answer Col
  var sheetName = 'questions'
  var constants = objConstants(sheetName)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName)
  var colQuestionType = constants.questionType //question type 'e'
  var colAnswer = constants.answer  //answer 'k'
  var cellColQuestionType = cellInActiveCellRow(colQuestionType); //questionType
  var cellColAnswer = cellInActiveCellRow(colAnswer); //Answer
  var array= listArray()
  var activeCellAnswer = sheet.getRange(cellColAnswer.getA1Notation());
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(array, false);

  if (cellColQuestionType.getDisplayValue() == '' && cellColAnswer.getDisplayValue() != '' ) {
    cellColAnswer.setValue('');
    showAlert("Cell " + cellColQuestionType.getA1Notation() + " is empty.\nSelect a value for cell " + cellColQuestionType.getA1Notation() + " before setting a value in cell " + cellColAnswer.getA1Notation() + ".");
  }

  rule.setAllowInvalid(false)
  rule.build();
  activeCellAnswer.setDataValidation(rule);
}

function listArray() {
  //return array for drop-down list
  var sheetName = 'questions'
  var constants = objConstants(sheetName)
  var colQuestionType = constants.questionType
  var colAnswer = constants.answer
  var cellCol = cellInActiveCellRow(colQuestionType); //questionType
  var cellColQuestionType = cellInActiveCellRow(colQuestionType); //questionType
  var cellValue = cellCol.getDisplayValue();
  var array;

  switch (cellValue) {
    case "Multiple Choice – Single Answer":
      array = valuesInRange('dataMappingQuetions', 'F3:F23' ); //Correct Answer - Single
      break;
    case "Multiple Choice – Multiple Answer":
      array = valuesInRange('dataMappingQuetions', 'G3:G23' ); //Correct Answer - Multiple
      break;
    case "True/False":
      array = valuesInRange('dataMappingQuetions', 'H3:H23' ); //Correct Answer - T/F
      break;
    default:
      array = [''];
  }
  return array;
}
