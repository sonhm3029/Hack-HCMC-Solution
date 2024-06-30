from collections import defaultdict
import json

def merge_dictionaries(dict1, dict2):
    """Merge two dictionaries, summing values of common keys and keeping unique lists."""
    for key, value in dict2.items():
        if isinstance(value, dict):
            dict1[key] = merge_dictionaries(dict1.get(key, {}), value)
        elif isinstance(value, list):
            if isinstance(dict1.get(key), list):
                dict1[key].extend(item for item in value if item not in dict1[key])
            else:
                dict1[key] = value
        else:
            if key in dict1 and isinstance(dict1[key], (int, float)):
                dict1[key] += value
            else:
                dict1[key] = value
    return dict1

def summarize_predictions(predictions):
    # Initialize a summary dictionary
    summary = {
        "llm_response": {
            "context": None,
            "activity": [],
            "emotion": [],
            "effectiveness": None,
            "img_path": ""
        },
        "human_detection_response": {
            "guest": 0,
            "waiter": 0,
            "other": 0,
            "img_path": ""
        },
        "beer_box_detection_response": {
            "Heineken": 0,
            "Tiger": 0,
            "Bia_Viet": 0,
            "Larue": 0,
            "Bivina": 0,
            "Edelweiss": 0,
            "Strongbow": 0,
            "Sai_gon": 0,
            "333": 0,
            "Huda": 0,
            "img_path": ""
        },
        "beer_product_detection_response": {
            "Heineken": 0,
            "Tiger": 0,
            "Bia_Viet": 0,
            "Larue": 0,
            "Bivina": 0,
            "Edelweiss": 0,
            "Strongbow": 0,
            "Sai_gon": 0,
            "bia_333": 0,
            "Huda": 0,
            "img_path": ""
        },
        "beer_advertise_detection": {
            "Heineken": [],
            "Tiger": [],
            "Larue": [],
            "Biaviet": [],
            "Bivina": [],
            "Edelweiss": [],
            "Strongbow": [],
            "Saigon": [],
            "333": [],
            "Huda": [],
            "img_path": ""
        },
        "drinking_human_response": {
            "Heineken": {
                "human_count": 0,
                "beer_count": 0
            },
            "Tiger": {
                "human_count": 0,
                "beer_count": 0
            },
            "Bia_Viet": {
                "human_count": 0,
                "beer_count": 0
            },
            "Larue": {
                "human_count": 0,
                "beer_count": 0
            },
            "Bivina": {
                "human_count": 0,
                "beer_count": 0
            },
            "Edelweiss": {
                "human_count": 0,
                "beer_count": 0
            },
            "Strongbow": {
                "human_count": 0,
                "beer_count": 0
            },
            "Sai_gon": {
                "human_count": 0,
                "beer_count": 0
            },
            "bia_333": {
                "human_count": 0,
                "beer_count": 0
            },
            "Huda": {
                "human_count": 0,
                "beer_count": 0
            },
            "img_path": ""
        }
    }

    for pred in predictions:
        # Merge llm_response
        llm_response = pred.get("prediction", {}).get("llm_response", {})
        if llm_response:
            summary["llm_response"]["context"] = llm_response.get("context", summary["llm_response"]["context"])
            if isinstance(llm_response.get("activity"), list):
                summary["llm_response"]["activity"].extend(activity for activity in llm_response.get("activity", []) if activity not in summary["llm_response"]["activity"])
            if isinstance(llm_response.get("emotion"), list):
                summary["llm_response"]["emotion"].extend(emotion for emotion in llm_response.get("emotion", []) if emotion not in summary["llm_response"]["emotion"])
            summary["llm_response"]["effectiveness"] = llm_response.get("effectiveness", summary["llm_response"]["effectiveness"])
            summary["llm_response"]["img_path"] = llm_response.get("img_path", summary["llm_response"]["img_path"])

        # Merge human_detection_response
        human_detection_response = pred.get("prediction", {}).get("human_detection_response", {})
        if human_detection_response:
            for key in ["guest", "waiter", "other"]:
                summary["human_detection_response"][key] += human_detection_response.get(key, 0)
            summary["human_detection_response"]["img_path"] = human_detection_response.get("img_path", summary["human_detection_response"]["img_path"])

        # Merge beer_box_detection_response
        beer_box_detection_response = pred.get("prediction", {}).get("beer_box_detection_response", {})
        if beer_box_detection_response:
            summary["beer_box_detection_response"] = merge_dictionaries(summary["beer_box_detection_response"], beer_box_detection_response)
            summary["beer_box_detection_response"]["img_path"] = beer_box_detection_response.get("img_path", summary["beer_box_detection_response"]["img_path"])

        # Merge beer_product_detection_response
        beer_product_detection_response = pred.get("prediction", {}).get("beer_product_detection_response", {})
        if beer_product_detection_response:
            summary["beer_product_detection_response"] = merge_dictionaries(summary["beer_product_detection_response"], beer_product_detection_response)
            summary["beer_product_detection_response"]["img_path"] = beer_product_detection_response.get("img_path", summary["beer_product_detection_response"]["img_path"])

        # Merge beer_advertise_detection
        beer_advertise_detection = pred.get("prediction", {}).get("beer_advertise_detection", {})
        if beer_advertise_detection:
            for beer, ads in beer_advertise_detection.items():
                if beer in summary["beer_advertise_detection"] and isinstance(ads, list):
                    summary["beer_advertise_detection"][beer].extend(ad for ad in ads if ad not in summary["beer_advertise_detection"][beer])
                else:
                    summary["beer_advertise_detection"][beer] = ads
            summary["beer_advertise_detection"]["img_path"] = beer_advertise_detection.get("img_path", summary["beer_advertise_detection"].get("img_path", ""))

        # Merge drinking_human_response
        drinking_human_response = pred.get("prediction", {}).get("drinking_human_response", {})
        if drinking_human_response:
            for beer, data in drinking_human_response.items():
                if beer != "img_path":
                    if beer in summary["drinking_human_response"]:
                        summary["drinking_human_response"][beer]["human_count"] += data.get("human_count", 0)
                        summary["drinking_human_response"][beer]["beer_count"] += data.get("beer_count", 0)
                    else:
                        summary["drinking_human_response"][beer] = data
            summary["drinking_human_response"]["img_path"] = drinking_human_response.get("img_path", summary["drinking_human_response"].get("img_path", ""))

    return summary