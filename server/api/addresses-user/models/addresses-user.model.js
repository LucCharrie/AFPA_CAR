let UserModel = require(__base + 'api/users/models/user.model');
let AddressesUserModel = require(__base + 'api/addresses-user/models/addresses-user.model');
let AddressModel = require (__base + 'api/address/models/address.model');

class AddressUserModel
{
    constructor (row) {
        this.row = row || {
            userRef: '',
            addressRef: '',
            libelle: ''
        };

        this.row.addressRef = new AddressModel(this.row.addressRef);
        this.row.userRef = new UserModel(this.row.userRef);
    }



    get libelle() {
        return this.row.libelle;
    }
    set libelle(val) {
        this.row.libelle = val;
    }

    get user() {
        return this.row.userRef;
    }
    set user(val) {
        this.row.userRef = val;
    }

    get address() {
        return this.row.addressRef;
    }
    set address(val) {
        this.row.addressRef = val;
    }

    toJSON() {
        return {
            libelle : this.libelle,
            address: this.address,
            user: this.user      
        };
    }

    isValid() {
        return true;
    }
}

module.exports = AddressUserModel
