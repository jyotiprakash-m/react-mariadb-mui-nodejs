import React, { useState } from 'react'
import { Box, Chip, Divider, IconButton, InputBase, Paper, TextField } from '@mui/material'
import CardComponent from './CardComponent'
import BookInfoModalComponent from './BookInfoModalComponent'
import BookFormModalComponent from './BookFormModalComponent'
import { Close, Search } from '@mui/icons-material'
import axios from 'axios'
const BooksComponent = ({ books, setBooks, isBookInfoModal, setIsBookInfoModal, isBookFormModal, setIsBookFormModal }) => {
    const [selectedBookInfo, setSelectedBookInfo] = useState(null);
    const [selectedBookInfoByQuery, setSelectedBookInfoByQuery] = useState(null);

    const [bookTitle, setBookTitle] = useState("");

    // http://localhost:8800/getBookByTitle?title=jyoti
    // Search by title like
    const searchByBookLike = (event) => {
        if (event.target.value !== "") {
            axios.get(`/getBookByTitleLike?title=${event.target.value}`)
                .then(res => {
                    setBooks(res.data)
                }).catch(err => {
                    console.log(err)
                });
        } else {
            axios.get('/book')
                .then(res => {
                    setBooks(res.data)
                }).catch(err => {
                    console.log(err)
                });
        }
    }


    // Search by title
    const searchByTitle = () => {
        // console.log(bookTitle)z
        if (bookTitle !== "") {
            axios.get(`/getBookByTitle?title=${bookTitle}`)
                .then(res => {
                    setBooks(res.data)
                }).catch(err => {
                    console.log(err)
                });
        } else {
            axios.get('/book')
                .then(res => {
                    setBooks(res.data)
                }).catch(err => {
                    console.log(err)
                });
        }

    }
    const onCloseTextField = () => {
        setBookTitle("");
        axios.get('/book')
            .then(res => {
                setBooks(res.data)
            }).catch(err => {
                console.log(err)
            });
    }


    return (
        <Box sx={{
            marginTop: 2
        }}>
            {/* Search */}
            <Box >
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", marginBottom: 2 }}
                >
                    <InputBase
                        value={bookTitle}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter the book title"
                        onChange={(e) => setBookTitle(e.target.value)}
                    />
                    {bookTitle !== "" &&
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onCloseTextField}>
                            <Close />
                        </IconButton>
                    }
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={searchByTitle}>
                        <Search />
                    </IconButton>

                </Paper>
                <Divider>
                    <Chip label="OR" />
                </Divider>
                <TextField size='small' sx={{ width: "100%", marginTop: 2 }} label="Search By Title Like" variant="outlined" onChange={searchByBookLike} />
            </Box>
            {/* All books */}
            <Box sx={{
                marginTop: 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: 2
            }}>
                {books.map(book => {
                    return (
                        <CardComponent setSelectedBookInfo={setSelectedBookInfo} setIsBookInfoModal={setIsBookInfoModal} key={book.id} book={book} />
                    )
                })}


            </Box>
            <BookInfoModalComponent selectedBookInfoByQuery={selectedBookInfoByQuery} setSelectedBookInfoByQuery={setSelectedBookInfoByQuery} setBooks={setBooks} selectedBookInfo={selectedBookInfo} setSelectedBookInfo={setSelectedBookInfo} isBookInfoModal={isBookInfoModal} setIsBookInfoModal={setIsBookInfoModal} setIsBookFormModal={setIsBookFormModal} />
            <BookFormModalComponent setSelectedBookInfoByQuery={setSelectedBookInfoByQuery} setBooks={setBooks} selectedBookInfo={selectedBookInfo} setSelectedBookInfo={setSelectedBookInfo} isBookFormModal={isBookFormModal} setIsBookFormModal={setIsBookFormModal} />
        </Box>
    )
}

export default BooksComponent