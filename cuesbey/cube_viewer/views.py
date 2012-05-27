# Create your views here.
from django.views.generic import ListView

from cube_viewer.models import Cube

class CubeView(ListView):
    template_name = "cube_view.html"

    model = Cube
    context_object_name = 'cubes'