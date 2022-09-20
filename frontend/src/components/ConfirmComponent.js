import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import axios from 'axios'
import React from 'react'

const ConfirmComponent = ({ setBooks, bookId, setBookId, deleteConfirm, setDeleteConfirm, setIsBookInfoModal }) => {
    const handleOnAgree = () => {
        axios.delete(`/book/${bookId}`)
            .then(res => {
                console.log(res.data)
            }).then(() => {
                axios.get('/book')
                    .then(res => {
                        setBooks(res.data)
                    }).catch(err => {
                        console.log(err)
                    });
            }).catch(err => {
                console.log(err)
            });
        setIsBookInfoModal(false)
        setDeleteConfirm(false)
    }
    const onClose = () => {
        setDeleteConfirm(false)
        setBookId(null)
    }

    return (
        <Dialog
            open={deleteConfirm}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure want to delete the book?"}
            </DialogTitle>

            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button color='error' onClick={handleOnAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmComponent