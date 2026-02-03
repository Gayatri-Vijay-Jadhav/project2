
import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

const VivaSection: React.FC = () => {
  const qaPairs = [
    {
      q: "What is the primary objective of your project?",
      a: "The primary objective is to build a modern E-Learning platform that solves the 'content overload' problem by providing personalized course recommendations using AI."
    },
    {
      q: "How does the AI Recommendation Engine work?",
      a: "It uses a hybrid filtering approach. It analyzes student interests (Content-Based) and cross-references them with trending courses and high-rated content (Collaborative Filtering concepts)."
    },
    {
      q: "Explain the role of Servlets in your project.",
      a: "Servlets act as the 'Controller' in the MVC architecture. They handle incoming HTTP requests, interact with the Database (Model), and forward data to the JSP pages (View)."
    },
    {
      q: "Why did you choose Python for the AI module?",
      a: "Python has extensive libraries like Scikit-Learn and Pandas, which make it ideal for data manipulation and implementing similarity algorithms for recommendations."
    },
    {
      q: "How do you handle session management?",
      a: "We use the HttpSession object in Java Servlets to store user details upon login, ensuring only authenticated users can access the dashboard."
    },
    {
      q: "What is JDBC and why is it used?",
      a: "JDBC (Java Database Connectivity) is an API used to connect the Java application with the MySQL database for executing SQL queries."
    },
    {
      q: "Explain the database normalization in your schema.",
      a: "We followed 3NF (Third Normal Form) to eliminate data redundancy. Users, Courses, and Enrollments are stored in separate tables linked by Foreign Keys."
    },
    {
      q: "What were the major challenges you faced?",
      a: "Integrating the Java backend with the Python script was challenging. We solved this by using an API-based communication or using ProcessBuilder to execute scripts."
    },
    {
      q: "How secure is your platform?",
      a: "We implement basic security through Session tracking and input validation. In a real-world scenario, we would add password hashing (BCrypt) and SSL."
    },
    {
      q: "What is the future scope of this project?",
      a: "Adding live proctored exams using AI computer vision, incorporating real-time chatbots for student support, and a collaborative learning forum."
    },
    {
      q: "What is the importance of a 'Progress Tracker'?",
      a: "It helps students maintain consistency and allows the system to generate 'Learning Insights' by analyzing completion speed and quiz scores."
    },
    {
      q: "Describe your project's architecture.",
      a: "It follows a Multi-tier architecture: Frontend (React/HTML), Backend (Java Servlets), Logic Layer (Python AI), and Data Tier (MySQL)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-4 flex items-center gap-4">
          <HelpCircle className="text-blue-600" size={40} />
          Viva Voce Preparation
        </h2>
        <p className="text-slate-500 text-lg">
          Be prepared for your project defense with these common questions and detailed technical answers.
        </p>
      </div>

      <div className="space-y-6">
        {qaPairs.map((pair, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:border-blue-300 transition-colors group">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                Q{i + 1}
              </span>
              <div>
                <h4 className="font-bold text-lg mb-4 text-slate-800">{pair.q}</h4>
                <div className="flex gap-4">
                  <CheckCircle2 className="flex-shrink-0 text-emerald-500 mt-1" size={18} />
                  <p className="text-slate-600 leading-relaxed italic">
                    "{pair.a}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VivaSection;
