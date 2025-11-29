// المفتاح بتاع الـ API
const API_KEY = "78696944db1ce62aa2d9f7ac30fb41a0";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");

// لما المستخدم يضغط الزر
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  // لو المستخدم مكتبتش حاجة
  if (city === "") {
    errorDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    errorDiv.textContent = "اكتب اسم مدينة الأول!";
    return;
  }

  // جلب الطقس من API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ar`)
    .then(response => response.json())
    .then(data => {

      // لو المدينة مش موجودة
      if (data.cod === "404") {
        errorDiv.classList.remove("hidden");
        resultDiv.classList.add("hidden");
        errorDiv.textContent = "المدينة دي مش موجودة!";
        return;
      }

      // عرض البيانات
      cityName.textContent = data.name;
      temp.innerHTML = `درجة الحرارة: <strong>${data.main.temp}°C</strong>`;
      desc.innerHTML = `الجو: <strong>${data.weather[0].description}</strong>`;
      humidity.innerHTML = `الرطوبة: <strong>${data.main.humidity}%</strong>`;

      resultDiv.classList.remove("hidden");
      errorDiv.classList.add("hidden");
    })
    .catch(() => {
      errorDiv.classList.remove("hidden");
      resultDiv.classList.add("hidden");
      errorDiv.textContent = "في مشكلة في النت… جرب تاني!";
    });
});
