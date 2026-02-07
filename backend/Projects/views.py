from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

@api_view(["GET"])
def project_list(request):
    projects = Project.objects.all().order_by("-created_at")
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
