from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.


class UsersInfo(AbstractUser):
    id = models.AutoField(primary_key=True)
    date_of_birth = models.DateField(null=True)
    last_login = models.DateTimeField(default=timezone.now)
    role = models.CharField(max_length=100, null=True)
    is_online = models.BooleanField(default=False)


class Posts(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        UsersInfo, on_delete=models.CASCADE, related_name='posts', default=1)
    firstname = models.CharField(max_length=100, null=True)
    lastname = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100, null=True)
    content = models.TextField(null=True)
    datePosted = models.DateTimeField(default=timezone.now)
    isLiked = models.BooleanField(default=False, null=True)
    isFollowing = models.BooleanField(default=False, null=True)
    numLikes = models.IntegerField(default=0, null=True)
    numComments = models.IntegerField(default=0, null=True)
    numShares = models.IntegerField(default=0, null=True)
