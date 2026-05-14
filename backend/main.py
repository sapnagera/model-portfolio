from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv
import os
import uuid
import json
import jwt
from datetime import datetime, timedelta, timezone

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mango-ocean-008a76410.7.azurestaticapps.net"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AZURE_CONNECTION_STRING = os.getenv("AZURE_CONNECTION_STRING")
AZURE_CONTAINER = os.getenv("AZURE_CONTAINER")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
JWT_SECRET = os.getenv("JWT_SECRET")

security = HTTPBearer()

def get_container():
    client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    return client.get_container_client(AZURE_CONTAINER)

def load_content():
    try:
        blob = get_container().get_blob_client("content.json")
        data = blob.download_blob().readall()
        return json.loads(data)
    except:
        return {
            "bio": "",
            "photos": [],
            "about_photo": "",
            "video": "",
            "stats": {
                "age": "24",
                "height": "175 cm / 5'9\"",
                "bust": "86 cm",
                "waist": "61 cm",
                "hips": "89 cm",
                "shoe": "EU 39",
                "eyes": "Brown",
                "hair": "Dark Brown"
            },
            "social": {
                "instagram": "",
                "facebook": "",
                "twitter": ""
            },
            "contact": {
                "email": "",
                "phone": "",
                "location": "Helsinki, Finland"
            }
        }

def save_content(content):
    blob = get_container().get_blob_client("content.json")
    blob.upload_blob(json.dumps(content), overwrite=True)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

class LoginRequest(BaseModel):
    password: str

class BioUpdate(BaseModel):
    bio: str

class StatsUpdate(BaseModel):
    age: str
    height: str
    bust: str
    waist: str
    hips: str
    shoe: str
    eyes: str
    hair: str

class SocialUpdate(BaseModel):
    instagram: str
    facebook: str
    twitter: str

class ContactUpdate(BaseModel):
    email: str
    phone: str
    location: str

@app.post("/admin/login")
def login(body: LoginRequest):
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Wrong password")
    token = jwt.encode(
        {"exp": datetime.now(timezone.utc) + timedelta(hours=8)},
        JWT_SECRET,
        algorithm="HS256"
    )
    return {"token": token}

@app.get("/bio")
def get_bio():
    return {"bio": load_content().get("bio", "")}

@app.get("/photos")
def get_photos():
    return {"photos": load_content().get("photos", [])}

@app.get("/about-photo")
def get_about_photo():
    return {"about_photo": load_content().get("about_photo", "")}

@app.get("/video")
def get_video():
    return {"video": load_content().get("video", "")}

@app.get("/stats")
def get_stats():
    return {"stats": load_content().get("stats", {})}

@app.get("/social")
def get_social():
    return {"social": load_content().get("social", {})}

@app.get("/contact")
def get_contact():
    return {"contact": load_content().get("contact", {})}

@app.put("/admin/bio", dependencies=[Depends(verify_token)])
def update_bio(body: BioUpdate):
    content = load_content()
    content["bio"] = body.bio
    save_content(content)
    return {"message": "Bio updated"}

@app.put("/admin/stats", dependencies=[Depends(verify_token)])
def update_stats(body: StatsUpdate):
    content = load_content()
    content["stats"] = body.dict()
    save_content(content)
    return {"message": "Stats updated"}

@app.put("/admin/social", dependencies=[Depends(verify_token)])
def update_social(body: SocialUpdate):
    content = load_content()
    content["social"] = body.dict()
    save_content(content)
    return {"message": "Social links updated"}

@app.put("/admin/contact", dependencies=[Depends(verify_token)])
def update_contact(body: ContactUpdate):
    content = load_content()
    content["contact"] = body.dict()
    save_content(content)
    return {"message": "Contact updated"}

@app.post("/admin/upload-photo", dependencies=[Depends(verify_token)])
async def upload_photo(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1]
    blob_name = f"photos/{uuid.uuid4()}.{ext}"
    data = await file.read()
    get_container().upload_blob(name=blob_name, data=data, overwrite=True)
    account = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING).account_name
    url = f"https://{account}.blob.core.windows.net/{AZURE_CONTAINER}/{blob_name}"
    content = load_content()
    content["photos"].append({"url": url, "name": file.filename})
    save_content(content)
    return {"url": url}

@app.post("/admin/upload-about-photo", dependencies=[Depends(verify_token)])
async def upload_about_photo(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1]
    blob_name = f"about/{uuid.uuid4()}.{ext}"
    data = await file.read()
    get_container().upload_blob(name=blob_name, data=data, overwrite=True)
    account = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING).account_name
    url = f"https://{account}.blob.core.windows.net/{AZURE_CONTAINER}/{blob_name}"
    content = load_content()
    content["about_photo"] = url
    save_content(content)
    return {"url": url}

@app.post("/admin/upload-video", dependencies=[Depends(verify_token)])
async def upload_video(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1]
    blob_name = f"video/{uuid.uuid4()}.{ext}"
    data = await file.read()
    get_container().upload_blob(name=blob_name, data=data, overwrite=True)
    account = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING).account_name
    url = f"https://{account}.blob.core.windows.net/{AZURE_CONTAINER}/{blob_name}"
    content = load_content()
    content["video"] = url
    save_content(content)
    return {"url": url}

@app.delete("/admin/photo", dependencies=[Depends(verify_token)])
def delete_photo(url: str):
    content = load_content()
    content["photos"] = [p for p in content["photos"] if p["url"] != url]
    save_content(content)
    blob_name = url.split(f"{AZURE_CONTAINER}/")[-1]
    get_container().get_blob_client(blob_name).delete_blob()
    return {"message": "Deleted"}