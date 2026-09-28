import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# Data load karo
papers_df = pd.read_csv('data/processed_papers.csv')
students_df = pd.read_csv('data/processed_students.csv')

with open('data/paper_embeddings.pkl', 'rb') as f:
    paper_embeddings = pickle.load(f)

with open('data/student_embeddings.pkl', 'rb') as f:
    student_embeddings = pickle.load(f)

model = SentenceTransformer('all-MiniLM-L6-v2')


def get_recommendations(student_id, top_n=5):
    student_row = students_df[students_df['student_id'] == student_id]
    if student_row.empty:
        return f"Student ID {student_id} nahi mila."

    student_index = student_row.index[0]
    student_vector = student_embeddings[student_index].reshape(1, -1)

    scores = cosine_similarity(student_vector, paper_embeddings)[0]
    top_indices = scores.argsort()[::-1][:top_n]

    results = []
    for idx in top_indices:
        results.append({
            'title': papers_df.iloc[idx]['title'],
            'category': papers_df.iloc[idx]['category'],
            'url': papers_df.iloc[idx]['url'],
            'match_score': round(float(scores[idx]) * 100, 2)
        })

    return results


def get_recommendations_from_text(profile_text, top_n=5):
    live_embedding = model.encode([profile_text])

    scores = cosine_similarity(live_embedding, paper_embeddings)[0]
    top_indices = scores.argsort()[::-1][:top_n]

    results = []
    for idx in top_indices:
        results.append({
            'title': papers_df.iloc[idx]['title'],
            'category': papers_df.iloc[idx]['category'],
            'url': papers_df.iloc[idx]['url'],
            'match_score': round(float(scores[idx]) * 100, 2)
        })

    return results


if __name__ == "__main__":
    student_id = 1
    print(f"Recommendations for student {student_id}:\n")

    recs = get_recommendations(student_id, top_n=5)
    for i, r in enumerate(recs, 1):
        print(f"{i}. {r['title']}")
        print(f"   Category: {r['category']} | Match: {r['match_score']}%")
        print(f"   Link: {r['url']}\n")