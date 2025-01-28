import os
import logging
from logging.handlers import TimedRotatingFileHandler
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar CORS
from transformers import pipeline
from diffusers import StableDiffusionPipeline
from io import BytesIO
from PIL import Image
import base64

app = Flask(__name__)
CORS(app)  # Habilitar CORS en toda la aplicación

# Crear la carpeta 'logs' si no existe
log_dir = os.path.join(os.getcwd(), "logs")
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

# Configurar logging diario
log_file = os.path.join(log_dir, "backend.log")
handler = TimedRotatingFileHandler(
    filename=log_file,
    when="midnight",  # Crear un nuevo archivo cada medianoche
    interval=1,
    backupCount=30  # Mantener 30 días de logs
)
handler.suffix = "%d_%m_%Y"  # Formato de fecha en el nombre del archivo
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
app.logger.addHandler(handler)

# Carga el modelo para generación de texto
generator = pipeline("text-generation", model="mrm8488/spanish-gpt2")

# Cargar el modelo Stable Diffusion para generación de imágenes
# Usando un modelo de Stable Diffusion público de StabilityAI
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-3.5-medium", use_auth_token=True)

pipe.to("cpu")  # Ejecutar en CPU

@app.route("/generate", methods=["POST"])
def generate():
    app.logger.info("Solicitud recibida en /generate")
    data = request.json
    prompt = data.get("prompt", "")
    tone = data.get("tone", "neutral")
    app.logger.debug(f"Datos recibidos: prompt={prompt}, tone={tone}")

    # Generar texto
    try:
        result = generator(prompt, max_length=500, num_return_sequences=1)
        generated_text = result[0]["generated_text"]
        app.logger.info("Texto generado exitosamente")
        return jsonify({"generated_text": generated_text})
    except Exception as e:
        app.logger.error(f"Error generando texto: {e}")
        return jsonify({"error": "Error al generar texto"}), 500

@app.route("/generate-image", methods=["POST"])
def generate_image():
    try:
        # Recibir el prompt desde el frontend
        data = request.json
        prompt = data.get("prompt", "")
        
        if not prompt:
            return jsonify({"error": "No prompt provided."}), 400

        # Generar la imagen
        app.logger.info(f"Generando imagen con el prompt: {prompt}")
        #image = pipe(prompt).images[0]
        # Reducir el número de pasos de difusión para acelerar la generación
        num_inference_steps = 20  # Usualmente 50-100 pasos, pero puedes reducirlo a 20-30 para velocidad
        image = pipe(prompt, num_inference_steps=num_inference_steps).images[0]

        # Convertir la imagen a formato base64 para enviarla como respuesta
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        app.logger.info("Imagen generada exitosamente")
        return jsonify({"image": img_str})

    except Exception as e:
        app.logger.error(f"Error generando imagen: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)