from celery import Celery
from services.parser import extract_skills
from services.matcher import match_resume_to_jd

celery = Celery('tasks', broker='redis://redis:6379/0')

@celery.task
def parse_and_match_resume(resume_text, jd_text, candidate_id):
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)
    result = match_resume_to_jd(resume_skills, jd_skills)
    return {"candidate_id": candidate_id, **result}
