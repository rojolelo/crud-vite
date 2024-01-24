import axios from "axios"

import { ITask } from "../models/Task"

export const getTasks = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/tasks")
        const { data, status } = response
        return { data, status }
    } catch (e) {
        console.log({ error: e })
        return { error: e }
    }
}

export const uploadTask = async (task: ITask) => {
    try {
        const response = await axios.post('http://localhost:5000/api/tasks', { task }, { headers: { 'Content-Type': 'application/json' } })
        return response;
    } catch (e) {
        console.log({ error: e })
    }

}

export const updateTask = async (task: ITask) => {
    try {
        const response = await axios.put('http://localhost:5000/api/tasks/' + task._id, { task }, { headers: { 'Content-Type': 'application/json' } })
        return response;
    } catch (e) {
        console.log({ error: e });

    }
}

export const deleteTask = async (task: ITask) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/tasks/' + task._id)
        return response;
    } catch (e) {
        console.log({ error: e });

    }
}