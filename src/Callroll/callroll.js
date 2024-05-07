import { Button, InputNumber, Modal, Space, Spin, TabPane, Tabs } from '@douyinfe/semi-ui';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Student } from './component';
import { CallrollTab } from './callrollTab';
import { GroupTab } from './group';

const Callroll = () => {
    const {error, isLoading} = useSWR('http://localhost:4000/students', url =>
            axios.get('http://localhost:4000/students').then(response => {
                console.log(response);
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            })
        )
    
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
                    <CallrollTab></CallrollTab>
                </TabPane>
                <TabPane tab="分组" itemKey="2">
                    <GroupTab></GroupTab>
                </TabPane>
            </Tabs>
            
        </div>
    );
};
export default Callroll;