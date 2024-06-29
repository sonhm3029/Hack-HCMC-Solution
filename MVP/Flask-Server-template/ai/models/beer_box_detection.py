from ultralytics import YOLO
import torch
from utils.file import UPLOAD_FOLDER, getUniqueFileName
import os
import cv2

model = YOLO(r"ai\weights\v8m_beer_box_detection\best.pt")
classes = model.names


def obj_counting(arr, names):
    unique_elements, counts = torch.unique(arr, return_counts=True)
    # Display the results
    result = {}
    for element, count in zip(unique_elements, counts):
        class_name = names[int(element)]
        result[class_name] = int(count)
    return result


def get_response(img_path):
    results = model(img_path, device='cpu', show_conf=False)[0]
    img = results.plot(conf=False)
    saved_folder = getUniqueFileName(UPLOAD_FOLDER)
    if not os.path.exists(saved_folder):
        os.makedirs(saved_folder)
    saved_file_path = os.path.join(saved_folder, "result.jpg")
    cv2.imwrite(saved_file_path, img)
    results = results.boxes.cls
    return obj_counting(results, classes), saved_file_path
