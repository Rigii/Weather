$("#but1").append(moment().format().substr(0,10)),$("#but2").append(moment().add(1,"days").format().substr(0,10)),$("#but3").append(moment().add(2,"days").format().substr(0,10)),$("#but4").append(moment().add(3,"days").format().substr(0,10)),$("#but5").append(moment().add(4,"days").format().substr(0,10));var getPosition=function(t){return new Promise(function(e,a){navigator.geolocation.getCurrentPosition(e,a,t)})};function getData(t,e){return new Promise(function(a,n){$.ajax({url:"http://api.openweathermap.org/data/2.5/forecast?lat="+t+"&lon="+e+"&APPID=102809fad29396a87de9299cf09c4e31"}).done(function(t){a(renderData(t))}).fail(function(t){n(alert("Данные о погоде с сервера не получены"))})})}function renderData(t){let e=$("<h3>").text(t.city.name);$(".tabs").empty().append(e);var a=t.list,n=$(".tabset a");$.each(n,function(){let t=this.innerHTML,e=this.hash;$.each(a,function(){if(this.dt_txt.substr(0,10)==t){let t=$('<div class="boxes">'),a=$("<h3>");$(a).text(this.dt_txt.slice(10));let n=$("<h1>");$(n).text(Math.round(this.main.temp-273.15));let s=$("<h2>");$(s).text("Давление:");let i=$("<h3>");$(i).text(this.main.pressure+" Па");let r=$("<h2>");$(r).text("Ветер:");let o=$("<h3>");$(o).text(this.wind.speed+"км/ч "+Math.round(this.wind.deg)+"deg.");let d=$("<h2>");$(d).text("Осадки:");let u=$("<h3>");$(u).text(this.weather[0].description),$(t).append(a,n,s,i,r,o,d,u),$(e).append(t)}})})}getPosition({enableHighAccuracy:!1,timeout:5e3}).then(function(t){let e=t.coords;getData(e.latitude,e.longitude),setInterval(function(){getData(e.latitude,e.longitude)},18e4)}).catch(function(t){alert("Сбой геолокации, время ожидания вышло")});var buttons=$(".tabset a"),currentTab=$(buttons.filter(".active").attr("href"));buttons.each(function(){let t=$(this).attr("href");$(t).css("display","none")}),currentTab.css("display","block"),$(".tabs-holder ul").click(function(t){$(t.target).hasClass("active")||(buttons.removeClass("active"),$(t.target).addClass("active"),currentTab.fadeOut(300,function(){(currentTab=$($(t.target).attr("href"))).fadeIn()}))});
//# sourceMappingURL=maps/weather-min.js.map