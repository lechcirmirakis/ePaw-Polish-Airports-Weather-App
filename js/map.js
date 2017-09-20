// tworze zmienna poland ktora zawiera wspolrzedne na ktore bedzie wycentrowana mapa
var poland = {lat: 52.363, lng: 19.044};

// funkcja tworzaca mape google
function initMap() {
    // tworzy zmienna ktora przechowuje mape google
    var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 6,
        center: poland,
    });

    // tworze diva na button resetujacy zooma i wysrodkowujacy z powrotem do pozycji wejsciowej
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    // odpalam funkcje dodajaca markery
    setMarkers(map);
}

// tworze tablice trzymajaca dane o wszystkich lotniskach
var airports = [
    ['Warsaw Chopin Airport', 52.161784, 20.965299, 1, "EPWA", "WAW", "52°09′57″N 20°58′02″E",
        "15/33 - 3690 × 60 m", "11/29 - 2800 × 50 m", "Okecie Tower 118,300 MHz",
        "Okecie Ground 121,900 MHz", "Warsaw Approach 128,800 MHz", "www.lotnisko-chopina.pl",
        "https://www.lotnisko-chopina.pl/", "756135"
    ],
    ['Warsaw Modlin Airport', 52.454018, 20.651937, 2, "EPMO", "WMI", "52°27′04″N 20°39′06″E",
        "08/26 - 2500 × 45 m", "-", "Modlin Tower 123.925 MHz", "-", "Modlin Info 120.325 MHz",
        "www.modlinairport.pl", "http://modlinairport.pl/", "763556"
    ],
    ['Gdańsk Lech Walesa Airport', 54.372701, 18.468743, 3, "EPGD", "GDN", "54°22′39″N 18°27′58″E",
        "11/29 - 2800 m x 45 m", "-", "Gdańsk Tower 118,100 MHz", "Gdańsk Approach 130,875 MHz", "-",
         "www.airport.gdansk.pl", "http://www.airport.gdansk.pl/", "3099434"
    ],
    ['"Solidarity" Szczecin-Goleniów Airport', 53.582821, 14.898251, 4, "EPSC", "SZZ", "53°35′05″N 14°54′07″E",
        "13/31 - 2500 × 60 m", "-", "Szczecin Tower 121,250 MHz", "-", "-",
        "www.airport.com.pl", "http://www.airport.com.pl/", "3083829"
    ],
    ['Bydgoszcz Ignacy Jan Paderewski Airport', 53.101257, 17.973808, 5, "EPBY", "BZG", "53°05′48″N 17°58′40″E",
        "08/26 - 2500 × 60 m", "-", "Bydgoszcz Tower 131,000 MHz", "-", "-",
        "www.plb.pl", "http://plb.pl/", "3102014"
    ],
    ['Poznań–Ławica Henryk Wieniawski Airport', 52.417233, 16.819539, 6, "EPPO", "POZ", "52°25′16″N 16°49′35″E",
        "10/28 - 2504 × 50 m", "-", "Poznan Tower 119,975 MHz", "Poznan Delivery 121,800 MHz",
        "Poznan Approach 129,025 MHz", "www.airport-poznan.com.pl",
        "https://www.airport-poznan.com.pl/pl/", "3088171"
    ],
    ['Łódź Władysław Reymont Airport', 51.715155, 19.392514, 7, "EPLL", "LCJ", "51°43′19″N 19°23′53″E",
        "07L/25R - 2500 × 60 m", "-", "Lodz Tower 124.225 MHz", "-", "-",
        "www.airport.lodz.pl", "http://www.airport.lodz.pl/", "3093133"
    ],
    ['Wrocław-Copernicus Airport', 51.110462, 16.879537, 8, "EPWR", "WRO", "51°06′34″N 16°52′49″E",
        "11/29 - 2503 × 45 m", "-", "Wroclaw Tower 120.250 MHz", "Poznan South Approach 127.225 MHz",
        "Wroclaw Delivery 121.800 MHz", "www.airport.wroclaw.pl", "http://airport.wroclaw.pl/", "3081368"
    ],
    ['John Paul II Airport Kraków–Balice', 50.078589, 19.779301, 9, "EPKK", "KRK", "50°04′40″N 19°47′05″E",
        "07/25 - 2550 × 60 m", "-", "Krakow Tower 123,250 MHz", "Krakow Ground 118,100 MHz", "Krakow Approach 121,075 MHz",
        "www.krakowairport.pl", "http://www.krakowairport.pl/pl/", "3094802"
    ],
    ['Katowice International Airport', 50.477968, 19.081459, 10, "EPKT", "KTW", "50°28′27″N 19°04′48″E",
        "09/27 - 3200 × 45 m", "-", "Katowice Tower 129,250 MHz", "Katowice Delivery 121,800 MHz", "Krakow Approach 121,075 MHz",
        "www.katowice-airport.com", "https://www.katowice-airport.com/", "3096472"
    ],
    ['Lublin Airport', 51.239900, 22.713380, 11, "EPLB", "LUZ", "51°14′21,6″N 22°42′50,7″E",
        "07/25 - 2520 x 45 m", "-", "Tower 136.425 MHz", "-", "-", "www.airport.lublin.pl",
        "http://www.airport.lublin.pl/", "765876"
    ],
    ['Rzeszów-Jasionka Airport', 50.106273, 22.026867, 12, "EPRZ", "RZE", "50°06′35″N 22°01′08″E",
        "09/27 - 3200 × 45m", "-", "Reszow Tower 126,800", "-", "-", "www.rzeszowairport.pl",
        "http://www.rzeszowairport.pl/", "759734"
    ],
    // ['Zielona Góra-Babimost Airport', 52.138798, 15.799416, 13],
];

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
    var weatherVisi = document.getElementById('weather-visibility');
    var weatherWindS = document.getElementById('weather-wind-speed');
    var weatherWindD = document.getElementById('weather-wind-deg');
    var weatherClouds = document.getElementById('weather-clouds');

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
        weatherName.innerText = this.title;


        var vid = this.openweatherid;
        console.log(vid);
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
          weatherTemp.innerText = response.main.temp;
          weatherPress.innerText = response.main.pressure;
          weatherHumi.innerText = response.main.humidity;
          weatherVisi.innerText = response.visibility;
          weatherWindS.innerText = response.wind.speed;
          weatherWindD.innerText = response.wind.deg;
          weatherClouds.innerText = response.clouds.all;
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
