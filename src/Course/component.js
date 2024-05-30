import { Button, List, Descriptions, ButtonGroup, Table, RadioGroup, Radio } from "@douyinfe/semi-ui";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    margin: '8px 2px',
};

export function Courses({courses}){
    let navigate = useNavigate();
    console.log(courses)

    return(
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
            dataSource={courses}
            renderItem={item => (
                <List.Item style={style}>
                    <div>
                        <Button onClick={() => navigate('/courses/' + item.id )} >{item.name}</Button>
                    </div>
                </List.Item>
            )} />
    )
}

export function AttendanceList({attendence}) {

    const columns = [
        {
            title: '时间',
            dataIndex: 'date',
            
        },
        {
            title: '详情',
            dataIndex: 'detail',
            render: (text, record) => {
                return record.detail.map(item => `${item.name} ${item.status}`).join(', ');
            }
        }
    ];

    return <Table columns={columns} dataSource={attendence} pagination={false} />;
}

export function AbsenceButtons({ studentName }){
    const initialValue = localStorage.getItem(`attendance_${studentName}`) || '';
    const [radioValue, setRadioValue] = useState();

    const radioChange = (event) => {
        const value = event.target.value;
        setRadioValue(event.target.value);
        localStorage.setItem(`attendance_${studentName}`, value);
        console.log(event.target.value, 111)
      };

    return(
        <RadioGroup value={radioValue} onChange={radioChange} type='button' defaultValue={'正常'} buttonSize='small' aria-label="单选组合示例" name="demo-radio-small">
            <Radio value={'迟到'}>迟到</Radio>
            <Radio value={'请假'}>请假</Radio>
            <Radio value={'缺勤'}>缺勤</Radio>
        </RadioGroup>
    )

}