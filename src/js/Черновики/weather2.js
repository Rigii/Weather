// 0. Получаем даты на пять дней
$('#but1').append((new Date()).toISOString().substr(0,10));
$('#but2').append((new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).toISOString().substr(0,10)); // переводим в др. формат и берём значение даты '.toISOString().substr(0,10)..
$('#but3').append((new Date(new Date().getTime() + 48 * 60 * 60 * 1000)).toISOString().substr(0,10));
$('#but4').append((new Date(new Date().getTime() + 72 * 60 * 60 * 1000)).toISOString().substr(0,10));
$('#but5').append((new Date(new Date().getTime() + 96 * 60 * 60 * 1000)).toISOString().substr(0,10));

// 1. Получаем координаты месторасположения клиента с помощью метода .geolocation.getCurrentPosition()
var getPosition = function (opt) {
    return new Promise(function (resolve, reject) {navigator.geolocation.getCurrentPosition(resolve, reject, opt)})};
getPosition({enableHighAccuracy: false, timeout: 5000}).then(function(position){let crd=position.coords;
getData(crd.latitude, crd.longitude );
setInterval(function(){getData(crd.latitude, crd.longitude )},3600000)})
.catch(function(err){alert('Сбой геолокации, время ожидания вышло')});

// 2. Получаем объект с сервера
function getData (lat, long){
     return new Promise(function(resolve, reject){
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&APPID=102809fad29396a87de9299cf09c4e31'
    }).done(function (result){resolve(renderData(result))})
        .fail(function (error){reject(alert('Данные о погоде с сервера не получены'))})
})}
// 3. Рендерим данные по дивам:
function renderData(dat) {
// Название населённого пункта
    let cit= $('<h3>').text(dat.city.name);
    $('.tabs').empty().append(cit);
    //данные о погоде
    var dataWeath = dat.list;
    var a=$('.tabset a');
    $.each(a, function(){ let dat= this.innerHTML; let hr= this.hash;
        $.each(dataWeath, function(){
            if(this.dt_txt.substr(0,10)==dat) {
                let div = $('<div class="boxes">');
                let time = $('<h3>');
                $(time).text(this.dt_txt.slice(10));
                let temp = $('<h1>');
                $(temp).text(Math.round(this.main.temp - 273.15));
                let pres = $('<h2>');
                $(pres).text('Давление:');
                let pr = $('<h3>');
                $(pr).text(this.main.pressure + ' ' + 'Па');
                let wi = $('<h2>');
                $(wi).text('Ветер:');
                let win = $('<h3>');
                $(win).text(this.wind.speed + 'км/ч' + ' ' + Math.round(this.wind.deg) + 'deg.');
                let we = $('<h2>');
                $(we).text('Осадки:');
                let wea = $('<h3>');
                $(wea).text(this.weather[0].description);
                $(div).append(time, temp, pres, pr, wi, win, we, wea);
                $(hr).append(div);
            }})})}
// 4. Функция переключения tab..
var buttons = $(".tabset a");
var currentTab = $(buttons.filter(".active").attr("href"));
buttons.each(function(){
    let tabId = $(this).attr("href");
    $(tabId).css("display","none")});
currentTab.css("display","block");

$('.tabs-holder ul').click(function(event) {
    if ($(event.target).hasClass("active")) {return;}
    buttons.removeClass("active");
    $(event.target).addClass("active");
    currentTab.fadeOut(300, function () {currentTab = $($(event.target).attr("href"));
        currentTab.fadeIn();
    })});




















