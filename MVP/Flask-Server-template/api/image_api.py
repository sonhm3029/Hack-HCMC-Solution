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
from database.serializers import ImagesSchema
from utils import allowed_file, getUniqueFileName
from utils.exception import UserException
from utils.logger import log

image_bp = Blueprint("image", __name__)

@image_bp.route(API.IMAGE.BASE, methods=["GET"])
def get():
    """API for handle upload"""
    try:
        _id = request.args.get('id')
        query = {}
        print(_id)
        if _id:
            query["_id"] = ObjectId(_id)
        res = mongodb.collections["images"].find(query)
        res = ImagesSchema().dump(res, many=True)
        
        return jsonify({"code": 200, "data": res[0] if _id else res})
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
        if not len(results):
            raise UserException(400, "Image must be provided!")
        
        existing_record = mongodb.collections["images"].find_one({"location": location})
        
        if(existing_record):
            print(existing_record["files"], "CHECCK")
            new_files_list = existing_record["files"] + results
            update_result = mongodb.collections["images"].update_one(
                {"location": location},
                {"$set": {"files": new_files_list}}
            )
            if not update_result.modified_count:
                raise Exception(400, "Update failed!")
            
        else:
            saved_data = {
                "location": location,
                "note": note,
                "files": results,
                "is_predicted": False
            }
            res = mongodb.collections["images"].insert_one(saved_data)
            if not res.inserted_id:
                raise Exception("Create new failed!")

        return jsonify({"code": 200, "data": "Success"})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
