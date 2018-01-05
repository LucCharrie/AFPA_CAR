from flask import abort, render_template
from flask_login import current_user, login_required

from . import trippassager



@trippassager.route('/trippassager/create')
@login_required #On doit etre connecte pour arriver a cette page
def create():
    return render_template('createpassager.html')


@trippassager.route('/trippassager/index')
@login_required
def index():
    return render_template('indexpassager.html')
