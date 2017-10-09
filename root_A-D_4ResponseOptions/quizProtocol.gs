function fileId(mimeType, appType, fileIdArray){
  var fileName = sheetConstants().cellA1
  var parentFolderId = createFolder('quiz')
  var subFolderId = createSubfolder(parentFolderId, fileName);
  var fileType = DriveApp.getFolderById(subFolderId).getFilesByType(mimeType)
  return createFile(subFolderId, fileName, mimeType, fileType, appType, fileIdArray)
}

function formatAll(){
  captivateObject()
  cornerStoneObject()
}

function getQuestionPools() {
//returns array of unique question pool values
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = ss.getSheetByName('questions')
  var constant = objConstants('questions')
  var index = 'index'
  var qp = constant.questionPool
  var colStart = qp
  var colEnd = qp
  var range = specificRange(constant, colStart, colEnd)
  var obj = valuesInRange('questions', range)
  var loopMax = constant.lastRow - constant.firstRow
  var questionPoolIndex = valueFromHeaderTitle('questions', 'Question Pool', index,3)
  var answer,
      array = [0],
      uniqueArray = [],
      append;

  for (val in obj) {
    (obj[val][0] == '') ? array.push(0) : array.push(obj[val][0])
  }
  return sort_unique(array)
}

function sort_unique(arr) {
    return arr.sort().filter(function(el,i,a) {
        return (i==a.indexOf(el));
    });
}

function cornerStoneObject(){
  var type = 'Sheet'
  var mimeType = 'application/vnd.google-apps.spreadsheet'
  var appType = SpreadsheetApp;

  //if app crashe's when creating cornerstone files... might be b/c a third parameter 'fileIdArray' is missing... this parameter was put in place for questionPools when creating captivate files... so to fix create var fileIdArray = 0 and pass in as argument for fileId(_, _, fileIdArray)
  var fileID = fileId(mimeType, appType)

  var questions = 'Questions'
  var answers = 'Answers'
  var time = timestamp()
  var constants = objConstants('questions')
  var range = quizRange(constants)
  var quizObj = valuesInRange('questions', range)

  var sheetAnswers = createSheet(fileID, answers)
  var sheetQuestions = createSheet(fileID, questions)
  var sheetDelete = deleteSheet(fileID, 'Sheet1')

  var loadDataQuestions = dataLoadSheet(fileID, questions, constants, time, questionsHeader(), quizObj)
  var loadDataQuestions = dataLoadSheet(fileID, answers, constants, time, answersHeader(), quizObj)
}

function captivateObject() {
  var type = 'Doc'
  var mimeType = 'application/vnd.google-apps.document'
  var appType = DocumentApp;
  var constants = objConstants('questions')
  var fileIdArray = getQuestionPools() //returns array of queston pools
  var fileID = []
  /*
    for each value in array call fileId() below...
    append returned value to array
    call buildFileName() and pass into fileId()
    pass array of id's into dataLoadDoc
    the array of file id's should be zeroIndexed
  */
  for (var i = 0; i < fileIdArray.length; i++) {
    fileID.push(fileId(mimeType, appType, fileIdArray[i]))
  }

  var range = quizRange(constants)
  var quizObj = valuesInRange('questions', range)
  dataLoadDoc(fileID, constants, quizObj)

}
