from flask import Flask,jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request
from datetime import datetime   
import hashlib
from datetime import datetime
import os
import math
import uuid
import json
timestamp = 1528797322
date_time = datetime.fromtimestamp(timestamp)
import jwt
user = Flask(__name__, static_url_path='/static')       
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Facebook"
mongo = PyMongo(app)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()
    

#read
@app.route('/read')
def read():
    users = mongo.db.User.find({})
    return dumps(users)

#read User
@app.route('/read_user')
def read_user():
    user_id = request.headers.get("user_id")
    users = mongo.db.User.find({"_id":ObjectId(user_id)})
    return dumps(users)

@app.route('/ShowAll_user1')
def read_user1():
    user_id = request.headers.get("user_id")
    users = mongo.db.User.find({"_id":{"$ne":ObjectId(user_id)}})
    return dumps(users)

#create User
@app.route('/signup_user', methods = ['POST'])   
def create_user():
    user = {}
    first_name = request.json["first_name"]
    last_name=request.json["last_name"]
    password = request.json["password"]
    email = request.json["email"]
    mobile = request.json["mobile"]
    DateOfBirth = request.json["DateOfBirth"]
    Gender = request.json["Gender"]
    salt = generate_salt()
    flag = False
    password_hash = md5_hash(str(password) + str(salt))
    user["first_name"] = first_name 
    user["last_name"] = last_name
    user["DateOfBirth"] = DateOfBirth
    user["Gender"] = Gender
    user['password_hash'] = password_hash
    user['email'] = email 
    user["salt"] = salt
    user["mobile"] = mobile
    user["postImageLink"] = []
    user["profile"] = []
    user["created"] = datetime.utcnow()
    users = mongo.db.User.find({}   )
    for item in users:
        if item["email"] == email:
            flag = True
    if flag == True:
        return json.dumps({"response":"already exist"})
    else:
        mongo.db.User.insert_one(user)   
    return ({"message": "user created"})

