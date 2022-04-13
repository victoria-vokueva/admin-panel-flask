from flask import Flask, jsonify, render_template,  request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from itsdangerous import json

app = Flask(__name__, template_folder='app/public')

app.config.update({'SQLALCHEMY_DATABASE_URI' : 'sqlite:///test.db'})
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    numberphone = db.Column(db.String(120), unique=True, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=True)  
    roles = db.relationship('Role', backref='users') 

    def __init__(self, username, numberphone, description, role_id):
        #self.id = id
        self.username = username
        self.numberphone = numberphone
        self.description = description
        self.role_id = role_id

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=True)
    parent_roles = db.relationship('Role', backref=db.backref('role', uselist=False), remote_side=id)

    def __init__(self, id, name, role_id):
        self.id = id
        self.name = name
        self.role_id = role_id 

    def __repr__(self):
        return '<Role %r>' % self.name

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'username', 'numberphone', 'description', 'role_id')

class RoleSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'name', 'role_id')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

role_schema = RoleSchema()
roles_schema = RoleSchema(many=True)

@app.route("/")
def index():
    return render_template('index.html')

# Получить пользователей
@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

# Получить пользователя
@app.route('/users/<id>', methods=['GET'])
def get_user_detail():
    user = User.get(id)
    result = users_schema.dump(user)
    return jsonify(result)

# Добавить пользователя
@app.route('/users', methods=['POST'])
def add_users():
    username = request.json['username']
    numberphone = request.json['numberphone']
    description = request.json['description']
    role_id = request.json['role_id']

    new_user = User(username, numberphone, description, role_id)

    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)

# Редактировать пользователя
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)

    username = request.json['username']
    numberphone = request.json['numberphone']
    description = request.json['description']
    role_id = request.json['role_id']

    user.username = username
    user.numberphone = numberphone
    user.description = description
    user.role_id = role_id

    db.session.commit()

    return user_schema.jsonify(user)

# Удалить пользователя
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    print("tut ya " + str(id))
    user = User.query.get(id)
    
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

# Получить роли
@app.route('/roles', methods=['GET'])
def get_roles():
    all_roles = Role.query.all()
    result = roles_schema.dump(all_roles)
    return jsonify(result)

# Получить роли для пользователя
@app.route('/roles/<id>', methods=['GET'])
def get_role():
    roles = Role.get(id)
    result = user_schema.dump(roles)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
