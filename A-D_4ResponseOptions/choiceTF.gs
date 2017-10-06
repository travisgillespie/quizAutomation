function optionChoiceTF(e, parametersArray){
  var sheet = parametersArray[0]
  var questionType = parametersArray[1]
  var colA = parametersArray[2]
  var colB = parametersArray[3]
  var colC = parametersArray[4]
  var colD = parametersArray[5]
  var row = e.range.getRow();
  var array = ['TRUE', 'FALSE']
  var colArray = [colA, colB, colC, colD]
  var alertText = ''
  var background,
      range,
      values;

  switch (sheet.getRange(row, questionType).getDisplayValue()){
    case 'True/False':
      range = sheet.getRange(row, colA, 1, 4)
      background = sheet.getRange('a'+row).getBackground()
      values = range.getDisplayValues()

      for(var i = 0; i < 2; i++){
        if(values[0][i].length < 1) {
          sheet.getRange(row, colArray[i]).setBackground(background)
          sheet.getRange(row, colArray[i]).setValue(array[i])
        } else if(values[0][i] != array[i]) {
          //call an alert if choiceA OR choiceB don't say TRUE && FALSE
          //setbacground color to red
          sheet.getRange(row, colArray[i]).setBackground('#b30000')
          alertText += sheet.getRange(row, colArray[i]).getA1Notation() + ' needs to be ' + array[i] + ' for True/False questions.\n'
        }
      }

      for (var i = 2; i < 4; i++){
        if (values[0][i].length > 0) {
          //call an alert if choiceC OR choiceD text.length > 0 for true/false question
          //setbacground color to red
          sheet.getRange(row, colArray[i]).setBackground('#b30000')
          alertText += sheet.getRange(row, colArray[i]).getA1Notation() + ' needs to be empty for True/False questions.\n'
        } else {
          //reset background color if cells are fixed
          sheet.getRange(row, colArray[i]).setBackground(background)
        }

      }

      if (alertText.length > 0) {
        //display alert if errors are found
        showAlert(alertText)
      }

      break;
    default:
      break;
  }
}
