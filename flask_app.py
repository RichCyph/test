#!interpreter [optional-arg]
# -*- coding: utf-8 -*-

"""
app.py:
"""

#D DEVELOPMENT
#Built-in/Generic Imports
import datetime

#Libs
from flask import Flask, redirect, render_template, request, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
	Table, Column, Integer, String, MetaData, ForeignKey, Boolean
	)
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, EqualTo

from werkzeug.security import check_password_hash, generate_password_hash
from flask_wtf.csrf import CSRFProtect
from flask_talisman import Talisman
csrf = CSRFProtect()
csp = {
	'default-src': ['\'self\'',\
					'https://api.openweathermap.org',\
					'https://api.coinbase.com', \
					'https://ajax.googleapis.com', \
					'https://fonts.googleapis.com']


}
app = Flask(__name__)
Talisman(app, content_security_policy=csp)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test3.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'StArFox64'
#app.config['PERMANENT_SESSION_LIFETIME'] =
csrf.init_app(app)
db = SQLAlchemy(app)

#Modules
import user_routes, bookmark_routes,\
 timer_routes, crypto_routes, subject_routes, note_routes
from models import User, Subject, Bookmark, Crypto, Timer, Note



class SubjectObject:
	def __init__(self, title, id):
		self.title = title
		self.id = id
		self.bookmarks = []



@app.route("/")
def index():
	num_users = db.session.query(User).count()
	if 'user_id' not in session:
		return render_template('auth/index.html')
	else:
		user_id =session['user_id'];
		user = db.session.query(User).get(session["user_id"])
		subjects = db.session.query(Subject).filter_by(parent_user = user_id).all()

		subList = []
		for s in subjects:
			so = SubjectObject(s.title, s.id)
			so.bookmarks = db.session.query(Bookmark).filter_by(parent_subject = s.id).all()
			subList.append(so)

		cryptos = db.session.query(Crypto).filter_by(parent_user = user_id).all()
		timers = db.session.query(Timer).filter_by(parent_user = user_id).all()
		notes = db.session.query(Note).filter_by(parent_user = user_id).all()

		return render_template('auth/hallo.html', subjects=subList, cryptos=cryptos, timers=timers, user=user, notes=notes)
