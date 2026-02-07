from django.db import models

# Create your models here.
class AboutInfo(models.Model):
    title = models.CharField(max_length=200)
    subtitle_highlight = models.CharField(max_length=200)

    paragraph1 = models.TextField()
    paragraph2 = models.TextField()

    years_experience = models.CharField(max_length=20)
    projects_delivered = models.CharField(max_length=20)
    happy_clients = models.CharField(max_length=20)

    def __str__(self):
        return "About Section"

class Value(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()

    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title