function doGet(e) {
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meta');
  title = metaSheet.getRange("B1").getCell(1,1).getValue();
  return HtmlService.createHtmlOutputFromFile('index.html').setTitle(title).addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function getMeta() {
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meta');
  var lastRow = metaSheet.getLastRow();
  var metaData = metaSheet.getRange("B1:B2");
  var result = {
    title: metaData.getCell(1,1).getValue(),
    submitText: metaData.getCell(2,1).getValue()
  }
  return result;
}

function setTrigger() {
  ScriptApp.newTrigger('clearCodeByElapsedTime').timeBased().everyMinutes(1).create();
}

function clearCodeByElapsedTime() {
  var loginSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Login");
  var lastRow = loginSheet.getLastRow();
  var loginData = loginSheet.getRange("A2:D"+lastRow);
  
  var currTime = new Date().getTime();
  
  for (var i=1; i<loginData.getLastRow(); i++ ){
    var rowDate = loginData.getCell(i, 4).getValue();
    if (rowDate != "" && rowDate < currTime) {
      loginData.getCell(i, 2).setValue("");
      loginData.getCell(i, 4).setValue("");
    }
  }
}

function login(code) {
  var user = verifyLogin(code);
  if (user == "") {
    return "unauthorized";
  } else {
    return {
      success: true,
      name: user.name
    }
  }
}

function verifyLogin(code) {
  
  if (code == "") {
    return "";
  }
  
  var loginSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Login");
  var lastRow = loginSheet.getLastRow();
  var loginData = loginSheet.getRange("A2:D"+lastRow);
  
  var user = "";
  
  for (var i=1; i<loginData.getLastRow(); i++ ){
    var codeIterator = loginData.getCell(i, 2).getValue();
    if (codeIterator == code) {
      var userId = loginData.getCell(i,1).getValue();
      if (userId == "") {
        userId = Utilities.getUuid();
        loginData.getCell(i,1).setValue(userId);
      }
      
      user = {
        name: loginData.getCell(i,3).getValue(),
        id: userId
      }
      break;
    }
  }
  if (user == "") {
    return "";
  } else {
    return user;
  }
}

function testGetQuestions() {
  var result = getQuestions("12345");
  Logger.log(result);
}

function getQuestions(code) {
  var user = verifyLogin(code);
  if (user == "") {
    return "unauthorised";
  }
  
  var questionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Questions');
  var lastRow = questionSheet.getLastRow();
  
  var questionData = questionSheet.getRange("A2:D"+lastRow);
  var questions = [];
  
  for (var i=1; i<=questionData.getNumRows(); i++) {
    var question = {
      text: questionData.getCell(i,1).getValue(),
      type: questionData.getCell(i,2).getValue(),
      label: questionData.getCell(i,3).getValue(),
    };
    if (question.type == "multipleChoice") {
      question["options"] = questionData.getCell(i,4).getValue();
    }
    questions.push(question);
  }
  var endTime = getUserEndTime(code);
  
  var savedAnswers = getSavedAnswers(user.id);
  
  var result = {
    end: endTime,
    questions: questions
  }
  
  if (savedAnswers != "") {
    result.answers = savedAnswers;
  }
  
  return result;
}

function testGetSavedAnswers() {
  Logger.log(getSavedAnswers("2fdc426c-3ce8-44b6-aabb-c3a381254337"));
}

function getSavedAnswers(userId) {
  var saveSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Save");
  var saveRecordFinder = saveSheet.createTextFinder(userId);
  var findResult = saveRecordFinder.findNext();
  if (findResult) {
    var result = findResult.getCell(1, 1).getValue();
    return result.split(':')[1];
  }
  return "";
}

function testTriggers() {
  var date = new Date();
  var mins = date.getMinutes() + 1;
  date.setMinutes(mins);
  
  ScriptApp.newTrigger('checkEndTime').timeBased().at(date).create();
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    Logger.log(trigger.getEventType());
    Logger.log(trigger.getHandlerFunction());
    Logger.log(trigger.getTriggerSource());
    Logger.log(trigger.getTriggerSourceId());
    Logger.log(trigger.getUniqueId());
  });
}

function checkEndTime() {
  Logger.log("checkEndTime");
}

function calculateEndTime() {
  var currTime = new Date();
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meta');
  var durationMins = metaSheet.getRange("B3").getCell(1,1).getValue();
  var durationMs = durationMins * 60 * 1000;
  
  var endTime = currTime.getTime() + durationMs;
  return endTime;
}

function getUserEndTime(code) {
  var loginSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Login");
  
  var lastRow = loginSheet.getLastRow();
  var loginData = loginSheet.getRange("A2:D"+lastRow);
  
  var userId = "";
  var endTime = "";
  var userRow = '';
  for (var i=1; i<loginData.getLastRow(); i++ ){
    var codeIterator = loginData.getCell(i, 2).getValue();
    if (codeIterator == code) {
      userId = loginData.getCell(i,1).getValue();
      endTime = loginData.getCell(i,4).getValue();
      userRow = i;
      break;
    }
  }
  if (userId == "") {
    return "unauthorised";
  }
  
  if (endTime != "") {
    return endTime;
  }
  
  endTime = calculateEndTime();
  loginData.getCell(userRow, 4).setValue(endTime);
  return endTime;
}

function testSave() {
  save(12345, ["a", "b", "c", "d"]);
}

function save(code, array) {
  var user = verifyLogin(code);
  if (user == "") {
    return "unauthorized";
  }
  var saveStr = user.id + ":" + JSON.stringify(array);
  var saveSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Save");
  var saveRecordFinder = saveSheet.createTextFinder(user.id);
  var findResult = saveRecordFinder.findNext();
  if (findResult) {
    findResult.getCell(1, 1).setValue(saveStr);
  } else {
    saveSheet.appendRow([saveStr]);
  }
  return "OK";
}

function clearCodeAndTime(code) {
  var loginSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Login");
  
  var lastRow = loginSheet.getLastRow();
  var loginData = loginSheet.getRange("A2:D"+lastRow);
  
  for (var i=1; i<loginData.getLastRow(); i++ ){
    var codeIterator = loginData.getCell(i, 2).getValue();
    if (codeIterator == code) {
      loginData.getCell(i, 2).setValue("");
      loginData.getCell(i, 4).setValue("");
      break;
    }
  }
}

function submit(code, array) {
  var user = verifyLogin(code);
  if (user == "") {
    return "unauthorized";
  }
  
  var result = [];
  result[0] = user.name;
  for(var i=0; i<array.length; i++) {
    result[i+1] = array[i];
  }
  var responseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses');
  responseSheet.appendRow(result);
  clearCodeAndTime(code);
  
  return "OK";
}