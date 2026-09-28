import requests
import pandas as pd
import xml.etree.ElementTree as ET

def fetch_arxiv_papers(query, max_results=50):
    url = f"http://export.arxiv.org/api/query?search_query=all:{query}&max_results={max_results}"
    response = requests.get(url)
    root = ET.fromstring(response.content)

    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    papers = []

    for entry in root.findall('atom:entry', ns):
        title = entry.find('atom:title', ns).text.strip().replace('\n', ' ')
        abstract = entry.find('atom:summary', ns).text.strip().replace('\n', ' ')
        published = entry.find('atom:published', ns).text
        link = entry.find('atom:id', ns).text

        papers.append({
            'title': title,
            'abstract': abstract,
            'year': published[:4],
            'category': query,
            'url': link
        })

    return papers


topics = [
    'machine learning',
    'natural language processing',
    'computer vision',
    'web development',
    'cybersecurity'
]

all_papers = []
for topic in topics:
    print(f"Fetching papers for: {topic}")
    papers = fetch_arxiv_papers(topic, max_results=50)
    all_papers.extend(papers)

df = pd.DataFrame(all_papers)
df.to_csv('data/papers.csv', index=False)
print(f"Total papers saved: {len(df)}")