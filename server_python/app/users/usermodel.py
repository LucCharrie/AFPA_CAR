import datetime
import hashlib
import uuid

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager

#Creation du modele user
class UserModel(UserMixin, db.Model):

    #On s assure que la table est nommee au pluriel
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), index=True, unique=True)
    email = db.Column(db.String(80), index=True, unique=True)
    password_hash = db.Column(db.String(255))
    idafpa = db.Column(db.String(45), unique= True, nullable = True)
    firstname = db.Column(db.String(45), index=True)
    lastname = db.Column(db.String(45), index=True)
    sex = db.Column(db.String(1), default = False)
    birthday = db.Column(db.Date, nullable = True)
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    roles = db.Column(db.String(45), default = "")

    #Constructeur de la classe               
    def __init__(self, dictionary):
        for k, v in dictionary.items():
            setattr(self, k, v)    
        
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute.')

    #Cryptage du mot de passe avant stockage dans la db
    @staticmethod
    def hash_password(password):
        return hashlib.sha1(password).hexdigest()
    
    #Verification du mot de passe avec le mot de passe crypte
    def check_password(self, password):
        if hashlib.sha1(password).hexdigest() == self.password_hash:
            return True
    
    #Sert a afficher les attributs du modele
    def __repr__(self):
        return '<UserModel:{},{},{},{},{},{},{},{},{},{}>'.format(self.id, self.username, self.email, self.password_hash, self.idafpa, self.firstname, self.lastname, self.sex, self.birthday, self.created_at)

# User Loader
@login_manager.user_loader
def load_user(users_id):
    return UserModel.query.get(int(users_id))