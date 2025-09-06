import spacy

nlp = spacy.load("en_core_web_sm")

def extract_skills(text: str):
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT", "WORK_OF_ART"]]
    return list(set(skills))
