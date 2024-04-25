import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog'

export const TableContainer = styled.header`
  //background-color: ${props => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`

export const TableContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 2rem auto 0;
    padding: 0 1.5rem;

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const UserTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background-color: ${props => props.theme["gray-700"]};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
    
    th {
        padding: 1.25rem 2rem;
        background-color: ${props => props.theme["gray-600"]};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`;

export const EditUserButton = styled(Dialog.Trigger)`
    background-color: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
    border-radius: 6px;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme["green-700"]};
        transition: background-color 0.2s;
    }
`;

export const NewUserButton = styled.button`
    height: 58px;
    border: 0;
    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;

    &:hover{
        background: ${props => props.theme["green-700"]};
        transition: background-color 0.2s;
    }
`;