const { app, BrowserWindow } = require('electron');
var path = require ('path')
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';// Enter your accountSid here
const authToken = 'your_auth_token';//enter your auth token here
const forceDelivery= true;//for some phone numbers that dont look like cell numbers this forces the message to send anyway. 
const client = require('twilio')(accountSid, authToken, forceDelivery);
var body ="";
const twilnumber = '+XXXXXXXXXXX';//Enter your twilio phone number
var number = "";
let win;
const {ipcMain} = require('electron');
global.responseString ="";
const Menu = require('electron').Menu
var csv = require("csv-query");







ipcMain.on('Numbers', (event, arg) => {
 number = arg.split('\n');
 
});

// Attach listener in the main process with the given ID
ipcMain.on('Payload', (event, arg) => {
var body = arg;
 let fish =number;
 fish.forEach(individualFish => {


client.messages.create({to:individualFish,
  from: twilnumber,body: 
  body,forceDelivery:true}, 
  function(err,message){console.log(err);});
 })   
});
  
// Attach listener in the main process with the given ID
ipcMain.on('History-message', (event, arg) => {
var history = arg.split('\n');
 let cat =number;
 var today = new Date();

 var day = today.getUTCDate();

 cat.forEach(individualCat => {

client.messages.each({dateSent:day,from: individualCat,to: '+16197622804'},messages =>stringer(messages.from,messages.body)+ event.sender.send('History-reply', responseString)

 );


 })   

 })   


ipcMain.on('iccid-message', (event, arg) => {
var msidns = arg.split('\n');
// console.log("MSISDNS: " + msidns); //uncomment to test that the Number are pulled from CSV file
let dog = msidns
dog.forEach(function(individualDog) {
  console.log("DOG?: " +individualDog);

csv.createFromFile(__dirname + "/Sim_database.csv").then(function (db) {return db.findOne({ICCID: individualDog});})
.then(function (record) {var xtra = record["MSISDN"]; console.log(xtra); event.sender.send('iccid-reply',xtra);}).catch(function (error) {throw error;});
})
})


function stringer(){
responseString = Array.prototype.slice.call(arguments);

}

function createWindow() {
    win = new BrowserWindow({ width: 900, height: 830 });
    win.loadURL(`file://${__dirname}/index.html`);
    icon: path.join(__dirname, 'assets/icons/png/64x64')
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

app.on('ready',() =>
	{
		createWindow()
	 createMenu()
	})


app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});
