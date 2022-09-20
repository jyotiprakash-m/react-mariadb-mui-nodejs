import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardComponent = ({ setSelectedBookInfo, book, setIsBookInfoModal }) => {
    const onSelectBook = () => {
        setIsBookInfoModal(true);
        setSelectedBookInfo(book);
    }
    return (
        <Card sx={{ width: 300 }} onClick={onSelectBook}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="350"
                    image={book.cover ? book.cover : "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-portrait.jpg"}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardComponent