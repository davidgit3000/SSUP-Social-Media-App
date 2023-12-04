from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from django.contrib.auth import authenticate, login
from .models import *
from .serializer import *
from datetime import datetime

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
        # print(username, ' ', password, ' --- testing post()')
        user = authenticate(username=username, password=password)
        # print(user, 'testing authenticate()')
        if user is not None:
            login(request, user)
            user.is_online = True
            user.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            expiration_time = datetime.now(
            ) + timedelta(seconds=refresh.access_token.lifetime.total_seconds())
            print(expiration_time)
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
        name = [{"id": name.id,
                "username": name.username,
                 "firstname": name.first_name,
                 "lastname": name.last_name,
                 "is_online": name.is_online}
                for name in UsersInfo.objects.all()]
        return Response(name)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class IndividualUser(APIView):
    def get(self, request, param):
        name = UsersInfo.objects.get(username=param)
        user = [{"id": name.id,
                 "username": name.username,
                "firstname": name.first_name,
                 "lastname": name.last_name,
                 "is_online": name.is_online}]

        return Response(user)


class OnlineStatusView(APIView):
    def get(self, request):
        users_online = UsersInfo.objects.filter(is_online=True)
        serialized_users = [{'username': user.username, 'is_online': user.is_online}
                            for user in users_online]
        return Response(serialized_users)

    def post(self, request):
        username = request.data.get("username")
        is_online = request.data.get("is_online")

        try:
            user = UsersInfo.objects.get(username=username)
            user.is_online = is_online
            user.save()

            return Response({'message': 'Online status updated'}, status=status.HTTP_200_OK)
        except UsersInfo.DoesNotExist:
            return Response({'Message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    def get(self, request):
        users_offline = UsersInfo.objects.filter(is_online=False)
        serialized_users = [{'username': user.username, 'is_online': user.is_online}
                            for user in users_offline]
        return Response(serialized_users)

    def post(self, request):
        username = request.data.get("username")

        try:
            user = UsersInfo.objects.get(username=username)
            user.is_online = False
            user.save()
            return Response({'message': 'Logged out successfully and offline status set'},
                            status=status.HTTP_200_OK)
        except UsersInfo.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class PostsListView(APIView):
    def get(self, request):
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)

        formatted_posts = []
        for post in serializer.data:
            # Format datePosted using strftime
            if 'datePosted' in post:
                print(post['datePosted'])
                post['datePosted'] = format_date(post['datePosted'])

            formatted_posts.append(post)

        return Response(formatted_posts)

    def post(self, request):
        serializer = PostsSerializer(data=request.data)

        userID = request.data.get('user_id')
        try:
            user = UsersInfo.objects.get(id=userID)
        except UsersInfo.DoesNotExist:
            return Response({'error': 'Invalid user_id'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IndividualPost(APIView):
    def get(self, request, name):
        posts = Posts.objects.filter(username=name)
        serializer = PostsSerializer(posts, many=True)

        formatted_posts = []
        for post in serializer.data:
            # Format datePosted using strftime
            if 'datePosted' in post:
                print(post['datePosted'])
                post['datePosted'] = format_date(post['datePosted'])

            formatted_posts.append(post)

        return Response(formatted_posts)


class UpdateIndividualPost(APIView):
    def get(self, request, post_id):
        try:
            post = Posts.objects.get(id=post_id)
            serializer = PostsSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Posts.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id):
        try:
            numLikes = request.data.get("numLikes")
            isLiked = request.data.get("isLiked")
            isFollowing = request.data.get("isFollowing")
            post = Posts.objects.get(id=post_id)
            post.numLikes = numLikes
            post.isLiked = isLiked
            post.isFollowing = isFollowing
            post.save()
            return Response({'message': 'Update numLikes successfully'},
                            status=status.HTTP_201_CREATED)

        except Posts.DoesNotExist:
            return Response({'error': 'PostID not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, post_id):
        try:
            post = Posts.objects.get(id=post_id)
        except Posts.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        post.delete()
        return Response({'message': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


def format_date(dateStr):
    try:
        # Adjust format to match datetime string with timezone offset
        formatted_date = datetime.strptime(
            dateStr, '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%A - %B %d, %Y | %H:%M")
        return formatted_date
    except ValueError as e:
        return "Invalid Date"
