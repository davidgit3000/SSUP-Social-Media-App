from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from .models import *

# Create your views here.


class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        name = [{"firstname": name.firstname, "lastname": name.lastname}
                for name in Name.objects.all()]
        return Response(name)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


# def main(request):
#     template = loader.get_template('main.html')
#     return HttpResponse(template.render())

# def index(request):
#     mydemo = Demo.objects.all().values()
#     template = loader.get_template("index.html")
#     context = {
#         'mydemo': mydemo,
#     }
#     return HttpResponse(template.render(context, request))

# def details(request, id):
#     demo = Demo.objects.get(id=id)
#     template = loader.get_template('details.html')
#     context = {
#         'demo': demo,
#     }
#     return HttpResponse(template.render(context, request))
