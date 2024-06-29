from ultralytics import YOLO
import torch

model = YOLO(r"C:/Users/admin/Desktop/Hack-HCMC-Solution/MVP/Flask-Server-template/ai/weights/v8m_human_detection/best.pt")
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
    results = model(img_path, device = 'cuda')[0].boxes.cls
    return obj_counting(results, classes)
    