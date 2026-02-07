from django.db import models

# Create your models here.
class SkillCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(
        SkillCategory,
        related_name="skills",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    level = models.IntegerField()

    def __str__(self):
        return self.name


class TechStack(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name