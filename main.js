const { app, BrowserWindow } = require('electron');
var path = require ('path')
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'Twilio Account SID Here';
const authToken = 'Twilio Auth Token Here';
const forceDelivery= true; //allows for sending to any phone number even if it looks like a Landline
const client = require('twilio')(accountSid, authToken, forceDelivery);
var body ="";
const twilnumber = '+Enter twilio number';
var number = "";
let win;
const {ipcMain} = require('electron');
global.responseString ="";
const Menu = require('electron').Menu
var csv = require("csv-query");



ipcMain.on('Numbers', (event, arg) => {
 number = arg.split('\n');
});

ipcMain.on('Payload', (event, arg) => {
  var body = arg;
  let phoneArr =number;
    phoneArr.forEach(numberResult => {
      client.messages.create(
        { to: numberResult, from: twilnumber, body: body, forceDelivery: true },
        function(err, message) {
          console.log(err);
        }
      );
    })   
});
  
ipcMain.on("History-message", (event, arg) => {
  var history = arg.split("\n");
  let PhoneNum = number;
  var today = new Date();

  var day = today.getUTCDate();

  PhoneNum.forEach(PhoneNumber => {
    client.messages.each(
      { dateSent: day, from: PhoneNumber, to: "+16197622804" },
      messages =>
        stringer(messages.from, messages.body) +
        event.sender.send("History-reply", responseString)
    );
  });
});   


ipcMain.on("iccid-message", (event, arg) => {
  var msidns = arg.split("\n");
  let IccidList = msidns;
  IccidList.forEach(function(IndividualIccid) {
    console.log("IccidList?: " + individualDog);

    csv
      .createFromFile(__dirname + "/Sim_database.csv")
      .then(function(db) {
        return db.findOne({ ICCID: individualDog });
      })
      .then(function(record) {
        var xtra = record["MSISDN"];
        console.log(xtra);
        event.sender.send("iccid-reply", xtra);
      })
      .catch(function(error) {
        throw error;
      });
  });
});


function stringer(){
  responseString = Array.prototype.slice.call(arguments);
}

function createWindow() {
  win = new BrowserWindow({ width: 900, height: 830 });
  win.loadURL(`file://${__dirname}/index.html`);
  icon: path.join(__dirname, "assets/icons/png/64x64");
}
function createMenu() {
  const application = {
    label: "Application",
    submenu: [
      {
        label: "About Application",
        selector: "orderFrontStandardAboutPanel:"
      },
      {
        type: "separator"
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => {
          app.quit()
        }
      }
    ]
  }
  const edit = {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  }

  const template = [
    application,
    edit
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on("ready", () => {
  createWindow();
  createMenu();
});


app.on("window-all-closed", app.quit);

app.on("before-quit", () => {
  mainWindow.removeAllListeners("close");
  mainWindow.close();
});
