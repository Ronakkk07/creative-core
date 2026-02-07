from rest_framework import serializers
from .models import SkillCategory, Skill, TechStack

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "level"]

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = SkillCategory
        fields = ["id", "name", "skills"]

class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ["name"]
