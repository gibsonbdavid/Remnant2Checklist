function addhtml() {
  var lastRow = SpreadsheetApp.getActiveSheet().getLastRow();
  var baseurl = "https://remnant2.wiki.fextralife.com/";

  var data = SpreadsheetApp.getActiveSheet()
    .getRange(3, 5, lastRow, 1)
    .getValues();
  var html = [];
  // Splits entry name to create html link
  for (var i = 0; i < data.length; i++) {
    var words = data[i].toString().split(" ");
    html.push(baseurl + words.join("+"));
  }
  var richTextData = [];
  var j = 3;
  for (var i = 0; i < data.length; i++) {
    console.log(i);

    var range = SpreadsheetApp.getActiveSheet().getRange(j, 5);
    var richValue = SpreadsheetApp.newRichTextValue()
      .setText(data[i])
      .setLinkUrl(html[i])
      .build();
    range.setRichTextValue(richValue);
    j++;
  }
}

function differentAddHtml() {
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName("Copy of Code");
  let [header, ...data] = sheet.getDataRange().getRichTextValues();
  let col = header.map((h) => h.getText()).indexOf("Name");
  let builders = data.map((r) => {
    let text = r[col].getText();
    if (text.includes("TTSD-")) {
      let builder = r[col].copy();
      let re = /TTSD-\d+/g;
      let result;
      while ((result = re.exec(text))) {
        let startIndex = result.index;
        let endIndex = startIndex + result[0].length;
        builder.setLinkUrl(
          startIndex,
          endIndex,
          "https://jira.tools/browse/" + result[0]
        );
      }
      return [builder.build()];
    }
    return [r[col]];
  });
  sheet.getRange(2, col + 1, builders.length, 1).setRichTextValues(builders);
}