#login
@app.route("/users/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    result = ""
    response = mongo.db.User.find_one({"email": email})
    if response:
        if response["password_hash"] == md5_hash(password+response["salt"]):
            encode_data = jwt.encode({
                "id": str(response["_id"])
            }, "masai", algorithm="HS256").decode("utf-8")
            result = jsonify({"token": encode_data})
        else:
            result = jsonify({"error": "Wrong username and password"})
    else:
        result = jsonify({"result": "no user found"})
    return result

@app.route('/get-user-token')
def user_details():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decode_data = jwt.decode(token_encoded, 'masai', algorithms=['HS256'])
    user_id = str(decode_data["id"])
    users = mongo.db.User.find_one({"_id": ObjectId(user_id)})
    return dumps({"user_id": user_id, "first_name": users["first_name"],"last_name":users["last_name"], "email": users["email"],"postImageLink":users["postImageLink"]})
#picture Update
@app.route('/Picture/update', methods=['POST'])
def update_Picture():  
    user_id = request.headers.get("user_id")
    if request.method == 'POST':
        f = request.files['postImageLink']
        location = "static/img/" + f.filename 
        f.save(location)
    mongo.db.User.update_one({"_id": ObjectId(user_id)}, {"$set":{"postImageLink":location}})
    return {"updated ": " Profile updated"}

#update Users Profiles
@app.route('/profile/update', methods=['POST'])
def update_():  
    user_id= request.json["user_id"]
    city= request.json["city"]
    Education = request.json["Education"]
    marital_status = request.json["marital_status"]
    mongo.db.User.update_one({"_id": ObjectId(user_id)}, {"$set": {"profile":{ 'city' :city,"Education":Education,"marital_status":marital_status}}})
    return {"updated ": "updated"}

@app.route('/Picture/backgound', methods=['POST'])
def picture_backgound():  
    user_id = request.headers.get("user_id")
    if request.method == 'POST':
        f = request.files['postImageLinkbackgound']
        location = "static/img/" + f.filename 
        f.save(location)
    mongo.db.User.update_one({"_id": ObjectId(user_id)}, {"$set":{"postImageLinkbackgound":location}})
    return {"updated ": " Profile updated"}

#resad
@app.route('/read_user/<user_id>')
def readcurrentuser(user_id):
    # user_id = request.headers.get("user_id")
    users = mongo.db.User.find({"_id": ObjectId(user_id)})
    return dumps(users)

@app.route("/user/request", methods=["POST"])
def user_request():
    current_userid = request.json["current_userid"]
    user_id = request.json["user_id"]
    result = ''
    user_match = mongo.db.User.find({"requests":current_userid}).count()
    if user_match == 0:
        mongo.db.User.update_one({"_id": ObjectId(user_id)},{"$push": {"requests": current_userid}})
        result = "requests send"
        return dumps(result)
    else:
        result = "already send"
        return dumps (result)
       

#Deleted by reciever
@app.route("/user/deleteBysender", methods=["POST"])
def user_deleteS():
    current_userid = request.json["current_userid"]
    user_id = request.json["user_id"] 
    print(current_userid,user_id)
    mongo.db.User.update_one({"_id": ObjectId(user_id)},{"$pull":{"requests":current_userid}})  ## pull user_id to request array
    return dumps({"success": "deleted"})

#delete by sender
@app.route("/user/deleteByReciever", methods=["POST"])
def user_deleteR():
    current_userid = request.json["current_userid"]
    user_id = request.json["user_id"] 
    print(current_userid,user_id)
    mongo.db.User.update_one({"_id": ObjectId(current_userid)},{"$pull":{"connected_array":user_id}})  ## pull user_id to request array
    return dumps({"success": "deleted"})

# Accept Connection
@app.route('/accept_connection',methods=["POST"])
def recieveConnection():
    current_userid = request.json["current_userid"] 
    user_id = request.json["user_id"] 
    mongo.db.User.update_one({"_id": ObjectId(current_userid)},{"$pull":{"requests":user_id}})  ## pull user_id to request array
    mongo.db.User.update_one({"_id": ObjectId(current_userid)},{"$push":{"connected_array":user_id}}) ## push user_id to connected array
    return json.dumps("Accept Successfully")

#find  All request
@app.route("/users/request_list/<user_id>")
def user_request_ist(user_id):
    user_data = []
    all_users = mongo.db.User.find()
    current_user = mongo.db.User.find_one({"_id": ObjectId(user_id)})
    for each_user in all_users:
        for requests_id in current_user["requests"]:
            if each_user["_id"] == ObjectId(requests_id):
                user_data.append(each_user)
    return dumps(user_data)

#count request 
@app.route("/users/request_count/<user_id>")
def user_request_count(user_id):
    current_user = mongo.db.User.find().count()
    return dumps(current_user)


#accepted  All friend  list
@app.route("/users/Accepte_list/<user_id>")
def user_Accept_list(user_id):
    user_data = []
    all_users = mongo.db.User.find()
    current_user = mongo.db.User.find_one({"_id": ObjectId(user_id)})
    for each_user in all_users:
        for connected_array_id in current_user["connected_array"]:
            if each_user["_id"] == ObjectId(connected_array_id):
                user_data.append(each_user)
    return dumps(user_data)
    
#story by friend
@app.route('/users/story/<user_id>',methods = ["POST"])
def user_Story(user_id):
    current_user = mongo.db.User.find_one({"_id":ObjectId(user_id)})
    all_story = mongo.db.users_story.find({"user_id":{"$in": current_user["connected_array"]}})
    # print(all_story)
    return dumps(all_story)
    
#Post your story
@app.route('/create_story', methods = ['POST'])   
def create_story():
    user = {}
    story_content = request.headers.get("story_content")
    user_id = request.headers.get("user_id")
    first_name = request.headers.get("first_name")
    last_name = request.headers.get("last_name")
    postImageLink = request.headers.get("postImageLink")
    if request.method == 'POST':
        f = request.files['postImageLink1']
        location = "static/img/" + f.filename
        f.save(location)
    user["first_name"] = first_name
    user["user_id"] = user_id
    user["last_name"] = last_name
    user["postImageLink"] = postImageLink
    user["story_content"] = story_content
    user["postImageLink1"] = location
    user["story_id"] = str(uuid.uuid1().int)[:3]
    user["created"] = datetime.now()
    mongo.db.users_story.insert_one(user)   
    return {"message": "created twite"}



#pegination for post story
def pagination(page):
    user_count = mongo.db.users_story.find({}).count()
    users = mongo.db.users_story.find({})
    items = []
    for item in users:
        items.append({"user_id":item["user_id"],"last_name":item["last_name"],"first_name":item["first_name"],"story_id":item["story_id"],"story_content":item["story_content"],"postImageLink1":item["postImageLink1"],"postImageLink":item["postImageLink"]})
    total_pages = user_count//3 + 1
    total_users = user_count
    return {
    "total_pages": total_pages,
    "total_users": total_users,
    "page": page,
    "data": items[(page*3)-3: page*3],
    "per_page": 3
    } 
#story read for all
@app.route('/read_userStoryall')
def showStory():
    page = request.args.get("page", default = 1, type = int)
    return pagination(page) 

#read story only created by user
@app.route('/read_userStory/<user_id>')
def read_userStory(user_id):
    # user_id = request.headers.get("user_id")
    users = mongo.db.users_story.find({"user_id":user_id})
    return dumps(users)

# search
@app.route('/search1', methods = ["POST"])
def read_search():
    first_name = request.json["first_name"]
    users = mongo.db.User.find({"first_name":{"$regex":first_name}})
    return dumps(users)

#delete Story
@app.route('/delete-story/<story_id>', methods = ['DELETE'])
def deleteStory(story_id):
    user_id = request.headers.get("user_id")
    mongo.db.users_story.remove({"$and": [{"user_id":user_id, "story_id": story_id}]})
    return json.dumps({"Response":200})

#update Story
@app.route('/update_story/<story_id>', methods=['POST'])
def update_story(story_id):
    story_content = request.json["story_content"]
    postImageLink1 = request.json["postImageLink1"]
    mongo.db.users_story.update_one({"story_id": story_id }, {"$set": {'story_content':story_content,"postImageLink1":postImageLink1}})
    return {"updated ": "updated"}

@app.route('/comment/<story_id>',methods=['POST'])
def update(story_id):
    comment = request.json["comment"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    user_id = request.json["user_id"]
    postImageLink = request.json["postImageLink"]
    comment_id = str(uuid.uuid1().int)[:6]
    mongo.db.users_story.update_one({"story_id":story_id},{"$push":{"comment":{"comment":comment,"first_name":first_name,"last_name":last_name,"user_id":user_id,"comment_id":comment_id,"postImageLink":postImageLink}}})
    return {"message":"comment done"}

@app.route('/edit/<story_id>',methods= ["PATCH"])
def Edit(story_id):
    comment = request.json["comment"]
    mongo.db.users_story.update_one({"story_id": story_id}, {"$set": {"comment.0.comment":comment}})
    return {"message":"comment updated"}

#delete comment
@app.route('/delete-comment/<comment_id>', methods = ['DELETE'])
def deleteomment(comment_id):
    user_id = request.headers.get("user_id")
    mongo.db.users_story.remove({"$and": [{"user_id":user_id, "comment_id": comment_id}]})
    return json.dumps({"Response":200})

#read user comment 
@app.route('/comment_read/<story_id>',methods = ['POST'])
def read_comment(story_id):
    users = mongo.db.users_story.find_one({"story_id":story_id})
    return dumps(users["comment"])

#new pegination
def pegination_new(page):
    per_page = request.json["per_page"]
    result = ''
    users = mongo.db.users_story.find()
    story_count = users.count()
    total_page = math.ceil(int(story_count)/int(per_page))
    story_show =  users.skip(int((page-1)) * int(per_page)).limit(int(per_page))
    result = {"page":page,"per_page":per_page,"total_page":total_page,"total":story_count,"result":story_show}
    return dumps (result)

@app.route('/read/story',methods = ["POST"])
def read_story():
    page = request.args.get("page",default = 1,type = int)
    return(pegination_new(page))
    



if __name__ == "__main__":
    app.run()

