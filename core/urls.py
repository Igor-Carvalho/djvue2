"""Core urls."""

from django.conf import urls

from . import views

app_name = 'core'

urlpatterns = [
    urls.url(r'^$', views.index, name='index')
]
