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
)