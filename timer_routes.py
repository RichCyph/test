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



class Timer_Creation_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	hours = IntegerField('Hours', validators=[DataRequired()])
	minutes = IntegerField('Minutes', validators=[DataRequired()])
	seconds = IntegerField('Seconds', validators=[DataRequired()])
	create = SubmitField('Create_timer')
	
class Timer_Update_form(FlaskForm):
	title = StringField('Title', validators=[DataRequired()])
	hours = IntegerField('Hours', validators=[DataRequired()])
	minutes = IntegerField('Minutes', validators=[DataRequired()])
	seconds = IntegerField('Seconds', validators=[DataRequired()])
	create = SubmitField('Update_timer')	
	
@app.route("/create_timer", methods=["GET", "POST"])
def create_timer():
	
	form = Timer_Creation_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		#form = Timer_Creation_form()
		
		title = form.title.data
		hours = form.hours.data
		minutes = form.minutes.data
		seconds = form.seconds.data
		
		timer = Timer(title=title, hours=hours, minutes=minutes, seconds=seconds, parent_user=session["user_id"])
		
		db.session.add(timer)
		db.session.commit()
		return redirect(url_for('index'))
	return render_template('timers/create_timer.html', form=form)
	
	
@app.route("/update_timer/<int:id>", methods=["GET", "POST"])
def update_timer(id):
	form = Timer_Update_form()
	#if request.method == "POST":
	if form.validate_on_submit():
		print('validated!')
		timer = db.session.query(Timer).get(id)
		#form = Timer_Update_form()

		timer.title = form.title.data
		timer.hours = form.hours.data
		timer.minutes = form.minutes.data
		timer.seconds = form.seconds.data

		db.session.commit()
		return redirect(url_for('index'))
	session["current_timer"]=id
	timer = db.session.query(Timer).get(id)
	return render_template('timers/update_timer.html', form=form,\
	timer_id=id, title=timer.title, hours=timer.hours, minutes=timer.minutes, seconds=timer.seconds)
	
@app.route("/delete_timer/<int:id>")
def delete_timer(id):
	#if request.method == "POST":
	timer = db.session.query(Timer).get(id)
	db.session.delete(timer)
	db.session.commit()
	return redirect(url_for('index'))
