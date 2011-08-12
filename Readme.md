# FireStylus

FireStylus is a Firebug extension that makes Firebug display 
the Stylus filename and line numbers of the Stylus-generated CSS styles
rather than those of the generated CSS.

![Screenshot](https://raw.github.com/parallel/firestylus/master/src/chrome/skin/screenshot.png)

## Usage

After you install [Firebug](https://addons.mozilla.org/firefox/downloads/latest/1843/addon-1843-latest.xpi?src=addondetail)
and the [FireStylus extension](https://addons.mozilla.org/en-US/firefox/addon/firestylus-for-firebug/),
you need to enable the Stylus's `firebug` option when generating your CSS.

Command line

	$ stylus -f <path>
	$ stylus --firebug <path>
	
Javascript API

	var stylus = require('stylus');

	stylus(str)
	  .set('firebug', true)
	  .render(function(err, css){
		// logic
	  });

Connect / Express

    var stylus = require('stylus');

    var server = connect.createServer(
        stylus.middleware({
            src: __dirname
          , dest: __dirname + '/public'
          , firebug: true
        })
      , connect.static(__dirname + '/public')
    );


## Compatibility

FireStylus should work with all versions of Firefox after and including 3.0,
and all Firebug versions after and including 1.4

- Firefox 3+
- Firebug 1.4+


## Limitations

FireStylus and FireSass are incompatible. You cannot enable them
simultaneously.

FireStylus (like FireSass) only works in the html pane of firebug, the others,
such as the css pane won't work.


## Credits

Thanks to [Nathan Weizenbaum](//github.com/nex3) for the [FireSass extension](//github.com/nex3/firesass)

