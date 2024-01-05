from setuptools import setup, find_packages

setup(
    name="RickAndMortyApi",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask",
        # Lista de tus dependencias
    ],
    extras_require={
        'dev': ['pygame==1.9.6; platform_system != "AIX" and platform_python_implementation != "Jython"']
    },
)
