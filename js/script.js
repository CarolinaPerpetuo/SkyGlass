function atualizarBackground(weatherCode) {
    let imagem = "ceu-limpo.jpg";
    const horaAtual = new Date().getHours();

    if (horaAtual >= 18 || horaAtual <= 5) {
        imagem = "noite.jpg";
    } else if (weatherCode === 0) {
        imagem = "ceu-limpo.jpg";
    } else if ([1, 2].includes(weatherCode)) {
        imagem = "ensolarado.jpg";
    } else if (weatherCode === 3) {
        imagem = "parcialmente-nublado.jpg";
    } else if ([45, 48].includes(weatherCode)) {
        imagem = "nublado.jpg";
    } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
        imagem = "chuva.jpg";
    } else if ([95, 96, 99].includes(weatherCode)) {
        imagem = "tempestade.jpg";
    }

    document.body.style.backgroundImage = `
        linear-gradient(
            rgba(0,0,0,.35),
            rgba(0,0,0,.45)
        ),
        url('./assets/img/${imagem}')
    `;
}

function atualizarAnimacoes(weatherCode) {
    const rainContainer = document.getElementById("rain-container");
    const lightning = document.querySelector(".lightning");

    if (!rainContainer || !lightning) return;

    rainContainer.innerHTML = "";
    lightning.classList.remove("active");

    const codigosChuva = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
    const codigosTempestade = [95, 96, 99];

    if (codigosChuva.includes(weatherCode) || codigosTempestade.includes(weatherCode)) {
        for (let i = 0; i < 120; i++) {
            const drop = document.createElement("span");

            drop.classList.add("rain-drop");
            drop.style.left = Math.random() * 100 + "%";
            drop.style.animationDuration = Math.random() * 0.5 + 0.5 + "s";
            drop.style.animationDelay = Math.random() * 2 + "s";

            rainContainer.appendChild(drop);
        }
    }

    if (codigosTempestade.includes(weatherCode)) {
        lightning.classList.add("active");
    }
}

async function getWeather(cidade) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Cidade não encontrada");
        }

        const local = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${local.latitude}&longitude=${local.longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,relative_humidity_2m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,sunrise,sunset&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        return {
            cidade: local.name,
            pais: local.country,
            atual: weatherData.current,
            horas: weatherData.hourly,
            dias: weatherData.daily
        };

    } catch (error) {
        console.error(error);
        return null;
    }
}

function descricaoClima(codigo) {
    const descricoes = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Neblina",
        48: "Neblina congelante",
        51: "Garoa leve",
        53: "Garoa moderada",
        55: "Garoa forte",
        56: "Garoa congelante",
        57: "Garoa congelante forte",
        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva forte",
        66: "Chuva congelante",
        67: "Chuva congelante forte",
        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve forte",
        77: "Grãos de neve",
        80: "Pancadas leves",
        81: "Pancadas moderadas",
        82: "Pancadas fortes",
        85: "Neve leve",
        86: "Neve forte",
        95: "Tempestade",
        96: "Tempestade com granizo",
        99: "Tempestade severa"
    };

    return descricoes[codigo] || "Condição não identificada";
}

function icone(codigo) {
    if (codigo === 0) return "☀️";
    if ([1, 2].includes(codigo)) return "🌤️";
    if (codigo === 3) return "☁️";
    if ([45, 48].includes(codigo)) return "🌫️";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(codigo)) return "❄️";
    if ([95, 96, 99].includes(codigo)) return "⛈️";

    return "🌡️";
}

function formatarHora(dataHora) {
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
        hour: "2-digit"
    });
}

function formatarDia(data) {
    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "short"
    });
}

function formatarHoraAtual() {
    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function buscarCidadeRapida(cidade) {
    document.getElementById("cidade").value = cidade;
    buscarClima();
}

async function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    const resultado = document.getElementById("resultado");

    if (cidade.trim() === "") {
        resultado.innerHTML = `<p class="error">Digite o nome de uma cidade.</p>`;
        return;
    }

    resultado.innerHTML = `<p class="loading">Buscando...</p>`;

    const clima = await getWeather(cidade);

    if (!clima) {
        resultado.innerHTML = `<p class="error">Cidade não encontrada.</p>`;
        return;
    }

    atualizarBackground(clima.atual.weather_code);
    atualizarAnimacoes(clima.atual.weather_code);

    resultado.innerHTML = `
        <section class="hero-weather">
            <h2>${clima.cidade}</h2>

            <p class="location-date">
                📍 ${clima.pais}
            </p>

            <div class="weather-icon-main">
                ${icone(clima.atual.weather_code)}
            </div>

            <div class="temp">
                ${Math.round(clima.atual.temperature_2m)}°
            </div>

            <p class="condition">
                ${descricaoClima(clima.atual.weather_code)}
            </p>

            <p class="min-max">
                Máx ${Math.round(clima.dias.temperature_2m_max[0])}°
                •
                Mín ${Math.round(clima.dias.temperature_2m_min[0])}°
            </p>

            <p class="current-time">
                Atualizado às ${formatarHoraAtual()}
            </p>
        </section>

        <section class="glass-card">
            <p class="card-title">Previsão por hora</p>

            <div class="hourly-list">
                ${clima.horas.time.slice(0, 12).map((hora, index) => `
                    <div class="hour-card">
                        <p>${index === 0 ? "Agora" : formatarHora(hora)}</p>

                        <div class="icon">
                            ${icone(clima.horas.weather_code[index])}
                        </div>

                        <strong>
                            ${Math.round(clima.horas.temperature_2m[index])}°
                        </strong>
                    </div>
                `).join("")}
            </div>
        </section>

        <section class="glass-card">
            <p class="card-title">Próximos 7 dias</p>

            <div class="days-list">
                ${clima.dias.time.slice(0, 7).map((dia, index) => `
                    <div class="day-card">
                        <span>
                            ${index === 0 ? "Hoje" : formatarDia(dia)}
                        </span>

                        <span class="icon">
                            ${icone(clima.dias.weather_code[index])}
                        </span>

                        <span>
                            ${descricaoClima(clima.dias.weather_code[index])}
                        </span>

                        <strong>
                            ${Math.round(clima.dias.temperature_2m_max[index])}°
                        </strong>
                    </div>
                `).join("")}
            </div>
        </section>

        <section class="details-grid">
            <div class="detail-card">
                <span>Sensação</span>
                <strong>${Math.round(clima.atual.apparent_temperature)}°</strong>
            </div>

            <div class="detail-card">
                <span>Vento</span>
                <strong>${Math.round(clima.atual.wind_speed_10m)} km/h</strong>
            </div>

            <div class="detail-card">
                <span>Umidade</span>
                <strong>${clima.atual.relative_humidity_2m}%</strong>
            </div>

            <div class="detail-card">
                <span>Chuva</span>
                <strong>${clima.dias.precipitation_probability_max[0]}%</strong>
            </div>
        </section>
    `;
}

document.getElementById("cidade").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscarClima();
    }
});

window.onload = () => {
    buscarCidadeRapida("São Paulo");
};