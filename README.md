# 🌦️ SkyGlass

Aplicação web de previsão do tempo inspirada no aplicativo Tempo do iPhone, desenvolvida com HTML, CSS e JavaScript, utilizando a API Open-Meteo para fornecer informações meteorológicas em tempo real.

---

## 📸 Preview

<p align="center">
  <img src="./assets/img/preview/previsao-do-tempo.png" alt="Preview do Aplicativo de Clima" width="800">
</p>

---
## 🚀 Demonstração

Projeto desenvolvido utilizando HTML, CSS e JavaScript com integração à API Open-Meteo para exibição de dados meteorológicos em tempo real.

Principais recursos:

- Consulta de clima por cidade
- Temperatura atual
- Sensação térmica
- Velocidade do vento
- Umidade do ar
- Chance de chuva
- Previsão por hora
- Previsão para 7 dias
- Fundo dinâmico baseado nas condições climáticas
- Layout responsivo

---

## 📖 Sobre o Projeto

O **Aplicativo de Clima** permite consultar a previsão do tempo de uma cidade informada pelo usuário.

A aplicação busca os dados meteorológicos através da API Open-Meteo e exibe as informações em uma interface moderna, responsiva e com fundo dinâmico conforme as condições climáticas.

---

## ✨ Funcionalidades

* Buscar clima pelo nome da cidade
* Exibir temperatura atual
* Exibir sensação térmica
* Exibir velocidade do vento
* Exibir umidade relativa do ar
* Exibir chance de chuva
* Exibir previsão por hora
* Exibir previsão para os próximos 7 dias
* Alterar o fundo automaticamente conforme o clima
* Aplicar tema noturno automático
* Interface responsiva para diferentes tamanhos de tela

---

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* Open-Meteo API
* Open-Meteo Geocoding API

---

## 📂 Estrutura do Projeto

```text
APLICATIVO-CLIMA
│
├── assets
│   ├── img
│   │   ├── ceu-limpo.jpg
│   │   ├── chuva.jpg
│   │   ├── ensolarado.jpg
│   │   ├── noite.jpg
│   │   ├── nublado.jpg
│   │   ├── parcialmente-nublado.jpg
│   │   └── tempestade.jpg
│   │
│   └── preview
│       └── previsao-do-tempo.png
│
├── css
│   └── style.css
│
├── js
│   └── script.js
│
├── index.html
└── README.md
```

---

## 🌍 Como Funciona

1. O usuário informa o nome de uma cidade.
2. A aplicação consulta a API de geocodificação da Open-Meteo.
3. A API retorna a latitude e longitude da cidade.
4. A aplicação utiliza essas coordenadas para buscar os dados meteorológicos.
5. Os dados são exibidos na tela de forma amigável.
6. O fundo da aplicação muda automaticamente de acordo com o clima atual.

---

## 🎨 Fundos Dinâmicos

O projeto utiliza imagens diferentes de fundo conforme a condição climática retornada pela API.

| Condição             | Imagem                     |
| -------------------- | -------------------------- |
| Céu limpo            | `ceu-limpo.jpg`            |
| Ensolarado           | `ensolarado.jpg`           |
| Parcialmente nublado | `parcialmente-nublado.jpg` |
| Nublado / Neblina    | `nublado.jpg`              |
| Chuva                | `chuva.jpg`                |
| Tempestade           | `tempestade.jpg`           |
| Noite                | `noite.jpg`                |

---

## ⚙️ Como Executar o Projeto

Clone este repositório:

```bash
git clone https://github.com/CarolinaPerpetuo/aplicativo-clima.git
```

Acesse a pasta do projeto:

```bash
cd NOME-DO-REPOSITORIO
```

Abra o arquivo `index.html` no navegador.

Também é possível executar utilizando a extensão **Live Server** no VS Code.

---

## 🔗 APIs Utilizadas

### Open-Meteo Geocoding API

Utilizada para buscar a latitude e longitude da cidade informada.

```text
https://geocoding-api.open-meteo.com
```

### Open-Meteo Forecast API

Utilizada para buscar os dados meteorológicos atuais, previsão por hora e previsão diária.

```text
https://api.open-meteo.com
```

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram praticados conceitos como:

* Consumo de APIs REST
* Programação assíncrona com `async/await`
* Manipulação do DOM
* Tratamento de erros
* Responsividade com CSS
* Efeito glassmorphism
* Organização de arquivos em projeto front-end
* Uso de imagens dinâmicas conforme dados da API

---

## 👩‍💻 Desenvolvedora

**Carolina Perpetuo**


Engenheira de Software e Dev Full Stack.
