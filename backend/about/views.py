from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AboutInfo
from .serializers import AboutSerializer

class AboutView(APIView):
    def get(self, request):
        about = AboutInfo.objects.first()
        serializer = AboutSerializer(about)
        return Response(serializer.data)
