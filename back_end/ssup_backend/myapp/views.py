from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Demo

# Create your views here.
def main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())
    
def index(request):
    mydemo = Demo.objects.all().values()
    template = loader.get_template("index.html")
    context = {
        'mydemo': mydemo,
    }
    return HttpResponse(template.render(context, request))

def details(request, id):
    demo = Demo.objects.get(id=id)
    template = loader.get_template('details.html')
    context = {
        'demo': demo,
    }
    return HttpResponse(template.render(context, request))
