'use server'
import { revalidateTag } from "next/cache";

export const handleCreateUserAction = async (data: any) => {
    const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    revalidateTag("list-users");
    return await res.json();
}

export const handleUpdateUserAction = async (data: any) => {
    if (data && data.id) {
        const res = await fetch(`http://localhost:8000/users/${data.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        revalidateTag("list-users");
        return await res.json();
    }
    
}

export const handleDeleteUserAction = async (id: any) => {
    if (id) {
        const res = await fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        })
        revalidateTag("list-users");
        return await res.json();
    }
    
}