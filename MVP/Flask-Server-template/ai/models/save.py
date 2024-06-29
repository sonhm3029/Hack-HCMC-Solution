from ultralytics import YOLO
import torch
import numpy as np
import cv2

# Load models
model_seg = YOLO(r"C:/Users/admin/Desktop/Hack-HCMC-Solution/MVP/Flask-Server-template/ai/weights/v8m_drinking_area_segmentation/best.pt")
model_detec_beer = YOLO(r"C:/Users/admin/Desktop/Hack-HCMC-Solution/MVP/Flask-Server-template/ai/weights/v8m_beer_detection/best.pt")
model_detec_human = YOLO(r"C:/Users/admin/Desktop/Hack-HCMC-Solution/MVP/Flask-Server-template/ai/weights/v8m_human_detection/best.pt")

classes_detec_beer = model_detec_beer.names
classes_detec_human = model_detec_human.names

def obj_counting(arr, names):
    unique_elements, counts = torch.unique(arr, return_counts=True)
    result = {names[int(element)]: int(count) for element, count in zip(unique_elements, counts)}
    return result, sum(result.values())

def get_mask_img(results, img_path):
    image = cv2.imread(img_path)
    masks = results[0].masks
    final_mask = np.zeros((image.shape[0], image.shape[1]), dtype=np.uint8)

    for mask in masks:
        mask_data = mask.data.squeeze().cpu().numpy() * 255
        mask_data = mask_data.astype(np.uint8)
        resized_mask = cv2.resize(mask_data, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_LINEAR)
        final_mask = np.maximum(final_mask, resized_mask)

    masked_image = image.copy()
    masked_image[final_mask == 0] = 0
    return masked_image, final_mask

def check_in_mask(boxes, mask):
    return [np.any(mask[int(y1):int(y2), int(x1):int(x2)] > 0) for x1, y1, x2, y2 in boxes]

def get_response(img_path):
    results_seg = model_seg(img_path, device='cuda')    
    mask_img, final_mask = get_mask_img(results_seg, img_path)

    # Detect beers
    results_detec_beer = model_detec_beer(img_path, device='cuda')
    beer_result, beer_counting = obj_counting(results_detec_beer[0].boxes.cls, classes_detec_beer)
    beer_boxes = results_detec_beer[0].boxes.xyxy.tolist()
        
    # If no beers detected, return empty dictionary
    if beer_counting == 0:
        return {}

    # Detect humans
    results_detec_human = model_detec_human(mask_img, device='cuda', classes=[2])
    human_result, human_counting = obj_counting(results_detec_human[0].boxes.cls, classes_detec_human)
    human_boxes = results_detec_human[0].boxes.xyxy.tolist()

    json = {}

    for i, mask in enumerate(results_seg[0].masks):
        mask_data = mask.data.squeeze().cpu().numpy() * 255
        mask_data = mask_data.astype(np.uint8)
        resized_mask = cv2.resize(mask_data, (final_mask.shape[1], final_mask.shape[0]), interpolation=cv2.INTER_LINEAR)
        
        beers_in_mask = check_in_mask(beer_boxes, resized_mask)
        humans_in_mask = check_in_mask(human_boxes, resized_mask)
        
        beer_counts = []  # Changed to a list
        for idx, in_mask in enumerate(beers_in_mask):
            if in_mask:
                beer_label = classes_detec_beer[int(results_detec_beer[0].boxes.cls[idx])]
                beer_counts.append(beer_label)

        human_count = sum(humans_in_mask)

        beer_count_dict = {label: beer_counts.count(label) for label in set(beer_counts)}
        
        for beer_type, count in beer_count_dict.items():
            if beer_type not in json:
                json[beer_type] = {"human_count": 0, "beer_count": 0}
            json[beer_type]["human_count"] += min(human_count, count)
            json[beer_type]["beer_count"] += count
        
        

    return json