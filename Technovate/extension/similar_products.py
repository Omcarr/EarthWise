import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY =  os.environ.get("GEMINI_API_KEY")

def suggest_eco_friendly_alternatives(api_key, product):
    """
    Suggests eco-friendly alternatives for a given product and rates them based on eco-friendliness.
    
    Parameters:
    - api_key: Your API key for accessing the Gemini API.
    - product: A dictionary containing product details (name, description, price).
    
    Returns:
    - A string with suggested alternatives or an error message.
    """

    # Function to call Gemini API to generate content
    def generate_content(prompt):
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
        headers = {'Content-Type': 'application/json'}
        data = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ]
        }
        
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        # Debugging: Print the raw response for inspection
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return None

    # Construct the prompt
    prompt = f"""
    I have a product called "{product['name']}" with the price of {product['price']}. Please suggest eco-friendly or sustainable alternatives for this product only 3. Rate the alternatives on a scale of 1 to 5 based on their eco-friendliness. Please include product links where they can be purchased this is very important and provide any comments or additional details that could be helpful for a sustainable choice.
    """

    # Get alternatives from the API
    response = generate_content(prompt)
    
    # Check if response is valid and contains content
    if response and 'candidates' in response and response['candidates']:
        content = response['candidates'][0].get("content", {}).get("parts", [])
        if content:
            return content[0]["text"]
    else:
        print("No content generated or an issue with the response.")
        return "No content generated or an issue with the response"


# # Replace with your actual API key

# # Product details expected format
# product_details = { 
#     "description": "Lakme brings to you its first range of exciting Sheet Masks from blush and glow. If you are facing dull, dry, patchy skin that is yearning for some hydration that is infused with the goodness of your favourite fruits. If your skin wants to get a glow that feels like a fruit facial. Our sheet masks are meant to give you exactly that! Now soak your face in the goodness of 100% pure fruit extracts with the range of Lakme Blush & Glow Fruity-licious Sheet Masks. As you leave on this delightfully refreshing sheet mask, your face gets a burst of freshness and a gorgeous fruit-kissed glow.",
#     "name": "LAKMÉ Blush & Glow Strawberry Sheet Mask, 25 Ml",
#     "price": "₹67.00"
# }

# # Get alternative product suggestions and ratings
# result = suggest_eco_friendly_alternatives(GEMINI_API_KEY, product_details)

# # Display the result
# print("Product Alternatives and Details:")
# print(result)