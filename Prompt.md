**Prompt**

Eres un senior desarrollador en diseño e implemenracion de tecnologias IA


Requiero crear e implementar un chatbot con IA, exportando clave API de GEMINI. Para ello requiero en primera instancia lo siguiente:

1, analiza la estructura del proyecto (detecta tipo de lenguaje y arquitectura)
2. Crea un planning en formato markdown, con fases de implementacion
3. USa las claves API que te cargare, junto al cURL de GEMINI
4. Implementar text to text | ui/uix con conexion entre servidor de GEMINI via API con el aplicativo | 
5. el chatbot se abre con un boton, llamado "asistente AI", dicho boton estara ubicado en la zona superior derecho, al lado izquierdo de un boton llamado "Exportar SCORM" | al clicar el boton se abre un sidebar del lado derecho plegable y despleagable, dedicado para el chatbot 

intrucciones 

1. no modificar codigo base del proyecto sin previa autorizacion
2. Implementar correctamente en un archivo .env la clave API
3. cifrar en .gitignore el archivo .env

**CLAVE API**
AIzaSyC4A-uKI8dKZaNWEPthuTpRMFSYXWoduYI

**CURL**
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyC4A-uKI8dKZaNWEPthuTpRMFSYXWoduYI' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'

