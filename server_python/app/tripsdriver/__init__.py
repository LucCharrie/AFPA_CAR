from flask import Blueprint

tripsdriver = Blueprint('tripsdriver', __name__)

from . import views

#Obligatoire pour exporter le module
