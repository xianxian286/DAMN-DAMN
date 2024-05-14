-- register
INSERT INTO users (username, password, role) VALUES ('username', 'password', 'role');
-- login
SELECT * FROM users WHERE username = 'username' AND password = 'password';
-- Get course of a teacher
SELECT * FROM courses WHERE teacher_id = 'teacher_id';
-- Add course to a teacher
INSERT INTO courses (course_name, teacher_id) VALUES ('course_name', 'teacher_id');
-- Get students of a course, also return their attendance and scores

-- Add student to a course
INSERT INTO course_students (course_id, student_id) VALUES ('course_id', 'student_id');
-- Remove student from a course
DELETE FROM course_students WHERE course_id = 'course_id' AND student_id = 'student_id';
-- Get attendance of a course
SELECT * FROM attendance WHERE course_id = 'course_id';
-- Add an attendance record to a course
INSERT INTO attendance (course_id, student_id, attendance) VALUES ('course_id', 'student_id', 'attendance');
-- Get score sheet of a course
SELECT * FROM scores WHERE course_id = 'course_id';
-- Add a score record to a course
INSERT INTO scores (course_id, student_id, score) VALUES ('course_id', 'student_id', 'score');
