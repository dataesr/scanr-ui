//AutoritÃ©s
//Pour connaÃ®tre les filtres disponibles et les valeurs retournÃ©es par IdRef
//Voir : http://documentation.abes.fr/aideidrefdeveloppeur/ch04.html

import { hidePopWin, initPopUp, showPopWin } from "./subModal";

let remoteClientExist = false;
let idrefinit = false;

const serializer = {
  parse: function (message) {
    const data = {};
    const d = message.split("&");
    let pair, key, value;
    for (let i = 0, len = d.length; i < len; i++) {
      pair = d[i];
      key = pair.substring(0, pair.indexOf("="));
      value = pair.substring(key.length + 1);
      data[key] = unescape(value);
    }
    return data;
  },
  stringify: function (data) {
    let message = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        message += key + "=" + escape(data[key]) + "&";
      }
    }
    return message.substring(0, message.length - 1)
  },
};

function envoiClient(
  index1,
  index1Value,
  index2,
  index2Value,
  filtre1,
  filtre1Value,
  filtre2,
  filtre2Value,
  zones,
) {
  index1Value = index1Value.replace(/'/g, "\\\'");
  if (initClient() == 0) {}
  const oFrame = document.getElementById("popupFrame");
  if (!idrefinit) {
    oFrame.contentWindow.postMessage(
      serializer.stringify({ Init: "true" }),
      "*",
    );
    idrefinit = false;
  }
  try {
    if (zones!=null && zones!=='')
      eval('oFrame.contentWindow.postMessage(serializer.stringify({Index1:\''+index1+'\',Index1Value:\''+index1Value+'\',Index2:\''+index2+'\',Index2Value:\''+index2Value+'\',Filtre1:\''+filtre1+"/"+filtre1Value+'\',Filtre2:\''+filtre2+"/"+filtre2Value+'\','+zones+',fromApp:\'scanR\',AutoClick:\'false\',End:\'true\'}), "*"); ')
    else if (filtre2!=null)
      eval('oFrame.contentWindow.postMessage(serializer.stringify({Index1:\''+index1+'\',Index1Value:\''+index1Value+'\',Index2:\''+index2+'\',Index2Value:\''+index2Value+'\',Filtre1:\''+filtre1+"/"+filtre1Value+'\',Filtre2:\''+filtre2+"/"+filtre2Value+'\',fromApp:\'scanR\',AutoClick:\'false\',End:\'true\'}), "*"); ')
    else if (filtre1!=null)
      eval('oFrame.contentWindow.postMessage(serializer.stringify({Index1:\''+index1+'\',Index1Value:\''+index1Value+'\',Index2:\''+index2+'\',Index2Value:\''+index2Value+'\',Filtre1:\''+filtre1+"/"+filtre1Value+'\',fromApp:\'scanR\',AutoClick:\'false\',End:\'true\'}), "*"); ')
    else if (index2!=null)
      eval('oFrame.contentWindow.postMessage(serializer.stringify({Index1:\''+index1+'\',Index1Value:\''+index1Value+'\',Index2:\''+index2+'\',Index2Value:\''+index2Value+'\',fromApp:\'scanR\',AutoClick:\'false\',End:\'true\'}), "*"); ')
    else
      eval('oFrame.contentWindow.postMessage(serializer.stringify({Index1:\'Famille\',Index1Value:\''+index1Value+'\',fromApp:\'scanR\',AutoClick:\'false\',End:\'true\'}), "*"); ')
  } catch (e) {
    alert("oFrame.contentWindow Failed? " + e);
  }
}

function initClient() {
  if (remoteClientExist) {
    showPopWin("", screen.width * 0.89, screen.height * 0.74, null);
    return 0;
  }
  showPopWin("", screen.width * 0.89, screen.height * 0.74, null);
  remoteClientExist = true;
  if (window?.addEventListener) {
    window.addEventListener("message", function (e) {
      traiteResultat(e);
    });
  } else {
    window.attachEvent("onmessage", function (e) {
      traiteResultat(e);
    });
  }
  return 0;
}

function traiteResultat(e) {
  //partie Ã  adapter pour votre client
  const data = serializer.parse(e.data);

  if (data["g"] != null) {
    // let resHtml = "<ul>";
    // resHtml += "<li>data['a'] : " + data["a"] + "</li>";
    // resHtml += "<li>data['b'] : " + data["b"] + "</li>";
    // resHtml += "<li>data['c'] : " + data["c"] + "</li>";
    // resHtml += "<li>data['d'] : " + data["d"] + "</li>";
    // resHtml += "<li>data['e'] : " + data["e"] + "</li>";
    // resHtml += "<li>data['f'] : " + escapeHtml(data["f"]) + "</li>";
    // resHtml += "<li>data['g'] : " + data["g"] + "</li>";
    // resHtml += "</ul>";
    // console.log(resHtml)
    hidePopWin(null);
  }
}

function escapeHtml(texte) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export { envoiClient, initPopUp };
