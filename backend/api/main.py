from fastapi import FastAPI, Request
import httpx
from workers.tasks import parse_and_match_resume

app = FastAPI()

@app.post("/webhook")
async def ats_webhook(request: Request):
    data = await request.json()
    resume_text = data.get("resume_text")
    jd_text = data.get("job_description")
    candidate_id = data.get("candidate_id")

    task = parse_and_match_resume.delay(resume_text, jd_text, candidate_id)
    return {"status": "processing", "task_id": task.id}
