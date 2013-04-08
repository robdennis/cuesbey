from cuesbey.settings import *

DEBUG = False 
TEMPLATE_DEBUG = False
STATIC_ROOT = '/home/ubuntu/static'
TUTOR_PATH = '/home/ubuntu/tutor/bin'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'cuesbey',                      # Or path to database file if using sqlite3.
        'USER': 'cuesbey',                      # Not used with sqlite3.
        'PASSWORD': 'cuesbey',                  # Not used with sqlite3.
        #http://jeffammons.net/2011/09/fixing-postgres-on-mac-10-7-tiger-for-django/
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}