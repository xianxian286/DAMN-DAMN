import { Button, InputNumber, Modal, Space, Spin, TabPane, Tabs } from '@douyinfe/semi-ui';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Student } from './component';

export const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    margin: '8px 2px',
};

const Callroll = () => {
    // let [chooseList, setChooseList] = useState();
    // let [selectedStudent, setSelect] = useState([]);
    const [visible, setVisible] = useState(false);
    let [choosenOne, setChosenOne] = useState();
    let [groups, setGroups] = useState([]);
    let [groupSize , setGroupSize] = useState();

    const { data:students, error, isLoading, mutate} = useSWR('http://localhost:4000/students', url =>
            axios.get('http://localhost:4000/students').then(response => {
                console.log(response);
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            })
        )
    
    const updateStudent = ({ id, data }) =>
        axios.patch(`http://localhost:4000/students/${id}`, data);


    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        // setSelect([...selectedStudent, choosenOne])
        updateStudent({id:choosenOne.id, data:{points:choosenOne.points + 1, selected:true}}).then(() => {mutate()})
        setChosenOne()
        console.log('Ok button clicked');
    };
    const handleCancel = () => {
        setVisible(false);
        // setSelect([...selectedStudent, choosenOne])
        updateStudent({id:choosenOne.id, data:{selected:true}}).then(() => {mutate()})
        setChosenOne()
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };
    
    
    useEffect( () => {
        if(students && students.filter( student => student.selected ).length == students.length){
            // setSelect([])
            Promise.all(students.map(student => updateStudent({id:student.id, data:{selected:false}}))).then(() => {mutate()})
        }
    }, [students])

    function CallrollAction() {
        const unselectStudents = students.filter( student => !student.selected )
        let randomIndex = Math.floor(Math.random() * unselectStudents.length);
        let randomPerson = unselectStudents[randomIndex];
        setChosenOne(randomPerson)
        showDialog()
    }


    if (isLoading) {
        return <Spin />;
      }
      if (error) {
        return <div>{error.message}</div>;
      }
    
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
console.log(groups)
    return (
        <div>
            <Tabs type="line">
                <TabPane tab="点名" itemKey="1">
                    <Student students={students} selectedStudent={ students.filter( student => student.selected )} isNotGroup={true}></Student>
                    <Button onClick={CallrollAction}>随机点名</Button>
                    <Modal
                        title="幸运儿"
                        visible={visible}
                        onOk={handleOk}
                        afterClose={handleAfterClose} //>=1.16.0
                        onCancel={handleCancel}
                        closeOnEsc={true}
                        okButtonProps={{ size: 'small'}}
                        cancelButtonProps={{ size: 'small', disabled: false }}
                        okText={'Sounds great!'}
                        cancelText={'No, thanks.'}
                    >
                        {choosenOne?.name}
                    </Modal>
                </TabPane>
                <TabPane tab="分组" itemKey="2">
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
                </TabPane>
            </Tabs>
            
        </div>
    );
};
export default Callroll;