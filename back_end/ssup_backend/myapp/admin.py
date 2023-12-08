from django.contrib import admin
from .models import *

# Register your models here.


class Admin(admin.ModelAdmin):
    list_display = ("firstname", "lastname")


admin.site.register(Name, Admin)
