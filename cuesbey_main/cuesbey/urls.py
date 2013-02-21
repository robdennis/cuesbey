from django.conf.urls import patterns, url, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^djangular/', include('djangular.urls'))
)