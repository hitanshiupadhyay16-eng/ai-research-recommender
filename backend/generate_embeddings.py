import pandas as pd
from sentence_transformers import SentenceTransformer
import pickle

print("Loading model... (pehli baar thoda time lega, model download hoga)")
model = SentenceTransformer('all-MiniLM-L6-v2')

# ---- Papers ke embeddings ----
papers_df = pd.read_csv('data/processed_papers.csv')
paper_texts = papers_df['combined_text'].tolist()

print("Generating paper embeddings...")
paper_embeddings = model.encode(paper_texts, show_progress_bar=True)

with open('data/paper_embeddings.pkl', 'wb') as f:
    pickle.dump(paper_embeddings, f)

print(f"Paper embeddings saved. Shape: {paper_embeddings.shape}")

# ---- Students ke embeddings ----
students_df = pd.read_csv('data/processed_students.csv')
student_texts = students_df['combined_text'].tolist()

print("Generating student embeddings...")
student_embeddings = model.encode(student_texts, show_progress_bar=True)

with open('data/student_embeddings.pkl', 'wb') as f:
    pickle.dump(student_embeddings, f)

print(f"Student embeddings saved. Shape: {student_embeddings.shape}")