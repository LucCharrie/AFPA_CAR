# app/auth/forms.py

from flask_wtf import FlaskForm
from flask_bootstrap import Bootstrap
from wtforms import PasswordField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, EqualTo

#from ..usermodel import UserModel
from ..users.usermodel import UserModel

#Formulaire de creation de compte
class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])  #verfication email valide (forme uniquement)
    username = StringField('Username', validators=[DataRequired()])
    firstname = StringField('First Name', validators=[DataRequired()])
    lastname = StringField('Last Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[
                                        DataRequired(),
                                        EqualTo('confirm_password') #verification mot de passe identique
                                        ])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Register')  #validation
    
    #fonction de verification d'email non enregistre
    def validate_email(self, field):
        if UserModel.query.filter_by(email=field.data).first():
            raise ValidationError('Email is already in use.')

    #fonction de verification d'username non enregistre
    def validate_username(self, field):
        if UserModel.query.filter_by(username=field.data).first():
            raise ValidationError('Username is already in use.')

# Formulaire de connexion
class LoginForm(FlaskForm):
    """
    Form for users to login
    """
    email = StringField('Email', validators=[DataRequired(), Email()]) #verification email valide (forme uniquement)
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')