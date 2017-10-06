function dataLoadDoc(id, constant, obj) {
  var ss = DocumentApp
  for (var poolIndex = 0; poolIndex < id.length; poolIndex++) {
    var openFile = ss.openById(id[poolIndex])
    var body = openFile.getBody();
    var loopMax = constant.lastRow - constant.firstRow;
    formatCaptivateFile(obj, body, loopMax, poolIndex)
  }
}
