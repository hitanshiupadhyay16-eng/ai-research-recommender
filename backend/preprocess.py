import pandas as pd
import re

def clean_text(text):
    if pd.isna(text):
        return ""
    text = re.sub(r'<.*?>', '', text)          # HTML tags hatao
    text = re.sub(r'\s+', ' ', text)            # extra spaces hatao
    text = text.strip()
    return text

def preprocess_papers():
    df = pd.read_csv('data/papers.csv')

    df['title'] = df['title'].apply(clean_text)
    df['abstract'] = df['abstract'].apply(clean_text)
    df['category'] = df['category'].str.lower().str.strip()

    # Duplicate papers hatao (agar same title do baar aa gaya ho)
    df = df.drop_duplicates(subset='title')

    # Ek "combined_text" column banao - isi pe embeddings banenge aage
    df['combined_text'] = df['title'] + ". " + df['abstract']

    df.to_csv('data/processed_papers.csv', index=False)
    print(f"Processed papers saved: {len(df)}")

def preprocess_students():
    df = pd.read_csv('data/students.csv')

    df['skills'] = df['skills'].apply(clean_text)
    df['interests'] = df['interests'].apply(clean_text)

    # Student ke liye bhi ek "combined_text" - profile embedding isi se banega
    df['combined_text'] = df['skills'] + ". " + df['interests'] + ". Goal: " + df['career_goal']

    df.to_csv('data/processed_students.csv', index=False)
    print(f"Processed students saved: {len(df)}")

preprocess_papers()
preprocess_students()