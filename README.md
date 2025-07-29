# Country-Currency App

A simple web application that allows users to explore country information and convert currencies using real-time API data. Deployed using Docker containers behind a load balancer for fault tolerance and scalability.  It uses HTML, CSS, and JavaScript, and is containerized using Docker with Nginx as the web server.

## How the App Works

- `index.html`: The main web page structure.
- `styles.css`: Adds design and layout styling.
- `main.js`: Contains JavaScript logic to fetch and display:
  - Country data from the REST Countries API
  - Currency rates from a currency conversion API

Users enter or select a country, and the app shows its flag, population, capitalcity, and lets them convert currency to another currency.

## Docker Integration

- `Dockerfile`: Builds a Docker image using Nginx and copies all frontend files into Nginx's default folder.
- `nginx.conf`: A custom Nginx configuration that controls how files are served.
- `.dockerignore`: Lists files and folders to exclude when building the Docker image.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/country-currency-app.git
   cd country-currency-app


##  Image Details

- **Docker Hub Repository**: [https://hub.docker.com/r/shema123/country-currency-app](https://hub.docker.com/r/shema123/country-currency-app)
- **Image Name**: `country-currency-app`
- **Tag**: `v1`

You can pull the image using:
```bash
docker pull shema123/country-currency-app:v1
