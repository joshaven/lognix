// After the page is loaded: populate toc & watch "find" & "mask" input boxes for the Return key
$(document).ready(function(){
  populate_toc();
  
  $('#find').keypress(function(event) { if (event.keyCode == '13') { findElements($('#find').val()); }; });

  $('#mask').keypress(function(event) {
    if (event.keyCode == '13') { maskElements($('#find').val()); };
  });
  
  $('#main').text('');
  $('#main').attr('onclick', 'hideMenu()');
  $('#toc').hoverIntent(function(){showMenu();}, function(){hideMenu();});
});

// makes a list of avilable log files
function populate_toc() {
  $('#toc').html('<ul></ul>');
  // Ask the server for all avilable log files
  $.get('/logs', function(data_str) {
    $.each(data_str.split(/\s/), function(i,v){ 
      if(v.match(/\.log$/)) { 
        $('<li>'+v+'</li>').click( function(){ 
          loadDiv('/log/'+v+'.json', '#main'); 
          $('#toc li').removeClass('selected')
          $(this).addClass('selected');
          return false
        }).appendTo($('#toc ul'))
      }; 
    });
  });
};

// convenience method to be called when a log file is clicked on
function loadDiv(path, el_name) {
  $(el_name).text('');
  $.getJSON(path, function(data){ $.each(data, function(i,val){ $(el_name).append('<p>'+val+'</p>') }); });
};

function hideMenu() {
  if($('#main').text() > ''){
    $('#toc').animate({right: '3em'}, 100)
    $('#main').animate({left: '3em'}, 100)
  };
}

function showMenu() {
  $('#toc').animate({right: '12em'}, 300)
  $('#main').animate({left: '12em'}, 300)
}

function findElements(matchData ) {
  $('#main p').each( function(i, el){
    if($(el).text().match(new RegExp(matchData, "i"))) {$(el).show();} else {$(el).hide();}
  });
};

function maskElements(matchData) {
  var mask = $('#mask').val(), 
      reg = new RegExp(mask, "g");  

  $('#main p').each(function(i,el) {
    // Remove old masks
    var el=$(el);
    if(el.attr('class').match('masked')) { el.text(el.data('original_text')).removeClass('masked'); };
    // Apply new mask
    var text=el.text();
    if(mask.length>0) { if(text.match(reg)) { el.data('original_text', text).addClass('masked').text(text.split(reg).join('')) }; };
  });
}