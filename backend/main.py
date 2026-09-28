from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from recommend import get_recommendations, get_recommendations_from_text
from database import get_db, User
from auth import hash_password, verify_password, create_access_token, decode_access_token

app = FastAPI(title="AI Research Paper Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Schemas ----------

class ProfileInput(BaseModel):
    skills: str
    interests: str
    career_goal: str


class SignupInput(BaseModel):
    name: str
    email: str
    password: str


class LoginInput(BaseModel):
    email: str
    password: str


# ---------- Basic routes ----------

@app.get("/")
def home():
    return {"message": "Recommendation API is running"}


# ---------- Auth routes ----------

@app.post("/auth/signup")
def signup(user: SignupInput, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"user_id": new_user.id, "email": new_user.email})

    return {
        "message": "Signup successful",
        "access_token": token,
        "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}
    }


@app.post("/auth/login")
def login(user: LoginInput, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"user_id": db_user.id, "email": db_user.email})

    return {
        "message": "Login successful",
        "access_token": token,
        "user": {"id": db_user.id, "name": db_user.name, "email": db_user.email}
    }


# ---------- Recommendation routes ----------

@app.get("/recommend/{student_id}")
def recommend(student_id: int, top_n: int = 5):
    results = get_recommendations(student_id, top_n)
    return {"student_id": student_id, "recommendations": results}


@app.post("/recommend-live")
def recommend_live(profile: ProfileInput, top_n: int = 5):
    profile_text = f"{profile.skills}. {profile.interests}. Goal: {profile.career_goal}"
    results = get_recommendations_from_text(profile_text, top_n)
    return {"input": profile.dict(), "recommendations": results}