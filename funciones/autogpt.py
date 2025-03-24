import pyperclip
import requests
import time

def monitor_portapapeles(api_url):
    """Monitorea el portapapeles y envía el contenido a la API de Gemini.

    Args:
        api_url (str): URL de la API de Gemini.
    """

    previous_text = ""
    while True:
        current_text = pyperclip.paste()
        if current_text != previous_text:
            response = requests.post(api_url, data={'text': current_text})
            pyperclip.copy(response.json()['generated_text'])
            previous_text = current_text
        time.sleep(1)

if __name__ == "__main__":
    api_url = "https://tu-api-gemini.com" 
    monitor_portapapeles(api_url)