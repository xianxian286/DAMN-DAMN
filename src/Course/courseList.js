import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Courses } from './component';
import { config } from 'localforage';
import { Button, Modal, Input } from '@douyinfe/semi-ui';

export function CourseList() {
    const [visible, setVisible] = useState(false);
    const [courseName, setCourseName] = useState('');

    const { data:courses, mutate} = useSWR('http://localhost:5050/courses', url =>
        axios.get(url,{headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDc3MTMwLCJleHAiOjE3MjY3MTcxMzB9.B0cyolVCz9GEKKz67EVHEyQgQ7KAjinvIa57AJjpf-g'}}).then(response => {
            console.log(response);
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
    }))
    // const response = axios.get('http://localhost:5050/courses')
    // console.log(response)
    const showDialog = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
        
        setCourseName('');
    };

    const handleCancel = () => {
        setCourseName('');
        setVisible(false);
        console.log('Cancel button clicked');
    };

    const handleAfterClose = () => {
        setCourseName('');
        console.log('After Close callback executed');
    };

    return (
        <div>
            <Courses courses={courses}></Courses>
            <Button onClick={showDialog}>添加课程</Button>
            <Modal
            title="请输入你创建的课程名称"
            visible={visible}
            onOk={handleOk}
            afterClose={handleAfterClose} //>=1.16.0
            onCancel={handleCancel}
            closeOnEsc={true}>
                <Input autoFocus placeholder='请输入课程' size='large' value={courseName} onChange={(value) => setCourseName(value)}></Input>
            </Modal>
        </div>
        
    )

}