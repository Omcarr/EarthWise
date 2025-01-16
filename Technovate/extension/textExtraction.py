import cv2
import numpy as np
import pytesseract
import re
import matplotlib.pyplot as plt
import genai  
import json
import requests
import os
# Your Gemini API key (replace with your actual key)
GEMINI_API_KEY = "your key"

# Function to load an image from a relative file path
def load_image(file_path):
    # Read the image in BGR format
    image = cv2.imread(file_path, cv2.IMREAD_COLOR)
    return image

# Function to display the image
def display_image(image, title='Image'):
    # Convert BGR image to RGB for displaying with matplotlib
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    plt.imshow(image_rgb)
    plt.title(title)
    plt.axis('off')
    plt.show()

# Function to preprocess the image
def preprocess_image(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply binary thresholding
    _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    
    return binary

# Function to extract text using OCR
def extract_text_from_image(image):
    # Use Tesseract to extract text from the preprocessed image
    ocr_result = pytesseract.image_to_string(image)
    return ocr_result

# Function to filter useful and eco-friendly products
def filter_useful_and_eco_friendly_products(products):
    # Filter out products with unclear names or low prices
    filtered_products = []
    
    for name, product in products.items():
        # Check if the product name is sufficiently long and has reasonable price and quantity
        if len(product['name'].strip()) > 3 and product['price'] > 0 and product['quantity'] > 0:
            filtered_products.append(product)
    
    return filtered_products

# Function to parse extracted text and structure it into a dictionary
def parse_product_information(text):
    product_info = {}

    # List of regex patterns to capture product information
    patterns = [
        # Matches: "Product Name", quantity, and price (with optional symbols like currency)
        re.compile(r'([A-Za-z\s]+(?:[A-Za-z]+))\s+(\d+)\s*(?:[A-Za-z\s]*[\d.,]*)\s*([\d.,]+)'),
        
        # Matches: Product name, quantity, price (with optional unit and different formats)
        re.compile(r'([A-Za-z\s]+(?:[A-Za-z]+))\s+(\d+)\s*(?:[A-Za-z]*\s*[\d.,]*)\s*([₹$€]*\d+(?:[\.,]\d{1,2})?)'),
        
        # Matches: Product name, quantity, price (in case currency symbols and commas are used)
        re.compile(r'([A-Za-z\s]+(?:[A-Za-z]+))\s+(\d+)\s*(?:[A-Za-z]*\s*(?:₹|\$|€|INR|\d+)\s*([\d.,]+))'),
        
        # Matches: More complicated product formats with optional date and tax information
        re.compile(r'([A-Za-z\s]+(?:[A-Za-z]+))\s+(\d+)\s*(?:[\d.,]*)([\d.,]+)'),
        
        # Matches price in the format like `80.00`, with or without commas
        re.compile(r'([A-Za-z\s]+(?:[A-Za-z]+))\s+(\d+)\s*([\d]{1,3}(?:[.,][\d]{1,2})?)')
    ]

    # Try all regex patterns until a valid match is found
    for pattern in patterns:
        matches = pattern.findall(text)
        if matches:
            # If matches are found, process each match
            for match in matches:
                name = match[0].strip()
                quantity = int(match[1])
                price = float(match[2].replace(',', '').replace('₹', '').replace('$', '').replace('€', ''))
                
                # Basic filter to exclude unlikely matches
                if len(name) > 3 and any(char.isalpha() for char in name):
                    product_info[name] = {'name': name, 'quantity': quantity, 'price': price}

    # Filter the products based on eco-friendliness and usefulness
    filtered_product_info = filter_useful_and_eco_friendly_products(product_info)
    
    return filtered_product_info

# Function to make a request to Gemini API
def get_response_from_gemini(prompt):
    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
    api_key = os.environ["GMAPS_API_KEY"]  # Replace with your actual API key
    
    # Define headers
    headers = {
        'Content-Type': 'application/json',
    }

    # Define the data payload with the provided prompt
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

    # Add the API key as a query parameter
    url_with_api_key = f"{url}?key={api_key}"

    # Send POST request to the Gemini API
    response = requests.post(url_with_api_key, headers=headers, data=json.dumps(data))

    # Check if the request was successful
    if response.status_code == 200:
        response_json = response.json()
        
        # Extract the text content from the response
        try:
            # Assuming the response structure as shown in the provided example
            text_response = response_json['candidates'][0]['content']['parts'][0]['text']
            
            # Print the formatted response as plain text
            return text_response
    
        except KeyError as e:
            print(f"Error extracting data from response: {e}")
            return None
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Main function to load, process, and extract product information, and use Gemini API
def main():
    # Input relative path of the image file
    image_path = "1.jpg"

    # Load the image
    image = load_image(image_path)
    
    # Display the loaded image
    display_image(image, title='Original Image')
    
    # Preprocess the image
    preprocessed_image = preprocess_image(image)
    
    # Display the preprocessed image
    display_image(preprocessed_image, title='Preprocessed Image')
    
    # Extract text from the image using OCR
    extracted_text = extract_text_from_image(preprocessed_image)
    
    # Print extracted text
    print("Extracted Text:")
    print(extracted_text)
    
    # Parse the extracted text for product information
    product_info = parse_product_information(extracted_text)
    
    # Display parsed product information
    print("\nParsed Product Information:")
    print(product_info)
    
    # Prepare the prompt with the product information to send to Gemini API
    prompt = f"""
Here is my full data extracted from a shopping bill: {product_info}. There is a lot of garbage information which means nothing
so want you to extract the real product names on the basis of your information, product prices, and their quantities and print them later,
for each product, rate it on a scale of 1-5 based on how eco-friendly, green, or sustainable it is. 
Provide a comment on how the product can be made more eco-friendly or sustainable, or suggest any similar alternative products that are greener or more environmentally responsible.
Give everything in proper json format
"""

    # Get the response from Gemini API
    gemini_response = get_response_from_gemini(prompt)
    
    # Display the Gemini response
    print("\nGemini API Response:")
    print(gemini_response)

# # Run the main function
# if __name__ == "__main__":
#     main()