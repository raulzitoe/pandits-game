from flask import Flask
from flask_redis import FlaskRedis
from flask_socketio import SocketIO
from flask_session import Session
from .game_logic import GameManager
from uuid import uuid4

app = Flask(__name__)
app.config['SECRET_KEY'] = uuid4().hex
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
redis_client = FlaskRedis(app)
game_manager = GameManager(redis_client)

# manage_session needs to be set to False because of
# https://blog.miguelgrinberg.com/post/flask-socketio-and-the-user-session
socketio = SocketIO(app, manage_session=False, logger=True, engineio_logger=True)