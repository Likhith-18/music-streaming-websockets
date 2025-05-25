from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Room structure now includes is_playing
rooms: Dict[str, Dict] = {}  # { room_id: { queue: [], current_video: None, is_playing: False, connections: [] } }

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    
    if room_id not in rooms:
        rooms[room_id] = {
            "queue": [],
            "current_video": None,
            "is_playing": False,
            "connections": []
        }
        
    rooms[room_id]["connections"].append(websocket)
    print(f"New client connected to room: {room_id}")

    # ✅ Send full room state including is_playing to the new client
    await websocket.send_json({
        "type": "room_update",
        "data": {
            "queue": rooms[room_id]["queue"],
            "current_video": rooms[room_id]["current_video"],
            "is_playing": rooms[room_id]["is_playing"]
        }
    })

    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")

            if action == "add_video":
                video = data.get("video")
                rooms[room_id]["queue"].append(video)
                await broadcast(room_id, {
                    "type": "room_update",
                    "data": {
                        "queue": rooms[room_id]["queue"],
                        "current_video": rooms[room_id]["current_video"],
                        "is_playing": rooms[room_id]["is_playing"]
                    }
                })

            elif action == "play_video":
                video = data.get("video")
                rooms[room_id]["current_video"] = video
                rooms[room_id]["is_playing"] = True
                await broadcast(room_id, {
                    "type": "play_video",
                    "data": video
                })

            elif action == "pause_video":
                rooms[room_id]["is_playing"] = False
                await broadcast(room_id, {
                    "type": "pause_video"
                })

    except WebSocketDisconnect:
        print(f"Client disconnected from room {room_id}")
        rooms[room_id]["connections"].remove(websocket)
        if not rooms[room_id]["connections"]:
            del rooms[room_id]

# Broadcast helper
async def broadcast(room_id: str, message: dict):
    connections: List[WebSocket] = rooms[room_id]["connections"]
    for connection in connections:
        try:
            await connection.send_json(message)
        except Exception as e:
            print(f"Error sending message: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000)
