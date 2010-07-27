# A log viewer for Linux, Mac, etc.
Written nearly entirely in JavaScript... except the little bit of HTML & CSS that is in the public folder.

Contact the Developer: [Joshaven Potter](mailto:yourtech@gmail.com)

View a Screenshot: [view lognix in action](http://skitch.com/joshaven/dqbnh/log-viewer)

# State of this project
Functional, but not yet fully featured.

## Installation
    
    # You must have git, if you don't have git then google 'install git on {insert your machine discription here}'
    
    # Build node (JavaScript interpreter)
    git clone http://github.com/ry/node.git && cd node
    ./configure && make
    sudo make install
    
    # Install NPM (node package manager)
    git clone http://github.com/isaacs/npm.git
    sudo make install
    
    # Install express (Sinatra inspired node web development framework)
    sudo npm install connect
    sudo npm install express
    
    # Download lognix
    git clong git://github.com/joshaven/lognix.git

    # Run lognix
    cd lognix
    node lognix.js
    
    # Try lognix
    # brows to your ip followed by port 3000   http://127.0.0.1:3000
    # enjoy
