from flask import Flask, request, redirect, flash, render_template, url_for
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/character/<number>', methods = ['GET'])
def char(number):
    data = requests.get(f"https://rickandmortyapi.com/api/character/{number}")
    data = data.json()
    return data

@app.route('/allCharacters/', methods = ['GET'])
@app.route('/allCharacters/<page>', methods = ['GET'])
def all(page=None):
    if page:
        data = requests.get(f"https://rickandmortyapi.com/api/character/?page={page}")
    else:
        data = requests.get(f"https://rickandmortyapi.com/api/character/?page={1}")
    data = data.json()
    return data

if __name__ == '__main__':
    app.run(port=8080, debug = True)