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



class Bookmark_Creation_form(FlaskForm):
	hotkey = StringField('Hotkey', validators=[DataRequired()])
	title = StringField('Title', validators=[DataRequired()])
	link = StringField('Link', validators=[DataRequired()])
	subject_id = IntegerField('Subject_id', validators=[DataRequired()])
	create = SubmitField('Create_bookmark')
	
class Bookmark_Update_form(FlaskForm):
	hotkey = StringField('Hotkey', validators=[DataRequired()])
	title = StringField('Title', validators=[DataRequired()])
	link = StringField('Link', validators=[DataRequired()])
	subject_id = IntegerField('Subject_id', validators=[DataRequired()])
	create = SubmitField('Update_bookmark')	
	
@app.route("/create_bookmark/<int:id>", methods=["GET", "POST"])
def create_bookmark(id):
	
	form = Bookmark_Creation_form(subject_id=id)
	#if request.method == "POST":
	if form.validate_on_submit():
		
		hotkey = form.hotkey.data
		title = form.title.data
		link = form.link.data
		subject_id = form.subject_id.data
		
		bookmark = Bookmark(title=title,hotkey=hotkey,link=link, parent_subject=subject_id, parent_user=session["user_id"])
		
		db.session.add(bookmark)
		db.session.commit()
		return redirect(url_for('index'))
	session["current_subject"]=id
	return render_template('bookmarks/create_bookmark.html', form=form, subject_id=id)
	
	
@app.route("/update_bookmark/<int:subject_id>/<int:bookmark_id>", methods=["GET", "POST"])
def update_bookmark(subject_id,bookmark_id):
	form = Bookmark_Update_form()
	#if request.method == "POST":
	
	print(form)
	if form.validate_on_submit():
		bookmark = db.session.query(Bookmark).get(session["current_bookmark"])
		form = Bookmark_Update_form()
		
		bookmark.hotkey = form.hotkey.data
		bookmark.title = form.title.data
		bookmark.link = form.link.data

		db.session.commit()
		return redirect(url_for('index'))
	session["current_bookmark"]=bookmark_id
	bookmark = db.session.query(Bookmark).get(bookmark_id)
	return render_template('bookmarks/update_bookmark.html', form=form,\
	subject_id=subject_id,bookmark_id=bookmark_id, hotkey=bookmark.hotkey, title=bookmark.title, link=bookmark.link)
	
@app.route("/delete_bookmark/<int:id>")
def delete_bookmark(id):
	#if request.method == "POST":
	bookmark = db.session.query(Bookmark).get(id)
	db.session.delete(bookmark)
	db.session.commit()
	return redirect(url_for('index'))
