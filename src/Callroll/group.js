import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Student } from './component';
import { Button, InputNumber, Modal, Space, Spin, TabPane, Tabs } from '@douyinfe/semi-ui';

export function GroupTab() {
    let [groups, setGroups] = useState([]);
    let [groupSize , setGroupSize] = useState();

    const { data:students} = useSWR('http://localhost:4000/students', url =>
            axios.get('http://localhost:4000/students').then(response => {
                console.log(response);
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            }))

    const getShuffledArr = arr => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };
    
    const group = () => {
        const students_t = getShuffledArr(students);
        const totalPeople = students_t.length;
        let groupCount = Math.floor(totalPeople / groupSize);
        let remainder = totalPeople % groupSize;
        
        if (remainder === 1) {
            remainder++;
            groupCount--;
        }
        
        const groups = [];
        
        let startIndex = 0;
        for (let i = 0; i < groupCount; i++) {
            const group = students_t.slice(startIndex, startIndex + groupSize);
            groups.push(group);
            startIndex += groupSize;
        }
        
        if (remainder > 0) {
            const lastGroup = students_t.slice(startIndex);
            groups.push(lastGroup);
        }
        setGroups(groups);
        
    };

    return(
        <div>
         <Student students={students} selectedStudent={[]}></Student>
                <InputNumber value ={groupSize} onChange={(groupSize) => {setGroupSize(groupSize)}}></InputNumber>
                <Button onClick={group}>分组</Button>
                <Space>
                    {groups.map(group =>
                        <Space vertical>
                            {group.map(student => 
                                <div>{student.name}</div>
                            )}
                        </Space>
                    )}
                </Space>   
        </div>
    )
}