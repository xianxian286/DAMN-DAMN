import './App.css';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { List, Descriptions, Rating, Button, ButtonGroup, Modal, Text, Spin, Tabs, TabPane } from '@douyinfe/semi-ui';
import useSWR from 'swr';

const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    margin: '8px 2px',
};

function Student({ students, selectedStudent, isNotGroup }){
    return (
        <List
            grid={{
                gutter: 12,
                xs: 0,
                sm: 0,
                md: 12,
                lg: 8,
                xl: 8,
                xxl: 6,
            }}
            bordered
            dataSource={students}
            renderItem={item => (
                <List.Item style={style}>
                    <div>
                        <Button disabled={isNotGroup && selectedStudent.some(s => s.id === item.id)}>{item.name}</Button>
                        <Descriptions
                            align="center"
                            size="small"
                            row
                            data={[
                                { key: 'points', value: item.points },
                                // { key: '反馈数', value: item.feedbacks },
                            ]}
                        />
                        <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                            <ButtonGroup theme="borderless" style={{ marginTop: 8 }}>
                                <Button>编辑</Button>
                                <Button>更多</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}

const Callroll = () => {
    let [chooseList, setChooseList] = useState();
    const [visible, setVisible] = useState(false);
    let [selectedStudent, setSelect] = useState([]);
    let [choosenOne, setChosenOne] = useState();

    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        setSelect([...selectedStudent, choosenOne])
        setChosenOne()
        console.log('Ok button clicked');
    };
    const handleCancel = () => {
        setVisible(false);
        setSelect([...selectedStudent, choosenOne])
        setChosenOne()
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };
    const { data:students, error, isLoading} = useSWR('http://localhost:4000/students', url =>
        axios.get('http://localhost:4000/students').then(response => {
            console.log(response);
            console.log(response.data);
            return response.data;
          })
          .catch(error => {
            console.error(error);
          })
    )
    
    useEffect( () => {
        if(students && selectedStudent.length == students.length){
            setSelect([])
        }
    }, [selectedStudent])

    function CallrollAction() {
        const unselectStudents = students.filter(
            dataItem => !selectedStudent.some(s => s.id === dataItem.id),
          );
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
    
    
    return (
        <div>
            <Tabs type="line">
                <TabPane tab="点名" itemKey="1">
                    <Student students={students} selectedStudent={selectedStudent} isNotGroup={true}></Student>
                </TabPane>
                <TabPane tab="分组" itemKey="2">
                    <Student students={students} selectedStudent={selectedStudent}></Student>
                </TabPane>
            </Tabs>
            <Button onClick={CallrollAction}>打开弹窗</Button>
            <Modal
                title="幸运儿"
                visible={visible}
                onOk={handleOk}
                afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
                okButtonProps={{ size: 'small', type: 'warning' }}
                cancelButtonProps={{ size: 'small', disabled: false }}
                okText={'Sounds great!'}
                cancelText={'No, thanks.'}
            >
                {choosenOne?.name}
            </Modal>
        </div>
    );
};
export default Callroll;