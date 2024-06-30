from ultralytics import YOLO
from paddleocr import PaddleOCR
import cv2
from unidecode import unidecode

import os

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
advertise_detector = YOLO(r"C:\Users\admin\Desktop\Hack-HCMC-Solution\MVP\Flask-Server-template\ai\weights\v8m_beer_advertise\best.pt")
paddle_ocr = PaddleOCR(use_angle_cls=False, lang="en", use_gpu=True)

text_labels = ['heineken', 'tiger', 'larue', 'biaviet', 'bivina', 'edelweiss', 'strongbow', 'saigon', '333', 'huda']

class_names = advertise_detector.names

def detect_objects(image_path, detector):
    image = cv2.imread(image_path)
    results = detector(image_path)
    return image, results[0].boxes

def detect_text_in_boxes(image, boxes, paddleocr, class_names):
    texts = []
    for obj in boxes:
        xyxy = obj.xyxy.squeeze().tolist()
        cls = int(obj.cls.squeeze().tolist())  # Class index
        class_name = class_names[cls]  # Class name
        x1, y1, x2, y2 = map(int, xyxy)
        advertise_img = image[y1: y2, x1: x2].copy()
        
        # Detect text
        result = paddleocr.ocr(advertise_img, cls=False, det=True)
        print(f"Detected OCR result for class '{class_name}': {result}")  # Print OCR result for debugging
        if result and len(result) > 0:
            result = [line for line in result if line]
            for line in result:
                for part in line:
                    if part:
                        line_text = part[1][0]
                        processed_text = unidecode(line_text.replace(" ", "").lower())
                        texts.append((processed_text, class_name))
    return texts

def find_matching_labels(pred, labels):
    unique_word = []

    for txt, class_name in pred:
        w = txt.lower().replace(" ", "")
        if w == "bia":
            continue

        unique_word.append((w, class_name))

    unique_word = list(set(unique_word))
    res = {label: [] for label in labels}
    for l in labels:
        for w, class_name in unique_word:
            if l in w or w in l:
                res[l].append(class_name) 
    return res

def get_response(image_path): 
    image, boxes = detect_objects(image_path, advertise_detector)
    texts = detect_text_in_boxes(image, boxes, paddle_ocr, class_names)
    matching_labels = find_matching_labels(texts, text_labels)
    
    # Format the output to match the required structure
    formatted_output = {label.capitalize().replace("_", ""): matching_labels[label] for label in text_labels}
    
    return formatted_output

image_path = r"C:\Users\admin\Desktop\hackathon\images\66503090_1706008675754.jpg"
print(get_response(image_path))