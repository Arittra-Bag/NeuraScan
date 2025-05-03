# 🧠 NeuraScan

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-%2361DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-%23007ACC.svg?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-%2338B2AC.svg?style=flat&logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-%23009688.svg?style=flat&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.8+-%233776AB.svg?style=flat&logo=python)

[Demo](#) · [Report Bug](mailto:arittrabag@gmail.com) · [Request Feature](mailto:arittrabag@gmail.com)

</div>

> An AI-powered platform for brain MRI analysis and tumor classification, providing instant insights and detailed medical reports.

| 🔥 Features | 🛠️ Technology | 📊 Capabilities |
|------------|---------------|----------------|
| Real-time Analysis | React + TypeScript | MRI Scan Analysis |
| AI-Powered Insights | FastAPI Backend | Tumor Classification |
| Modern UI/UX | PyTorch | Confidence Scoring |
| Responsive Design | Google Gemini | Detailed Reports |

## ✨ What is NeuraScan?

NeuraScan is a modern web application that combines cutting-edge AI technology with medical imaging to assist in brain tumor detection and analysis. By analyzing brain MRI scans, our platform provides:

- 🔍 Instant analysis of brain MRI scans
- 📊 Detailed confidence scores for different tumor types
- 💡 AI-generated medical insights and recommendations
- 🏥 Educational resources about brain health

**Important**: This tool is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis or advice.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.8+
- Google Gemini API Key (for AI insights)

### Frontend Setup

1. Install the dependencies:
```bash
npm install
```

2. Fire up the development server:
```bash
npm run dev
```

Your app will be running at `http://localhost:8080` 🎉

### Backend Setup

1. Create and activate a Python virtual environment:

```bash
# Create virtual environment
cd backend
python -m venv venv

# Activate it on Windows
venv\Scripts\activate

# Or on macOS/Linux
source venv/bin/activate
```

2. Install the Python packages:
```bash
pip install -r requirements.txt
```

3. Add your Gemini API key:
   - Create a `.env` file in the `root` directory:
     ```
     GEMINI_API_KEY=your-gemini-api-key-here
     ```

4. Start the backend server:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` 🚀

## 🎯 How to Use

1. Open the application in your browser
2. Upload a brain MRI scan using the drag-and-drop interface or file selector
3. Click "Analyze" to start the analysis
4. View the results, which include:
   - Predicted tumor classification
   - Confidence scores for each category
   - Detailed AI-generated medical insights
   - Recommended next steps

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18 with TypeScript
- 🏃‍♂️ Vite for blazing fast development
- 💅 TailwindCSS for styling
- 🎨 Shadcn UI Components
- ✨ GSAP for smooth animations
- 🎯 Lucide Icons

### Backend
- ⚡ FastAPI for high-performance API
- 🧠 PyTorch (EfficientNet) for AI model inference
- 🖼️ Python Image Processing
- 💭 Google Gemini for AI insights generation

## 📚 API Reference

### `POST /api/predict`
Classifies a brain MRI image.

```json
// Request
{
  "image": "<base64-encoded-image>"
}

// Response
{
  "data": [
    { "class": "glioma", "confidence": 0.92 },
    { "class": "meningioma", "confidence": 0.05 }
  ]
}
```

### `POST /api/insights`
Generates a detailed medical report.

```json
// Request
{
  "predicted_class": "glioma",
  "confidences": { "glioma": 0.92, "meningioma": 0.05 }
}

// Response
{
  "insights": "MRI Brain Scan Analysis Report..."
}
```

## 🔒 Security & Privacy

- 🔐 No data storage: All analysis is performed in-memory
- 🔑 Secure API key handling
- 🌐 CORS protection
- 🛡️ Production-ready security measures

## 📄 License

This project is licensed under the MIT License

## 📞 Contact & Support

Having issues or questions? Reach out to me at [arittrabag@gmail.com](mailto:arittrabag@gmail.com).
