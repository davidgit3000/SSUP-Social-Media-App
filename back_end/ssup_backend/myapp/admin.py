from django.contrib import admin
from .models import Demo

# Register your models here.
class Admin(admin.ModelAdmin):
    list_display = ("firstname", "lastname")

admin.site.register(Demo, Admin)
