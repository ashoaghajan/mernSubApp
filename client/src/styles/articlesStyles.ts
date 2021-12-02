import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    cardsContainer: {
      padding: '4rem 0',
      display: 'flex'  
    },
    card: {
        height: '55rem',
        width: '32%',
        boxShadow: '0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2)',
        padding: '2rem',
        borderRadius:'2rem',
        marginRight: '2rem'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '50rem',
        borderRadius: '2rem'
    },
    header: {
        marginTop: '1rem',
        fontSize: '1.5rem'
    },
    emptyArticles: {
        textAlign: 'center', 
        padding: '20rem 0',
    }, 
    ancor: {
        fontSize: '2rem',
        textDecoration: 'none'
    },  
    errorHeader: {
        fontSize: '3rem',
        display: 'block'
    }
}));