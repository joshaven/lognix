# A log viewer for Linux, Mac, etc.
Written nearly entirely in JavaScript... except the little bit of HTML & CSS that is in the public folder.

Contact the Developer: [Joshaven Potter](mailto:yourtech@gmail.com)

View a Screenshot: [view lognix in action](http://img.skitch.com/20100727-mqgmj7x2puu8dda8n1spwcn9gj.jpg)


## Installation

If you are running Debian, Ubuntu or compatible then you should be able to simply download the install 
script and execute.  The Debian dependencies are: 'apt' if you don't have 'git', init scripts being located 
in '/etc/init.d' as well using 'update-rc.d' to install and remove System-V style init script links.  If you 
modify this script to work with other systems then please send the the changes.

    curl -O http://github.com/joshaven/lognix/raw/master/debian-install.sh
    sudo sh debian-install.sh

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