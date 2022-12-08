import moment from 'moment';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function StudentList({ studentList, handleEditStudent, handleDeleteStudent }) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>TT</th>
                    <th scope='col'>Mã SV</th>
                    <th scope='col'>Họ và tên</th>
                    <th scope='col'>Ngày sinh</th>
                    <th scope='col'>Quê quán</th>
                    <th scope='col'>Sửa</th>
                    <th scope='col'>Xóa</th>
                </tr>
            </thead>
            <tbody>
                {studentList.map((student, index) => (
                    <tr key={student.code}>
                        <td>{index + 1}</td>
                        <td>{student.code}</td>
                        <td>{student.fullname}</td>
                        <td>
                            {moment(student.dateOfBirth).format('DD-MM-YYYY')}
                        </td>
                        <td>{student.homeTown}</td>
                        <td>
                            <AiFillEdit
                                className='icon-action'
                                style={{ fontSize: '24px', color: '#FFC107' }}
                                onClick={() => handleEditStudent(student)}
                                data-bs-toggle='modal'
                                data-bs-target='#exampleModal'
                            />
                        </td>
                        <td>
                            <AiFillDelete
                                className='icon-action'
                                style={{ fontSize: '24px', color: '#F44336' }}
                                onClick={() => handleDeleteStudent(student.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentList;
