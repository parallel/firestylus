# FireStylus

FireStylus is a Firebug extension that makes Firebug display 
the Stylus filename and line numbers of the Stylus-generated CSS styles
rather than those of the generated CSS.

![Screenshot](//raw.github.com/parallel/firestylus/master/src/chrome/skin/screenshot.png)

## Usage

First, you need to install the [FireStylus extension for firebug](//raw.github.com/parallel/firestylus/master/releases/firestylus-0.0.1.xpi).

Then you need to install a custom version of stylus :

	$ sudo npm uninstall stylus -g
	$ git clone git://github.com/parallel/stylus
	$ cd stylus
	$ sudo npm link

Finally, you need to enable the Stylus's `firebug` option 
when generating your CSS.

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

FireStylus currently requires a fork of Stylus.

FireStylus should work with all versions of Firefox after and including 3.0,
and all Firebug versions after and including 1.4

- Firefox 3+ (also works with version 5)
- Firebug 1.4+
- [Stylus fork](//github.com/parallel/stylus)


## Limitations

FireStylus and FireSass are incompatible. You cannot enable them
simultaneously.

FireStylus (like FireSass) only works in the html pane of firebug, the others,
such as the css pane won't work due to firebug limitations.


## Credits

Thanks to [Nathan Weizenbaum](//github.com/nex3) for the [FireSass extension](//github.com/nex3/firesass)

