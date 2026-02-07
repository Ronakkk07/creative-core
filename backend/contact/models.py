from django.db import models

# Create your models here.
class ContactInfo(models.Model):
    email = models.EmailField()
    location = models.CharField(max_length=200)

    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    leetcode = models.URLField(blank=True, null=True)

    def __str__(self):
        return "Contact Info"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"