def match_resume_to_jd(resume_skills, jd_skills):
    matched = set(resume_skills) & set(jd_skills)
    score = round(len(matched) / max(1, len(jd_skills)) * 100, 2)
    return {
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": list(matched),
        "match_score": score
    }
