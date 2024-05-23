import { Button, List, Descriptions, ButtonGroup } from "@douyinfe/semi-ui";
import { React } from "react";
import { useNavigate } from "react-router-dom";

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