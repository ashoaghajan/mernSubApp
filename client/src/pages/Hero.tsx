import React from 'react';
import { Container } from 'react-bootstrap';
import ModalComponent from '../components/Modal';
import useStyles from '../styles/heroStyles';

interface HeroProps {
    
}

const Hero: React.FC<HeroProps> = () => {

    const classes = useStyles();

    return ( 
        <header className={classes.header}>
            <Container className={classes.container}>
                <h1 className={classes.heading}>Feed your mind with the best</h1>
                <h3 className={classes.subHeading}>
                    Grow, learn and become more successful by reading some of the top 
                    articles by highlt reputable individuals
                </h3>
                <ModalComponent type='Signup' />
                <ModalComponent type='Login' />
            </Container>
        </header>
    );
}
 
export default Hero;
