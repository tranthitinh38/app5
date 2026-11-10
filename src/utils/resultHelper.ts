// File: src/utils/resultHelper.ts

export const saveResultToLocalStorage = (lesson: string, type: string, score: number) => {
  const resultData = {
    studentId: "hs_001",       // ID học sinh
    studentName: "Nguyễn Văn A", // Tên học sinh
    lesson: lesson,            // Tên bài học (ví dụ: "Unit 1: Leisure Time")
    type: type,                // Loại hoạt động (ví dụ: "SRS Vocabulary", "Speaking", v.v.)
    score: score,              // Điểm số đạt được
    timestamp: new Date().toISOString()
  };

  try {
    const existingResults = JSON.parse(localStorage.getItem('student_results') || '[]');
    const updatedResults = [...existingResults, resultData];
    localStorage.setItem('student_results', JSON.stringify(updatedResults));
    console.log("Đã lưu kết quả thành công:", resultData);
  } catch (error) {
    console.error("Lỗi khi lưu kết quả:", error);
  }
};
