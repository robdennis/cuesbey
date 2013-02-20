import cuesbey_main.cuesbey.settings as settings
from django.conf.urls import patterns, url, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin

from cuesbey_main.cube_viewer.views import CubeView, details, cube_contents, diff, card_contents

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'cuesbey.views.home', name='home'),
    # url(r'^cuesbey/', include('cuesbey.foo.urls')),
#    url(r'^$', CubeView.as_view()),
    url(r'^$', diff),
#    url(r'^admin/doc/$', include('django.contrib.admindocs.urls')),
#    url(r'^admin/$', include(admin.site.urls)),
#    url(r'^cubes/$', CubeView.as_view()),
#    url(r'^cube/(?P<id>\w+)/$', details),
#    url(r'^cube_content/$', cube_contents)
    url(r'^card_contents/?$', card_contents)
)

urlpatterns += patterns('django.views.generic.simple',
    (r'(.+\.html)$', 'direct_to_template')
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += patterns('',
        url(r'^file_content/(?P<file_name>.+)/$', cube_contents)
    )
