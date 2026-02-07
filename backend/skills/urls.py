from django.urls import path
from .views import SkillsView

urlpatterns = [
    path("", SkillsView.as_view()),
]
