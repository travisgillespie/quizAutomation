function onEdit(e){
  switch (e.source.getSheetName()) {
    case 'questions':
        validationRules(e);
        columnValidation(e, e.source.getSheetName());
        break;
    case 'dataMappingQuetions':
        clearValidationRules();
        break;
    default:
      break;
  }
}

function onOpen(){
  verifyAdmin();
  clearValidationRules();
}
