from django.db import models

# Create your models here.


class User(models.Model):
    openid = models.CharField(max_length=255)
    nickname = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255)
