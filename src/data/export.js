var data = require('./data'),
    fs = require('fs'),
    features = '',
    featureModule = 'module.exports = {\n';

for (var item in data.data) {
  if (data.data.hasOwnProperty(item)) {
    features += data.data[item].title + '\n';
    featureModule += '"' + data.data[item].title.toLowerCase() + '" : "' + item + '",\n';
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