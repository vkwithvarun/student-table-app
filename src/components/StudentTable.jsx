function StudentTable({ students, onEdit, onDelete }) {
    return (
        <table className="table table-bordered mt-4">
            <thead className="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
            </thead>
            
            <tbody>
                {students.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No Students Found
                        </td>
                    </tr>
                ) : (
                    students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(student)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default StudentTable;
