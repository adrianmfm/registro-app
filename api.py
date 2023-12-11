import flask
import json
from sqlalchemy import create_engine, MetaData, Table
from flask_cors import CORS
import qrcode
from io import BytesIO
from datetime import datetime

app = flask.Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///users.db', echo=True)

def queryLogin(username, password):

    metadata = MetaData(bind=engine)
    users = Table('users', metadata, autoload=True)
    
    with engine.connect() as conn:
        result = conn.execute(users.select().where(users.c.username == username))
        user = result.fetchone()

    if user and user['password'] == password:
        return user
    return None

def queryGetUserByToken(token):

    metadata = MetaData(bind=engine)
    users = Table('users', metadata, autoload=True)
    
    with engine.connect() as conn:
        result = conn.execute(users.select().where(users.c.token == token))
        user = result.fetchone()

    if user:
        return user
    return None

@app.route('/login', methods=['POST'])
def login():

    data = flask.request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = queryLogin(username, password)
    
    if user:
        token = user["token"]
        return flask.jsonify({"message": "Login successful","token":token}), 200
    else:
        return flask.jsonify({"message": "Invalid credentials"}), 401


@app.route('/asistencia', methods=['POST'])
def asistencia():
    data = flask.request.get_json()
    token = data.get('token')
    user = queryGetUserByToken(token)
    if token == user["token"]:
        print(f"El usuario {user['nombre']} {user['apellido']} ha marcado asistencia en {data.get('clase')} a las {datetime.now().strftime('%H:%M')}")
        return 'Ok',200 
        
    else:
        return 'Rejected',400
    
@app.route('/qr', methods=['GET'])
def qr():
    data = {
        "clase":"App moviles",
        "horaComienzo":datetime.now().strftime("%H:%M"),
    }
    data_string = json.dumps(data)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=5
    )
    qr.add_data(data_string)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img_bytes = BytesIO()
    img.save(img_bytes)
    img_bytes.seek(0)
    return flask.send_file(img_bytes, mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True)
