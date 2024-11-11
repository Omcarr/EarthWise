from django.urls import path
from .views import *

urlpatterns = [
    # path('', home, name='home'),
    path('api/chatbot/', chatbot_api, name='chatbot_api'),
    path('api/extension-data/', extension_data, name='extension_data'),
    path('api/analyze/', analyze_transport, name='analyze_transport'), 

]
