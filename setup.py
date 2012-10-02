from setuptools import setup, find_packages

__version__ = '0.0.1'

# baseline requirements that the core functionality requires
install_requires = [
    'django==1.4',
    'slumber==0.4.2',
    'jsonfield==0.9',
    'unidecode',
    'psycopg2==2.4.1',
    'django-orm-extensions',
    'logging_unterpolation',
    'django-bitfield,'
]

# in case additional setup needs to be done on different versions of python
extra_setup = {}

setup(
    name='cuesbey',
    version=__version__,
    description='Cube drafting webapp',
    author='Rob Dennis',
    author_email='rdennis+cuesbey@gmail.com',
    install_requires=install_requires,
    packages=find_packages(exclude=['ez_setup']),
    **extra_setup
)
