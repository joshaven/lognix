$(document).ready(function(){
  list_files();
  
  $('#find').keypress(function(event) {
    if (event.keyCode == '13') {
      var text = $('#find').val();
      alert('Handler for .keypress() called on input#find with: ' +text);
    };
  });

  $('#mask').keypress(function(event) {
    if (event.keyCode == '13') {
      var text = $('#mask').val();
      alert('Handler for .keypress() called on input#mask with: ' +text);
    };
  });
});

function list_files() {
  $.get('/logs', function(data) {
    $('#toc').html('<ul>'+ dataIn('li', dataIn('a',onlyLogFiles(data.split(/\s/))) ).join('')+'</ul>');
    $('#main').text('<-- Please select a log file to view.')
  });
};

function dataIn(elNameStr, array) {
  var myReturn=[];
  for (i in array ) { 
    if(array[i].length>0) {
      if(elNameStr=='a'){ 
        myReturn[myReturn.length] = '<a href="#", onclick="$.get(\'/log/'+array[i]+'\', function(data) {$(\'#main\').text(data)})">'+array[i]+'</'+elNameStr+'>' 
      } else {
        myReturn[myReturn.length] = '<'+elNameStr+'>'+array[i]+'</'+elNameStr+'>'
      };
    }; 
  };
  return myReturn
};

function onlyLogFiles(array) {
  var myReturn=[];
  for (i in array ) { if(array[i].match(/\.log$/)) { myReturn[myReturn.length] = array[i] } };
  return myReturn;
};

