#!interpreter [optional-arg]
# -*- coding: utf-8 -*-

#
"""
app.py: 
"""

#D DEVELOPMENT
#Built-in/Generic Imports

#Libs
import datetime

from flask import Flask, redirect, render_template, request, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
	Table, Column, Integer, String, MetaData, ForeignKey, Boolean
	)
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, EqualTo

from werkzeug.security import check_password_hash, generate_password_hash


#Routes
import user_routes, bookmark_routes, timer_routes, crypto_routes#, subject_routes
#Modules
from flask_app import db, app
from models import User, Subject, Bookmark, Crypto, Timer



class Crypto_Creation_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	link = StringField('Link')
	crypto_acronym = StringField('Crypto_acronym', validators=[DataRequired()])
	fiat_acronym = StringField('Fiat_acronym', validators=[DataRequired()])
	create = SubmitField('Create_crypto')
	
class Crypto_Update_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	link = StringField('Link')
	crypto_acronym = StringField('Crypto_acronym', validators=[DataRequired()])
	fiat_acronym = StringField('Fiat_acronym', validators=[DataRequired()])
	create = SubmitField('Create_crypto')
	
@app.route("/create_crypto", methods=["GET", "POST"])
def create_crypto():
	
	form = Crypto_Creation_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		#form = Crypto_Creation_form()
		
		title = form.title.data
		link = form.link.data
		crypto_acronym = form.crypto_acronym.data
		fiat_acronym = form.fiat_acronym.data
		parent_user = session["user_id"]
		
		crypto = Crypto(\
		title=title,link=link,\
		crypto_acronym=crypto_acronym,\
		fiat_acronym=fiat_acronym,\
		parent_user=parent_user)
		
		db.session.add(crypto)
		db.session.commit()
		return redirect(url_for('index'))
	return render_template('cryptos/create_crypto.html', form=form)
	
	
@app.route("/update_crypto/<int:id>", methods=["GET", "POST"])
def update_crypto(id):
	form = Crypto_Update_form()
	#if request.method == "POST":
	
	print(form)
	if form.validate_on_submit():
		print('validated!')
		crypto = db.session.query(Crypto).get(id)
		form = Crypto_Update_form()
		
		crypto.crypto_acronym = form.crypto_acronym.data
		crypto.fiat_acronym = form.fiat_acronym.data
		crypto.title = form.title.data
		crypto.link = form.link.data


		db.session.commit()
		print('data commited')
		return redirect(url_for('index'))
	crypto = db.session.query(Crypto).get(id)
	return render_template('cryptos/update_crypto.html', form=form,\
	crypto_acronym=crypto.crypto_acronym, fiat_acronym=crypto.fiat_acronym, title=crypto.title, link=crypto.link, crypto_id=id)
	
@app.route("/delete_crypto/<int:id>")
def delete_crypto(id):
	#if request.method == "POST":
	crypto = db.session.query(Crypto).get(id)
	db.session.delete(crypto)
	db.session.commit()
	return redirect(url_for('index'))
