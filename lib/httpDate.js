// expects an integer with the number of seconds from now.

exports.withOffset=function(seconds) {
  return (new Date((new Date).getTime()+seconds*1000)).toUTCString();
};