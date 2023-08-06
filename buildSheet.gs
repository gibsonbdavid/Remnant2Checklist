function buildSheet(url, type) {
  // a test URL and Type variable
  url = "https://remnant2.wiki.fextralife.com/Traits";
  type = "Traits";
  var baseurl = "https://remnant2.wiki.fextralife.com";
  var gamemode = "Any";

  var htmlContent = UrlFetchApp.fetch(url).getContentText();

  var entriesCombined = findEntries(htmlContent);

  var names = splitList(entriesCombined, true, baseurl);
  var html = splitList(entriesCombined, false, baseurl);
  var locationUpgradeData = new Array();
  console.log(html);

  for (var i = 0; i < html.length; i++) {
    //Code to run parseLocationDetails goes here, we need to finish the html, then feed the htmlCONTENT into the function

    var content = UrlFetchApp.fetch(html[i]).getContentText();
    locationUpgradeData.push(parseLocationDetailsRAWM(content));
  }

  //here we start adding our data to the appropriate column and then move onto the next row for the next entry, starts at the location where it was called

  buildRow(names, locationUpgradeData, type, gamemode);
}

function splitList(array, even, baseurl) {
  var arrayReturn = new Array();

  for (var i = 0; i < array.length; i++) {
    if (even) {
      if (i % 2 == 0) {
        arrayReturn.push(array[i]);
      }
    } else if (i % 2 != 0) {
      arrayReturn.push(baseurl + array[i]);
    }
  }
  return arrayReturn;
}

function buildRow(names, locationUpgradeData, type, gamemode) {
  var data = [];

  for (var i = 0; i < names.length; i++) {
    if (
      locationUpgradeData[i] != undefined &&
      locationUpgradeData[i][0] != null
    ) {
      console.log(names[i]);
      console.log(locationUpgradeData[i]);
      var cleanedDetails = locationUpgradeData[i][0].replace(/&nbsp;/g, " ");
      var worldLocation = locationUpgradeData[i][1];
      var localLocation = locationUpgradeData[i][2];
      if (localLocation == undefined) {
        localLocation = "";
      } else if (localLocation == worldLocation) {
        localLocation = "";
      }
      if (worldLocation == undefined) {
        worldLocation = "";
      }

      data.push([
        '=IF(COUNTIF(B2:C2, "False") = 0, "✔", "✘")',
        "",
        locationUpgradeData[i][3],
        type,
        names[i],
        gamemode,
        worldLocation + " " + localLocation,
        cleanedDetails,
      ]);
    } else {
      data.push([
        '=IF(COUNTIF(B2:C2, "False") = 0, "✔", "✘")',
        "",
        "",
        type,
        names[i],
        gamemode,
        worldLocation + " " + "",
        "",
      ]);
    }
  }

  var lastRow = SpreadsheetApp.getActiveSheet().getLastRow();
  var checkboxRange = SpreadsheetApp.getActiveSheet().getRange(
    lastRow + 1,
    2,
    data.length,
    1
  );
  SpreadsheetApp.getActiveSheet()
    .getRange(lastRow + 1, 1, data.length, data[0].length)
    .setValues(data);
  checkboxRange.insertCheckboxes();
}
