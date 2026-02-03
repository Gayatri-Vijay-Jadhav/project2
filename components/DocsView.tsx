
import React, { useState } from 'react';
import { Copy, Check, FileCode2, Database, Code, Terminal } from 'lucide-react';

const DocsView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ id, title, language, code, icon: Icon }: any) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600">
            <Icon size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm">{title}</h4>
            <span className="text-[10px] text-slate-400 font-mono uppercase">{language}</span>
          </div>
        </div>
        <button 
          onClick={() => copyToClipboard(code, id)}
          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
        >
          {copied === id ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-400" />}
        </button>
      </div>
      <div className="p-6 bg-slate-900 overflow-x-auto">
        <pre className="text-slate-300 font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-4">Technical Deliverables</h2>
        <p className="text-slate-500 text-lg leading-relaxed">
          The following source code constitutes the core logic for the Java (Backend), MySQL (Database), 
          and Python (AI Engine) modules of the project.
        </p>
      </div>

      <CodeBlock 
        id="sql"
        title="MySQL Database Schema"
        language="sql"
        icon={Database}
        code={`-- DATABASE INITIALIZATION
CREATE DATABASE IF NOT EXISTS edu_ai_db;
USE edu_ai_db;

-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'ADMIN') DEFAULT 'STUDENT',
    interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COURSES TABLE
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    instructor VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    rating FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ENROLLMENTS TABLE
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    progress INT DEFAULT 0,
    status ENUM('ACTIVE', 'COMPLETED') DEFAULT 'ACTIVE',
    enrolled_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`}
      />

      <CodeBlock 
        id="java"
        title="Course Management Servlet (Java)"
        language="java"
        icon={Code}
        code={`package com.eduai.servlets;

import java.io.IOException;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/CourseServlet")
public class CourseServlet extends HttpServlet {
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("list".equals(action)) {
            listCourses(request, response);
        }
    }

    private void listCourses(HttpServletRequest request, HttpServletResponse response) {
        try {
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/edu_ai_db", "root", "root");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM courses");
            
            // Logic to forward to JSP with results
            request.setAttribute("courseList", rs);
            request.getRequestDispatcher("catalog.jsp").forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}
      />

      <CodeBlock 
        id="python"
        title="AI Recommendation Engine (Python)"
        language="python"
        icon={Terminal}
        code={`import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Mock data simulating Database fetch
courses = pd.DataFrame([
    {'id': 1, 'title': 'React Basics', 'tags': 'frontend web js'},
    {'id': 2, 'title': 'Python AI', 'tags': 'python ml data'},
    {'id': 3, 'title': 'Cyber Sec', 'tags': 'network security privacy'}
])

def get_recommendations(user_interest_str):
    # Vectorize course tags
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(courses['tags'])
    
    # Vectorize user input
    user_vec = tfidf.transform([user_interest_str])
    
    # Calculate similarity
    scores = cosine_similarity(user_vec, tfidf_matrix).flatten()
    
    # Return top 2 matching courses
    indices = scores.argsort()[-2:][::-1]
    return courses.iloc[indices][['id', 'title']]

# Example usage
print(get_recommendations("I love python and machine learning"))`}
      />
    </div>
  );
};

export default DocsView;
