import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const BookFormModalComponent = ({ setSelectedBookInfoByQuery, selectedBookInfo, setBooks, isBookFormModal, setIsBookFormModal }) => {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cover, setCover] = useState("");


    useEffect(() => {
        if (selectedBookInfo && selectedBookInfo.id !== null) {
            setId(selectedBookInfo.id);
            setTitle(selectedBookInfo.title);
            setDescription(selectedBookInfo.description);
            setCover(selectedBookInfo.cover);
        } else {
            setId("");
            setTitle("");
            setDescription("");
            setCover("");
        }

    }, [selectedBookInfo])


    const onCloseModal = () => {
        setIsBookFormModal(false);
        setId("");
        setTitle("");
        setDescription("");
        setCover("");
    }

    // Valid image url
    const isImgLink = (url) => {
        if (typeof url !== 'string') return false;
        return (url.match(/^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
    }

    const onSubmit = () => {
        const newBook = { id, title, description, cover }
        if (selectedBookInfo && selectedBookInfo.id !== null) {

            axios.put('/book', newBook)
                .then((res) => {
                    console.log(res.data);
                }).then(() => {
                    axios.get('/book')
                        .then(res => {
                            setBooks(res.data)
                        }).catch(err => {
                            console.log(err)
                        });
                }).then(() => {
                    axios.get(`/book/${newBook.id}`)
                        .then(res => {
                            setSelectedBookInfoByQuery(res.data)
                        }).catch(err => {
                            console.log(err)
                        });
                    onCloseModal();
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            if (newBook.id !== "") {
                axios.post('/book', newBook)
                    .then((res) => {
                        console.log(res.data);
                    }).then(() => {
                        axios.get('/book')
                            .then(res => {
                                setBooks(res.data)
                            }).catch(err => {
                                console.log(err)
                            });
                    }).then(() => {
                        onCloseModal();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                console.log("Please enter the id")
                onCloseModal();
            }
        }
    }
    return (
        <Modal
            open={isBookFormModal}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                    Book Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        {cover !== null && isImgLink(cover) ? <img style={{ width: "100%" }} src={cover} alt="" /> : <Typography variant='h6'>No image to display</Typography>}
                    </Grid>
                    <Grid item md={6}>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                required
                                id="id"
                                name="id"
                                label="Enter the book id"
                                fullWidth
                                variant="standard"
                                value={id}
                                disabled={(selectedBookInfo && selectedBookInfo?.id) ? true : false}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Enter the book title"
                                fullWidth
                                variant="standard"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Enter the book description"
                                fullWidth
                                variant="standard"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                required
                                id="cover"
                                name="cover"
                                label="Enter the book cover"
                                fullWidth
                                variant="standard"
                                value={cover}
                                onChange={(e) => setCover(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" disableElevation type='submit' onClick={onSubmit}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default BookFormModalComponent