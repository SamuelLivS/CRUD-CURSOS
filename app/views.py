from django.shortcuts import render, redirect
from app.forms import CursosForm
from app.models import Cursos
from django.http import JsonResponse


# Create your views here.
def home(request):
    data = {}
    data['db'] = read_data()
    print(data)
    return render(request, 'index.html', data)

def form(request):
    data = {}
    data['txt'] = {'title':'Novo curso'}
    data['form'] = CursosForm()
    return render(request, 'form.html', data)

def create(request):
    form = CursosForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('home')

def edit(request, pk):
    data = {}
    data['db'] = read_data(pk)
    nome_curso = data['db'].curso
    data['txt'] = {'title':f'Alterar curso {nome_curso}'}
    data['form'] = CursosForm(instance=data['db'])
    return render(request, 'form.html', data)

def update(request, pk):
    data = {}
    data['db'] = read_data(pk)
    form = CursosForm(request.POST or None, instance=data['db'])
    if form.is_valid():
        form.save()
        return redirect('home')

def delete(request, pk):
    db = read_data(pk)
    db.delete()
    return redirect('home')

def read_data(pk=0):
    if pk:
        return Cursos.objects.get(pk=pk)
    else:
        return Cursos.objects.all()

def list_database(request):
    data = {}
    data['dbs'] = Cursos.objects.all().values()
    return JsonResponse({"models_to_return": list(data['dbs'])})
