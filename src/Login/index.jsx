import styles from './index.module.scss'
import './index.module.scss';
import {Button, Input} from '@douyinfe/semi-ui';
import { Image, ImagePreview } from '@douyinfe/semi-ui';
import {Title} from '@douyinfe/semi-ui/lib/es/skeleton/item';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import {useState, useEffect} from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function App() {
    const { Title } = Typography;
    const [isRegistering, setIsRegistering] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate()
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5050/teacher/login', {
                user_name: username,
                password: password
            });

            // 假设返回的 token 在 response.data.token
            const token = response.data.token;
            localStorage.setItem('token', token);

            // 这里可以添加进一步的逻辑，比如跳转到另一个页面
            console.log(response);
        } catch (err) {
            setError('Login failed: ' + (err.response?.data || err.message));
        }
    };

    useEffect(() => {
        setIsDisabled(!username || !password);
      }, [username, password]);
      console.log(username, password, 111)
      return (
          <div className={styles.root}>
          <Image className={styles.image}
        width={530}
        height={525}
        src="./logo.svg"
      />
          <div className={styles.card} width={640} height={720}>
            <Title className={styles.title} style={{ margin: '8px 0' }} >欢迎登录教师点名系统</Title>
            <Input className='input' autoFocus placeholder='请输入账号' size='large' value={username} onChange={(value) => setUsername(value)}></Input>
            <Input className='input' placeholder='请输入密码' size='large' value={password} onChange={(value) => setPassword(value)}></Input>
            {loginError && <Text style={{color: 'red'}}>{loginError}</Text>}
            <Button className='button' disabled={isDisabled} onClick={handleLogin}>登陆</Button>
            <Text className='text'>如果还没有账号请点击这里<a>注册</a></Text>
          </div>
          

          </div>
      );
    }

export default App;