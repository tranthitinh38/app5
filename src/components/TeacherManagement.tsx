import React, { useEffect, useState } from 'react';
import { TeacherDashboard } from './TeacherDashboard';
import { useAuth } from '../utils/AuthContext';
import { StudentDetail } from './StudentDetail';

/**
 * Component visible only to teachers.
 * It loads the list of students (their progress) from localStorage
 * and renders the TeacherDashboard. Allows editing student names
 * and viewing per‑unit detailed scores.
 */
export const TeacherManagement: React.FC = () => {
  const { user } = useAuth();
  const [classStudents, setClassStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Load class data from localStorage
  const loadClassData = async () => {
    if (user.role !== 'teacher') return;
    const teacherId = user.id;
    try {
      const resp = await fetch(`/api/teacher/${teacherId}/students`);
      if (!resp.ok) throw new Error('Failed to fetch students');
      const data = await resp.json();
      const arr = data.students || [];
      setClassStudents(arr);
    } catch (e) {
      console.warn('Failed to load class data', e);
    }

  

  


  useEffect(() => {
    loadClassData();
    // eslint‑disable-next-line react-hooks/exhaustive-deps
  }, [user.role]);

  // Add a new student (placeholder name)
  const handleAddStudent = async () => {
    const teacherId = user.id;
    const newStudent = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2,5)}`,
      name: 'Học sinh mới',
      level: 1,
      levelTitle: 'Beginner',
      xp: 0,
      xpToNextLevel: 100,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      dailyGoalWords: 10,
      wordsReviewedToday: 0,
      completedSpeakingToday: 0,
      pvpWins: 0,
      pvpTotal: 0,
      badges: [],
      items: [],
      unitScores: [],
    } as any;
    try {
      const resp = await fetch(`/api/teacher/${teacherId}/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!resp.ok) throw new Error('Failed to add student');
      const data = await resp.json();
      setClassStudents(data.students);
    } catch (e) {
      console.warn('Add student error', e);
    }




  // Delete a student by id
  const handleDeleteStudent = async (id: string) => {
    const teacherId = user.id;
    try {
      const resp = await fetch(`/api/teacher/${teacherId}/student/${id}`, {
        method: 'DELETE',
      });
      if (!resp.ok) throw new Error('Failed to delete student');
      const data = await resp.json();
      setClassStudents(data.students);
    } catch (e) {
      console.warn('Delete student error', e);
    }
  };

  const handleEditStudent = (id: string, newName: string) => {
    const updated = classStudents.map((s) => (s.id === id ? { ...s, name: newName } : s));
    setClassStudents(updated);
  };

  // Select a student to view detailed unit scores
  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);


  // Back from detail view
  const handleBack = () => {
    setSelectedStudentId(null);


  // Hide component for non‑teacher users
  if (user.role !== 'teacher') return null;

  // If a student is selected, show detailed view
  if (selectedStudentId) {
    const student = classStudents.find((s) => s.id === selectedStudentId);
    return student ? (
      <StudentDetail student={student} onBack={handleBack} />
    ) : (
      <div className="p-4 text-red-400">Student not found.</div>
    );
  }

  return (
    <TeacherDashboard
      classStudents={classStudents}
      onEditStudent={handleEditStudent}
      onSelectStudent={handleSelectStudent}
      onAddStudent={handleAddStudent}
      onDeleteStudent={handleDeleteStudent}
    />
  );
};
