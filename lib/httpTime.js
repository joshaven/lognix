// expects an integer with the number of seconds from now.

Date.prototype.getUTCDayStr = function(){ return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][this.getUTCDay()-1] };

Date.prototype.getUTCMonthStr = function() { return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][this.getUTCMonth()]}

Date.prototype.httpDate = function() { return this.getUTCDayStr()+', '+this.getUTCDate().pad(2)+' '+this.getUTCMonthStr()+' '+this.getUTCFullYear()+' '+this.getUTCHours().pad(2)+':'+this.getUTCMinutes().pad(2)+':'+this.getUTCSeconds().pad(2)+' GMT'; };

Number.prototype.pad = function(len) { return Array(len + 1 - (this+'').length).join('0') + this; };

exports.httpTimeOffsetBy = function(offsetSeconds){
 return (new Date((new Date).getTime()+offsetSeconds*1000)).httpDate()
}
