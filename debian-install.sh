#! /bin/bash
# lognix install for Debian or Ubuntu machines
#  Its only debin because it requires "apt-get", "update-rc.d", & start/stop scripts in "/etc/init.d/"

# Ensure script is being run as root
if [ "$(whoami)" != 'root' ]; then exit 1;fi  

mkdir -p ~/src && cd ~/src
SRC=$(pwd)
  
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

if [ "$(which node)" ];then 
  echo "node installation confirmed..."
else
  
  echo "Installing node..."
  cd $SRC
  git clone http://github.com/ry/node.git node; cd node; ./configure && make; make install
  cd $src
fi

cd $SRC
git clone http://github.com/joshaven/lognix.git /usr/lib/lognix

NODE=$(which node)

sudo tee /etc/init.d/lognix <<ENDOFCONFIG
#! /bin/sh

### BEGIN INIT INFO
# Provides: nginx
# Required-Start: \$all
# Required-Stop: \$all
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: starts the nginx web server
# Description: starts nginx using start-stop-daemon
### END INIT INFO

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=$NODE
DAEMON_OPTS="/usr/lib/lognix/lognix.js"
NAME="lognix"
DESC="lognix - log viewer"

test -x \$DAEMON || exit 0

# Include nginx defaults if available

if [ -f /etc/default/lognix ] ; then
    . /etc/default/lognix
fi

set -e

case "\$1" in
  start)
    echo -n "Starting \$DESC: "
    start-stop-daemon --start --quiet --pidfile /var/run/\$NAME.pid \
        --exec \$DAEMON -- \$DAEMON_OPTS || true & disown
    echo "\$NAME."
    ;;
  stop)
    echo -n "Stopping \$DESC: "
    start-stop-daemon --stop --quiet --pidfile /var/run/\$NAME.pid \
      --exec \$DAEMON || true
    orphanedPid=\$(ps -A |grep node|awk '{print \$1}')
    if [ -n "\$orphanedPid" ]; then kill -9 "\$orphanedPid";fi
    echo "\$NAME."
    ;;
  restart|force-reload)
    # stop
    echo -n "Stopping \$DESC: "
    start-stop-daemon --stop --quiet --pidfile /var/run/\$NAME.pid \
      --exec \$DAEMON || true
    orphanedPid=\$(ps -A |grep node|awk '{print \$1}')
    if [ -n "\$orphanedPid" ]; then kill -9 "\$orphanedPid";fi
    #Start
    echo "\$NAME."
    echo -n "Starting \$DESC: "
    start-stop-daemon --start --quiet --pidfile /var/run/\$NAME.pid \
        --exec \$DAEMON -- \$DAEMON_OPTS || true & disown
    echo "\$NAME."
    ;;
  *)
    N=/etc/init.d/\$NAME
    echo "Usage: \$N {start|stop|restart|reload|force-reload}" >&2
    exit 1
    ;;
esac

exit 0
ENDOFCONFIG
chmod 655 /etc/init.d/lognix
update-rc.d lognix defaults
