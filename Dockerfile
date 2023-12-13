# Utilizamos la imagen base de Python
FROM python:3.9-alpine

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos necesarios al contenedor
COPY requirements.txt /app
COPY api.py /app
COPY users.db /app

# Instalamos las dependencias de la aplicación
RUN pip install --no-cache-dir -r requirements.txt

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["python", "api.py"]
