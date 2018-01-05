from app import db

class Address(db.Model):

    #On s assure que la table est nommee au pluriel
    __tablename__ = 'adress'

    id_address = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(255))
    city = db.Column(db.String(255))
    lattitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    zip_code = db.Column(db.Integer)
    numero = db.Column(db.Integer)
    rep = db.Column(db.String(15)) #bis/ter
    
    #Constructeur de la classe               
    def __init__(self, dictionary):
        for key, value in dictionary.items():
            setattr(self, key, value)    
        

    #Sert a afficher les attributs du modele
    def __repr__(self):
        return '<Address:{},{},{},{},{},{},{},{}>'.format(self.id_address,
                                                          self.street,
                                                          self.city,
                                                          self.lattitude,
                                                          self.longitude,
                                                          self.zip_code,
                                                          self.numero,
                                                          self.rep)
