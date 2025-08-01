# Country Info & Currency Converter

A lightweight web application that allows users to:
- Search for **real-time country information** using the REST Countries API
- **Convert currency** using a live Currency Conversion API

It is built using **HTML**, **CSS**, and **JavaScript**, and deployed using **Docker** containers on two web servers behind a **HAProxy load balancer**, demonstrating fault-tolerant and scalable infrastructure.
AND README.md which has a Demo video on youtube [ https://youtu.be/KwM2hUQuqXE ]
---

##  Features

- Search country by name
- Get capital, population, currency code, flag
- Convert currencies using live exchange rates
- Responsive frontend layout

---

##  How the App Works

- `index.html`: Main page structure
- `styles.css`: Styling
- `main.js`: Fetches data from:
  - REST Countries API
  - Currency Conversion API (via external key)

### Example APIs used:
- Country Info: `https://restcountries.com/v3.1/name/{country}`
- Currency: `https://v6.exchangerate-api.com/v6/44c7b4155c3e72dbc8f44e41/latest/USD`

---

##  Docker Setup

### Docker Files:
- `Dockerfile`: Builds a static frontend image using Nginx
- `nginx.conf`: Optional custom configuration
- `.dockerignore`: Excludes unnecessary files during image build

### Build & Push:
```bash
docker build -t shema123/country-currency-app:latest .
docker push shema123/country-currency-app:latest

#### How to Run LocallY
                      Step 1: Clone the Repo

   https://github.com/Shema-8/Country-Info-and-Currency-Converter.git
   cd country-currency-app

                   Step 2: Run App Container (Single instance)
   docker run -d --name app --restart unless-stopped -p 8080:80 shema123/country-currency-app:latest

#### Then visit: http://localhost:8080

##### Multi-Server Deployment with HAProxy

                    Architecture
 [Client]
   ↓
[HAProxy Load Balancer (lb-01)]
   ↓             ↓
[web-01]      [web-02]
              

                     Docker Commands
  # Web01
docker run -d --name web-01 --restart unless-stopped -p 8080:80 shema123/country-currency-app:latest

# Web02
docker run -d --name web-02 --restart unless-stopped -p 8081:80 shema123/country-currency-app:latest

# HAProxy
docker run -d --name lb-01 --restart unless-stopped -p 8082:80 \
  -v $(pwd)/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro haproxy:latest


######## Test in browser: http://localhost:8082

###### How to Verify It Works
   curl only shows HTML — to verify live API interaction, use the browser.

### Test These in Browser:
  Go to http://localhost:8082

     Enter "Rwanda" or any country → see info like population, flag, currency

     Use currency converter → get live conversion 

     JavaScript is hitting both APIs live

     App is served through HAProxy

     Both web-01 and web-02 are behind load balancer

##### Docker Image Info

      Docker Hub: shema123/country-currency-app

      Image: shema123/country-currency-app

      Tag: latest

##### Exposed Port: 80 (forwarded to 8080, 8081, or 8082 externally)


######  DEMO VIDEO 
 
  YOUTUBE VIDEO LINK  https://youtu.be/KwM2hUQuqXE
   


##### Author
Shema [e.shema2@alustudent.com] — African Leadership University
