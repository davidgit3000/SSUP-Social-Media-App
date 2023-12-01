from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class UsersInfo(AbstractUser):
    date_of_birth = models.DateField(null=True)
    role = models.CharField(max_length=100, null=True)
    is_online = models.BooleanField(default=False)
