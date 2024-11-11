import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

# Gemini API key
GEMINI_API_KEY =  os.environ.get("GEMINI_API_KEY")

def get_chatbot_response(user_input):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
    
    context = """
    You are a sustainability-focused chatbot with a deep understanding of eco-friendly practices, green alternatives, and sustainable lifestyle choices.
    Respond to questions by prioritizing environmental impact, green products, and eco-responsible advice.
    Use your knowledge to guide users in making sustainable choices, providing practical, eco-conscious suggestions for everyday decisions.

    If a user asks about products, rate their eco-friendliness on a 1-5 scale, and suggest greener alternatives where possible.
    Consider environmental impacts like water usage, carbon footprint, resource sustainability, and recyclable packaging when advising.
    
    Always encourage positive steps towards reducing ecological impact.
    """
    
    prompt = f"{context}\n\nUser: {user_input}\n\nResponse:"
    
    headers = {
        "Content-Type": "application/json",
    }

    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    url_with_api_key = f"{url}?key={GEMINI_API_KEY}"

    response = requests.post(url_with_api_key, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        try:
            response_json = response.json()
            text_response = response_json["candidates"][0]["content"]["parts"][0]["text"]
            return text_response
        except KeyError as e:
            print(f"Error extracting data from response: {e}")
            return None
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None


