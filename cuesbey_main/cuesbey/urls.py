from django.conf.urls import patterns, url, include
from django.contrib import admin

from cuesbey_main.cube_diff.views import card_contents

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^djangular/', include('djangular.urls')),
                       url(r'^card_contents/?$', card_contents)
)