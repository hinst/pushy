get_params = $loader.loadprim("mod_neko@get_params", 0);
cgi_set_main = $loader.loadprim("mod_neko@cgi_set_main", 1);
$exports.params = get_params();
$exports.cgiSetMain = cgi_set_main;
