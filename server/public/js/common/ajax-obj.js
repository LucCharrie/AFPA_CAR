/// PASSER EN JQUERY
/// OBJ POUR PLUS TARD...

var reqXHR = {};

(function (self) {

    var xhr = new XMLHttpRequest();

    getXHR = (url, cb) => {
        xhr.onreadystatechange = (event) => {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200){
                    cb(JSON.parse(this.responseText));
                }
            }
        }
    };

    postXHR = () => { };

    updateXHR = () => { };

    deleteXHR = () => { };


    load = (method) => {

        window.onload = () => {
            
        }
    }
})(reqXHR);