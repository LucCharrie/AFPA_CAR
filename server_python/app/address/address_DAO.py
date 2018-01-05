from .address_model import Address
import MySQLdb

class Address_Dao():    
    
    @staticmethod
    def create( address ):        
        db = MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)            
        sql = "INSERT INTO address( street, city, lattitude, longitude, zip_code, numero, rep) \
              Values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')"% \
            (address.street,
             address.city,
             address.lattitude,
             address.longitude,
             address.zip_code,
             address.numero,
             address.rep)
        
        try:
            cursor.execute(sql)
            db.commit()
            
        except:
            db.rollback()        
        
    @staticmethod
    def delete(id):
        db=MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql = "DELETE FROM address WHERE id = '" + id + "'"        
        try:
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            
    @staticmethod
    def list():
        db = MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
 
        sql = "SELECT * FROM address"
        liste = cursor.fetchall()
        return liste
    
    @staticmethod
    def findById(id):
        db = MySQLdb.connect("localhost", "root", "afpa", "afpacar") #adresse IP, nom utilisateur, mot de passe, nom de la db
        cursor = db.cursor(MySQLdb.cursors.DictCursor)        
        sql = "SELECT * FROM adress WHERE id='" + id + "'"
        cursor.execute(sql)
        result = cursor.fetchone
        address = Address(cursor.fetchone())
        return address

