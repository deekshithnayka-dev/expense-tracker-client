import {
    Box,
    Paper,
    TextField,
    Typography,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Edit() {
    const { id } = useParams();
    // console.log(params.id);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        amount: 0,
        category: ""
    });
    const [isloading, setIsLoading] = useState(false);
    const fetchSingleExpense = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/expense/view/${id}`);
            //console.log(res.data);
            if (res.data.success) {
                setFormData(res.data.expenseDetails);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchSingleExpense();
    }, [])
    // console.log(formData);
    const handleSubmit = async () => {
        //  console.log(formData);
        setIsLoading(true);
        try {
            const res = await axios.put(`http://localhost:5000/api/expense/edit/${id}`, formData);
            // console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };
    return (
        <Box>
            <Box
                sx={{ textAlign: "center" }}>
                <Typography variant="h4">Add Expense deatails</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "lightgray",
                p: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Paper sx={{ width: "70%", p: 3 }}>
                    <TextField
                        value={formData.title}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        label="Enter expense title"
                        placeholder="Enter expense title here"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        value={formData.amount}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        label="Enter expense amount"
                        placeholder="Enter expense amount here"
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                        <Select
                            value={formData.category}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            // value={age}
                            label="Select expense category"
                            // onChange={handleChange}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value={"Transport"}>Transport</MenuItem>
                            <MenuItem value={"Food"}>Food</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSubmit} sx={{ mb: 1 }}
                        variant="contained"
                        fullWidth
                        loading={isloading}>
                        Submit</Button>
                    <Button component={Link} to={"/"} sx={{ mb: 1 }}
                        variant="outlined"
                        color="success"
                        fullWidth>View Details</Button>
                </Paper>
            </Box >
        </Box >
    )
}
