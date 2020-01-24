
'use strict';

$(document).ready(function()
{ 
  $('#menu').click(function(){ 
    $('#ksztalt_gr').slideUp('fast'); 
    $('#zasieg').slideUp('fast');
    $('#wiek_gr ').slideUp('fast'); 
    $('#wyszukaj').slideUp('fast'); 
    $('#przyciski').slideToggle('slow'); 
		
  }); 
});	

$('#obszar').click(function()
{ 
  $('#wiek_gr ').slideUp('fast'); 
  $('#wyszukaj').slideUp('fast'); 
  $('#ksztalt_gr').slideUp('fast');
  $('#zasieg').slideToggle('slow'); 
				
}); 

$('#ksztalt').click(function()
{ 	
  $('#wiek_gr ').slideUp('fast'); 
  $('#wyszukaj').slideUp('fast'); 	
  $('#zasieg').slideUp('fast');
  $('#ksztalt_gr').slideToggle('slow');
}); 

$('#wyszukiwarka').click(function()
{ 	
  $('#wiek_gr ').slideUp('fast'); 
  $('#wyszukaj').slideToggle('slow'); 	
  $('#zasieg').slideUp('fast');
  $('#ksztalt_gr').slideUp('fast');
}); 

$('#wiek').click(function()
{ 	
  $('#wiek_gr ').slideToggle('slow'); 
  $('#wyszukaj').slideUp('fast'); 	
  $('#zasieg').slideUp('fast');
  $('#ksztalt_gr').slideUp('fast');
}); 

//mapa
var map = L.map('map').setView([52.40, 16.90], 12);
var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,
  id: 'mapbox.light',
  accessToken:'pk.eyJ1IjoiZ29zaWFrMTAiLCJhIjoiY2puY3ZoN2h0NXNuZTN4bjEzODhveTA4MCJ9.p6Vx-joA-4K-VZTSPOX93w'});
mapbox.addTo(map);


//ikona do grodziska

let ikona = L.icon({
  iconUrl: 'css/castle1.png',
  iconSize: [20, 20]
});

//grodziska
var grody; 

let gs_url= 'http://localhost:8080/geoserver/wms';
function grodzisko() {
  var defaultParam = { 
    service: 'WFS', 
    version: '1.3.0', 
    request: 'GetFeature', 
    typeName: 'grody:grodziska_84', 
    maxFeatures: 1000, 
    outputFormat: 'json', 
    format_options: 'callback:getJson', 
    srsName: 'epsg:4326',
  }; 
  var parameters = L.Util.extend(defaultParam); 
  var URL = gs_url + L.Util.getParamString(parameters);
  $.ajax ({ 
    url : URL,
    type: 'GET', 
    dataType : 'json', 
    jsonpCallback : 'getJson', 
    success : function (data) 
    { 


      grody = L.geoJson(data, { 
        pointToLayer: function (feature, latlng) { 
          return L.marker(latlng,{icon:ikona});
        }, 
        onEachFeature: function (feature, layer){
          var popup = new L.Popup();
          popup.setContent(feature.properties.nazwa + '</li><li><b>Opis:</b> ' + feature.properties.opis +  '</li><li><b>Wiek:</b> ' + feature.properties.informacje + '</li><li><b>Kształt:</b> ' + feature.properties.funkcja_ii +  '</li><li><b>Źródło:</b> ' + feature.properties.zrodlo + '</li></ul>');
          layer.bindPopup(popup);
        }
      });
		 
      grody.addTo(map); 



		 
      map.fitBounds(grody.getBounds());
    }
  }); 
}
grodzisko();



//filtorwanie po ksztalcie grodziska
var funkcja_ii;

