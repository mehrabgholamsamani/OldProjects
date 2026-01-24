const elements = {
  citySelect: document.getElementById("citySelect"),
  date: document.getElementById("date"),
  time: document.getElementById("time"),

  icon1: document.getElementById("icon1"),
  weatherDate1: document.getElementById("weatherdate1"),
  temperature1: document.getElementById("temperature1"),
  feelsLike1: document.getElementById("feelsLike1"),
  windSpeed1: document.getElementById("windSpeed1"),

  icon2: document.getElementById("icon2"),
  weatherDate2: document.getElementById("weatherdate2"),
  temperature2: document.getElementById("temperature2"),
  feelsLike2: document.getElementById("feelsLike2"),
  windSpeed2: document.getElementById("windSpeed2"),

  icon3: document.getElementById("icon3"),
  weatherDate3: document.getElementById("weatherdate3"),
  temperature3: document.getElementById("temperature3"),
  feelsLike3: document.getElementById("feelsLike3"),
  windSpeed3: document.getElementById("windSpeed3"),

  icon4: document.getElementById("icon4"),
  weatherDate4: document.getElementById("weatherdate4"),
  temperature4: document.getElementById("temperature4"),
  feelsLike4: document.getElementById("feelsLike4"),
  windSpeed4: document.getElementById("windSpeed4"),

  icon5: document.getElementById("icon5"),
  weatherDate5: document.getElementById("weatherdate5"),
  temperature5: document.getElementById("temperature5"),
  feelsLike5: document.getElementById("feelsLike5"),
  windSpeed5: document.getElementById("windSpeed5"),
};

const API_KEY = "a68487360bc4650652a89a0255c92708";
const daySlots = [0, 8, 16, 24, 32];

function buildUrl(city) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatHeaderDate(d) {
  const month = d.toLocaleString("en-US", { month: "long" });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}

function formatHeaderTime(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function iconFromType(type) {
  switch (type) {
    case "Clear":
      return "icons/sun.svg";
    case "Clouds":
      return "icons/cloud.svg";
    case "Rain":
    case "Drizzle":
      return "icons/rain.svg";
    case "Snow":
      return "icons/snow.svg";
    case "Thunderstorm":
      return "icons/storm.svg";
    case "Fog":
    case "Mist":
    case "Smoke":
    case "Haze":
      return "icons/fog.svg";
    default:
      return "icons/cloud.svg";
  }
}

function setCard(cardNumber, item) {
  const iconEl = elements[`icon${cardNumber}`];
  const dateEl = elements[`weatherDate${cardNumber}`];
  const tempEl = elements[`temperature${cardNumber}`];
  const feelsEl = elements[`feelsLike${cardNumber}`];
  const windEl = elements[`windSpeed${cardNumber}`];

  if (!iconEl || !dateEl || !tempEl || !feelsEl || !windEl) return;

  const type = item.weather?.[0]?.main ?? "Clouds";
  const temp = Math.floor(item.main.temp);
  const feels = Math.floor(item.main.feels_like);
  const wind = Math.floor(item.wind.speed); // m/s

  iconEl.src = iconFromType(type);
  dateEl.textContent = `Forecast: ${item.dt_txt.slice(0, 16)}`;
  tempEl.textContent = `Temperature: ${temp}°C`;
  feelsEl.textContent = `Feels like: ${feels}°C`;
  windEl.textContent = `Wind: ${wind} m/s`;
}

function setLoading(isLoading) {
  if (!elements.citySelect) return;
  elements.citySelect.disabled = isLoading;


  if (isLoading) {
    elements.citySelect.dataset.prevText = elements.citySelect.options[elements.citySelect.selectedIndex]?.text || "";
    elements.citySelect.options[elements.citySelect.selectedIndex].text = "Loading...";
  } else {
    const prev = elements.citySelect.dataset.prevText;
    if (prev) elements.citySelect.options[elements.citySelect.selectedIndex].text = prev;
  }
}

async function getData(city) {
  if (!elements.citySelect) return;

  setLoading(true);

  try {
    const response = await fetch(buildUrl(city));
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();

    const returnedName = result.city?.name;
    if (returnedName) {
      const match = Array.from(elements.citySelect.options).find(
        (opt) => opt.value.toLowerCase() === returnedName.toLowerCase()
      );
      if (match) elements.citySelect.value = match.value;
    }

    daySlots.forEach((slotIndex, i) => {
      const item = result.list[slotIndex];
      if (!item) return;
      setCard(i + 1, item);
    });
  } finally {
    setLoading(false);
  }
}

const now = new Date();
elements.date.textContent = formatHeaderDate(now);
elements.time.textContent = formatHeaderTime(now);

const defaultCity = elements.citySelect?.value || "Helsinki";
getData(defaultCity).catch(console.error);

if (elements.citySelect) {
  elements.citySelect.addEventListener("change", (e) => {
    getData(e.target.value).catch(console.error);
  });
}
