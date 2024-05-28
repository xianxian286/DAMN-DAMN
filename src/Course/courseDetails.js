import { useParams } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Item from '@douyinfe/semi-ui/lib/es/cascader/item';
import { Button, InputNumber, Modal, Space, Spin, TabPane, Tabs, SideSheet } from '@douyinfe/semi-ui';
import { Student } from '../Callroll/component';
import { AttendanceList } from './component';

export function CourseDetails() {
    let { id } = useParams();
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
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
                <Button>添加考勤</Button>
                <AttendanceList attendence={attendence}/>
            </SideSheet>
            <Button>统计</Button>

        </div>

    )

};