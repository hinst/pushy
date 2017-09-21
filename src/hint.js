//-- Type names
new = $new;

TypeNames = new(null);
$objset(TypeNames, $tnull, "null");
$objset(TypeNames, $tint, "int");
$objset(TypeNames, $tfloat, "float");
$objset(TypeNames, $tbool, "bool");
$objset(TypeNames, $tstring, "string");
$objset(TypeNames, $tobject, "object");
$objset(TypeNames, $tarray, "array");
$objset(TypeNames, $tfunction, "function");
$objset(TypeNames, $tabstract, "abstract");
$exports.TypeNames = TypeNames;

$exports.typeIndexToString = function(index) {
	return
		if ($objfield(TypeNames, index)) 
			$objget(TypeNames, index)
		else
			"unknown";
};

//-- File content
$exports.readFileContent = $loader.loadprim("std@file_contents", 1);

//-- Xml
createXmlReceiver = function() {
	var o = new(null);
	receiver.xml = function(name, attribs) {};
	receiver.done = function() {};
	receiver.pcdata = function(text) {};
	receiver.cdata = function(text) {};
	receiver.comment = function(text) {};
};

createXmlNode = function() {
	var o = new(null);
	o.name = "";
	o.parent = null;
	o.attribs = null;
	o.children = $hnew(0);
	o.addChild = function(node) {
		node.parent = o;
		$hadd(o.children, node.name, node);
	};
	o.getChild = function(name) {
		return $hget(o.children, name, null);
	};
}

parse_xml = $loader.loadprim("std@parse_xml", 2);
$exports.parseXml = function(text) {
	var root = createXmlNode();
	var currentNode = root;
	var receiver = createXmlReceiver();
	receiver.xml = function(name, attribs) {
		var newNode = createXmlNode();
		newNode.name = name;
		newNode.attribs = attribs;
		currentNode.addChild(newNode);
		currentNode = newNode;
	};
	receiver.close = function() {
		currentNode = currentNode.parent;
	};
	try {
		parse_xml(text, receiver);
	} catch e {
		$print("Error while parsing XML", e, $excstack());
	}
};

// -- string
$exports.stringReplace = function(text, a, b) {
	var position = $sfind(text, 0, a);
	var result = position;
	if (position != null) {
		var left = $smake(position);
		left = $sblit(left, 0, text, 0, $ssize(left));
		var right = $make($ssize(text) - position - $ssize(a));
		right = $sblit(right, 0, text, position + $ssize(a), $ssize(right));
		result = left + b + right;
	}
	return result;
};