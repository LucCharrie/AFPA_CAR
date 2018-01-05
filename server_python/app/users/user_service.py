#from app.UserDAO import UserDao
from .UserDAO import UserDao
from flask_login import login_required, login_user, logout_user
class UserService():
    
    @staticmethod
    def create(user):
        UserDao.create(user)
        
    @staticmethod
    def signin(email):
        return UserDao.findByEmail(email)
    
    @staticmethod
    def login(email):
        user = UserDao.findByEmail(email)
        return user
    
    @staticmethod
    def checkpassword(user, password):
        if user.check_password(password):
            return True    
