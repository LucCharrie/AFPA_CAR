from .address_DAO import Address_Dao

class Address_service():
    
    @staticmethod
    def create(address):
        Address_Dao.create(address)
        
    @staticmethod
    def liste():
        return Address_Dao.list()
    
        