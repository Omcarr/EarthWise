from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
import logging
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .chatbot import get_chatbot_response
from urllib.parse import unquote
from .transport import *
from .maps import *
import os

logger = logging.getLogger(__name__)

@api_view(['POST'])
def product_list(request):
    logger.info(f'Received data: {request.data}')  # Log for debugging
    
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)  # Validate data against the serializer
        if serializer.is_valid():
            product = serializer.save()  # Save the product instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def home(request):
#     return render( request, 'extension/home.html')




@api_view(['GET'])
def extension_data(request):
    product_name = request.GET.get('product_name', '')  # Get the product name from query parameters
    
    logger.info(f"Received product_name: {product_name}")

    if not product_name:
        logger.error("No product name provided in the request")
        return Response({"error": "No product name provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Decode the product name if it is URL-encoded
    decoded_product_name = unquote(product_name)
    logger.info(f"Decoded product_name: {decoded_product_name}")

    # Split the product name into words and take the first few (e.g., 3 words)
    words = decoded_product_name.split()
    first_words = " ".join(words[:3])  # Change the number 3 to any other value depending on how many words you want to match

    logger.info(f"Using first words for search: {first_words}")

    # Use icontains to perform a case-insensitive partial match based on first few words
    products = Product.objects.filter(title__icontains=first_words)
    
    # Log the query results for debugging
    logger.info(f"Searching for products with title containing: {first_words}")
    for product in products:
        logger.info(f"Found product: {product.title}")

    if products.exists():
        # For simplicity, return the first matching product (or modify for more if needed)
        product = products.first()  # Or handle multiple products if necessary
        eco_alternatives = product.eco_alternatives.all()  # Get the related eco alternatives

        # Prepare the eco alternatives list
        eco_list = [{
            "name": eco.name,
            "price": eco.price,
            "description": eco.description,
            "url": eco.url,  # Assuming you have a URL field in the EcoAlternative model
            "image": eco.image.url if eco.image else None,  # Assuming `image` is an ImageField
            "eco_rating": eco.eco_rating  # Assuming you have an eco_rating field in the EcoAlternative model
        } for eco in eco_alternatives]

        return Response({
            "product": product.title,
            "eco_alternatives": eco_list
        }, status=status.HTTP_200_OK)
    else:
        logger.warning(f"No products found matching '{first_words}'")
        return Response({"error": "No products found matching the given name"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET', 'POST'])
def chatbot_api(request):
    if request.method == "POST":
        user_input = request.data.get('user_input', None)
        print(f"Received user input: {user_input}")  # Print the user input

        if user_input:
            response_text = get_chatbot_response(user_input)
            # response_text=response_text[:200]
            print(f"Chatbot response: {response_text}")  # Print the chatbot response
            if response_text:
                return Response({"response": response_text}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No response from chatbot"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": "Bad Request: user_input is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        welcome_message = "Welcome to the Eco-Friendly Chatbot API. Send a POST request with your prompt."
        print(welcome_message)  # Print the welcome message
        return Response({"message": welcome_message})


@api_view(['GET'])
def analyze_transport(request):
    """API endpoint that retrieves and processes a JSON file based on the month specified."""
    # Retrieve the month from the query parameter
    month = request.GET.get('month', None)
    

    # Check if the month parameter is provided
    if not month:
        return Response({'error': 'Month parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Normalize the month string (lowercase)
    month = month.upper()

    # Validate the month
    valid_months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ]
    if month not in valid_months:
        return Response({'error': 'Invalid month specified'}, status=status.HTTP_400_BAD_REQUEST)

    # Construct the file path based on the month
    file_name = f'2024_{month}.json'  # Adjust the naming convention as needed
    file_path = os.path.join('/home/omkar/Documents/tech_extension/Technovate/media/', file_name)  # Replace with the correct path to your files
    print(file_path)

    # Check if the file exists
    if not os.path.exists(file_path):
        return Response({'error': f'File not found: {file_name}'}, status=status.HTTP_404_NOT_FOUND)

    # Process the JSON file using TransportAnalyzer
    try:
        analyzer = TransportAnalyzer(file_path)
        result = analyzer.analyze()  # Analyzes the data
        formatted_result = format_result(result)  # Formats the result with two decimal places
        return Response(formatted_result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