function przybliz(){
  if(funkcja_ii == 'pierscieniowate'){
    map.removeLayer(grody);
    $.ajax ({
      url :'http://localhost:8080/geoserver/grody/wfs?service=WFS&version=1.3.0&typename=grody:pierscieniowate&request=GetFeature&typeNames=featuretype&outputFormat=application/json',
      type : 'POST',
      dataType : 'json', 
      jsonpCallback : 'getJson',
      success : function (data)
      {
        grody = L.geoJson(data, {
          pointToLayer: function (feature, latlng) { 
            return L.marker(latlng,{icon:ikona});
          }, 
          onEachFeature: function(feature, layer){
            var popup = new L.Popup();
            popup.setContent(feature.properties.nazwa + '</li><li><b>Opis:</b> ' + feature.properties.opis + '</li><li><b>Wiek:</b> ' + feature.properties.informacje + '</li><li><b>Kształt:</b> ' + feature.properties.funkcja_ii + '</li><li><b>Źródło:</b> ' + feature.properties.zrodlo + '</li></ul>');
            layer.bindPopup(popup);
          }
        }).addTo(map);
        map.fitBounds(grody);
      }
    });
  }
  else if(funkcja_ii == 'stozkowate'){
    map.removeLayer(grody);
    $.ajax ({
      url : 'http://localhost:8080/geoserver/grody/wfs?service=WFS&version=1.3.0&typename=grody:stozkowate&request=GetFeature&typeNames=featuretype&outputFormat=application/json',
      type : 'POST',
      dataType : 'json',
      jsonpCallback : 'getJson',
      success : function (data)
      {
        grody = L.geoJson(data, {
          pointToLayer: function (feature, latlng) { 
            return L.marker(latlng,{icon:ikona});
          }, 
          onEachFeature: function(feature, layer){
            var popup = new L.Popup();
            popup.setContent(feature.properties.nazwa + '</li><li><b>Opis:</b> ' + feature.properties.opis +  '</li><li><b>Wiek:</b> ' + feature.properties.informacje + '</li><li><b>Kształt:</b> ' + feature.properties.funkcja_ii +  '</li><li><b>Źródło:</b> ' + feature.properties.zrodlo + '</li></ul>');
            layer.bindPopup(popup);
          }
        }).addTo(map);
        map.fitBounds(grody);
      }
    });
  }
  else if(funkcja_ii == 'nieznane'){
    map.removeLayer(grody);
    $.ajax ({
      url :'http://localhost:8080/geoserver/grody/wfs?service=WFS&version=1.3.0&typename=grody:nieznane&request=GetFeature&typeNames=featuretype&outputFormat=application/json',
      type : 'GET',
      dataType : 'json',
      jsonpCallback : 'getJson',
      success : function (data)
      {
        grody = L.geoJson(data, {
          pointToLayer: function (feature, latlng) { 
            return L.marker(latlng,{icon:ikona});
          }, 
          onEachFeature: function(feature, layer){
            var popup = new L.Popup();
            popup.setContent(feature.properties.nazwa + '</li><li><b>Opis:</b> ' + feature.properties.opis + '</li><li><b>Wiek:</b> ' + feature.properties.informacje + '</li><li><b>Kształt:</b> ' + feature.properties.funkcja_ii + '</li><li><b>Źródło:</b> ' + feature.properties.zrodlo + '</li></ul>');
            layer.bindPopup(popup);
          }
        }).addTo(map);
        map.fitBounds(grody);
      }
    });
  }
  else{
    console.log('brak danych');
  }
}
function wymaz(){
  location.reload();
}



//wszystkie powiaty
var powiat;
function powiaty() {
  $.ajax ({
    url :'http://localhost:8080/geoserver/grody/wfs?service=WFS&version=1.3.0&typename=grody:powiaty_84&request=GetFeature&typeNames=featuretype&outputFormat=application/json',
    type : 'GET',
    dataType : 'json',
    jsonpCallback : 'getJson',
    success : function (data)
    {
      powiat = L.geoJson(data, {
        style: function(feature) {
          return {color: 'black', fillColor: 'transparent', weight: 2};
        },
        onEachFeature: function(feature, layer){
        }
      }).addTo(map);
      map.fitBounds(powiat);
    }
  });
}

powiaty();

// select * from grodziska.powiatuy where nazwa LIKE ''


//filtrowanie po powiatach

var powiaty_84;

function zasieg(){
  if(map.hasLayer(powiaty_84))map.removeLayer(powiaty_84);
  nazwa=$('#powiat').val();  

  var viewparams = ['nazwa:' + nazwa];
  var defaultParam = {
    service: 'WFS',
    version: '1.3.0',
    request: 'GetFeature',
    typeName: ' grody:powiaty',
    maxFeatures: 1000,
    outputFormat: 'json',
    format_options: 'callback:getJson',
    srsName: 'epsg:4326',
    viewparams:  viewparams.join(';')
  };
  var parameters = L.Util.extend(defaultParam);
  var URL = gs_url + L.Util.getParamString(parameters);

  $.ajax({
    url : URL,
    type: 'GET',
    dataType : 'json',
    jsonpCallback : 'getJson',
    success : function (data) {
      powiaty_84 = L.geoJson(data, {
        style: function (feature) {
          return {
            color: 'black',
            fillColor: 'red',
            opacity: 0.5,
            weight: 1
          };},
        onEachFeature: function (feature, layer) {
          map.fitBounds(layer.getBounds()); 
        }

      });
      powiaty_84.addTo(map);
    }});
}




