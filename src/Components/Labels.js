import React from 'react';
import styles from './Labels.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const Labels = (props) => {
    const date = new Date(props.release)
    return (
        <div className={styles.labels}>
            <div style={ props.margin === "no" ? ({ marginLeft: 0 }) : ({}) } className={styles.rate}>
                <FontAwesomeIcon icon={faStar}/> {props.votes}
            </div>

            <div className={styles.release}>
                <FontAwesomeIcon icon={faTicketAlt}/> {(date).toLocaleString('pt-br',{year: 'numeric', month:'2-digit', day: '2-digit'})}
            </div>
        </div>
    )
}

export default Labels
