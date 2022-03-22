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
import user_routes, bookmark_routes, timer_routes, crypto_routes
#Modules
from flask_app import db, app
from models import User, Subject, Bookmark, Crypto, Timer



class Subject_Creation_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	create = SubmitField('Create_subject')

class Subject_Update_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	create = SubmitField('Update_subject')

@app.route("/create_subject", methods=["GET", "POST"])
def create_subject():

	form = Subject_Creation_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		title = form.title.data
		subject = Subject(title=title,parent_user=session["user_id"])
		db.session.add(subject)
		db.session.commit()
		return redirect(url_for('index'))

	return render_template('subjects/create_subject.html', form=form)


@app.route("/update_subject/<int:subject_id>", methods=["GET", "POST"])
def update_subject(subject_id):
	form = Subject_Update_form()
	#if request.method == "POST":

	#print(form)
	if form.validate_on_submit():
		subject = db.session.query(Subject).get(session["current_subject"])
		form = Subject_Update_form()
		subject.title = form.title.data
		db.session.commit()
		return redirect(url_for('index'))

	session["current_subject"]=subject_id
	subject = db.session.query(Subject).get(subject_id)
	return render_template('subjects/update_subject.html', form=form,\
	subject_id=subject_id,title=subject.title)

@app.route("/delete_subject/<int:id>")
def delete_subject(id):
	#if request.method == "POST":
	subject = db.session.query(Subject).get(id)
	db.session.delete(subject)
	db.session.commit()
	return redirect(url_for('index'))
