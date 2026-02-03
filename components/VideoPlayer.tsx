
import React, { useState } from 'react';
import { Play, CheckCircle, Clock, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { Course, Lesson } from '../types';

interface VideoPlayerProps {
  course: Course;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ course }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(course.lessons[0] || {
    id: 'placeholder',
    title: 'Welcome to the Course',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '02:30',
    isCompleted: false
  });

  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(course.lessons.filter(l => l.isCompleted).map(l => l.id))
  );

  const toggleComplete = (lessonId: string) => {
    const next = new Set(completedLessons);
    if (next.has(lessonId)) next.delete(lessonId);
    else next.add(lessonId);
    setCompletedLessons(next);
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Player Section */}
        <div className="flex-1 space-y-6">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
            {/* Real HTML5 Video Player */}
            <video 
              key={currentLesson.id}
              className="w-full h-full object-contain"
              controls
              autoPlay
              poster={course.thumbnail}
            >
              <source src={currentLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
              <button 
                onClick={() => toggleComplete(currentLesson.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  completedLessons.has(currentLesson.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CheckCircle size={18} />
                {completedLessons.has(currentLesson.id) ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
            <p className="text-slate-500 leading-relaxed">
              This module covers the core principles of {course.title}. In this specific lesson, we dive deep into {currentLesson.title.toLowerCase()}. Make sure to follow along with the exercises provided in the resources tab.
            </p>
            
            <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} className="w-12 h-12 rounded-full" alt="" />
                <div>
                  <h4 className="font-bold">{course.instructor}</h4>
                  <p className="text-xs text-slate-400">Course Instructor</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-slate-100 rounded-xl transition-all"><ChevronLeft size={20} /></button>
                <button className="p-3 hover:bg-slate-100 rounded-xl transition-all"><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Lesson List */}
        <div className="xl:w-96 space-y-6 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <List size={18} /> Course Content
              </h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                {completedLessons.size}/{course.lessons.length || 1} Lessons
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
              {(course.lessons.length > 0 ? course.lessons : [currentLesson]).map((lesson, idx) => (
                <button 
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full p-4 flex gap-4 text-left transition-all ${
                    currentLesson.id === lesson.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    {completedLessons.has(lesson.id) ? (
                      <CheckCircle className="text-green-500" size={18} />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold mb-1 ${currentLesson.id === lesson.id ? 'text-blue-600' : 'text-slate-800'}`}>
                      {idx + 1}. {lesson.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Play size={10} /> Video</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {lesson.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-blue-100 text-sm mb-4">Our AI academic advisor is available 24/7 to help you with course material.</p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
