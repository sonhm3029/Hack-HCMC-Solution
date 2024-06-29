import json
import os
import shutil
from datetime import datetime, timedelta, timezone
from logging import ERROR, INFO
from bson import ObjectId

from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

from constants import API, MAX_FILE_LENGTH, UPLOAD_FOLDER
from database import mongodb
from database.serializers import ImagesSchema, LocationSchema
from utils import allowed_file, getUniqueFileName
from utils.exception import UserException
from utils.logger import log

location_bp = Blueprint("location", __name__)


@location_bp.route(API.LOCATION.BASE, methods=["POST"])
def create():
    """API for handle upload"""
    try:
        payload = request.get_json()
        new_loc = payload.get("new_loc")
        if not new_loc:
            raise UserException(400, "value must be define")
        exist = mongodb.collections["locations"].find_one({'value': new_loc})
        if exist:
            raise UserException(400, "Location exist!")
        res = mongodb.collections["locations"].insert_one({'value': new_loc})

        return jsonify({"code": 200, "data": "Success"})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
    
@location_bp.route(API.LOCATION.BASE, methods=["GET"])
def get():
    """API for handle upload"""
    try:
        res = mongodb.collections["locations"].find({})
        res = LocationSchema().dump(res, many=True)

        return jsonify({"code": 200, "data": res})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
