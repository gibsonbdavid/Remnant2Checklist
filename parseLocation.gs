function parseLocationDetails(htmlContent) {
  //var url = "https://remnant2.wiki.fextralife.com/Crossbow"
  //var htmlContent = UrlFetchApp.fetch(url).getContentText();

  const locationDetails = extractTextFromLiElements(htmlContent);
  var locations = getLocation(locationDetails);
  var upgradeable = getUgradeable(htmlContent);
  var allTogether = [locationDetails, locations[0], locations[1], upgradeable];
  return allTogether;
}

function extractTextFromLiElements(htmlContent) {
  const h3Regex = /<h3[^>]*class="bonfire"[^>]*>.*?<\/h3>/s;
  const h3Match = htmlContent.match(h3Regex);

  if (h3Match) {
    const ulRegex = /<ul>(.*?)<\/ul>/s;
    const ulMatch = htmlContent.substring(h3Match.index).match(ulRegex);

    if (ulMatch) {
      const liRegex = /<li[^>]*>(.*?)<\/li>/gs;
      const liMatches = ulMatch[1].matchAll(liRegex);
      const liTextArray = [...liMatches].map((match) =>
        match[1].replace(/<[^>]+>/g, "").trim()
      );
      return liTextArray.join("\n");
    }
  }

  return null;
}

function extractTextRAWM(htmlContent) {
  //First Armor
  /*const h3Regex =
    /<h3\s+class="bonfire"[^>]*>.*How to.*<\/h3>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>/g;
    */
  // Second one for Rings and Amulets
  /*const h3Regex =
    /<h3\s+class="bonfire"[^>]*>.*Location.*<\/h3>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>/g;
    */
  // Third
  const h3Regex =
    /<h3\s+class="bonfire"[^>]*>.*Where.*<\/h3>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>/g;

  const h3Match = htmlContent.match(h3Regex);

  if (h3Match) {
    const liRegex = /<li[^>]*>(.*?)<\/li>/gs;

    const liMatches = h3Match[0].matchAll(liRegex);
    const liTextArray = [...liMatches].map((match) =>
      match[1].replace(/<[^>]+>/g, "").trim()
    );
    return liTextArray.join("\n");
  }

  return null;
}

function getLocation(extractedText) {
  const locationLosomn = [
    /Losomn/,
    /Beatific Palace/,
    /Postulant's Parlor/,
    /Brocwithe Quarter/,
    /Butcher's Quarter/,
    /Cotton's Kiln/,
    /Council Chamber/,
    /Council Tribunal/,
    /Ironborough/,
    /Malefic Gallery/,
    /Malefic Palace/,
    /Nimue's Retreat/,
    /Postulant's Parlor/,
  ];
  const locationYaesha = [
    /Yaesha/,
    /Kaeula's Rest/,
    /The Far Woods/,
    /The Widows Court/,
    /The Great Bole/,
    /Forgotten Field/,
    /The Nameless Nest/,
    /The Lament/,
    /The Forbidden Grove/,
    /Cathedral of Omens/,
    /Ravager's Lair/,
  ];
  const locationNerud = [
    /N'Erud/,
    /N'erud/,
    /Seeker's Rest/,
    /Phantom Wasteland/,
    /Vault of the Formless/,
    /The Hatchery/,
    /Tower of the Unseen/,
    /Timeless Horizon/,
    /Void Vessel Facility/,
    /Astropath's Respite/,
    /Alepsis-Taura/,
    /The Eon Vault/,
    /Spectrum Nexus/,
    /The Dark Conduit/,
  ];
  const ward13 = [/Ward 13/];
  const lab = [/Labyrinth/];
  const rootEarth = [/Root Earth/];

  var worldLocation;
  var localLocation;

  if (extractedText != null) {
    var isMatch = locationLosomn.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);
        wordLocation = "Losomn";
        localLocation = tx;
      }
    });
    var isMatch = locationYaesha.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);

        worldLocation = "Yaesha";
        localLocation = tx;
      }
    });
    var isMatch = locationNerud.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);

        worldLocation = "N'Erud";
        localLocation = tx;
      }
    });
    var isMatch = ward13.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);

        worldLocation = "Ward 13";
        localLocation = tx;
      }
    });
    var isMatch = lab.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);

        worldLocation = "The Labyrinth";
        localLocation = tx;
      }
    });
    var isMatch = rootEarth.some((rx) => {
      if (rx.test(extractedText)) {
        var tx = rx.toString();
        tx = tx.slice(1);
        tx = tx.slice(0, -1);

        worldLocation = "Root Earth";
        localLocation = tx;
      }
    });
  }

  return [worldLocation, localLocation];
}

function parseLocationDetailsRAWM(htmlContent) {
  //var url = "https://remnant2.wiki.fextralife.com/Big+Bang"
  //var htmlContent = UrlFetchApp.fetch(url).getContentText();

  const locationDetails = extractTextRAWM(htmlContent);

  var locations = getLocation(locationDetails);
  var upgradeable = false;
  var allTogether = [locationDetails, locations[0], locations[1], upgradeable];

  return allTogether;
}
