from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    description = models.TextField()
    problem = models.TextField()
    solution = models.TextField()
    impact = models.TextField()

    tags = models.JSONField()
    image = models.URLField()

    color = models.CharField(max_length=100)

    project_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title