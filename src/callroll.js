import './App.css';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { List, Descriptions, Rating, Button, ButtonGroup, Modal, Text } from '@douyinfe/semi-ui';


const Callroll = () => {
    let [students, setStudents] = useState();
    let [chooseList, setChooseList] = useState();
    const [visible, setVisible] = useState(false);
    let [choosenOne, setChosenOne] = useState();

    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        console.log('Ok button clicked');
    };
    const handleCancel = () => {
        setVisible(false);
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };
    useEffect(() => {
        axios
          .get('http://localhost:3000/students')
          .then(response => {
            console.log(response);
            console.log(response.data);
            setStudents(response.data);
            setChooseList(response.data);
          })
          .catch(error => {
            console.error(error);
          })

    },[]);

    function CallrollAction(chooseList) {
        let chooseState = Math.random();
        setChooseList(chooseList.filter((content, index) => index != parseInt(chooseState / (1 / chooseList.length))))
        const outputName = new Promise((resolve, reject) => {
            if(!chooseList || chooseList.length === 0) reject("None")
            else {
                showDialog()
                console.log(choosenOne)
                resolve(chooseList[parseInt(chooseState / (1 / chooseList.length))].name)
            }
        })
            .then(name => setChosenOne(name)).catch(name => setChosenOne(name))
    }

    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
 
    return (
        <div>
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
                dataSource={students}
                renderItem={item => (
                    <List.Item style={style}>
                        <div>
                            <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</h3>
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
            <Button onClick={() => {setChosenOne(CallrollAction(chooseList))}}>打开弹窗</Button>
            <Modal
                title="幸运儿"
                visible={visible}
                onOk={handleOk}
                afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
                okButtonProps={{ size: 'small', type: 'warning' }}
                cancelButtonProps={{ size: 'small', disabled: true }}
                okText={'Sounds great!'}
                cancelText={'No, thanks.'}
            >
                {choosenOne}
            </Modal>
        </div>
    );
};
export default Callroll;