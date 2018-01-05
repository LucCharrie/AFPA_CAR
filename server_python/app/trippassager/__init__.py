from flask import Blueprint

trippassager = Blueprint('trippassager', __name__)

from . import views

#Obligatoire pour exporter le module
