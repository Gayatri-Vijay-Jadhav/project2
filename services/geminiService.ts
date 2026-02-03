
import { GoogleGenAI, Type } from "@google/genai";
import { Course, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (user: User, allCourses: Course[]) => {
  try {
    const prompt = `
      As an AI Academic Advisor for an E-Learning platform, analyze the student profile and recommend the top 3 most relevant courses.
      
      Student Profile:
      - Interests: ${user.interests.join(', ')}
      - Current Enrollments: ${user.enrolledCourses.join(', ')}
      
      Available Courses:
      ${JSON.stringify(allCourses.map(c => ({ id: c.id, title: c.title, category: c.category })))}
      
      Return the recommendation in JSON format including course IDs and a brief "Why?" for each.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  courseId: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["courseId", "reason"]
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { recommendations: [] };
  }
};

export const getLearningInsights = async (progressData: any) => {
  try {
    const prompt = `Based on the following learning progress: ${JSON.stringify(progressData)}, provide 3 motivational and strategic insights to help the student improve.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    return "Keep up the great work! Consistency is key to mastering any subject.";
  }
};
