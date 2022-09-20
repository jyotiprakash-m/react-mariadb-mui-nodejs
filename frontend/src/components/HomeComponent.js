import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Add } from "@mui/icons-material"
import BooksComponent from './BooksComponent'
import axios from 'axios';

const HomeComponent = () => {
    const [isBookFormModal, setIsBookFormModal] = useState(false);
    const [isBookInfoModal, setIsBookInfoModal] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = () => {
            axios.get('/book')
                .then(res => {
                    setBooks(res.data)
                }).catch(err => {
                    console.log(err)
                });

        }
        getBooks();

    }, [])
    return (
        <Box>
            <Box sx={{
                display: "flex",
                justifyContent: "right"

            }}>
                <Button variant="contained" disableElevation endIcon={<Add />} onClick={() => setIsBookFormModal(true)}>
                    Add Book
                </Button>
            </Box>
            <BooksComponent books={books} setBooks={setBooks} isBookInfoModal={isBookInfoModal} setIsBookInfoModal={setIsBookInfoModal} isBookFormModal={isBookFormModal} setIsBookFormModal={setIsBookFormModal} />

        </Box>
    )
}

export default HomeComponent