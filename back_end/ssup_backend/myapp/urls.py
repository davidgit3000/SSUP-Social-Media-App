from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('index/', views.index, name="index"),
    path('index/details/<int:id>', views.details, name='details'),
]