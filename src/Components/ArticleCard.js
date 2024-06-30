import React, { useEffect } from 'react'
import './ArticleCard.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import DetailedArticle from './DetailedArticle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { display, flexbox, height } from '@mui/system';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const ArticleCard = (props) => {
  // console.log(props)
  const mydate= new Date(props.date).toLocaleDateString();
  function articledetail(){
    // console.log("my target article is",props)
    setOpen(true)
    handleOpen();
  } 
  const [favouritesArray,setFavouritesArray]=useState([])
  const [isFavourite,setIsFavourite]=useState(false)
  const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // width: ,
      // height:100,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      display:flexbox,
    };
    const label = { inputProps: { 'aria-label': 'fav Checkbox' } };
    function favouritetoggle(e){
      if(e.target.checked==true){
        setIsFavourite(true)  
        let old_data=JSON.parse(localStorage.getItem('fav'))
        if(old_data==null){
          localStorage.setItem('fav',JSON.stringify([props]))
        }else{
          let new_data = [...old_data,props]
          localStorage.setItem('fav',JSON.stringify(new_data))
        }
          console.log('fav added')
      }
      else{
        console.log('fav removed')
        let old_data=JSON.parse(localStorage.getItem('fav'))
        setIsFavourite(false)
        let new_data=(old_data.filter((val)=>{
          return val.title!==props.title
        }))
        localStorage.setItem('fav',JSON.stringify(new_data))
        window.location.reload();
      }
    }
  return (
    <div className="news-card">
    <a href="#" className="news-card__card-link"></a>
    <img loading='lazy' src={props.img} alt="" className="news-card__image"/>
    <div className="news-card__text-wrapper">
      <h2 className="news-card__title">{props.title}</h2>
      <div className="news-card__post-date">{mydate}</div>
      <div className="news-card__details-wrapper">
        <p className="news-card__excerpt" style={{color:'whitesmoke'}}>{props.description}&hellip;</p>
        {
          props.fav=="checked"?
          <Checkbox {...label} 
          onChange={(e)=>favouritetoggle(e)}
          icon={<FavoriteBorder />}
           checkedIcon={<Favorite />} 
           defaultChecked
           sx={{
            color:pink[800],
            '&.Mui-checked': {
        color: pink[600],
      }
           }}/>:
          <Checkbox {...label} 
          onChange={(e)=>favouritetoggle(e)}
          icon={<FavoriteBorder />}
           checkedIcon={<Favorite />} 
           sx={{
            color:pink[800],
            '&.Mui-checked': {
        color: pink[600],
      }
           }}/>

        }

        <button onClick={(e)=>articledetail(e)} target='_blank' className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right"></i></button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            <DetailedArticle viewArticle={props}/>
        }
        </Box>
      </Modal>
      </div>
    </div>
  </div>
  )
}

export default ArticleCard