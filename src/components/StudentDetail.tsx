import React from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Chi tiết tiến độ của một học sinh.
 *
 * Props:
 * - student: đối tượng học sinh (cùng shape với UserProgress).
 * - onBack: hàm được gọi khi người dùng nhấn nút "Quay lại".
 */
interface UnitScore {
  unitId: string;
  mastered: number;
  ipaScore?: number;
}

type Student = {
  id?: string;
  name?: string;
  level?: number;
  streak?: number;
  wordsReviewedToday?: number;
  // Các trường tùy chọn khác
  unitScores?: UnitScore[];
};

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
  const { name = "Học sinh", unitScores } = student;

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          <span className="ml-1">Quay lại</span>
        </button>
        <h2 className="text-xl font-semibold ml-4">{name} – Chi tiết Unit</h2>
      </div>

      {/* Nội dung chi tiết */}
      {unitScores && unitScores.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Unit</th>
              <th className="px-4 py-2 text-left">Từ vựng đã thành thạo</th>
              <th className="px-4 py-2 text-left">IPA Score</th>
            </tr>
          </thead>
          <tbody>
            {unitScores.map((u) => (
              <tr
                key={u.unitId}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{u.unitId}</td>
                <td className="px-4 py-2">{u.mastered}</td>
                <td className="px-4 py-2">
                  {u.ipaScore !== undefined ? u.ipaScore : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Chưa có dữ liệu chi tiết cho học sinh này.</p>
      )}
    </div>
  );
};
