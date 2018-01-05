from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug = True, port=3000) #Mode debug, choix du port
    
#Script python a lancer pour run l'application
