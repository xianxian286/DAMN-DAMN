import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import Item from '@douyinfe/semi-ui/lib/es/cascader/item';

export function CourseDetails() {
    let { id } = useParams();

    const {data:course, isLoading, error} = useSWR('http://localhost:4000/courses/' + id, url =>
        axios.get(url).then(response => {
            console.log(response.data,222)
    
            return response.data;
        }))
    console.log(course)
    return(
        <div>
            {course?.name}
        </div>

    )

};