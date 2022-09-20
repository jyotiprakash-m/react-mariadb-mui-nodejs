import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Edit, Delete } from "@mui/icons-material"
import ConfirmComponent from './ConfirmComponent';

const BookInfoComponent = ({ setBooks, selectedBookInfoByQuery, setIsBookInfoModal, setIsBookFormModal, setSelectedBookInfo }) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [bookId, setBookId] = useState(null);

    const isImgLink = (url) => {
        if (typeof url !== 'string') return false;
        return (url.match(/^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
    }
    const onDelete = (id) => {
        setDeleteConfirm(true)
        setBookId(id)
    }
    const onUpdate = () => {
        setIsBookFormModal(true)
        setSelectedBookInfo(selectedBookInfoByQuery);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                {selectedBookInfoByQuery && selectedBookInfoByQuery.cover && isImgLink(selectedBookInfoByQuery.cover) ? <img style={{ width: "100%" }} src={selectedBookInfoByQuery.cover} alt="" /> : <Typography variant='h6'>No image to display</Typography>}
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Typography variant='h6'>Id : {selectedBookInfoByQuery.id}</Typography>
                    <Typography variant='h6'>Title : {selectedBookInfoByQuery.title}</Typography>
                    <Typography variant='h6'>Desc : {selectedBookInfoByQuery.description}</Typography>
                </Box>
                <Box sx={{
                    marginTop: 2
                }}>
                    <Stack direction='row' spacing={2}>
                        <Button variant="contained" color='secondary' disableElevation endIcon={<Edit />} onClick={onUpdate}>
                            update
                        </Button>
                        <Button variant="outlined" color='error' disableElevation endIcon={<Delete />} onClick={() => onDelete(selectedBookInfoByQuery.id)}>
                            Delete
                        </Button>
                    </Stack>
                </Box>
            </Grid>
            <ConfirmComponent setBooks={setBooks} setIsBookInfoModal={setIsBookInfoModal} bookId={bookId} setBookId={setBookId} deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} />
        </Grid>
    )
}

export default BookInfoComponent