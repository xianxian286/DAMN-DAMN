import { useParams } from 'react-router-dom';
import { React, useState, useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Button, Modal, Spin, SideSheet, List, Input, Avatar, Table } from '@douyinfe/semi-ui';
import { Student } from '../Callroll/component';
import { AbsenceButtons, AttendanceList } from './component';
import http from '../http';

const style = {
    marginLeft:'10px',
    width:'80px'
};

const processData = (data) => {
    let studentMap = {};

    data.forEach(item => {
        if (!studentMap[item.name]) {
            studentMap[item.name] = { name: item.name };
        }
        studentMap[item.name][item.date] = item.score;
    });

    return Object.values(studentMap);
};

const columns = (data) => { 
    let seenDates = new Set();
    let seenNames = new Set();
    let dates = data.filter(item => {
        if (seenDates.has(item.date)) {
            return false;
        } else {
            seenDates.add(item.date);
            return true;
        };
        
    })?.map((e) =>{return { 
        title: e.date,
        dataIndex: e.date,
       render:(text)=>text||'0'
    }});

    let uniqueData = data.filter(item => {
        if (seenNames.has(item.name)) {
            return false;
        } else {
            seenNames.add(item.name);
            return true;
        }
    });
console.log(dates)
console.log(data)

    return(
        [
            {
                title: '学生名称',
                dataIndex: 'name',
                fixed: true,
                width: 250,
                render: (text, record, index) => {
                    return (
                        <div>
                            <Avatar size="small" style={{ marginRight: 12 }}></Avatar>
                            {text}
                        </div>
                    );
                },
                
            },
...dates,
            {
                title: '总分',
                fixed: 'right',
                align: 'center',
                width: 100,
                render: (text,row) => {
                    console.log(row)

                    // 第二步：将每个日期后的分数求和
                    let values = Object.values(row);
                    console.log(values)
                    let totalScore = values.slice(1).reduce((total, value) => total + value, 0);
                    return  totalScore;
                },
            },

        ]
    )
}

export function CourseDetails() {
    let { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [attendanceModalvisible, setAttendanceModalVisible] = useState(false);
    const scroll = useMemo(() => ({ y: 300, x: 1200 }), []);
    const [statisticsVisible, setStatisticsVisible] = useState(false);

    const { data, isLoading:isDataLoading} = useSWR('http://localhost:5050/courses/1/scores', url =>
        axios.get(url,{headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDc3MTMwLCJleHAiOjE3MjY3MTcxMzB9.B0cyolVCz9GEKKz67EVHEyQgQ7KAjinvIa57AJjpf-g'}}).then(response => {
            console.log(response);
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
    }))

    const showDialog = () => {
        setAttendanceModalVisible(true);
    };
    
    const change = () => {
        setVisible(!visible);
    };

    const handleOk = () => {
        setAttendanceModalVisible(false);
        submitAttendance();
    };

    const showStatistic = () => {
        setStatisticsVisible(true);
    }

    const handleStatisticOk = () => {
        setStatisticsVisible(false)
    }

    const handleStatisticAfterClose = () => {
            setStatisticsVisible(false);
        };
        const handleStatisticCancel = () => {
            setStatisticsVisible(false);
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
            const response = await fetch('http://localhost:4000/attendance', {
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
        setAttendanceModalVisible(false);
        ///....
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed', 111);
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
    
    const {data:attendance, isLoading:isAttendanceLoading, error:attendanceError} = useSWR('http://localhost:4000/attendance', url =>
        axios.get(url).then(response => {
            console.log(response.data,111)
            return response.data;
            
        }))

    if (isCourseLoading || isStudentLoading || isAttendanceLoading || isDataLoading) {
        return <Spin />;
      }
       const d = data.map(x=>{const dict = {name:x.name}; dict[x.date]=x.score; return dict })
console.log(d)
const dataSource = processData(data);
console.log(dataSource)

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
                    visible={attendanceModalvisible}
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
                <AttendanceList attendance={attendance}/>
            </SideSheet>
            <Button onClick={showStatistic}>统计</Button>
            <SideSheet
                    title="统计"
                    visible={statisticsVisible}
                    onOk={handleStatisticOk}
                    afterClose={handleStatisticAfterClose}
                    onCancel={handleStatisticCancel}
                    closeOnEsc={true}
                    width={720}
                >
                    <Table columns={columns(data)} dataSource={dataSource}  scroll={scroll} />
                </SideSheet>
            <Button >添加学生</Button>

        </div>

    )

};