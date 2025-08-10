from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST", "bin-ip-checker.p.rapidapi.com")

wallets = []


@app.get("/bin/{bin_code}")
def get_bank_by_bin(bin_code: str):
    bin_code = bin_code.strip()

    url = f"https://{RAPIDAPI_HOST}/?bin={bin_code}"
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json={"bin": bin_code}, headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()

        bank_name = None
        if data.get("BIN") and data["BIN"].get("issuer") and data["BIN"]["issuer"].get("name"):
            bank_name = data["BIN"]["issuer"]["name"]

        return {"bank": bank_name}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error in requesting BIN API: {e}")


@app.post("/wallets")
def add_wallet(wallet: dict):
    if "type" not in wallet or "bankName" not in wallet or "account" not in wallet:
        raise HTTPException(status_code=400, detail="Invalid format data")
    wallets.append(wallet)
    return {"status": "ok", "wallets": wallets}


@app.get("/wallets")
def list_wallets():
    return {"wallets": wallets}


@app.delete("/wallets/{index}")
def delete_wallet(index: int):
    if 0 <= index < len(wallets):
        wallets.pop(index)
        return {"status": "ok", "wallets": wallets}
    else:
        raise HTTPException(status_code=404, detail="There is no such wallet")
