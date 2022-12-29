from django.forms import ModelForm
from app.models import Cursos

class CursosForm(ModelForm):
    class Meta:
        model = Cursos
        fields = ['curso', 'duracao', 'professor']