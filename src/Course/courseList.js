import { React, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Courses } from './component';

export function CourseList() {
    const { data:courses, mutate} = useSWR('http://localhost:4000/courses', url =>
        axios.get(url).then(response => {
            // console.log(response);
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
    }))


    return (
        <Courses courses={courses}></Courses>
    )

}