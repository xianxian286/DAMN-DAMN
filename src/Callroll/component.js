import { Button, List, Descriptions, ButtonGroup } from "@douyinfe/semi-ui";
import { React } from "react";

const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    margin: '8px 2px',
};

export function Student({ students, selectedStudent, isNotGroup }) {
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
                            ]} />
                        <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                            <ButtonGroup theme="borderless" style={{ marginTop: 8 }}>
                                <Button>编辑</Button>
                                <Button>更多</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </List.Item>
            )} />
    );
}


