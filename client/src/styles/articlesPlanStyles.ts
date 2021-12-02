import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    container: { 
        display: 'flex', 
        height: '75vh', 
        alignItems: 'center', 
        justifyContent: 'center' 

    },
    card:{
        width: '18rem',
        marginRight: '2rem',
        height: '25rem'
    },
    cardHeader: {
        display: 'flex',
        height: '25rem',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    priceCircle:{
        border: '0.5rem solid white',
        width: '12.5rem',
        height: '12.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: '0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342)'
    },
    priceText:{
        fontSize: '3rem',
        color: 'white',
        textShadow: '0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342)'
    },
    cardTitle:{
        fontSize: '2rem'
    }    
}));