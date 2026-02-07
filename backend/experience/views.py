from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Experience
from .serializers import ExperienceSerializer

@api_view(["GET"])
def experience_list(request):
    experiences = Experience.objects.all().order_by("order")
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)
