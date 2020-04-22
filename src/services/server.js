import mockTimer from "./mockTimer";

/*
Convert google script server calls to more
familiar js/promise-based functions.
*/
const serverMethods = {};

if (process.env.NODE_ENV === "development") {

  serverMethods["getMeta"] = async () => {
    await mockTimer(500);
    return {
      title: "My Quiz",
      submitText: "Thank you"
    }
  }

  serverMethods["login"] = async (code) => {
    await mockTimer(500);
    if (code == 12345) {
      return Promise.resolve({ success: true, name: "Tom Smith" });
    } else {
      return "unauthorized";
    }
  }

  serverMethods["getQuestions"] = async (code) => {
    await mockTimer(500);
    if (code == 12345) {
      const questions = [
        {
          text: "Test question here",
          type: "shortAns",
          label: "test",
        },
        {
          text: "Test paragraph here",
          type: "paragraph",
          label: "",
        },
        {
          text: "Test question here",
          type: "longAns",
          label: "test",
        },
        {
          text: "Test Heading here",
          type: "heading",
          label: "",
        },
        {
          text: "Test question here",
          type: "multipleChoice",
          label: "test",
          options: "[\"a\", \"b\", \"c\"]"
        },
        {
          text: "https://lh3.googleusercontent.com/0MMGkjETKY58RLH8lnG1svGDQe-V38umT6Gxr_IIpA1-UCYqSad4JDJ9SXRw0NkvifG1JpaVHuB6nPleIBKHuX16e6VtUeEwg1rUtapn07vZEzigRUEz5D4PAkD_iYYN6_Tlf4dT=w1920-h1080",
          type: "image",
          label: "Tortoise"
        }
      ]
      const result = {
        questions,
        end: new Date().getTime() + 30000
      }
      return Promise.resolve(result);
    } else {
      return "unauthorized";
    }
  }

  serverMethods["save"] = async (code, submission) => {
    await mockTimer(500);
    console.log(submission);
    if (code == 12345) {
      return Promise.resolve("OK");
    } else {
      return "unauthorized";
    }
  }

  serverMethods["submit"] = async (code, submission) => {
    await mockTimer(500);
    console.log(submission);
    if (code == 12345) {
      return Promise.resolve("OK");
    } else {
      return "unauthorized";
    }
  }
} else {
  // skip the reserved methods
  const ignoredMethods = [
    'withFailureHandler',
    'withLogger',
    'withSuccessHandler',
    'withUserObject',
  ];

  for (const method in google.script.run) {
    if (!ignoredMethods.includes(method)) {
      serverMethods[method] = (...args) => {
        return new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)[method](...args);
        });
      };
    }
  }
}




export default serverMethods;
