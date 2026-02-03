
import React, { useState, useEffect } from 'react';
import { Trophy, Zap, ArrowRight, BrainCircuit, Loader2 } from 'lucide-react';
import { User, Course } from '../types';
import { MOCK_COURSES } from '../constants';
import { getAIRecommendations, getLearningInsights } from '../services/geminiService';

interface DashboardProps {
  user: User;
  onStartCourse: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartCourse }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [insight, setInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      setIsLoading(true);
      const recs = await getAIRecommendations(user, MOCK_COURSES);
      const ins = await getLearningInsights({ enrollments: user.enrolledCourses, interests: user.interests });
      setRecommendations(recs.recommendations || []);
      setInsight(ins);
      setIsLoading(false);
    };
    fetchAI();
  }, [user]);

  const enrolled = MOCK_COURSES.filter(c => user.enrolledCourses.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500">You have completed 45% of your learning goals this month.</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
          <Trophy size={20} />
          <span>750 Points Earned</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">In Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolled.map(course => (
              <div key={course.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <img src={course.thumbnail} className="w-full h-40 object-cover rounded-xl mb-4" alt={course.title} />
                <h4 className="font-bold text-lg mb-1">{course.title}</h4>
                <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[65%] rounded-full" />
                  </div>
                </div>
                <button 
                  onClick={() => onStartCourse(course)}
                  className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-blue-200" size={24} />
              <h3 className="font-bold text-lg">AI Learning Insight</h3>
            </div>
            {isLoading ? (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-sm opacity-80">Generating personalized insights...</span>
              </div>
            ) : (
              <p className="text-blue-50 leading-relaxed text-sm">
                {insight}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Recommended for You</h3>
              <Zap size={20} className="text-amber-500 fill-amber-500" />
            </div>
            <div className="space-y-6">
              {isLoading ? (
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-100 rounded w-3/4" />
                          <div className="h-2 bg-slate-100 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                 </div>
              ) : (
                recommendations.map((rec: any) => {
                  const course = MOCK_COURSES.find(c => c.id === rec.courseId);
                  if (!course) return null;
                  return (
                    <div key={course.id} className="group cursor-pointer" onClick={() => onStartCourse(course)}>
                      <div className="flex gap-4 items-start">
                        <img src={course.thumbnail} className="w-16 h-16 rounded-lg object-cover shrink-0" alt="" />
                        <div>
                          <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors">{course.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{rec.reason}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Explore All <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
