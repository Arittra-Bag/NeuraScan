import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import io
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize FastAPI app
app = FastAPI(
    title="Brain Tumor Classification API",
    description="API for classifying brain tumors from MRI scans"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.efficientnet_b0(weights=None)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, 4)  # Adjust for your number of classes
model.load_state_dict(torch.load('efficientnet_brain_tumor.pth', map_location=device))
model = model.to(device)
model.eval()

# Define the transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

class ImageRequest(BaseModel):
    image: str  # Base64 encoded image

class InsightsRequest(BaseModel):
    predicted_class: str
    confidences: dict

def base64_to_image(base64_string: str) -> Image.Image:
    # Remove data URL prefix if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    # Decode base64 string to bytes
    image_bytes = base64.b64decode(base64_string)
    
    # Convert bytes to PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    return image

def predict_image(image: Image.Image) -> dict:
    # Transform and predict
    input_tensor = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.nn.functional.softmax(output, dim=1)[0]
    
    # Get class probabilities
    classes = ['glioma', 'meningioma', 'notumor', 'pituitary']
    results = []
    
    for idx, (class_name, prob) in enumerate(zip(classes, probabilities)):
        results.append({
            "class": class_name,
            "confidence": float(prob)
        })
    
    # Sort by confidence
    results.sort(key=lambda x: x['confidence'], reverse=True)
    return results

@app.post("/api/predict")
async def predict(request: ImageRequest):
    try:
        # Convert base64 to PIL Image
        image = base64_to_image(request.image)
        
        # Get predictions
        results = predict_image(image)
        
        return {"data": results}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/insights")
async def ai_insights(request: InsightsRequest):
    try:
        prompt = f"""
        Generate a detailed medical analysis report for a brain MRI scan with the following structure:

        MRI Brain Scan Analysis Report

        First paragraph: Summarize the findings mentioning that the AI analysis indicates a diagnosis of {request.predicted_class} with a confidence score of {request.confidences[request.predicted_class]*100:.1f}%. Explain what this means and emphasize this is a preliminary AI assessment requiring professional confirmation.

        1. Explanation of Diagnosis
        [Explain what {request.predicted_class} means in terms of health impact]

        2. Key Observations Associated with {request.predicted_class}
        [List typical MRI findings and characteristics associated with this condition]

        3. Recommended Next Steps
        [Provide actionable recommendations for medical follow-up and care]

        4. Lifestyle and Care Considerations
        [Suggest lifestyle modifications and care strategies]

        Important: Format the response with proper headings and paragraphs, but DO NOT include any HTML tags or markdown. Use plain text formatting only.
        Keep the tone professional but compassionate.
        """
        response = await gemini_model.generate_content_async(prompt)
        return {"insights": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}