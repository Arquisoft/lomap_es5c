# LoMap Es5c
<img src="/assets/LOMAP_presentation.png" width="70%" height="70%"/>


[![CI for LOMAP ES5C](https://github.com/Arquisoft/lomap_es5c/actions/workflows/lomap_es5c.yml/badge.svg)](https://github.com/Arquisoft/lomap_es5c/actions/workflows/lomap_es5c.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es5c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es5c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es5c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es5c)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5f0341fc-0f07-415f-b496-6f93825eb42c/deploy-status)](https://app.netlify.com/sites/lomap5c/deploys)

## 👨‍💻 Participant list / Miembros del equipo
[![Jony](https://img.shields.io/badge/UO283586-Jonathan%20Arias-yellow)](https://github.com/JonathanAriass)

[![Edu](https://img.shields.io/badge/UO285176-Eduardo%20Blanco-blueviolet)](https://github.com/gitblanc)

[![Fer](https://img.shields.io/badge/UO277938-Fernando%20Jos%C3%A9%20Gonz%C3%A1lez-orange)](https://github.com/UO277938)

[![Xin](https://img.shields.io/badge/UO276967%20-Chen%20Xin%20Pan%20Wang-hotpink)](https://github.com/iimxinn)

---
## 💻 Technologies used / Tecnología usadas

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
<img src="https://user-images.githubusercontent.com/87705461/217768979-69ceaa1b-27c4-48da-955d-40813377bb15.png" alt="solid" width="25"/>
![](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## 📫 Quick start guide for offline build / Guía rápida para despliegue sin conexión

<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

- Install / Instala [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/).
- Clone this project / Clona el proyecto
- On the base directory of this project execute this: / En el directorio raíz del proyecto ejecuta:
```bash
docker-compose up --build
```
- If you want to run it without docker: / Si quieres ejecutar el proyecto sin docker:
```shell
cd webapp
npm install
npm start
```

- Open on your web browser `https://localhost:3000` (maybe 3001, 3002... if you have that port busy) / Abre en tu navegador web `https://localhost:3000` (quizás 3001, 3002... si ese puerto lo tienes ocupado)

## ⚙️ More information / Más información

You can get more information about the repository in the other README files: / Obtén más información en los README de:

- Documentation / Documentación: https://github.com/arquisoft/lomap_es5c/tree/master/docs
- Webapp: https://github.com/arquisoft/lomap_es5c/tree/master/webapp

## 🧩 Deployment / Desplegado
 
 This app is in continuous deployment on `https://lomap5c.netlify.app` where you can use it whenever you want / Esta aplicación está publicada en Internet y en despliegue continuo en `https://lomap5c.netlify.app`.
 
 In case that you want to create your own deployment you can follow this steps / Si quieres crear un despliegue similar sigue estos pasos:
 1. Fork this repository / Forkea el repositorio
 2. Create an account on Netlify (must be linked to your Github profile if you want to make a continuous integration to the forked repository) / Crea una cuenta en Netlify (que esté vinculada a tu cuenta de Github).
 3. Select your default team and project on Netlify (in this case the Lomap forked repository) / Selecciona un equipo y repositorio por defecto (el de Lomap).
 4. Add a new repository / Añade el nuevo repositorio.
 5. Set up this configuration to your build: / Aplica esta configuración de despliegue:
 <img width="878" alt="image" src="https://user-images.githubusercontent.com/87705461/234882737-a34de532-0eae-4da7-b6c7-9a8768c5e21d.png">
 6. Change the default domain (if you want) / Cambia el dominio (si lo deseas)

And that's it. Enjoy our project :) / Eso es todo, disfruta de Lomap :)
 
