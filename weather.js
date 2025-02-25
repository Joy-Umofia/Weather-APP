let cityInput=document.getElementById("input")
let form=document.getElementById("form")
let apiKey="874c06227925c7a998faa888a4de328e"
let modal=document.querySelector(".modal-container")


form.addEventListener("submit",weather)
function weather(e){
  e.preventDefault()
  let city=cityInput.value

  collectWeatherReport(city)
  modal.style.display="flex"
  modal.style.opacity = "0"; // Start from transparent
  modal.style.transform = "translateY(-20px)"; 

  setTimeout(() => {
  modal.style.opacity = "1";
  modal.style.transform = "translateY(0)";
  modal.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  }, 10);
  form.reset()
}

function collectWeatherReport(city){
    let weatherRequest=new XMLHttpRequest()
    weatherRequest.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

    // monitoring request
    weatherRequest.onreadystatechange=function(){
  
        if(this.readyState===4&& this.status===200){
          let data=JSON.parse(this.responseText)
          printWeatherOnUi(data)
        }
    }

    weatherRequest.send()
}

function printWeatherOnUi(data){
  console.log(data)
  modal.innerHTML=""
   let temp=((data.main.temp)-273.15).toFixed()
   let humidity=data.main.humidity
   let pressure=data.main.pressure
   let cityName=data.name
   let description=data.weather[0].description
   let now = new Date();
   let date = now.toDateString(); // Example: "Mon, Feb 26 2025"
   let time = now.toLocaleTimeString(); // Example: "10:45 AM"
   let iconCode = data.weather[0].icon; // Get the icon code
   let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

   let topModalDiv=document.createElement('div')
   topModalDiv.classList.add("top-modal")

   let tempDiv=document.createElement("div")
   tempDiv.classList.add("temp-div")
   let tempText=document.createElement("h1")
   tempText.textContent=temp+"°C"

   let cityDiv=document.createElement("div")
   cityDiv.classList.add("city-div")
   let cityText=document.createElement("h4")
   cityText.textContent=cityName

   let des=document.createElement("div")
   des.classList.add("description")
   let desImage=document.createElement("img")
   desImage.classList.add("img")
   desImage.style.width="60px"
   desImage.style.height="60px"
   desImage.setAttribute("src",iconUrl)
   desImage.setAttribute("alt",description)
   let desText=document.createElement("p")
   desText.textContent=description

   let OtherDiv=document.createElement("div")
   OtherDiv.classList.add("other-data")

   let hum=document.createElement("div")
   hum.classList.add("hum")
   let humText=document.createElement("h6")
   humText.textContent="Humidity"
   let humValue=document.createElement("p")
   humValue.textContent=humidity +"%"

   let tempCont=document.createElement("div")
   tempCont.classList.add("hum-two")
   let temptex=document.createElement("h6")
   temptex.textContent="Temperature"
   let tempValue=document.createElement("p")
   tempValue.textContent=temp+"°C"

   let preCont=document.createElement("div")
   preCont.classList.add("hum-three")
   let pretex=document.createElement("h6")
   pretex.textContent="Pressure"
   let preValue=document.createElement("p")
   preValue.textContent=pressure+" hPa"

   let dateTime=document.createElement("div")
   dateTime.classList.add("date-time")
   let timeText=document.createElement("p")
   timeText.textContent=time+"-"
   let datetext=document.createElement("p")
   datetext.textContent=date

   dateTime.append(timeText,datetext)
   preCont.append(pretex,preValue)
   tempCont.append(temptex,tempValue)
   hum.append(humText,humValue)
   OtherDiv.append(hum,tempCont,preCont)
   des.append(desImage,desText)
   cityDiv.append(cityText)
   tempDiv.append(tempText)
   topModalDiv.append(tempDiv,cityDiv,des)
   modal.append(topModalDiv,OtherDiv,dateTime)



  console.log(description)
}








let now = new Date();
let date = now.toDateString(); // Example: "Mon, Feb 26 2025"
let time = now.toLocaleTimeString(); // Example: "10:45 AM"

