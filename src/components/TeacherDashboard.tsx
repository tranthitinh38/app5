import React, { useState, useEffect } from 'react';
import { Users, Flame, CheckCircle2, Mic, Trash2 } from 'lucide-react';
import { UserProgress } from '../types';

interface TeacherDashboardProps {
  classStudents: UserProgress[];
  onEditStudent: (id: string, newName: string) => void;
  onSelectStudent: (id: string) => void;
  onAddStudent: () => void;
  onDeleteStudent: (id: string) => void;
}
interface StudentResult {
  studentId: string;
  studentName: string;
  lesson: string;
  type: string;
  score: number;
  timestamp: string;
}
export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ classStudents, onEditStudent, onSelectStudent, onAddStudent, onDeleteStudent }) => {
  export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ classStudents, onEditStudent, onSelectStudent, onAddStudent, onDeleteStudent }) => {
  // --- DÁN ĐOẠN NÀY VÀO ĐÂY ---
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  useEffect(() => {
    const loadResults = () => {
      const stored = localStorage.getItem('student_results');
      if (stored) {
        try {
          setStudentResults(JSON.parse(stored));
        } catch (e) {
          console.error('Lỗi phân tích student_results', e);
        }
      }
    };
    loadResults();
  }, []);
  // -----------------------------

  const totalStudents = classStudents.length;
  const avgStreak = totalStudents === 0 ? 0 : Math.round(classStudents.reduce((sum, s) => sum + (s.streak ?? 0), 0) / totalStudents);
  // ... các dòng tiếp theo giữ nguyên ...
  const totalStudents = classStudents.length;
  const avgStreak = totalStudents === 0 ? 0 : Math.round(classStudents.reduce((sum, s) => sum + (s.streak ?? 0), 0) / totalStudents);
  const avgCompletion = totalStudents === 0 ? 0 : Math.round(classStudents.reduce((sum, s) => sum + (s.wordsReviewedToday ?? 0), 0) / totalStudents);
  const avgIpaScore = totalStudents === 0 ? 0 : Math.round(classStudents.reduce((sum, s) => sum + ((s as any).ipaScore ?? 88), 0) / totalStudents);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      {/* Class Overview */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-6 shadow-2xl">
        <h2 className="text-2xl font-black text-white mb-4">Tổng quan lớp học</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Số học sinh</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-white">{totalStudents}</p>
            <span className="text-[11px] text-indigo-300 font-semibold">Tổng số học sinh trong lớp</span>
          </div>
          {/* Streak Retention */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Tỷ lệ duy trì streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">{avgStreak}%</p>
            <span className="text-[11px] text-amber-300 font-semibold">Trung bình ngày streak</span>
          </div>
          {/* Assignment Completion */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Tỷ lệ hoàn thành bài tập</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-black text-white">{avgCompletion}%</p>
            <span className="text-[11px] text-green-300 font-semibold">Số từ đã học trung bình</span>
          </div>
          {/* Avg IPA Score */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Điểm IPA trung bình</span>
              <Mic className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-black text-white">{avgIpaScore}%</p>
            <span className="text-[11px] text-purple-300 font-semibold">Đánh giá phát âm lớp</span>
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-xl font-black text-white mb-4">Theo dõi tiến độ học sinh</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left text-slate-300">
            <thead className="text-xs uppercase bg-slate-800">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Học sinh</th>
                <th className="px-4 py-2">Streak (ngày)</th>
                <th className="px-4 py-2">Từ đã học hôm nay</th>
                <th className="px-4 py-2">Điểm IPA</th>
                <th className="px-4 py-2">Cấp độ</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((s, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium text-white">{s.name ?? 'Unnamed'}</td>
                  <td className="px-4 py-2">{s.streak ?? 0}</td>
                  <td className="px-4 py-2">{s.wordsReviewedToday ?? 0}</td>
                  <td className="px-4 py-2">{(s as any).ipaScore ?? 88}%</td>
                  <td className="px-4 py-2">{s.level ?? 0}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => {
                        const newName = prompt('Tên mới cho học sinh:', s.name);
                        if (newName && newName.trim()) {
                          onEditStudent((s as any).id, newName.trim());
                        }
                      }}
                      className="text-indigo-400 hover:text-indigo-200"
                    >✏️</button>
                    <button
                      onClick={() => onSelectStudent((s as any).id)}
                      className="text-green-400 hover:text-green-200"
                    >📊</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> {/* Bảng Nhật ký Kết quả của Học sinh từ LocalStorage */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-white">📋 Nhật ký kết quả làm bài của học sinh</h3>
          <button
            onClick={() => {
              const stored = localStorage.getItem('student_results');
              if (stored) setStudentResults(JSON.parse(stored));
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition cursor-pointer"
          >
            🔄 Tải lại dữ liệu
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left text-slate-300">
            <thead className="text-xs uppercase bg-slate-800">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Học sinh</th>
                <th className="px-4 py-2">Bài học (Lesson)</th>
                <th className="px-4 py-2">Phân loại (Module)</th>
                <th className="px-4 py-2">Điểm số</th>
                <th className="px-4 py-2">Thời gian nộp</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.length > 0 ? (
                studentResults.map((res, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-bold text-emerald-400">{res.studentName || 'Học sinh'}</td>
                    <td className="px-4 py-2 text-white font-medium">{res.lesson}</td>
                    <td className="px-4 py-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30 font-semibold">
                        {res.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-black text-amber-400">{res.score} điểm</td>
                    <td className="px-4 py-2 text-xs text-slate-400">
                      {new Date(res.timestamp).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500 italic">
                    Chưa có kết quả học tập nào được lưu từ học sinh. Hãy làm thử bài tập ở các module để hệ thống ghi nhận!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};
