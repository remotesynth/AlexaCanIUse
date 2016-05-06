module.exports = function (data, feature) { 

var currentVersion,
    desk_supported = [],
    desk_unsupported = [],
    desk_partial = [],
    mob_supported = [],
    mob_unsupported = [],
    mob_partial = [],
    response;

var desktop = {
    "ie":"Internet Explorer",
    "edge":"Edge",
    "firefox":"Firefox",
    "chrome":"Chrome",
    "safari":"Safari",
    "opera":"Opera"
}

var mobile = {
    "ios_saf":"IOS Safari",
    "op_mini":"Opera Mini",
    "android":"Android Browser",
    "and_chr":"Android Chrome"
}

// figure out which key is the current version. not sure if this ever changes
var eras = Object.keys(data.eras),
    current = eras.indexOf('e0');

// now get the current version for each of the above browsers
for (var desk_browser in desktop) {
    currentVersion = data.agents[desk_browser].versions[current];
    
    if (feature.stats[desk_browser][currentVersion] == 'y') {
        desk_supported.push(desktop[desk_browser]);
    }
    else if (feature.stats[desk_browser][currentVersion] == 'n') {
        desk_unsupported.push(desktop[desk_browser]);
    }
    else {
        desk_partial.push(desktop[desk_browser]);
    }
}

for (var mob_browser in mobile) {
    currentVersion = data.agents[mob_browser].versions[current];
    
    if (feature.stats[mob_browser][currentVersion] == 'y') {
        mob_supported.push(mobile[mob_browser]);
    }
    else if (feature.stats[mob_browser][currentVersion] == 'n') {
        mob_unsupported.push(mobile[mob_browser]);
    }
    else {
        mob_partial.push(mobile[mob_browser]);
    }
}

// determine our response
if (desk_unsupported.length == 0 && desk_partial.length == 0) {
    response = 'The feature is fully supported on desktop browsers';
}
else if (desk_unsupported.length == 0) {
    response = 'The feature is supported on the desktop but only partially on ' + desk_partial.join(',');
}
else if (desk_supported.length == 0 && desk_partial == 0) {
    response = 'The feature is unsupported on desktop browsers.'
}
else if (desk_supported.length == 0) {
    response = 'On desktop, the feature is partially supported on ' + desk_partial.join(',') + '. It is unsupported on ' + desk_unsupported.join(',');
}
else if (desk_partial.length == 0) {
    response = 'On desktop, the feature is supported on ' + desk_supported.join(',') + '. It is unsupported on ' + desk_unsupported.join(',');
}
else {
    response = 'On desktop, the feature is supported on ' + desk_supported.join(',') + '. The feature is partially supported on ' + desk_partial.join(',') + '. It is unsupported on ' + desk_unsupported.join(',');
}

response += '. ';

if (mob_unsupported.length == 0 && mob_partial.length == 0) {
    response += ' The feature is fully supported on mobile browsers.';
}
else if (mob_unsupported.length == 0) {
    response += ' The feature is supported on the mobile but only partially on ' + mob_partial.join(',');
}
else if (mob_supported.length == 0 && mob_partial == 0) {
    response += ' The feature is unsupported on mobile browsers.'
}
else if (mob_supported.length == 0) {
    response += ' On mobile, the feature is partially supported on ' + mob_partial.join(',') + '. It is unsupported on ' + mob_unsupported.join(',');
}
else if (mob_partial.length == 0) {
    response += ' On mobile, the feature is supported on ' + mob_supported.join(',') + '. It is unsupported on ' + mob_unsupported.join(',');
}
else {
    response += ' On mobile, the feature is supported on ' + mob_supported.join(',') + '. The feature is partially supported on ' + mob_partial.join(',') + '. It is unsupported on ' + mob_unsupported.join(',');
}

return response;

}