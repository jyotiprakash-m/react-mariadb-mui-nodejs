import { Box, CircularProgress, Modal } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import BookInfoComponent from './BookInfoComponent';
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
    display: 'flex',
    justifyContent: 'center'
};
const BookInfoModalComponent = ({ selectedBookInfoByQuery, setSelectedBookInfoByQuery, setBooks, selectedBookInfo, setSelectedBookInfo, isBookInfoModal, setIsBookInfoModal, setIsBookFormModal }) => {

    const onCloseModal = () => {
        setIsBookInfoModal(false);
        setSelectedBookInfo(null);
        setSelectedBookInfoByQuery(null);
    }
    useEffect(() => {
        const bookId = selectedBookInfo?.id;
        bookId && axios.get(`/book/${bookId}`)
            .then(res => {
                setSelectedBookInfoByQuery(res.data)
            }).catch(err => {
                console.log(err)
            });

    }, [selectedBookInfo, setSelectedBookInfoByQuery])
    return (
        <Modal
            open={isBookInfoModal}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                {
                    selectedBookInfoByQuery === null ? <CircularProgress /> : <BookInfoComponent setBooks={setBooks} setIsBookInfoModal={setIsBookInfoModal} setIsBookFormModal={setIsBookFormModal} selectedBookInfoByQuery={selectedBookInfoByQuery} setSelectedBookInfo={setSelectedBookInfo} />
                }

            </Box>
        </Modal>
    )
}

export default BookInfoModalComponent