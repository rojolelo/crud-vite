import axios from "axios"
import { ITask } from "../models/Task"

export const getTasks = async (token: string) => {
    try {
        const response = await axios.get("http://localhost:5000/api/tasks", { headers: { "Authorization": `Bearer ${token}` } })
        const { data, status } = response
        return { data, status }
    } catch (e: any) {
        return { error: true, msg: e.message }
    }
}

export const uploadTask = async (task: ITask, token: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/tasks', { task }, { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` } })
        return response;
    } catch (e: any) {
        return { error: true, msg: e.message }
    }

}

export const updateTask = async (task: ITask, token: string) => {
    try {
        const response = await axios.put('http://localhost:5000/api/tasks/' + task._id, { task }, { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` } })
        return response;
    } catch (e: any) {
        return { error: true, msg: e.message }
    }
}

export const deleteTask = async (task: ITask, token: string) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/tasks/' + task._id, { headers: { "Authorization": `Bearer ${token}` } })
        return response;
    } catch (e: any) {
        return { error: true, msg: e.message }

    }
}