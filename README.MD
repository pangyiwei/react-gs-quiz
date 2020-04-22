# Timed Quiz on Google App Scripts

## Concept
Building on the concept from creating [file upload form on Google AppScript](https://github.com/pangyiwei/googleappscript-form).

Additionally, we use webpack to bundle everything into a single html that can be served by Google App Script doGet. This allows us to use frontend frameworks like React (in this case)

## Usecase
Creating time quizzes for others to do.

## Usage

### Build Files

You only need to do this if you want to modify the source files. If you just want to set up the quiz for your users, skip the subsection.

You need to have NodeJS and NPM installed.

#### Build
```
npm install
npm run build
```

#### Development Mode
```
npm run start
```
Then open ./dist/index.html in your browser.

### Setup Google Sheets and App Script

1. Create a Google Sheet
2. Create 5 separate spreadsheets: "Meta", "Login", "Questions", "Responses" and "Save".
    1. "Meta" is a list of information about the whole quiz. The First Column of the Meta will be the keys while second column will be value.
        - Fill up "Title" in "A1" and the Title of your quiz in "B1".
        - Fill up "Submit Text" in "A2" and the text you want to display to users when they submit the quiz in "B2".
        - Fill up "Duration(mins)" in "A3" and the duration of your quiz in minutes in "B3".

    ![Meta Sheet Example](https://raw.githubusercontent.com/pangyiwei/react-gs-quiz/master/docs/meta-sheet.PNG)

    2. "Login" is for your quiz takers.
        - Fill up "Id" in "A1". This will be used by the script.
        - Fill up "Code" in "B1". This is where you assign passcodes to your quiz takers which they will enter in order to take the quiz. Do note that you have to issue unique codes to all your quiz takers.
        - Fill up "Name" in "C1". This column is for the Names of your quiz takers.
        - Fill up "End Time" in "D1" this is used by the script.

    ![Login Sheet Example](https://raw.githubusercontent.com/pangyiwei/react-gs-quiz/master/docs/login-sheet.png)

    3. "Questions" is for the quiz questions. 
        - Fill up "Question" in "A1". This is where your questions will go
        - Fill up "Type" in "B1". This state the type of your questions. It should be either:
            - shortAns: Short Answer Questions
            - longAns: Long Answer Questions
            - multipleChoice: For MCQ
            - heading: For headings within your quiz
            - paragraph: For paragraphs within your quiz
            - image: For images within your quiz. You will need to provide an image url here. Check [here](https://www.publicalbum.org/blog/embedding-google-photos-image) for how to host images using Google Photos.
        - Fill up label in "C1". This will be the label for the answer box in the quiz.
        - Fill up "Options" in D1. This is applicable only if Type is "multipleChoice". Fill up your options as follows (include the brackets): ["option1 text", "option2 text", "option3 text", ...]
            e.g. ["a", "b", "a and b", "All of the above"]

    ![Questions Sheet Example](https://raw.githubusercontent.com/pangyiwei/react-gs-quiz/master/docs/questions-sheet.PNG)

    4. "Responses" is where the results are collated. Each row represents a response. The first column will be the name of submitter followed by his answers in the order of the given questions.
    5. "Save". You can leave this sheet empty. It is used by the script to allow saving of responses.
3. Go to tools > Script Editor
4. Copy the following scripts:
    - Code.gs
    - index.html (Found in the dist folder)
5. Click Publish and Deploy as Web App.
    - Under "Project Version". select "New"
    - To allow others to see the quiz you have to select "Anyone, including anonymous" under "Who has access to app".
    - You will need to accept the relevant authorizations for your Google Account.
6. Set up Trigger. You will need to activate the timer function to check if your users have exceeded the time limit.
    - In the AppScript Console. Click Run > Run Function > setTrigger.
7. You are good to go. Share the given link with others to access the quiz.
    - You can always edit the form and the quiz will be updated dynamically.
    - The App Script link is hard to read. You can always use a URL Shortener to share the link.