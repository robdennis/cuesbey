import cuesbey.settings as settings
from django.conf.urls import patterns, url, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin

from cube_viewer.views import CubeView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'cuesbey.views.home', name='home'),
    # url(r'^cuesbey/', include('cuesbey.foo.urls')),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^cube/', CubeView.as_view()),
    url(r'^$', CubeView.as_view()),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
