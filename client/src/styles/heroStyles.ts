import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    header: {
        padding: '5rem 0',
        height: '60vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    container: {
        backgroundColor: 'rgb(5, 148, 112)',
        padding: '3rem',
        color: 'white',
        width: '32.5rem'
    },
    heading: {
        fontSize: '5rem'
    },
    subHeading: {
        margin: '1rem 0',
        fontWeight: 400
    }
}))