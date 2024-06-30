from flask import send_from_directory

from .user_api import user_bp
from .image_api import image_bp
from .prediction_api import predict_bp
from .location_api import location_bp
from .statistic_api import statistic_bp


def initRoute(app):
    @app.route("/", methods=["GET"])
    def hello():
        return "<div style='width:100%;height:100vh;display:flex;justify-content:center;align-items:center;position:fixed;'>Flask template!</div>"

    @app.route("/uploads/<subfolder>/<filename>")
    def download_file(subfolder, filename):
        return send_from_directory(f"uploads/{subfolder}", filename)

    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(image_bp, url_prefix="/image")
    app.register_blueprint(predict_bp, url_prefix="/predict")
    app.register_blueprint(location_bp, url_prefix="/location")
    app.register_blueprint(statistic_bp, url_prefix="/statistic")
