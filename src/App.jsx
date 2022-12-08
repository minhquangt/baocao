import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
    const [studentList, setStudentList] = useState([]);

    const [student, setStudent] = useState({
        id: '',
        code: '',
        fullname: '',
        dateOfBirth: '',
        homeTown: '',
    });

    const [error, setError] = useState('');

    const [status, setStatus] = useState('');

    const handleChange = (field) => (e) => {
        let value = e.target.value;
        setStudent({ ...student, [field]: value });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const code = studentList.find((s) => s.code === student.code);
        if (code) {
            setError(
                'Mã sinh viên đã tồn tại. Vui lòng nhập mã sinh viên khác.'
            );
            return;
        } else {
            const newStudent = {
                ...student,
            };
            await axios.post(`http://localhost:3000/students`, newStudent);
            setStudent({
                id: '',
                code: '',
                fullname: '',
                dateOfBirth: '',
                homeTown: '',
            });
            setStatus('add' + Date.now());
            setError('');
        }
    };
    const handleEditStudent = (student) => {
        setStudent({
            id: student.id,
            code: student.code,
            fullname: student.fullname,
            dateOfBirth: student.dateOfBirth,
            homeTown: student.homeTown,
        });
    };

    const handleUpdateStudent = async (e, id) => {
        e.preventDefault();
        const newStudent = {
            ...student,
        };
        await axios.put(`http://localhost:3000/students/${id}`, newStudent);
        setStudent({
            id: '',
            code: '',
            fullname: '',
            dateOfBirth: '',
            homeTown: '',
        });
        setStatus('update' + Date.now());
        setError('');
    };

    const handleDeleteStudent = async (id) => {
        await axios.delete(`http://localhost:3000/students/${id}`);
        setStatus('delete' + Date.now());
    };

    useEffect(() => {
        const getStudents = async () => {
            const res = await axios.get('http://localhost:3000/students');
            setStudentList(res.data);
        };
        getStudents();
    }, [status]);

    return (
        <div className='container'>
            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
                onClick={() => {
                    setStudent({
                        id: '',
                        code: '',
                        fullname: '',
                        dateOfBirth: new Date(),
                        homeTown: '',
                    });
                }}
            >
                Add New
            </button>
            <StudentForm
                student={student}
                handleAddStudent={handleAddStudent}
                handleChange={handleChange}
                handleUpdateStudent={handleUpdateStudent}
                error={error}
            />
            <StudentList
                studentList={studentList}
                handleEditStudent={handleEditStudent}
                handleDeleteStudent={handleDeleteStudent}
            />
        </div>
    );
}

export default App;
