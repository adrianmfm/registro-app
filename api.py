import flask
from sqlalchemy import create_engine, MetaData, Table

app = flask.Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)
