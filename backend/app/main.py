"""
FastAPI Application for Digital Well-Being Prediction API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import endpoints
from app.api import history
from app.ml.model import get_predictor
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Digital Well-Being Predictor API",
    description="Machine Learning API for predicting digital well-being levels based on social media habits",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
# Allow requests from Next.js frontend
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(
    endpoints.router,
    prefix="/api/v1",
    tags=["predictions"]
)

app.include_router(
    history.router,
    tags=["history"]
)


@app.on_event("startup")
async def startup_event():
    """Load ML model on startup"""
    print("🚀 Starting Digital Well-Being Predictor API...")
    try:
        predictor = get_predictor()
        print(f"✅ Model loaded successfully")
        print(f"📊 Ready to serve predictions!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Digital Well-Being Predictor API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
