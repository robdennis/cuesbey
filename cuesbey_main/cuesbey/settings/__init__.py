# Django settings for cuesbey project.
import os
import djcelery
djcelery.setup_loader()

DEBUG = True
TEMPLATE_DEBUG = DEBUG

REDIS_INFORMATION = dict(host='localhost', port=6379, db=0)
_redis = 'redis://{host}:{port}/{db}'.format(**REDIS_INFORMATION)
BROKER_URL = _redis
CELERY_RESULT_BACKEND = _redis

TUTOR_PATH = os.path.expanduser(
    os.path.join("~", "development", "tutor", "bin", "tutor")
)

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

SERIALIZATION_MODULES = {
    'card_json': 'cuesbey_main.cube_diff.models'
}

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'cuesbey',                      # Or path to database file if using sqlite3.
        'USER': 'cuesbey',                      # Not used with sqlite3.
        'PASSWORD': 'cuesbey',                  # Not used with sqlite3.
        #http://jeffammons.net/2011/09/fixing-postgres-on-mac-10-7-tiger-for-django/
        'HOST': '/tmp',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/New_York'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'djangular.finders.NamespacedAngularAppDirectoriesFinder'
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'xd_eaybzmsbuft%h&amp;6+!&amp;dnjo(9!a31f*4qw3wyd%$#&amp;ha@rfs'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'djangular.middleware.AngularJsonVulnerabilityMiddleware',
)

ROOT_URLCONF = 'cuesbey.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'cuesbey.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'django.contrib.admindocs',
    'django.contrib.staticfiles',
    'djangular',
    'cube_diff',
    'djcelery',
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'normal': {
            'format': '%(levelname)s %(asctime)s %(message)s'
        }
    },

    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'cuesbey.get',
            'formatter': 'normal'
        }, 'console': {
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter': 'normal'
        },
    },

    'loggers': {
        'cuesbey_main': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'cube_viewer': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'cuesbey': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        }


    },
}
