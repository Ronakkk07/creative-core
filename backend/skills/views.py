from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SkillCategory, TechStack
from .serializers import SkillCategorySerializer, TechStackSerializer

class SkillsView(APIView):
    def get(self, request):
        categories = SkillCategory.objects.all()
        tech_stack = TechStack.objects.all()

        return Response({
            "categories": SkillCategorySerializer(categories, many=True).data,
            "tech_stack": TechStackSerializer(tech_stack, many=True).data
        })
