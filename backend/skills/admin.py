from django.contrib import admin
from .models import SkillCategory, Skill, TechStack
# Register your models here.
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(TechStack)