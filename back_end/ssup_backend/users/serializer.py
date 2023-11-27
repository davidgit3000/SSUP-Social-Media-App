from rest_framework import serializers
from .models import *


class ReactSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UsersInfo
        fields = ['id', 'last_login', 'is_superuser',
                  'username', 'password',
                  'first_name', 'last_name', 'email', 'is_staff',
                  'is_active', 'date_joined', 'date_of_birth']

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = UsersInfo.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
