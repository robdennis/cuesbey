from cuesbey.settings import *

# http://stackoverflow.com/questions/15128135/django-setting-debug-false-causes-500-error
ALLOWED_HOSTS = ['cuesbey.com']
DEBUG = False 
TEMPLATE_DEBUG = False
STATIC_ROOT = '/home/ubuntu/static'
TUTOR_PATH = '/home/ubuntu/tutor/bin/tutor'

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

ADMINS = [('Rob', 'rdennis+cuesbey@gmail.com')]
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'normal': {
            'format': '%(levelname)s %(asctime)s %(message)s'
        }
    },

    'handlers': {
        'syslog': {
            'level':'DEBUG',
            'class':'logging.handlers.SysLogHandler',
            'formatter': 'normal',
            'address': '/dev/log'
        },
    },

    'root': {
            'handlers': ['syslog'],
            'level': 'DEBUG',
            'propagate': True
    },
}
