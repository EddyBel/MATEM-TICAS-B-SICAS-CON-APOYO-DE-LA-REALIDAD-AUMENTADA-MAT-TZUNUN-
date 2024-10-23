# MATEMATICAS-BASICAS CON APOYO DE LA REALIDAD AUMENTADA MAT-TZUNUN

## Como desplegar

### Frontend:

- Requisitos

  - Node.js
  - NPM
  - Expo
  - Dispositivo Fisico conectado por usb

- Ingresar a la carpeta `FRONT-END` y ejecutar `npm install`
- Después de instalar las dependencias, ejecutar `npx expo run:android`

### Backend:

- Requisitos

  - Python
  - Pip
  - Virtualenv
  - mysql

- Ingresar a la carpeta `BACKEND` y levantar un entorno virtual con `virtualenv venv`
- Instalar las dependencias con `pip install -r requirements.txt`
- Crear la base de datos con `mysql -u root -p`
  - El usuario de la base de datos es 'root' y la contraseña es '54628' (en caso de cambios configurar en el archivo `Config.py`)
  - La base de datos utilizada se llama 'matzz'
- Ejecutar el servidor con `python main.py`
