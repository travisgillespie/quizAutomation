## Note 10-6-17:
I'm currently writing the README.md file. It will be up to date within a few days.

# Overview
This program automates the process of copying quiz questions from a spreadsheet and pasting it into Adobe Captivate or Cornerstone OnDemand (CSoD). This code has proven successful in decreasing a workload that would take hours to complete down to a few minutes. There are two versions of this program. One version can be used for quizzes with 4 response options (<i>i.e.</i> A-D), and the other for quizzes with 5 response options (<i>i.e.</i> A-E). You will need a google account to run this program.

![Google Sheets png](./assets/quizTemplateA-D.png?raw=true "Google Sheets")

# Initial Setup

### Template Sheet

Navigate to my <a style="color:#0D6EE4" href="https://drive.google.com/open?id=0B5w_Rm6Jrg-PcnBkSDY3aE90cTg">task automation folder</a>.
Choose either the 4 or 5 response option quiz, right click the file, and select <i>Add to My Drive</i>. This will create a copy of the file in your google drive. I recommend setting this initial copy as your quiz template. Duplicate your template whenever you want create a new quiz.


Select the tab labeled <i>dataMappingQuestions</i>, and take a look at the following columns:
* Column B: Cell B4 and beyond serve three purposes.
  1. Categorizes the quiz. Navigate to the tab labeled <i>questions</i> and select a value from the dropdown menu in cell A1.
  2. The value selected in the previous step will also be applied to the name of the file that's created after running the program. Change the provided values to match naming conventions of your files.
  3. For people working with CSoD, columns A-C will need to be modified to match the test  id's, names, and status associated with your CSoD's account.

* Column E: Cell B4 and beyond serve one purpose.
  1. These values help further categorize each question. Change the provided values to match your naming conventions. Navigate to the tab labeled <i>questions</i> and view any cell in the C4:C range to see the values in the dropdown menus.

In most cases, the <i>questions</i> tab will be the only section you'll be working. So you can hide the remaining tabs if needed.

Navigate to the tab labeled <i>questions</i>. Fill out the spreadsheet with quiz questions and responses. Here are a few things to note:

|A-D|A-E|Note|
|---|---|----|
|Cell A1:|||
|Column C|| Categorize questions.|
|Column D|| Video files|
|Column E|| Question Type will also set the answer chocikes in coloumn K.|
|Column F|| Question|
|Column K|| Answer options depend on question type selected in column E.|
|Column L|| Answer Exp|
|Column M|| Notes|



### Script Editor
### Form Standards
### Update Admin Emails or Remove Admin If Validation
### do you need to change file id?
### if headers are changed in excel sheet... values need to be changed in script on reusableFunctions.gs
### List of Test Names... change Topic Name list dataMappingQuestions > Column AA... these names will be used to title your formatted quizzes... more about test title in next section
### List of Cornerston Tests & ID's... change test names and id's in datamappingQuestions > Columns (J, K, and L)... provide the cornerstones correct test ID, Test Name, and label as active or inactive... more about test id's in next section

### Cornerstone
### Captivate

#### Running Program
### Video Walkthrough
### Copy Sheets to Drive... keep one blank as template, and duplicate for future assessments
### fill out form
### choose title questions tab > A1 dropdown
### choose test id questions tab > column C for each question... choose the test name... the id and active/inactive status will be applied to the final outputed file
### Run Functions
### Allow permissions
### Enable Google API
### where will quiz folder and files be stored?
### open file and download as:
  * Cornerstone -> save as CSV
  * Captivate -> save as txt


### Menu Bar Admin
### Character Limits
