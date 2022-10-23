let date = new Date().toISOString().slice(0, 19).replace(/[-T:.]/g, "_");

let emailPrefix = "cypress";

function newUser() {
  return (emailPrefix + "+" + date + parseInt(Math.random() * 10000) + '@standardnotes.com');
}

let userName = newUser();

let userPassword = "654321abcd";

let syncingServer = "https://api-dev.standardnotes.com";

export { userName, userPassword, syncingServer };