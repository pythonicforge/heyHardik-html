from flask import Flask
from config import Config
from .routes import main_bp

def create_app():
    """
    This function creates and configures a Flask application instance.

    Parameters:
    None

    Returns:
    app (Flask): A configured Flask application instance.

    The function initializes a Flask application with the name of the current module (__name__),
    sets the static folder to 'static', and configures the application using the Config object.
    It then registers the main_bp blueprint to the application.
    Finally, it returns the configured Flask application instance.
    """
    app = Flask(__name__, static_folder='static')
    app.config.from_object(Config)

    app.register_blueprint(main_bp)

    return app