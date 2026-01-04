import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { baseUrl } from "../api";


export default function ExpenseTable({ allExpenses, fetchAllExpenses }) {
    const handleDelte = async (expenseId) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/expense/delete/${expenseId}`);
            //console.log(res.data);
            if (res.data.success) {
                fetchAllExpenses();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>SL</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Spent On</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allExpenses?.length == 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align='center'>No data found</TableCell>
                        </TableRow>) :
                        allExpenses.map((row, index) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{moment(row.createdAt).format("DD MMM YYYY hh:mm")}</TableCell>
                                <TableCell>
                                    <Button component={Link} to={`edit/${row._id}`} sx={{ m1: 1 }} variant='contained' color='success'>Edit</Button>
                                    <Button onClick={() => handleDelte(row?._id)} sx={{ m1: 1 }} variant='contained' color='error'>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
