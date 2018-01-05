from app.UserDAO import UserDao

class UserService():
    
    @staticmethod
    def create(user):
        UserDao.create(user)