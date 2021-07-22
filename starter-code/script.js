var btnMore = document.getElementById("btn-more");
var btnLess = document.getElementById("btn-less");
var content = document.getElementById("content");
var dateMore = document.getElementById("date-content-more");
var date = document.getElementById("date");
var insideMain = document.getElementById("inside-main");
var refresh = document.getElementById("refresh");

// refresh.addEventListener("click", function () {
//   location.reload();
// });

 refresh.addEventListener("click", function () {
   callQuotes();
 });

callQuotes();
function callQuotes() {
  fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("quote").innerHTML =
      data[Math.floor(Math.random() * 500 + 1)].text;
    document.getElementById("author").innerHTML =
      data[Math.floor(Math.random() * 500 + 1)].author;
  });
}
btnMore.addEventListener("click", function () {
  btnLess.style.display = "block";
  btnMore.style.display = "none";
  content.style.display = "none";
  date.style.marginTop = "20px";
  dateMore.classList.add("added-class");
  btnLess.style.top = "30%";
});

btnLess.addEventListener("click", function () {
  btnLess.style.display = "none";
  btnMore.style.display = "block";
  content.style.display = "block";
  date.style.marginTop = "200px";
  dateMore.classList.remove("added-class");
  btnMore.style.top = "65%";
});



fetch("https://freegeoip.app/json/")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById(
      "date-content-bottom"
    ).innerHTML += `${data.city}, ${data.country_name}`;

    let timeZone = data.time_zone;
    fetch(`http://worldtimeapi.org/api/timezone/${timeZone}.json`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("timezone").innerHTML += data.timezone;
        document.getElementById("day_of_year").innerHTML += data.day_of_year;
        document.getElementById("day_of_week").innerHTML += data.day_of_week;
        document.getElementById("week_number").innerHTML += data.week_number;
        document.getElementById("current-time").innerHTML =
          data.datetime.substr(11, 5);

        let shift = parseInt(data.datetime.substr(11, 2));
        if (shift >= 5 && shift < 12) {
          document.getElementById("date-content").innerHTML +=
            "Good Morning, It's currently";
          document.getElementById("fa-moon").style.display = "none";
          document.getElementById("fa-sun").style.display = "inline-block";
        } else if (shift >= 12 && shift < 18) {
          document.getElementById("date-content").innerHTML +=
            "Good Afternoon, It's currently";
          document.getElementById("fa-moon").style.display = "none";
          document.getElementById("fa-sun").style.display = "inline-block";
        } else {
          document.getElementById("date-content").innerHTML +=
            "Good Evening, It's currently";
          document.getElementById("fa-moon").style.display = "inline-block";
          document.getElementById("fa-sun").style.display = "none";

          dateMore.style.background = "#000"
          dateMore.style.color = "#fff"
          if (window.innerWidth < 768) {
            document.getElementById("main").style.backgroundImage =
              "url(./assets/mobile/bg-image-nighttime.jpg)";
          } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            document.getElementById("main").style.backgroundImage =
              "url(./assets/tablet/bg-image-nighttime.jpg)";
          } else {
            document.getElementById("main").style.backgroundImage =
              "url(./assets/desktop/bg-image-nighttime.jpg)";
          }
        }
      });
  });
