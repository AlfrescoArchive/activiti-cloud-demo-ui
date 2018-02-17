window.require = function(name, moduleName) {
    _require = require,
    moduleName || (moduleName = name),
    console.log("Fetching " + moduleName + "... just one second");
    
    //return fetch("//wzrd.in/bundle/" + moduleName + "@latest/")
    return fetch("js/lib/" + moduleName + ".js")
	    .then(response => response.text())
	    .then(body => {
	        require = null;
	        eval(body);
	        window[name] = require(moduleName);
	        require = _require;
	        console.log('Finished getting ' + moduleName);
	        return Promise.resolve(window[name]);
	    });
};
