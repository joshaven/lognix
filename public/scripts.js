function list_files() {
  $.get('/logs', function(data) {
    $('#toc').html( 
      '<ul>'+ dataIn('li', dataIn('a',onlyLogFiles(data.split(/\s/))) ).join('')+'</ul>' 
      // '<ul>'+ onlyLogFiles(data.split(/\s/)).join('') +'</ul>' 
    );
    $('#main').text('Please select a log file to view.')
  });
};

function dataIn(elNameStr, array) {
  var myReturn=[];
  for (i in array ) { 
    if(array[i].length>0) {
      if(elNameStr=='a'){ 
        myReturn[myReturn.length] = '<a href="/log/view/'+array[i]+'">'+array[i]+'</'+elNameStr+'>' 
      } else {
        myReturn[myReturn.length] = '<'+elNameStr+'>'+array[i]+'</'+elNameStr+'>'
      };
    }; 
  };
  return myReturn
};

function onlyLogFiles(array) {
  var myReturn=[];
  for (i in array ) { 
    if(array[i].match(/\.log$/)) {
      myReturn[myReturn.length] = array[i]} 
    };
  return myReturn;
};

function isDefined(variable) {
  return (typeof(window[variable]) == "undefined")?  false: true;
};