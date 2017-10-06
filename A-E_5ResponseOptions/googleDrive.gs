function getFileName() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheetName = ss.getName();
  return sheetName;
}

function getFileID(fileName) {
  var files = DriveApp.getFilesByName(fileName);
  while (files.hasNext()) {
    var file = files.next();
    return file.getId()
  }
}

function createFolder(folderName) {
  var folders = DriveApp.getFolders();
  var folder, folderId, createFolder;
  while (folders.hasNext()) {
    folder = folders.next();
    if (folder.getName() == folderName) {
      folderId = folder.getId()
      return folderId
    }
}

  //a folder named quiz will be created to store reformatted quizzes
  createFolder = DriveApp.createFolder('quiz');
  folderId = createFolder.getId()
  return folderId
}

function createSubfolder(parentId, fileName) {
  var parentFolder = DriveApp.getFolderById(parentId)
  var subFolders = parentFolder.getFolders();
  var subFolder, subFolderId;

  while (subFolders.hasNext()){
   subFolder = subFolders.next();
    if(subFolder.getName() == fileName) {
      subFolderId = subFolder.getId();
      return subFolderId
    }
  }

  subFolder = parentFolder.createFolder(fileName)
  subFolderId = subFolder.getId()

  return subFolderId
}

function buildFileName(appType, questionPool, fileName, i) {
var assignment = 'quiz'
var version = 'v' + i
var filler = '_'

//currently appType is either DocumentApp or SpreadsheetApp... can use ternary for now... may want to use switch later if more file types are added
return (appType == 'DocumentApp') ?
  assignment + filler + fileName + filler + version + filler + questionPool:
  assignment + filler + fileName + filler + version;
}

//remove type from all... only use fileType
function createFile(subFolderId, fileName, mimeType, fileType, appType, fileIdArray) {
  var folder = DriveApp.getFolderById(subFolderId);
  var i = 0;
  var newFileName;
  var verifyFileName;
  var file, newFile, id;
  var questionPool = 'pool'+fileIdArray

do {
      i++;
      newFileName = buildFileName(appType, questionPool, fileName, i)
      verifyFileName = verifyFileExists(subFolderId, newFileName, fileType);
    }
while (verifyFileName == true);
      newFileName = buildFileName(appType, questionPool, fileName, i)
  file = {
    "title": newFileName,
    "mimeType": mimeType, //application/vnd.google-apps.document
    "parents": [
      {
        "id": subFolderId
      }
    ]
  };

  newFile = Drive.Files.insert(file)
  id =  newFile.id
  return id
}

function createSheet(id, sheetName) {
//create a sheet inside of a spreadsheet
  var ss = SpreadsheetApp
  var openFile = ss.openById(id)
  openFile.insertSheet(sheetName)
}

function deleteSheet(id, sheetName) {
  var ss = SpreadsheetApp
  var openFile = ss.openById(id)
  var getSheet = openFile.getSheetByName(sheetName)
  openFile.deleteSheet(getSheet)
}

function verifyFileExists(subFolderId, fileName, fileType) {
  var folder = DriveApp.getFolderById(subFolderId);
  var files = folder.getFilesByName(fileName)
  var filesByType = fileType;
  var title, type, file;

  while (filesByType.hasNext()) {
    type = filesByType.next()

    while (files.hasNext()) {
      file = files.next();
      title = file.getName()

      if(title == fileName) {
        return true
      }
    }
  }
  return false
}

function createFileId(filename){
  var File = DocumentApp.create(filename);
  var openFile = DocumentApp.openById(File.getId())
  return File.getId()
}

function countFileVersions(fileName) {
  var files = DriveApp.searchFiles('title contains "' + fileName + '"');
  var i = 0;

  while (files.hasNext()) {
    var file = files.next();
    ++i;
    Logger.log('i: ' + i)
  }
    return i;
}
