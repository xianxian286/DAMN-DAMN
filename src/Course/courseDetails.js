import { useParams } from 'react-router-dom';
import { React, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Button, Modal, Spin, SideSheet, List, Input } from '@douyinfe/semi-ui';
import { Student } from '../Callroll/component';
import { AbsenceButtons, AttendanceList } from './component';

const style = {
    marginLeft:'10px',
    width:'80px'
};

export function CourseDetails() {
    let { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [attendenceModalvisible, setAttendenceModalVisible] = useState(false);
    
    const showDialog = () => {
        setAttendenceModalVisible(true);
    };
    
    const change = () => {
        setVisible(!visible);
    };

    const handleOk = () => {
        setAttendenceModalVisible(false);
        submitAttendance();
        //....
        // axios.post('http://localhost:4000/attendence', )
    };

    const submitAttendance = async () => {
        const postData = {
            date: "2025-6-7",
            detail: students.map(student => ({
                name: student.name,
                status: localStorage.getItem(`attendance_${student.name}`) || '',
            })),
        };
    
        try {
            const response = await fetch('http://localhost:4000/attendence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
    
            if (response.ok) {
                alert('考勤数据已提交');
            } else {
                alert('提交失败');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('提交失败');
        }
    };

    const handleCancel = () => {
        setAttendenceModalVisible(false);
        ///....
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };

    const { data:students, isLoading:isStudentLoading, mutate} = useSWR('http://localhost:4000/students', url =>
        axios.get(url).then(response => {
            console.log(response);
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
    }))

    const {data:course, isLoading:isCourseLoading, error} = useSWR('http://localhost:4000/courses/' + id, url =>
        axios.get(url).then(response => {  
            return response.data;
        }))
    
    const {data:attendence, isLoading:isAttendenceLoading, error:attendenceError} = useSWR('http://localhost:4000/attendence', url =>
        axios.get(url).then(response => {
            console.log(response.data,111)
            return response.data;
            
        }))

    if (isCourseLoading || isStudentLoading || isAttendenceLoading) {
        return <Spin />;
      }


    return(
        <div>
            {course.name}
            <Student students={students}
            />
            <Button>上课</Button>
            <Button onClick={change}>考勤</Button>
            <SideSheet title="考勤" visible={visible} onCancel={change} size={'large'}>
                <Button onClick={showDialog}>添加考勤</Button>
                <Modal
                    title="添加考勤"
                    visible={attendenceModalvisible}
                    onOk={handleOk}
                    afterClose={handleAfterClose}
                    onCancel={handleCancel}
                    closeOnEsc={true}
                >
                    <List
                        bordered
                        dataSource={students}
                        renderItem={item => 
                        <List.Item>
                            {item.name}
                            <AbsenceButtons studentName={item.name} ></AbsenceButtons>
                            <Input placeholder='备注' style={style}></Input>
                        </List.Item>
                        }
                    />
                </Modal>
                <AttendanceList attendence={attendence}/>
            </SideSheet>
            <Button>统计</Button>

        </div>

    )

};