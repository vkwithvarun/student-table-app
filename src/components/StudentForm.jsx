import { useState, useEffect } from "react";

function StudentForm({ addStudent, selectedStudent, updateStudent }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(selectedStudent) {
            setName(selectedStudent.name);
            setEmail(selectedStudent.email);
            setAge(selectedStudent.age);
        }
    }, [selectedStudent]);

    const validate = () => {
        const newErrors = {};

        if(!name.trim()) {
            newErrors.name = "Name is required";
        }
        if(!email.trim()) {
            newErrors.email = "Email is required";
        }else if(!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if(!age) {
            newErrors.age = "Age is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validate()) return;

        const student = {
            name,
            email,
            age
        };

        if(selectedStudent) {
            updateStudent({...student, id: selectedStudent.id });
        }else {
            addStudent(student);
        }

        setName("");
        setEmail("");
        setAge("");
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">

                <form onSubmit={handleSubmit} className="card p-4 shadow">

                    <h4 className="text / Edit Student"></h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <small className="text-danger">{errors.name}</small>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small className="text-danger">{errors.email}</small>
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder="Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <small className="text-danger">{errors.age}</small>
                    </div>

                    <button className = "btn btn-primary">
                        {selectedStudent ? "Update Student" : "Add Student"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;