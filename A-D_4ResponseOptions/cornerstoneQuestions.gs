function highlightCell() {

}

function questionTypeValue(questionType) {
  switch (questionType) {
    case 'True/False':
      return 2
    case 'Multiple Choice – Single Answer':
      return 4
    case 'Multiple Choice – Multiple Answer':
      return 5
    default:
      break;
    /*
      'Yes/No' -> return 1
      'Text Only' -> return 6
      'Free Form (Essay)' -> return 9
    */
  }
}

function mcRandomAnswer(correctAnswer) {
  switch (correctAnswer) {
    case 'TRUE':
    case 'FALSE':
    case 'all of the above':
    case 'none of the above':
      return false
    default:
      return true
  }
}

function mcAnswersToDisplay(obj, answer) {
  var x = 0;

  for (var i = 6; i <= 9; i++) { // 6 = Choice A, 7 = Choice B, 8 = Choice C, 9 = Choice D, 10 = Answer
    if (obj[i].length > 0){
      x++
    }
  }

  if (answer == 'All of the above' || answer == 'None of the above') { //if this doesn't work try (obj[11] == 'All of the above' || obj[11] == 'None of the above')
      x++
  }
  return x
}

function cornerstoneQuestions(getSheet, obj, appendData, loopMax, timestamp, category){
  var sheetName = 'questions'
  var constants = objConstants(sheetName)
  var index = 'index'
  var questionIndex = valueFromHeaderTitle(sheetName, 'Question', index,3)
  var questionTypeIndex = valueFromHeaderTitle(sheetName, 'Question Type', index,3)
  var correctAnswerIndex = valueFromHeaderTitle(sheetName, 'Answer', index,3)
  var explanationIndex = valueFromHeaderTitle(sheetName, 'Answer Explanation', index,3)
  var authorIndex = valueFromHeaderTitle(sheetName, 'Author', index,3)
  var category = '' //right now i'm using this variable to override the function parameter value

  for (var i = 0; i<=loopMax; i++){
    appendData = [
                (timestamp + i), //timestamp
                obj[i][questionIndex], //question text
                questionTypeValue(obj[i][questionTypeIndex]), //response type -> obj[i][questionTypeIndex]... function if/else return value
                (questionTypeValue(obj[i][questionTypeIndex]) == 2 ? obj[i][correctAnswerIndex]:''), //Correct Answer -> (optional)
                obj[i][explanationIndex], //LEAVE BLANK -> Answer Explanation
                category, //Category
                'Y', //Active
                //obj[i][author], //Author(optional)
                '', //LEAVE BLANK -> Culture Id
                '', //LEAVE BLANK -> Default Language
                (mcRandomAnswer(obj[i][correctAnswerIndex]) == true ? true : ''), //Multiple Choice Random Answer Selection
                (mcRandomAnswer(obj[i][correctAnswerIndex]) == true ? mcAnswersToDisplay(obj[i], obj[i][correctAnswerIndex]) : '') , //Multiple Choice Answers to Always Display
                1 //Question Type
                ];

    getSheet.appendRow(appendData)
  }
}
