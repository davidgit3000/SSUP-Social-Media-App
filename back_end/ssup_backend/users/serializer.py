from rest_framework import serializers
from .models import *


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['id', 'user_id', 'firstname', 'lastname',
                  'username', 'content', 'datePosted',
                  'numLikes', 'isLiked', 'isFollowing',
                  'numComments', 'numShares']


class ReactSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    posts = PostsSerializer(many=True, read_only=True)

    class Meta:
        model = UsersInfo
        fields = ['id', 'last_login', 'is_superuser',
                  'username', 'password',
                  'first_name', 'last_name', 'email', 'is_staff',
                  'is_active', 'date_joined', 'date_of_birth', 'role', 'is_online', 'posts']

    def create(self, validated_data):
        password = validated_data.pop("password")
        post_data = validated_data.pop('post', [])
        user = UsersInfo.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        for post_data in post_data:
            Posts.objects.create(user=user, **post_data)

        return user
