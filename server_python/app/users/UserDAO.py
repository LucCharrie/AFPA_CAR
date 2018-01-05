from .usermodel import UserModel
import MySQLdb

class UserDao():    
    
    @staticmethod
    def create( user ):        
        db=MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)            
        sql = "INSERT INTO users(email, username, firstname, lastname, password_hash) \
              Values ('%s', '%s', '%s', '%s', '%s')"% \
            (user.email, user.username, user.firstname, user.lastname, user.password_hash)        
        try:
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()        
        
    @staticmethod
    def delete(id):
        db=MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql = "DELETE FROM users WHERE id = " + id + "'"       
        try:
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            
    @staticmethod
    def list():
        db=MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
 
        sql = "SELECT * FROM users" 
        liste = cursor.fetchall()
        return liste
    
    @staticmethod
    def findById(id):
        db=MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql= "SELECT * FROM users WHERE id='" + id + "'"
        cursor.execute(sql)
        result = cursor.fetchone
        user = UserModel(cursor.fetchone())
        return user
    
    @staticmethod
    def findByEmail(email):
        db = MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql = "SELECT * FROM users WHERE email='" + email + "'"
        
        try:
            cursor.execute(sql)
            user = UserModel(cursor.fetchone())
            return user
        except:
            return None
            
   
   
    @staticmethod
    def update(user):
        db = MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql = "UPDATE users SET firstname = '%s', lastname = '%s', age= '%s' WHERE id ='%s'"% (user.firstname, user.lastname, user.age, user.id)
        
        try:
            cursor.execute(sql)
            db.commit()
            
        except:
            db.rollback()
            

        