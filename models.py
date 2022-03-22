#!interpreter [optional-arg]
# -*- coding: utf-8 -*-
#
"""
models.py: All Models
"""

#Built-ins/Generic
import datetime

#Libs
from sqlalchemy import (
	Table, Column, Integer, String, MetaData, ForeignKey, Boolean
	)
from sqlalchemy.orm import relationship

#fur datum
from sqlalchemy.sql import func
from sqlalchemy import DateTime, Date
#Modules
from flask_app import db
from flask_login import UserMixin

class User(UserMixin, db.Model):

	__tablename__ = "users"

	#Autoincrement has costs https://sqlite.org/autoinc.html
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80), unique=True, nullable=False)
	password = db.Column(db.String(200), nullable=False)
	time_created = db.Column(DateTime(timezone=True), server_default=func.now())
	
	home_title = db.Column(db.String(200), nullable=True)
	
	latitude = db.Column(db.Float, nullable=True)
	longitude = db.Column(db.Float, nullable=True)
	country = db.Column(db.String(200), nullable=True)
	
	morning_greeting = db.Column(db.String(200), nullable=True)
	afternoon_greeting = db.Column(db.String(200), nullable=True)
	evening_greeting = db.Column(db.String(200), nullable=True)
	night_greeting = db.Column(db.String(200), nullable=True)
	
	bookmarks = relationship("Bookmark", cascade="all, delete")
	subjects = relationship("Subject", cascade="all, delete")
	cryptos = relationship("Crypto", cascade="all, delete")
	timers = relationship("Timer", cascade="all, delete")
	notes = relationship("Note", cascade="all, delete")
	
class Subject(db.Model):

	__tablename__ = "subjects"
	#having more than one subject with the same name will be a problem later on
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(80), nullable=False)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	bookmarks = relationship("Bookmark", cascade="all, delete")
	
class Bookmark(db.Model):

	__tablename__ = "bookmarks"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(200), nullable=False)
	hotkey = db.Column(db.String(8), nullable=False)
	link = db.Column(db.String(200), nullable=False)
	parent_subject = Column(Integer, ForeignKey('subjects.id'), nullable=False)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	
class Crypto(db.Model):

	__tablename__ = "cryptos"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(200), nullable=False)
	link = db.Column(db.String(200), nullable=True)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	
	crypto_acronym = db.Column(db.String(20), nullable=False)
	fiat_acronym = db.Column(db.String(20), nullable=False)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	
class Timer(db.Model):

	__tablename__ = "timers"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(200), nullable=True)
	hours = db.Column(db.Integer, nullable=False)
	minutes = db.Column(db.Integer, nullable=False)
	seconds = db.Column(db.Integer, nullable=False)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	
class Note(db.Model):

	__tablename__ = "notes"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(200), nullable=True)
	text = db.Column(db.Text, nullable=True)
	parent_user = Column(Integer, ForeignKey('users.id'), nullable=False)
	
	