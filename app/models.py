from django.db import models

# Create your models here.
class Cursos(models.Model):
    curso = models.CharField(max_length=150)
    duracao = models.IntegerField()
    professor = models.CharField(max_length=100)