from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Hero
from .serializers import HeroSerializer

@api_view(["GET"])
def hero_content(request):
    hero = Hero.objects.first()
    serializer = HeroSerializer(hero)
    return Response(serializer.data)
