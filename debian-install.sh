#! /bin/bash
# lognix install for Debian or Ubuntu machines
#  Its only debin because it requires "apt-get", "update-rc.d", & start/stop scripts in "/etc/init.d/"

########################################
# Ensure script is being run as root
if [ "$(whoami)" != 'root' ]; then 
  echo 'This script requires root access please rerun using sudo.'
  exit 1
fi  

########################################
# Ensure ~/src folder exists
mkdir -p ~/src && cd ~/src
SRC=$(pwd)

########################################
# Ensure git is installed  
if [ "$(which git)" == '' ]; then 
  if [ "$(which apt-get)" == '' ]; then 
    echo 'Please install git version control software before proceeding.';
  else
    apt-get update && apt-get install git-core
  fi
  
  if [ $? -eq 0 ]; then
    echo 'git installed'
  else
    exit 1
  fi
fi

########################################
# Ensure node.js is installed
if [ "$(which node)" ];then 
  echo "node installation confirmed..."
else
  echo "Installing node..."
  cd $SRC
  git clone http://github.com/ry/node.git node; cd node; ./configure && make; make install
  cd $src
fi

########################################
# Install lognix
git clone http://github.com/joshaven/lognix.git /usr/local/lib/lognix

########################################
# Set lognix to auto-start
if [ -f "/etc/init.d/lognix" ]; then
  echo "Init script already exists.  If you need a fresh copy try replacing /etc/init.d/lognix with /usr/local/lib/lognix/lognix.init"
else
  cp /usr/local/lib/lognix/lognix.init /etc/init.d/lognix
  chmod 655 /etc/init.d/lognix
  update-rc.d lognix defaults
fi
