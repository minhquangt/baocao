import React from 'react';
import moment from 'moment';

function StudentForm({
    student,
    handleAddStudent,
    handleChange,
    handleUpdateStudent,
    error,
}) {
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {student.id
                                ? 'Cập nhật thông tin sinh viên'
                                : 'Thêm mới sinh viên'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <form
                        className="modal-body"
                        onSubmit={(e) =>
                            student.id
                                ? handleUpdateStudent(e, student.id)
                                : handleAddStudent(e)
                        }
                    >
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Mã sinh viên:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="8 chữ số"
                                value={student.code}
                                onChange={handleChange('code')}
                                name="code"
                                required
                                minLength={8}
                                maxLength={8}
                                disabled={student.id ? true : false}
                            />
                            <span style={{ color: 'red' }}>
                                {error ? error : ''}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Họ và tên:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={student.fullname}
                                onChange={handleChange('fullname')}
                                name="fullname"
                                required
                                maxLength={100}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Ngày sinh:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={moment(student.dateOfBirth).format(
                                    'YYYY-MM-DD'
                                )}
                                onChange={handleChange('dateOfBirth')}
                                name="dateOfBirth"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Quê quán:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={student.homeTown}
                                onChange={handleChange('homeTown')}
                                name="homeTown"
                                required
                                maxLength={100}
                            />
                        </div>
                        {student.id ? (
                            <button
                                type="submit"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Cập nhật
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary">
                                Thêm mới
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentForm;
