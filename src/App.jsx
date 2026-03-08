import { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import { initialStudents } from "./data/students";
import * as XLSX from "xlsx";

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now()
    };

    setStudents([...students, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    const updatedList = students.map((s) => 
      s.id === updatedStudent.id ? updatedStudent : s
    );
    
    setStudents(updatedList);
    setSelectedStudent(null);
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if(confirmDelete) {
      const updated = students.filter((s) => s.id !== id);
      setStudents(updated);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const downloadExcel = () => {
    const exportData = students.map(({name, email, age}) => ({
      Name: name,
      Email: email,
      Age: age
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  }

  return (
  <div className="app-bg">
    <div className="container py-5">

      <h2 className="text-center mb-5 fw-bold title">
        🎓 Student Management System
      </h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading students...</p>
        </div>
      ) : (
        <>
          <div className="card shadow-lg p-4 mb-4 form-card">
            <StudentForm
              addStudent={addStudent}
              selectedStudent={selectedStudent}
              updateStudent={updateStudent}
            />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success download-btn"
              onClick={downloadExcel}
            >
              ⬇ Download Excel
            </button>
          </div>

          <div className="card shadow-lg p-3">
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default App;