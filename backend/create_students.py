import pandas as pd

students = [
    {
        "student_id": 1,
        "name": "Aman Sharma",
        "skills": "Python, Machine Learning, SQL",
        "interests": "Natural Language Processing, Chatbots",
        "cgpa": 8.2,
        "career_goal": "Research"
    },
    {
        "student_id": 2,
        "name": "Priya Verma",
        "skills": "HTML, CSS, JavaScript, React",
        "interests": "Web Development, UI/UX",
        "cgpa": 7.9,
        "career_goal": "Industry"
    },
    {
        "student_id": 3,
        "name": "Rohit Singh",
        "skills": "Python, TensorFlow, OpenCV",
        "interests": "Computer Vision, Deep Learning",
        "cgpa": 8.6,
        "career_goal": "Research"
    },
    {
        "student_id": 4,
        "name": "Sneha Patil",
        "skills": "Networking, Linux, Python",
        "interests": "Cybersecurity, Ethical Hacking",
        "cgpa": 7.5,
        "career_goal": "Industry"
    },
    {
        "student_id": 5,
        "name": "Karan Mehta",
        "skills": "Java, Spring Boot, MySQL",
        "interests": "Backend Development, Cloud Computing",
        "cgpa": 8.0,
        "career_goal": "Startup"
    }
]

df = pd.DataFrame(students)
df.to_csv('data/students.csv', index=False)
print(f"Total students saved: {len(df)}")