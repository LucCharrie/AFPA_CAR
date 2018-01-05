from flask import abort, render_template
from flask_login import current_user, login_required

from . import home


@home.route('/home')
@login_required #On doit etre connecte pour arriver a cette page
def homepage():
    return render_template('home.html')
