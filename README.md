# A log viewer for Linux, Mac, etc.
Written nearly entirely in JavaScript... except the little bit of HTML & CSS that is in the public folder.

Contact the Developer: [Joshaven Potter](mailto:yourtech@gmail.com)

View a Screenshot: [view lognix in action](http://img.skitch.com/20100727-mqgmj7x2puu8dda8n1spwcn9gj.jpg)


## Installation

If you are running Debian, Ubuntu or compatible then you should be able to simply check this project out and run: 

    git clone git://github.com/joshaven/lognix.git
    cd lognix
    sudo ./debian-install

Otherwise here are the instructions:
    # You must have git, if you don't have git then google 'install git on {insert your machine discription here}'
    
    # Build node (JavaScript interpreter)
    git clone http://github.com/ry/node.git
    cd node
    ./configure && make
    sudo make install
        
    # Download lognix
    git clone git://github.com/joshaven/lognix.git

    # Run lognix
    cd lognix
    node lognix.js
    
    # Try lognix
    # brows to your ip followed by port 3000   http://127.0.0.1:3000
    # enjoy

    # Optionally you may want to copy lognix to some place like: /usr/local/lib/lognix 
    # and set it to run as a daemon on system startup.  
    
    # Soon there will be the ability to configure this app using a config file, for now you have to edit the lognix.js 