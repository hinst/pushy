appSubDir = "pushy";
webs = $loader.loadmodule(appSubDir + "/webs", $loader);
hint = $loader.loadmodule(appSubDir + "/hint", $loader);
config = $loader.loadmodule(appSubDir + "/config", $loader);
substitutePage = function(text) {
    text = hint.stringReplace(text, "%pageTitle%", config.pageTitle);
};
response = hint.readFileContent(appSubDir + "/layout.html");
response = substitutePage(response);

$print(response);