var setButton2 = document.getElementById('set2'); 
setButton2.addEventListener('click', zasieg);


function czysc2(d)
{
  if(map.hasLayer(powiaty_84))map.removeLayer(powiaty_84);
  map.fitBounds(powiat.getBounds());
	
}

var clearButton2 = document.getElementById('clear2'); 
clearButton2.addEventListener('click', czysc2);





//wiek

// funkcja resetująca  filtrowanie po feature 
function setFeaturesVisible() {
  for(let key in grody._layers) {
    const feature = grody._layers[key]._layers;
    for(let key2 in feature) {
      feature[key2].setOpacity(1); //nieprzezroczyste
    }
  }
}

var clearButton3 = document.getElementById('clear3'); 
clearButton3.addEventListener('click', setFeaturesVisible);


function getCheckedCheckboxes() {
  const checkedBoxes = [];
  $('input:checkbox[type=checkbox]:checked').each(function(){ //wybieramy zaznaczone checkboxy
    checkedBoxes.push($(this).val());
  });
  return checkedBoxes;
}

function filterByAges(checkedBoxes) {
  for(let key in grody._layers) {
    const feature = grody._layers[key];
    console.log(feature);
    const wieki = feature.feature.properties.informacje;
    const wiekiArray = wieki.split(' '); // string wieki na tablice
    var hasCommonAges = wiekiArray.filter(function(e) { // zwraca liste wspólnych wieków
      return checkedBoxes.indexOf(e) > -1;
    });
    if(hasCommonAges.length === 0) {
      for(let key2 in feature._layers) {
        feature._layers[key2].setOpacity(0); // przezroczyste
      }
    }
  }
}

var setButton3 = document.getElementById('search'); 
setButton3.addEventListener('click', () => {
  setFeaturesVisible();
  const checkedBoxes = getCheckedCheckboxes();
  if(checkedBoxes.length) {
    filterByAges(checkedBoxes);
  }
});

/*
//autouzupelnianie do wyszukiwarki
$( function() {
  $( '#wstaw' ).autocomplete({
    source: 'php/index.php'
  });
});	
*/


//wyszukiwarka
function wyszukiwarka() {
  var viewparams = ['nazwa:' + document.getElementById('wstaw').value];
  var defaultParam = {
    service: 'WFS',
    version: '1.3.0',
    request: 'GetFeature',
    typeName: ' grody:wyszukiwarka',
    maxFeatures: 1000,
    outputFormat: 'json',
    format_options: 'callback:getJson',
    srsName: 'epsg:4326',
    viewparams:  viewparams.join(';')
  };
  var parameters = L.Util.extend(defaultParam);
  var URL = gs_url + L.Util.getParamString(parameters);

  $.ajax({
    url : URL,
    type: 'POST',
    dataType : 'json',
    success : function (response) {
      wyszukaj = L.geoJson(response, { 
        pointToLayer: function (feature, latlng) { 
          return L.marker(latlng,{icon:ikona});
        }, 
        onEachFeature: function (feature, layer) {
          var popup = new L.Popup();
          popup.setContent(feature.properties.nazwa + '</li><li><b>Opis:</b> ' + feature.properties.opis +  '</li><li><b>Wiek:</b> ' + feature.properties.informacje + '</li><li><b>Źródło:</b> ' + feature.properties.zrodlo + '</li></ul>');
          layer.bindPopup(popup);

			
        }

      });
      wyszukaj.addTo(map);
      map.fitBounds(wyszukaj.getBounds()); 
    }});
}





var setButton3 = document.getElementById('search1'); 
setButton3.addEventListener('click', wyszukiwarka);


function czysc3(d)
{
  if(map.hasLayer(wyszukaj))map.removeLayer(wyszukaj);
  map.fitBounds(grody.getBounds());
	
}

var clearButton3 = document.getElementById('clear4'); 
clearButton3.addEventListener('click', czysc3);





//dodanie kontrolki skali mapy
L.control.scale().addTo(map);
//dodanie kontrolki pozycji myszki
L.control.coordinates({position:'bottomright'}).addTo(map);
function updatevariable(data) {
  funkcja_ii = data;
}
