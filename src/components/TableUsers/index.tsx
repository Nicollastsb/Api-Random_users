import { useEffect, useState } from "react";
import { EditUserButton, NewUserButton, TableContainer, TableContent, UserTable } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import { ModalEditUsuario } from "../ModalEditUsuario";
import { Pencil } from "@phosphor-icons/react";

export interface RandomUser {
    id: number;
    address: string;
    cell: string;
    email: string;
    gender: string;
    name: string;
    password: string;
    phone: string;
    pictureLarge: string;
    pictureMedium: string;
    pictureThumbnail: string;
    userName: string;
}

export function TabelUsers(){    
    const [users, setUsers] = useState<RandomUser[]>([])
    async function loadUsers() {
        const response = await fetch('https://localhost:7206/api/User');
        const data = await response.json();
        setUsers(data)
    }
    async function postData(url = "") {
        const response = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer",
        });
        return response.json();
    }

    async function CreateNewRandomUser(){
        await postData("https://localhost:7206/api/User").then(() => {
            loadUsers();
        });
    }

    useEffect(() =>{
        loadUsers()
    }, [])

    return (
        <TableContainer>
            <TableContent>                
                <NewUserButton onClick={CreateNewRandomUser}>
                    NOVO USUÁRIO
                </NewUserButton>
                <UserTable>
                    <thead>                
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Genero</th>
                            <th>Endereço</th>
                            <th>Cell</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user =>{
                            return(
                                <tr key={user.id}>
                                    <td width="20%">{user.name}</td>
                                    <td width="15%">{user.email}</td>
                                    <td width="10%">{user.gender}</td>
                                    <td width="30%">{user.address}</td>
                                    <td width="20%">{user.cell}</td>
                                    <td width="10%">
                                        <Dialog.Root>
                                            <EditUserButton>
                                                <Pencil size={24} />
                                            </EditUserButton>
                                            <ModalEditUsuario user={user} loadUsers={loadUsers}/>
                                        </Dialog.Root>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </UserTable>
            </TableContent>
        </TableContainer>

    )
}