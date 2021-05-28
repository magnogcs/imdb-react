import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MoviesContent.module.css';
import Labels from './Labels';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import consts from '../consts'

const MoviesContent = () => {
  const imageUrl = consts.IMAGE_URL;
  const [modal, setOpenModal] = useState();
  const [title, setTitle] = useState('');
  const [dataDetails, setDataDetails] = useState('');

  const handleClose = () => setOpenModal(false);
  const handleShow = (id) => {
    getDetails(id);
    setTitle(title);
    setOpenModal(true);
  }

  function getDetails(movie_id){
    fetch(`${consts.API_URL}/${movie_id}?api_key=${consts.API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setDataDetails(data)
  });

  }
  
  const { list } = useSelector((state) => state.movies);

  return (
    <div>
      <Modal show={modal} dialogClassName={styles.modalsize} onHide={handleClose}>
        <div style={{backgroundImage: "url(" + imageUrl + dataDetails.backdrop_path  + ")"}} className={styles.bgModal} >
          <div className={styles.opacity}>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { dataDetails ? 
          <div className={styles.modal_content}>
            <Row className="align-items-center">
              <Col md={5}>
                <img alt={dataDetails.original_title} src={ imageUrl + dataDetails.poster_path } />
              </Col>
              <Col md={7}>
                <h1>{ dataDetails.original_title } <Labels margin="no" votes={dataDetails.vote_average} release={dataDetails.release_date} /></h1>
                <h6>
                  { dataDetails.genres.map((genre, index) => (
                  <span>{ genre.name + ' | '}</span>
                  )) }</h6>
                <p className="mt-5">{ dataDetails.overview }</p>
              </Col>
            </Row>
         
           
          </div>
          : 
          null}
        </Modal.Body>
        </div>
        </div>
      </Modal>
   
      <Container>
        <Row>
          {list.map((photo, index) => (
            <Col md={3} key={index} className="mb-4">
              <div onClick={() => handleShow(photo.id)} style={{backgroundImage: "url(" + imageUrl + photo.poster_path + ")"}} className={styles.card}>
                <Labels votes={photo.vote_average} release={photo.release_date} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesContent;
