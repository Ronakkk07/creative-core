from django.db import models

# Create your models here.
class Experience(models.Model):
    TYPE_CHOICES = [
        ("work", "Work"),
        ("education", "Education"),
        ("award", "Award"),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    period = models.CharField(max_length=50)
    description = models.TextField()

    highlights = models.JSONField(default=list)

    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.company}"