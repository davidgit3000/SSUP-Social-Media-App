from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import *
from .serializer import *

# Create your views here.


class UserLoginView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        users = [{"username": user.username, "password": user.password}
                 for user in UsersInfo.objects.all()]
        return Response(users)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        print(username, ' ', password, ' --- testing post()')
        user = authenticate(username=username, password=password)
        print(user, 'testing authenticate()')
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserSignupView(APIView):
    def post(self, request):
        serializer = ReactSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
