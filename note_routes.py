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
from wtforms import StringField, PasswordField, SubmitField, IntegerField, DecimalField,TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo

from werkzeug.security import check_password_hash, generate_password_hash


#Routes
import user_routes, bookmark_routes, note_routes, crypto_routes#, subject_routes
#Modules
from flask_app import db, app
from models import User, Subject, Bookmark, Crypto, Note



class Note_Creation_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	text = TextAreaField('Text')
	create = SubmitField('Create_note')
	
class Note_Update_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	text = TextAreaField('Text')
	create = SubmitField('Update_note')	
	
@app.route("/create_note", methods=["GET", "POST"])
def create_note():
	form = Note_Creation_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		#form = Note_Creation_form()
		
		title = form.title.data
		text = form.text.data

		note = Note(title=title, text=text, parent_user=session["user_id"])
		
		db.session.add(note)
		db.session.commit()
		return redirect(url_for('index'))
	return render_template('notes/create_note.html', form=form)
	
	
@app.route("/update_note/<int:id>", methods=["GET", "POST"])
def update_note(id):
	form = Note_Update_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		print('validated!')
		note = db.session.query(Note).get(id)

		note.title = form.title.data
		note.text = form.text.data

		db.session.commit()
		return redirect(url_for('index'))
	session["current_note"]=id
	note = db.session.query(Note).get(id)
	return render_template('notes/update_note.html', form=form,\
	note_id=id, title=note.title, text=note.text)
	
@app.route("/delete_note/<int:id>")
def delete_note(id):
	#if request.method == "POST":
	note = db.session.query(Note).get(id)
	db.session.delete(note)
	db.session.commit()
	return redirect(url_for('index'))
