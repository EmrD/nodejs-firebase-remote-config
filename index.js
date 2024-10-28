import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getRemoteConfig } from "firebase-admin/remote-config";
import express from "express";
const app = express();

initializeApp({
  credential: applicationDefault(),
  projectId: "YOUR_PROJECT_ID",
});

async function getWelcomeMessage() {
  try {
    const rc = getRemoteConfig();
    const template = await rc.getTemplate(); 
    const welcomeMessage = template.parameters?.welcome_message?.defaultValue?.value || "Default Welcome Message"; //defaultValue is an example to get message. You can get some values with; .conditionalValues.YOUR_CONDITION_NAME.value
    return welcomeMessage;
  } catch (error) {
    return "Error fetching welcome message" + error;
  }
}

app.get("/" , (req , res) => {
    getWelcomeMessage().then((message) => {
      res.send(message);
    });
  })

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
