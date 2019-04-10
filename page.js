var myVar;
  const { ipcRenderer } = require('electron');

  function ICCID() {
    var argy = "";
    document.getElementById("forcsv").innerHTML = "";

    var k = document.getElementById("myrecipients").value;
    document.getElementById("forcsv").innerHTML = k;
    let dude = k;
    var argy = "";
    ipcRenderer.send('iccid-message', dude);

    ipcRenderer.on('iccid-reply', (event, arg) => {
      argy += "+" + arg + "\n";

      document.getElementById('myrecipients').value = argy;


    })

  }


  function select() {
    var o = document.getElementById("mySelect").value;
    document.getElementById("mymessagearea").value = o;
  }


  function Reset() {
    document.getElementById('myPopup').innerHTML = "";
    document.getElementById("mymessagearea").value = "";
    document.getElementById("myrecipients").value = "";
    document.getElementById("forcsv").innerHTML = "";


  }

  function ClearOutMainVar() {
    myVar = setTimeout(alertFunc, 1000);

  }

  function alertFunc() {
  }

  function GrabPhoneNums() {
      var batch = "";
      document.getElementById('myPopup').innerHTML = "";
      var t = document.getElementById("myrecipients").value;

      let get = t;
      var argnew = "";

      ipcRenderer.send('History-message', get);

      ipcRenderer.on('History-reply', (event, arg) => {
        argnew += "<br>" + arg;
        document.getElementById('myPopup').innerHTML = argnew;
      })
    }

  function GetResponses() {
    let n = document.getElementById("myrecipients").value;
    document.getElementById("nums").innerHTML = n;
    let Num = n;
    ipcRenderer.send('Numbers', Num);
  }

  function PrintMessageToScreen() {
    let x = ("Sent:  " + document.getElementById("mymessagearea").value);
    document.getElementById("Text").innerHTML = x;
  }
  function AllowGetResponse() {
    button.removeAttribute("disabled");
    let y = (document.getElementById("myrecipients").value);
    document.getElementById("nums").innerHTML = y;
  }

  function sender() {
    let n = document.getElementById("myrecipients").value;
    document.getElementById("nums").innerHTML = n;
    let Num = n;
    ipcRenderer.send('Numbers', Num);
    let z = document.getElementById("mymessagearea").value;
    document.getElementById("Text").innerHTML = z;
    let Data = z;
    ipcRenderer.send('Payload', Data);
  }
  function move() {
    let elem = document.getElementById("myBar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
    myVar = setTimeout(kill, 1500);
  }

  function show() {
    document.getElementById("myBar").style.display = "block";
  }
  function kill() {
    document.getElementById("myBar").style.display = "none";
  }