function formatCaptivateFile(obj, body, loopMax, poolIndex) {

  var sheetName = 'questions'
  var index = 'index'

  var responseOption = ['A','B','C','D','E'];
  var arrayLength = responseOption.length

  var currentResponseChoice;
  var currentResponseOption;

  var number = valueFromHeaderTitle(sheetName, 'Q. No.', index)
  var topicName = valueFromHeaderTitle(sheetName, 'Sprinklr Platform Topic Name', index)

  var questionPoolIndex = valueFromHeaderTitle(sheetName, 'Question Pool', index)
  //header.indexOf('Question Type')
  var questionTypeIndex = valueFromHeaderTitle(sheetName, 'Question Type', index)
  //header.indexOf('Question')
  var question = valueFromHeaderTitle(sheetName, 'Question', index)
  //header.indexOf('Answer')
  var correctAnswerIndex = valueFromHeaderTitle(sheetName, 'Answer', index)

  var questionType,
      answer,
      answerReturn,
      text,
      para,
      questionPoolVal;

  //may want to start var i = 6... but trying 0 for now
  for (var i = 0; i <= loopMax; i++) {
    questionPoolVal = (obj[i][questionPoolIndex] == '') ? 0 : obj[i][questionPoolIndex]

    //when obj[i][questionPoolIndex] is empty it donset equal 0, but it validates as 0 when compared to poolIndex = 0... may consider using ternary operator... so that obj[i][questionPoolIndex] is set to 0 if cell is blank... otherwise it equals self
    if (questionPoolVal == poolIndex) {

    //line 1: comment for user
    text = "//#" + obj[i][number] + " " + obj[i][questionTypeIndex] + ": " + obj[i][topicName] + "\n";

      //line 2: question type
      if (obj[i][questionTypeIndex] == "Multiple Choice – Single Answer" || obj[i][questionTypeIndex] == "Multiple Choice – Multiple Answer") {
        questionType = "Multiple Choice"
      } else if (obj[i][questionTypeIndex] == "True/False" || obj[i][questionTypeIndex] == "Yes/No") {
        questionType = "True/False"
      }
      text += ":: " + questionType + "\n"

      //line 3: start
      text += ":: " + obj[i][question]
      text += " {"

      //line 4: response and answers
      switch (questionType) {
        case 'True/False':
          text += (obj[i][correctAnswerIndex] == 'TRUE' ? 'T' : 'F')
          break;
        case 'Multiple Choice':

          answer = obj[i][correctAnswerIndex]
          arrayLength = (answer == 'All of the above' || answer == 'None of the above') ? responseOption.length : responseOption.length - 1

          for (var x = 0; x <= arrayLength; x++){

          currentResponseChoice = valueFromHeaderTitle(sheetName, 'Choice ' + responseOption[x], index)
          currentResponseOption = (x == responseOption.length) ? obj[i][correctAnswerIndex] : obj[i][currentResponseChoice]

            if (currentResponseOption != '') {
              text += '\n'
              answerReturn = answerCrossReference(x, answer) == 'Y' ? '=' : '~'
              text += answerReturn + currentResponseOption
            }
          }

          if (answer == 'all of the above') {
            text += '\n'
            text += '=' + 'All of the above'
          }

          if (answer == 'none of the above') {
            text += '\n'
            text += '=' + 'None of the above'
          }

          text += '\n'
          break;
        default:
          break;
      }

      //line 10: end
      text += "}";
      text += "\n";

      //line Final -> append text to new paragraph
      body.appendParagraph(text)
    }
  }
}
