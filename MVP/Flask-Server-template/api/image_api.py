import json
import os
import shutil
from datetime import datetime, timedelta, timezone
from logging import ERROR, INFO

from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

from constants import API, MAX_FILE_LENGTH, UPLOAD_FOLDER
from database import mongodb
from database.serializers import ImagesSchema
from utils import allowed_file, getUniqueFileName
from utils.exception import UserException
from utils.logger import log

image_bp = Blueprint("image", __name__)

@image_bp.route(API.IMAGE.BASE, methods=["GET"])
def get():
    """API for handle upload"""
    try:
        res = mongodb.collections["images"].find({})
        res = ImagesSchema().dump(res, many=True)
        
        return jsonify({"code": 200, "data": res})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})

@image_bp.route(API.IMAGE.BASE, methods=["POST"])
def upload():
    """API for handle upload"""
    try:
        if "files" not in request.files:
            raise UserException(400, message="No file part!")

        files = request.files.getlist("files")
        location = request.form.get("location")
        note = request.form.get("note") or ""

        if not location:
            raise UserException(400, "Location must be provided!")

        results = []
        for f in files:

            if f.filename == "":
                raise UserException(400, message="No selected file!")

            if not allowed_file(f.filename):
                raise UserException(400, message="File type not allowed!")

            filename = secure_filename(f.filename)
            saved_folder = getUniqueFileName(UPLOAD_FOLDER)

            if not os.path.exists(saved_folder):
                os.makedirs(saved_folder)

            filepath = os.path.join(saved_folder, filename)

            print(filepath)
            results.append(filepath)
            f.save(filepath)
        if not len(filepath):
            raise UserException(400, "Image must be provided!")

        saved_data = {
            "location": location,
            "note": note,
            "files": results
        }
        res = mongodb.collections["images"].insert_one(saved_data)
        if not res.inserted_id:
            raise Exception("Create new failed!")

        return jsonify({"code": 200, "data": {"_id": str(res.inserted_id), "files": results}})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
