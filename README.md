# A log viewer for Linux, Mac, etc.
Developer: [Joshaven Potter](mailto:yourtech@gmail.com)

# State of this project
Functional, but unfinished.

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
    
## TODO
* Improve log file searching (limit the log entries to only matching entries)
* Make logs maskable (eliminate garbage based upon a user entered maks)