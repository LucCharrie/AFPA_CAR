from flask import abort, render_template
from flask_login import current_user, login_required

from . import tripsdriver



@tripsdriver.route('/tripdriver/create')
@login_required #On doit etre connecte pour arriver a cette page
def create():
    return render_template('create.html')


@tripsdriver.route('/tripdriver/index')
@login_required
def index():
    return render_template('index.html')
