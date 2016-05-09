var data = require('./data'),
    fs = require('fs'),
    features = '',
    featureModule = 'module.exports = {\n',
    allKeys = [],
    key;

for (var item in data.data) {
  if (data.data.hasOwnProperty(item)) {
    // remove special characters and then duplicate spaces it creates
    
    key = data.data[item].title.replace(/[^a-zA-Z0-9 ]/g, " ").trim().replace(/ +(?= )/g,'')
    if (allKeys.indexOf(key.toLowerCase()) == -1) {
        allKeys.push(key.toLowerCase());
        features += key + '\n';
        featureModule += '"' + key.toLowerCase() + '" : "' + item + '",\n';
    }
    // add in the key itself without special chars as it often strips the feature to a simplified version
    key = item.replace(/[^a-zA-Z0-9 ]/g, " ").trim().replace(/ +(?= )/g,'');
    if (allKeys.indexOf(key.toLowerCase()) == -1) {
        allKeys.push(key.toLowerCase());
        features += key + '\n';
        featureModule += '"' + key.toLowerCase() + '" : "' + item + '",\n';
    }
  }
}

featureModule = featureModule.substring(0, featureModule.length-2);
featureModule += "\n};"

fs.writeFile("../../speechAssets/customSlotTypes/LIST_OF_FEATURES", features, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

fs.writeFile("../features.js", featureModule, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});