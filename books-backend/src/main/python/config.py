from flask import Flask
from flask_cors import CORS
from pyswip import Prolog

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])

prolog = Prolog()
prolog.consult("books.pl") 