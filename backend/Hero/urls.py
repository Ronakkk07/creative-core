from django.urls import path
from .views import hero_content

urlpatterns = [
    path("hero/", hero_content),
]
