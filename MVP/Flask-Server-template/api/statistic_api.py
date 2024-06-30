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

statistic_bp = Blueprint("statistic", __name__)

def consolidate_beer_counts(data_list):
    # Initialize an empty dictionary to hold the consolidated counts
    consolidated_counts = {}
    
    for data in data_list:
        for key, value in data.items():
            if key != "img_path":
                if key in consolidated_counts:
                    consolidated_counts[key] += value
                else:
                    consolidated_counts[key] = value
    
    return consolidated_counts

def consolidate_human_counts(data_list):
    # Initialize an empty dictionary to hold the consolidated human counts
    consolidated_counts = {}
    
    for data in data_list:
        for key, value in data.items():
            if key != "img_path":
                if key not in consolidated_counts:
                    consolidated_counts[key] = 0
                consolidated_counts[key] += value["human_count"]
    
    return consolidated_counts

@statistic_bp.route(API.STATISTIC.BASE, methods=["GET"])
def get():
    """API for handle upload"""
    try:
        all_data = mongodb.collections["images"].find({"is_predicted": True})
        all_data = ImagesSchema().dump(all_data, many=True)
        pred_summaries = [rec["pred_summary"] for rec in all_data]
        
        # Context
        total_location = len(all_data)
        contexts = [item["llm_response"]["context"] for item in pred_summaries]
        beer_box = [item["beer_box_detection_response"] for item in pred_summaries]
        beer_product = [item["beer_product_detection_response"] for item in pred_summaries]
        drinking_human_response = [item["drinking_human_response"] for item in pred_summaries]
        
        return jsonify({
            "code": 200,
            "data": {
                "total_location": total_location,
                "contexts": contexts,
                "beer_box": consolidate_beer_counts(beer_box),
                "beer_product": consolidate_beer_counts(beer_product),
                "drinking_human": consolidate_human_counts(drinking_human_response)
                
            }
        })

        
    except UserException as e:
        return jsonify({"code": e.code, "message": e.message})
    except Exception as e:
        print(e)
        log(ERROR, str(e))
        return jsonify({"code": 500, "message": str(e)})
