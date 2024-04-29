import styles from './index.module.scss'
import './index.module.scss';
import {Button, Input} from '@douyinfe/semi-ui';
import { Image, ImagePreview } from '@douyinfe/semi-ui';
import {Title} from '@douyinfe/semi-ui/lib/es/skeleton/item';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import {useState, useEffect} from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { useNavigate } from "react-router-dom";

function App() {
    const { Title } = Typography;
    const [accountName, setValue] = useState();
    const [accountKey,setAccountKey] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate()

    function Login(){
        const state = Math.random();
        const check = new Promise((resolve, reject) => {
        if(state>0.5){
            resolve('success')
        }else{
            reject('damn!!!!登陆失败了，重新检查一下账号密码吧')
        }
        })
        check
        .then(statevalue => {
            console.log(statevalue);
            navigate("/callroll");
            setLoginError("");
        })
        .catch(statevalue =>{
            console.log(statevalue);
            setLoginError(statevalue);
        })
    }
    useEffect(() => {
        setIsDisabled(!accountName || !accountKey);
      }, [accountName, accountKey]);
      return (
          <div className={styles.root}>
          <Image className={styles.image}
        width={530}
        height={525}
        src="./logo.svg"
      />
          <div className={styles.card} width={640} height={720}>
            <Title className={styles.title} style={{ margin: '8px 0' }} >欢迎登录教师点名系统</Title>
            <Input className='input' autoFocus placeholder='请输入账号' size='large' value ={accountName} onChange={(newValue) => {console.log(newValue);setValue(newValue);}}></Input>
            <Input className='input' placeholder='请输入密码' size='large' value={accountKey} onChange={(changeValue)=>{setAccountKey(changeValue); console.log(accountKey);}}></Input>
            {loginError && <Text style={{color: 'red'}}>{loginError}</Text>}
            <Button className='button' disabled={isDisabled} onClick={Login}>登陆</Button>
            <Text className='text'>如果还没有账号请点击这里注册</Text>
          </div>
          

          </div>
      );
    }

export default App;