import os
import settings
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__, static_url_path='/', static_folder='./client/build')
app.config['MONGO_URI'] = os.getenv('MONGODB_URI_development')

mongo = PyMongo(app)

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/api/activities', methods=['GET', 'POST'])
def activities():
    if request.method == 'GET':
        activities = mongo.db.activities
        output = []
        for a in activities.find():
            output.append({ '_id': str(a['_id']), 'title': a['title'], 'datetime': a['datetime'] })
        return jsonify(output)
    if request.method == 'POST':
        data = request.get_json()
        mongo.db.activities.insert_one(data)
        return ActivityToJson(data, str(data['_id']))

@app.route('/api/activities/<id>', methods=['GET', 'PUT', 'DELETE'])
def activity_id(id):
    if request.method == 'GET':
        result = mongo.db.activities.find_one_or_404({ '_id': ObjectId(id) })
        return ActivityToJson(result, str(result['_id']))
    if request.method == 'PUT':
        data = request.get_json()
        result = mongo.db.activities.replace_one({ '_id': ObjectId(id) }, data)
        if result.matched_count:
            return ActivityToJson(data, id)
    if request.method == 'DELETE':
        mongo.db.activities.delete_one({ '_id': ObjectId(id) })
        return 'activity deleted'

def ActivityToJson(activity, id):
    return {
        '_id': id,
        'title': activity['title'],
        'datetime': activity['datetime']
    }