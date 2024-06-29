import google.generativeai as genai
from dotenv import load_dotenv
import os
import json


load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

PROMPT = """
You are given an image related to Heineken beer products and various activities to enhance their service quality in customer experience.
The images may depict grocery stores with Heineken products, street activities by Heineken staff, bars, pubs, restaurants, special events like gameshows, and more.
Analyze each image and provide the following information:

- context: The place context in the image. For examples: bar, restaurant, grocery store, supermarket, small pub,... Just return me the place, not explain or say any unneed words
- activity: list of short keyword describe human activities happend in image if presented.
- emotion: list of the main emotion of people in the image 
- effectiveness: If there are activities to enhance the user experience for example event, enjoy product..., i want to know how success, efficiency it be or whether it need to be improved, how to improve in short

Ensure the values are short, accurate, informative, and useful for further statistical analysis. If any of the criteria do not apply to the image, return null value for that key.
Format the response in JSON

**Example response:**
{
  "context": "bar"
  "activity": ["drinking", "eating"],
  "emotion": ["happy", "enjoyable"],
  "effectiveness": null,
}
{
  "context": "street"
  "activity": ["beer promotion", "play game"],
  "emotion": ["happy", "interested"],
  "effectiveness": "highly effective",
}
{
  "context": "grocery store",
  "activity": null,
  "emotion": null,
  "effectiveness": null
}

"""

def replace_nulls(obj):
    if isinstance(obj, list) and len(obj or []) == 1 and obj[0] == "null":
        return None
    elif isinstance(obj, list):
        return [replace_nulls(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: replace_nulls(value) for key, value in obj.items()}
    elif isinstance(obj, str) and obj == "null":
        return None
    return obj            
def parse_llm_res(res):
    json_res = json.loads(res)
    return replace_nulls(json_res)

def get_response(img_path):
    sample_file = genai.upload_file(path=img_path,
                            display_name="Image")

    response = model.generate_content([sample_file, PROMPT])
    response = response.text.replace("\n ", "").replace("\n", "").replace("```json", "").replace("```", "")
    
    parse_res = parse_llm_res(response)
    print("LLM RES", parse_res)
    return parse_res