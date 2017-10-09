function columnValidation(e, sheetName) {

  var sheet = e.source.getSheetByName(sheetName)
  var array = sheet.getRange(3, 1, 1, 26)
  var headersRange = array.getDisplayValues()[0]
  var questionType = headersRange.indexOf('Question Type') + 1
  var colA = headersRange.indexOf('Choice A') + 1
  var colB = headersRange.indexOf('Choice B') + 1
  var colC = headersRange.indexOf('Choice C') + 1
  var colD = headersRange.indexOf('Choice D') + 1
  var colE = headersRange.indexOf('Choice E') + 1
  var colAnswerExp = headersRange.indexOf('Answer Explanation') + 1
  var parametersArray = [sheet, questionType, colA, colB, colC, colD, colE]
  var value;

  switch (e.range.getColumn()){
    case questionType:
      optionChoiceTF(e, parametersArray)
      break;
    case colA:
    case colB:
    case colC:
    case colD:
    case colE:
      //'answer choices' <= 500 characters
      value = 500
      validateCharCount(e, value)
      optionChoiceTF(e, parametersArray)
      break;
    case colAnswerExp:
      //'answer explanation' <= 300 characters
      value = 300
      validateCharCount(e, value)
      break;
  }
}

function validateCharCount(e, value) {
  var eCell = e.range
  var displayVal = eCell.getDisplayValue()
  var a1Not = eCell.getA1Notation()
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var rowIndex = ss.getActiveCell().getRowIndex()
  var background = ss.getRange('a'+rowIndex).getBackground()
  var length = displayVal.length

  if (length > value) {
    var removeChars = length - value
    var title = "Cell '" + a1Not + "' Exceeds Character Limit"
    var line1 = 'This cell is limited to ' + value + ' characters (whitespace included).' + '\n'
    var line2 = 'Remove ' + removeChars + ' characters'
    var prompt = line1 + line2
    var ui = SpreadsheetApp.getUi()
    ui.alert(title, prompt, ui.ButtonSet.OK)
    e.source.setActiveSelection(a1Not)
    eCell.setBackground('#b30000')
  } else {
    eCell.setBackground(background)
  }
}
