## Instrucciones para Descargar y Ejecutar un Proyecto de Playwright

Estas son las instrucciones para descargar y ejecutar el proyecto DEVSUAUTOMATIONTESTS de Playwright en tu máquina local.

# Requisitos Previos

Asegúrate de tener lo siguiente instalado en tu sistema:

- Node.js: (https://nodejs.org/).
- Git: (https://git-scm.com/).

# Paso 1: Clonar el Repositorio

Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio de GitHub:

    git clone https://github.com/Red-Kraken42/DevsuAutomationTests.git

# Paso 2: Navegar al Directorio del Proyecto

Ingresa al directorio del proyecto utilizando el siguiente comando:

    cd tu-proyecto

# Paso 3: Instalar las Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

npm install

Este comando instalará todas las bibliotecas y módulos necesarios para ejecutar el proyecto.

# Paso 4: Ejecutar las Pruebas

Ahora puedes ejecutar las pruebas del proyecto de Playwright utilizando el siguiente comando:

    npx playwright test
o puedes ejecutar algun script del package.json:
    npm run test:headed
    npm run test:api
    npm run test:buy
    
Esto iniciará las pruebas automatizadas según lo configurado en playwright.config.js

### Paso 5: Ver los Resultados

Después de ejecutar las pruebas, podrás ver los resultados en la carpeta: playwright-report, o ejecutando el comando: 
    npx playwright show-report
