import { useState, useEffect } from "react"
import axios from 'axios'

const Root = () => {
    const [data, setData] = useState('');

    useEffect(() => {
      axios.get('http://localhost:5050/teacher').then(res => setData(res.data[0].id));
    }, []);
    
    return (
        <>
        {data}
        </>
    );
}

export default Root;