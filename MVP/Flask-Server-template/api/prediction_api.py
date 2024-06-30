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
from utils.json_utils import summarize_predictions

from ai import get_llm_response, get_human_detection_response,\
                get_beer_box_response, get_beer_product_response, \
                get_advertise_response, get_drinking_human_response
from concurrent import futures

predict_bp = Blueprint("predict", __name__)


def run_prediction(model, filepath):
    return model(filepath)

@predict_bp.route(API.PREDICTION.PRED_ALL, methods=["POST"])
def pred_all():
    """API for handle upload"""
    try:
        
        input_records = mongodb.collections["images"].find({"is_predicted": False})
        input_records = ImagesSchema().dump(input_records, many=True)
        
        final_result = []
        for rec in input_records:
            pred_list = []
            for filepath in rec["files"]:
                model_functions = {
                    "llm_response": get_llm_response,
                    "human_detection_response": get_human_detection_response,
                    "beer_box_detection_response": get_beer_box_response,
                    "beer_product_detection_response": get_beer_product_response,
                    "beer_advertise_detection": get_advertise_response,
                    "drinking_human_response" : get_drinking_human_response
                }
                
                # Run multiprocess
                with futures.ThreadPoolExecutor() as executor:
                    future_to_model = {executor.submit(run_prediction, func, filepath): name for name, func in model_functions.items()}
                    results = {}
                    for future in futures.as_completed(future_to_model):
                        model_name = future_to_model[future]
                        try:
                            result, img_path = future.result()
                            results[model_name] = {**result, "img_path": img_path}
                        except Exception as e:
                            log(ERROR, f"Model {model_name} raised an exception: {str(e)}")
                            results[model_name] = str(e)
                pred_list.append({"img_path": filepath, "prediction": results})
            
            summary = summarize_predictions(pred_list)
            final_result.append(summary)
            mongodb.collections["images"].update_one(
                {"_id": ObjectId(rec["_id"])}, {"$set": {
                    "is_predicted": True,
                    "pred_list": pred_list,
                    "pred_summary": summary
                }})

        return jsonify({"code": 200, "data": final_result})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})

@predict_bp.route(API.PREDICTION.BASE, methods=["POST"])
def upload():
    """API for handle upload"""
    try:
        if "file" not in request.files:
            raise UserException(400, message="No file part!")
        
        imgFile = request.files.get("file")
        if imgFile.filename == "":
            raise UserException(400, "No selected file!")

        if not allowed_file(imgFile.filename):
            raise UserException(400, "File type not allowed!")

        filename = secure_filename(imgFile.filename)
        saved_folder = getUniqueFileName(UPLOAD_FOLDER)

        if not os.path.exists(saved_folder):
            os.makedirs(saved_folder)
        filepath = os.path.join(saved_folder, filename)
        imgFile.save(filepath)
        
        # Prediction here
        # llm_prediction = get_llm_response(filepath)
        model_functions = {
            "llm_response": get_llm_response,
            "human_detection_response": get_human_detection_response,
            "beer_box_detection_response": get_beer_box_response,
            "beer_product_detection_response": get_beer_product_response,
            "beer_advertise_detection": get_advertise_response,
            "drinking_human_response" : get_drinking_human_response
        }
        
        # Run multiprocess
        with futures.ThreadPoolExecutor() as executor:
            future_to_model = {executor.submit(run_prediction, func, filepath): name for name, func in model_functions.items()}
            results = {}
            for future in futures.as_completed(future_to_model):
                model_name = future_to_model[future]
                try:
                    result, img_path = future.result()
                    results[model_name] = {**result, "img_path": img_path}
                except Exception as e:
                    log(ERROR, f"Model {model_name} raised an exception: {str(e)}")
                    results[model_name] = str(e)

        return jsonify({"code": 200, "data": results})
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
