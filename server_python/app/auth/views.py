# app/auth/views.py
import datetime
from flask import flash, redirect, render_template, url_for
from flask_login import login_required, login_user, logout_user
from . import auth
from forms import LoginForm, RegistrationForm #Formulaire inscription et connexion
from .. import db
#from ..usermodel import UserModel
#from ..UserDAO import UserDao
from ..users.UserDAO import UserDao
from ..users.usermodel import UserModel
from ..users.user_service import UserService
#from userD

#from ..Services.user_service import UserService
import MySQLdb
datetime.datetime.now()

@auth.route('/signup', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        dictionary={"id": None,
                    "username": form.username.data,
                    "email": form.email.data,
                    "password_hash": UserModel.hash_password(form.password.data),
                    "idafpa": None,
                    "firstname": form.firstname.data,
                    "lastname": form.lastname.data,
                    "sex": None,
                    "Birthday": None,
                    "created_at": datetime.datetime.now(),
                    "roles": None
                    }
        
        user = UserModel(dictionary)
        UserService.create(user)
        flash('You have successfully registered! You may now login.')
        # redirection vers login
        return redirect(url_for('auth.signin'))
    # redirection vers inscription si erreur avec formulaire prerempli
    return render_template('signup.html', form=form, title ='signup')

@auth.route('/', methods=['GET', 'POST'])
@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    form = LoginForm()
    if form.validate_on_submit():
        user = UserService.login(form.email.data)
        if user is not None:
            if UserService.checkpassword(user, form.password.data):
                login_user(user)
                return redirect(url_for('home.homepage'))
        else:            
            flash('Invalid email or password.')

        # Renvoie le template de connexion en cas d'erreur ou des que la page est appelee
    return render_template('signin.html', form=form, title='Login')