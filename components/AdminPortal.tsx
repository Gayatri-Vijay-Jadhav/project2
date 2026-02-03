
import React from 'react';
import { Plus, Users, BookOpen, DollarSign, TrendingUp, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', enrollments: 40, revenue: 2400 },
  { name: 'Tue', enrollments: 30, revenue: 1398 },
  { name: 'Wed', enrollments: 20, revenue: 9800 },
  { name: 'Thu', enrollments: 27, revenue: 3908 },
  { name: 'Fri', enrollments: 18, revenue: 4800 },
  { name: 'Sat', enrollments: 23, revenue: 3800 },
  { name: 'Sun', enrollments: 34, revenue: 4300 },
];

const AdminPortal: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-slate-500">Manage your academy and monitor performance.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '12,840', icon: Users, color: 'blue', trend: '+12.5%' },
          { label: 'Active Courses', value: '45', icon: BookOpen, color: 'indigo', trend: '+2' },
          { label: 'Total Revenue', value: '$245,000', icon: DollarSign, color: 'emerald', trend: '+8.4%' },
          { label: 'Completion Rate', value: '68%', icon: TrendingUp, color: 'amber', trend: '+2.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <h4 className="text-slate-500 text-sm font-medium">{stat.label}</h4>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Enrollment Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="enrollments" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <h3 className="font-bold text-lg mb-6">Recent Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="pb-4 pr-4">Course</th>
                  <th className="pb-4 pr-4">Instructor</th>
                  <th className="pb-4 pr-4">Sales</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_COURSES.slice(0, 4).map(course => (
                  <tr key={course.id} className="text-sm">
                    <td className="py-4 pr-4 font-semibold">{course.title}</td>
                    <td className="py-4 pr-4 text-slate-500">{course.instructor}</td>
                    <td className="py-4 pr-4 font-medium">840</td>
                    <td className="py-4">
                      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
