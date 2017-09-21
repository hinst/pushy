appSubDir = "pushy";
hint = $loader.loadmodule("pushy/hint", $loader);
printTest = function(s) {
    $print(s + "<br>");
};
printTest(hint.stringReplace("I love cats :3", "cats", "lions"));
printTest(hint.stringReplace("I love cats :3", "I", "You"));
printTest(hint.stringReplace("I love cats :3", ":3", "=.="));
printTest(hint.stringReplace("I love cats :3", "xtra", "ytra"));
