function findEntries(htmlContent) {
  
  const galleryRegex = /<a[^>]*class\s*=\s*(['"])row gallery\1[^>]*>[\s\S]*?<\/a>/i;
  const galleryMatch = htmlContent.match(galleryRegex);

  // Get the index where the gallery entry starts to ignore anything before it
  const galleryIndex = galleryMatch ? htmlContent.indexOf(galleryMatch[0]) : 0;
  const htmlContentAfterGallery = htmlContent.slice(galleryIndex);

  // Regular expression to find <a> tags with class="wiki_link wiki_tooltip" inside the modified HTML document
  const aTagRegex = /<a[^>]*class\s*=\s*(['"])wiki_link wiki_tooltip\1[^>]*>[\s\S]*?<\/a>/gi;

  // Keep track of found entries to check for repeats
  const foundEntries = new Set();
  var entriesList = [];
  var entriesHtml = [];

  // Iterate through the <a> tag matches
  let match;
  while ((match = aTagRegex.exec(htmlContentAfterGallery)) !== null) {
    const aTagContent = match[0];
    const titleAttrRegex = /title\s*=\s*(['"])(.*?)\1/i;
    const titleAttrMatch = aTagContent.match(titleAttrRegex);
    if (titleAttrMatch) {
      const titleAttrValue = titleAttrMatch[2];
      const index = titleAttrValue.indexOf("Remnant 2");
      if (index !== -1) {
        const entryName = titleAttrValue.slice(index + "Remnant 2".length).trim();
        //console.log(entryName);
        const hrefAttrRegex = /href\s*=\s*(['"])(.*?)\1/i;
        const hrefAttrMatch = aTagContent.match(hrefAttrRegex);
        const entryLink = hrefAttrMatch ? hrefAttrMatch[2] : null;

        // Check if the entry is a repeat
        const entry = entryName + entryLink;
        //console.log(entry);
        //console.log(foundEntries)
        if (foundEntries.has(entry)) {
          if(entry != "Healing Shot/Healing+Shot"){ console.log("break"); break}else{continue}; // Exit the loop once a repeat entry is found
        } else {
          foundEntries.add(entry);
          entriesList.push(entryName);
          entriesHtml.push(entryLink);
        }

        // Output the results

        
        //console.log("Words after 'Remnant 2' in the title attribute:", entryName);
        //console.log("href attribute in the <a> tag:", entryLink);
      }
    }
  }
  var combined = new Array();
  //console.log(entriesList);
  //console.log(entriesList.length)
  for(var i = 0; i < entriesList.length; i++){
    combined.push(entriesList[i], entriesHtml[i]);
    //combined[i][1] = entriesHtml[i];
  }
  
  return combined;


}
