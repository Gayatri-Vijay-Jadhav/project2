
import React, { useState, useMemo } from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';

interface CourseCatalogProps {
  searchQuery: string;
  onStartCourse: (course: Course) => void;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ searchQuery, onStartCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Computer Science', 'Artificial Intelligence', 'Development', 'Security'];

  const filtered = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Course Catalog</h2>
          <p className="text-slate-500">
            {searchQuery ? `Showing results for "${searchQuery}"` : 'Browse through our expert-led courses.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 bg-white p-1 rounded-xl border border-slate-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(course => (
            <div 
              key={course.id} 
              onClick={() => onStartCourse(course)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all group cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {course.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">{course.rating}</span>
                  <span className="text-xs text-slate-400 ml-1">({course.studentsCount})</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="text-xs">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span className="text-xs">{course.studentsCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="text-slate-400 mb-4 flex justify-center"><Users size={48} /></div>
          <h3 className="text-xl font-bold text-slate-700">No courses found</h3>
          <p className="text-slate-500">Try adjusting your search query or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
