// tworze zmienna poland ktora zawiera wspolrzedne na ktore bedzie wycentrowana mapa
var poland = {lat: 52.363, lng: 19.044};

// funkcja tworzaca mape google
function initMap() {
    // tworzy zmienna ktora przechowuje mape google
    var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 6,
        center: poland,
        styles: [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#13e437"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#FFAD00"
            },
            {
                "saturation": 50.2
            },
            {
                "lightness": -34.8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f2b00f"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#FFC300"
            },
            {
                "saturation": 54.2
            },
            {
                "lightness": -14.4
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e4b817"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#FFAD00"
            },
            {
                "saturation": -19.8
            },
            {
                "lightness": -1.8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#FFAD00"
            },
            {
                "saturation": 72.4
            },
            {
                "lightness": -32.6
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#FFAD00"
            },
            {
                "saturation": 74.4
            },
            {
                "lightness": -18
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#00FFA6"
            },
            {
                "saturation": -63.2
            },
            {
                "lightness": 38
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#feffae"
            }
        ]
    }
]
    });

    // tworze diva na button resetujacy zooma i wysrodkowujacy z powrotem do pozycji wejsciowej
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    // odpalam funkcje dodajaca markery
    setMarkers(map);
}

// tworze pusta tablice do ktorej beda zpushowane stworzone markery
var markers = [];

// Funkcja tworzaca markery
function setMarkers(map) {

    // zmienne z DOM-u w ktore beda "wciskane dane lotnisk"
    var airportName = document.getElementById('airport_name');
    var icaoName = document.getElementById('icao_name');
    var iataName = document.getElementById('iata_name');
    var cords = document.getElementById('coordinates');
    var rwy01 = document.getElementById('rwy_01');
    var rwy02 = document.getElementById('rwy_02');
    var towers = document.getElementById('tower');
    var grounds = document.getElementById('ground');
    var approachs = document.getElementById('approach');
    var www = document.getElementById('www');
    var wbutton = document.getElementById('weather-button');
    var weatherName = document.getElementById('weather-name');
    var weatherDes = document.getElementById('weather-description');
    var weatherTemp = document.getElementById('weather-temperature');
    var weatherPress = document.getElementById('weather-pressure');
    var weatherHumi = document.getElementById('weather-humidity');
    var weatherWindS = document.getElementById('weather-wind-speed');
    var weatherWindD = document.getElementById('weather-wind-deg');
    var weatherClouds = document.getElementById('weather-clouds');
    var weatherTempM = document.getElementById('weather-temperature-min');

    // zmienna "trzymajaca" obrazek markera
    var image = {
        url: './images/airicon.png',
        size: new google.maps.Size(31, 31),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(31, 31)
    };

    // petla po tablicy z danymi lotnisk, tworzy markery na  mapie google.
    for (var i = 0; i < airports.length; i++) {
        var port = airports[i];
        var marker = new google.maps.Marker({
            position: {
                lat: port[1],
                lng: port[2]
            },
            map: map,
            icon: image,
            title: port[0],
            zIndex: port[3],
            icao: port[4],
            iata: port[5],
            cord: port[6],
            rwy1: port[7],
            rwy2: port[8],
            tower: port[9],
            ground: port[10],
            approach: port[11],
            site: port[12],
            addres: port[13],
            openweatherid: port[14],
        });
        markers.push(marker);
    }

    // petla dodajaca eventy na markerach
    for (var i = 0; i < markers.length; i++) {
    markers[i].addListener('click', function() {
        map.setZoom(13);
        map.setCenter(this.getPosition());
        airportName.innerText = this.title;
        icaoName.innerText = this.icao;
        iataName.innerText = this.iata;
        cords.innerText = this.cord;
        rwy01.innerText = this.rwy1;
        rwy02.innerText = this.rwy2;
        towers.innerText = this.tower;
        grounds.innerText = this.ground;
        approachs.innerText = this.approach;
        www.innerText = this.site;
        www.setAttribute('href', this.addres);
        weatherName.innerText = this.title+" ,PL";

        var vid = this.openweatherid;

        // pobieranie danych pogodowych z API

        $.ajax({
          type: "GET",
          dataType: 'json',
          url: "https://api.openweathermap.org/data/2.5/weather?id="+vid+"&lang=pl&units=metric&appid=d1b32a80a97b96affa742e5fa6a692b5"
        })
        .done(function(response){
          var imga = response.weather[0].icon;
          var wicon = $('#weathericon');
          wicon.attr('src', "https://openweathermap.org/img/w/"+imga+".png" );
          weatherDes.innerText = response.weather[0].description;
          weatherTemp.innerHTML = response.main.temp+"&deg;C";
          weatherPress.innerText = " "+response.main.pressure+ " hPa";
          weatherTempM.innerHTML = response.main.temp_min+"&deg;C";
          weatherHumi.innerText = response.main.humidity+" %";
          weatherWindS.innerText = response.wind.speed+" m/s";
          weatherWindD.innerHTML = response.wind.deg+"&deg;";
          weatherClouds.innerText = response.clouds.all+" %";
        })
        .fail(function(error){
          console.log(error);
        })
        .always(function(){
          console.log("Zaciagam pogode z Api");
        })
    });
    }
}

// Funkcja tworzaca button do resetowania zoomu
function CenterControl(controlDiv, map) {

    // Style CSS dla buttona.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Style CSS dla tekstu
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Reset Zoom';
    controlUI.appendChild(controlText);

    // Event resetujacy zoom
    controlUI.addEventListener('click', function() {
        map.setCenter(poland);
        map.setZoom(6);
    });
}
