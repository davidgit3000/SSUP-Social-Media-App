"""
URL configuration for ssup_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from users.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', UserStats.as_view(), name='user_api'),
    path('api/users/username=<str:param>',
         IndividualUser.as_view(), name="individual_user"),
    path('api/login', UserLoginView.as_view(), name='user_login'),
    path('api/signup', UserSignupView.as_view(), name='user_signup'),
    path('api/online_status', OnlineStatusView.as_view(), name='online_status'),
    path('api/logout', LogoutView.as_view(), name='logout'),
    path('api/posts/', PostsListView.as_view(), name='posts'),
    path('api/posts/<str:name>', IndividualPost.as_view(), name='post_removal'),
    path('api/post_status/id=<int:post_id>', UpdateIndividualPost.as_view(), name='update_post_status'),
]
