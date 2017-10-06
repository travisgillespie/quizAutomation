function answerCrossReference(value, answer) {
  var response,
      array,

     array = [['A','A,B','A,C','A,D','A,B,C','A,B,D','A,C,D'], //round 0
              ['B','A,B','B,C','B,D','A,B,C','A,B,D','B,C,D'], //round 1
              ['C','A,C','B,C','C,D','A,B,C','A,C,D','B,C,D'], //round 2
              ['D','A,D','B,D','C,D','A,B,D','A,C,D','B,C,D'], //round 3
              ['All of the above', 'None of the above']];      //round 4

  (array[value].indexOf(answer) > -1 ? response = 'Y' : response = 'N')
   return response;
}

function cornerstoneAnswers(getSheet, obj, appendData, loopMax, timestamp){
  var sheetName = 'questions'
  var index = 'index'
  var responseOrder;
  var responseOption = ['A','B','C','D'];
  var currentResponseChoice;
  var currentResponseOption;
  var questionTypeIndex = valueFromHeaderTitle(sheetName, 'Question Type', index)
  var questionType;
  var correctAnswerIndex = valueFromHeaderTitle(sheetName, 'Answer', index)
  var answer,
      arrayLength,
      responseOrder;

  for (var i = 0; i<=loopMax; i++){
    if (questionTypeValue(obj[i][questionTypeIndex]) != 2){     //if questionType isn't T/F
      answer = obj[i][correctAnswerIndex]
      arrayLength = (answer == 'All of the above' || answer == 'None of the above') ? responseOption.length : responseOption.length - 1
      responseOrder = 0;

    for(var x = 0; x <= arrayLength; x++) {
      currentResponseChoice = valueFromHeaderTitle(sheetName, 'Choice ' + responseOption[x], index)
      currentResponseOption = (x == 4) ? obj[i][correctAnswerIndex] : obj[i][currentResponseChoice]

      if (obj[i][currentResponseChoice] != ''){ // if responseOption[x] isn't blank
          appendData = [
            timestamp + i, //timestamp
            responseOrder += 1, //response order
            currentResponseOption, //question text
            answerCrossReference(x, answer),
            'Y' //Always Display Response
          ];
          getSheet.appendRow(appendData);
      }
    }
   }
  }
}
