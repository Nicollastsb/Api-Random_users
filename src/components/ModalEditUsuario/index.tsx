import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { X } from '@phosphor-icons/react'
import { RandomUser } from '../TableUsers'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Props = {
    user : RandomUser,
    loadUsers: () => Promise<void>
}

const editedUserSchema = z.object({
    address: z.string(),
    cell: z.string(),
    email: z.string(),
    gender: z.string(),
    name: z.string(),
    password: z.string(),
    phone: z.string(),
    userName: z.string()
})

type editedUserFormInputs = z.infer<typeof editedUserSchema>;

export function ModalEditUsuario({ user, loadUsers }: Props){  
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<editedUserFormInputs>({
        resolver: zodResolver(editedUserSchema),
        defaultValues: {
            address: user.address,
            cell: user.cell,
            email: user.email,
            gender: user.gender,
            name: user.name,
            password: user.password,
            phone: user.phone,
            userName: user.userName
        }
    })

    async function putData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "PUT", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
        });
        return response.json();
    }

    async function handleEditUser(data: editedUserFormInputs){
        const editedUser = {
            id: user.id,
            address: data.address,
            cell: data.cell,
            email: data.email,
            gender: data.gender,
            name: data.name,
            password: data.password,
            phone: data.phone,
            pictureLarge: user.pictureLarge,
            pictureMedium: user.pictureMedium,
            pictureThumbnail: user.pictureThumbnail,
            userName: data.userName
        };

        await putData("https://localhost:7206/api/User", editedUser).then(() => {
            loadUsers();
        });
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Editar Usuário</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleEditUser)}>
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        required
                        {...register('name')}
                    />
                    <input 
                        type="text"
                        placeholder="Gênero" 
                        required
                        {...register('gender')}
                    />
                    <input 
                        type="text" 
                        placeholder="Endereço" 
                        required
                        {...register('address')}
                    />
                    <input 
                        type="text" 
                        placeholder="Email" 
                        required
                        {...register('email')}
                    />
                    <input 
                        type="text" 
                        placeholder="Telefone" 
                        required
                        {...register('phone')}
                    />
                    <input 
                        type="text" 
                        placeholder="Celular" 
                        required
                        {...register('cell')}
                    />
                    <input 
                        type="text" 
                        placeholder="Nome usuário" 
                        required
                        {...register('userName')}
                    />
                    <input 
                        type="text" 
                        placeholder="Senha" 
                        required
                        {...register('password')}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Salvar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}