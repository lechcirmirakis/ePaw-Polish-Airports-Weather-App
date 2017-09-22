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
// tworze zmienna poland ktora zawiera wspolrzedne na ktore bedzie wycentrowana mapa
var poland = {lat: 52.363, lng: 19.044};
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

// tworze pusta tablice do ktorej beda zpushowane stworzone markery
var markers = [];
