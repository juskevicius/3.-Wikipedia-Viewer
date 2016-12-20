//1. Autocomplete. Send a request to wikipedia and return 5 titles (as options)

$(function() {
  $("#tags").autocomplete({ 
    source: function (request, response) {
      var url = "https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&srsearch=" + request.term + "&srlimit=5&callback=?";
      var options = [];
      $.getJSON(url, function(data) {
      for (var i = 0; i < data.query.search.length; i++) {
        options[i] = data.query.search[i].title;
        }
        response (options);
      });
    }});
});

//2. a) if user presses the enter key then execute the function loadResults

$("#tags").keypress(function (e) {
  if (e.which == 13) {
    $("#tags").autocomplete("close");
    loadResults($(this).val());
  }
});

//2. b) if user selects one of the options then execute the function loadResults

$("#tags").autocomplete({select: function(event, ui) {
    loadResults(ui.item.value);
  }
});

//3. loadResults. At first change the appearance. Then send a request to wikipedia and return 10 results - titles and snippets. Pass the results to html

function loadResults(keyword) {
  changeStyle();
  var url = "https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&srsearch=" + keyword + "&srlimit=10&callback=?";
  var htmlCode = "";
  $.getJSON(url, function(data) {
    for (var i = 0; i < data.query.search.length; i++) {
        htmlCode += "<div class='result'><h1><a href='https://en.wikipedia.org/wiki/" + data.query.search[i].title + "' target='_blank'>" + data.query.search[i].title + "</a></h1></br><p>" + data.query.search[i].snippet + "</p></div></br>";
        }
    document.getElementById("results").innerHTML = htmlCode;
      });
}

//A final touch. Change the appearance

function changeStyle() {
  document.getElementById("wiki").style.display = "none";
  document.getElementById("tags").style.position = "static";
  document.getElementById("tags").style.margin = "3% 15%";
}

$("#tags").autocomplete({open: function(event, ui) {
  document.getElementById("tags").style.marginBottom = "150px";
  }
});

$("#tags").autocomplete({close: function(event, ui) {
  document.getElementById("tags").style.marginBottom = "30px";
  }
});

//voila. A masterpiece! :)