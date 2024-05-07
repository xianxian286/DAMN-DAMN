import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Student } from './component';
import { Button, InputNumber, Modal, Space, Spin, TabPane, Tabs } from '@douyinfe/semi-ui';


export function CallrollTab() {
    const [visible, setVisible] = useState(false);
    let [choosenOne, setChosenOne] = useState();

    const { data:students, mutate} = useSWR('http://localhost:4000/students', url =>
        axios.get('http://localhost:4000/students').then(response => {
            console.log(response);
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
    }))

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

    return(
        <div>
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
        </div>
        
    )
}