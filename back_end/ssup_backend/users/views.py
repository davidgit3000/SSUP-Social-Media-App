from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
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
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            expiration_time = datetime.now(
            ) + timedelta(seconds=refresh.access_token.lifetime.total_seconds())

            return Response({'token': access_token,
                             'expiration_time': expiration_time},
                            status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Incorrect username or password'}, status=status.HTTP_401_UNAUTHORIZED)


class UserSignupView(APIView):
    def post(self, request):
        serializer = ReactSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStats(APIView):
    def get(self, request):
        name = [{"username": name.username,
                 "firstname": name.first_name,
                 "lastname": name.last_name}
                for name in UsersInfo.objects.all()]
        return Response(name)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class IndividualUser(APIView):
    def get(self, request, param):
        for name in UsersInfo.objects.all():
            if name.username == param:
                user = [{"username": name.username,
                        "firstname": name.first_name,
                         "lastname": name.last_name}]
                break
        return Response(user)
