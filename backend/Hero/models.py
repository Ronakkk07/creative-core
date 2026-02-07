from django.db import models

# Create your models here.
class Hero(models.Model):
    eyebrow_text = models.CharField(max_length=100)
    title_words = models.JSONField()  
    subtitle = models.TextField()
    primary_cta_text = models.CharField(max_length=50)
    primary_cta_link = models.CharField(max_length=100)
    secondary_cta_text = models.CharField(max_length=50)
    secondary_cta_link = models.CharField(max_length=100)

    def __str__(self):
        return "Hero Section Content"