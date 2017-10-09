function answerCrossReference(value, answer) {
  var response,
      array,

     array = [['A','A,B','A,C','A,D','A,E','A,B,C','A,B,D','A,B,E','A,C,D','A,C,E','A,D,E','A,B,C,D','A,B,C,E','A,B,D,E','A,C,D,E'], //ROUND 0 = possibilities of A
              ['B','A,B','B,C','B,D','B,E','A,B,C','A,B,D','A,B,E','B,C,D','B,C,E','B,D,E','A,B,C,D','A,B,C,E','A,B,D,E','B,C,D,E'], //ROUND 1 = possibilities of B
              ['C','A,C','B,C','C,D','C,E','A,B,C','A,C,D','A,C,E','B,C,D','B,C,E','C,D,E','A,B,C,D','A,B,C,E','A,C,D,E','B,C,D,E'], //ROUND 2 = possibilities of C
              ['D','A,D','B,D','C,D','D,E','A,B,D','A,C,D','A,D,E','B,C,D','B,D,E','C,D,E','A,B,C,D','A,B,D,E','A,C,D,E','B,C,D,E'], //ROUND 3 = possibilities of D
              ['E','A,E','B,E','C,E','D,E','A,B,E','A,C,E','A,D,E','B,C,E','B,D,E','C,D,E','A,B,C,E','A,B,D,E','A,C,D,E','B,C,D,E'], //ROUND 4 = possibilities of E
              ['All of the above', 'None of the above']];                                                                            //round 5 = possibilities of All/None of the above




  (array[value].indexOf(answer) > -1 ? response = 'Y' : response = 'N')
   return response;
}

function cornerstoneAnswers(getSheet, obj, appendData, loopMax, timestamp){
  var sheetName = 'questions'
  var index = 'index'
  var responseOrder;
  var responseOption = ['A','B','C','D','E'];
  var currentResponseChoice;
  var currentResponseOption;
  var questionTypeIndex = valueFromHeaderTitle(sheetName, 'Question Type', index, 3)
  var questionType;
  var correctAnswerIndex = valueFromHeaderTitle(sheetName, 'Answer', index, 3)
  var answer,
      arrayLength,
      responseOrder;

  for (var i = 0; i<=loopMax; i++){
    if (questionTypeValue(obj[i][questionTypeIndex]) != 2){     //if questionType isn't T/F
      answer = obj[i][correctAnswerIndex]
      arrayLength = (answer == 'All of the above' || answer == 'None of the above') ? responseOption.length : responseOption.length - 1
      responseOrder = 0;

    for(var x = 0; x <= arrayLength; x++) {
      currentResponseChoice = valueFromHeaderTitle(sheetName, 'Choice ' + responseOption[x], index, 3)
      currentResponseOption = (x == responseOption.length) ? obj[i][correctAnswerIndex] : obj[i][currentResponseChoice]

      if (obj[i][currentResponseChoice] != ''){ // if responseOption[x] isn't blank
          appendData = [
            timestamp + i, //timestamp
            responseOrder += 1, //response order
            currentResponseOption, //question text
            answerCrossReference(x, answer),
            'Y' //Always Display Response
          ];

        // Logger.log(x+': '+answer)
        // Logger.log('response option: ' + currentResponseOption)
        // Logger.log('answerCrossReference: ' + appendData[3])
          getSheet.appendRow(appendData);
      }
    }
   }
  }
}
