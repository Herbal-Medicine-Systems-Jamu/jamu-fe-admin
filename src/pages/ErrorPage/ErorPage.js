import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function NotFound(props) {
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            height:"500px",
            justifyContent : "center",
            alignItems : "center"
        }}>
            <Typography component="h2" variant="display4" gutterBottom>
                I am Sorry We Have Some Eror, Please
            </Typography>
            <Typography component="h2" variant="display1" gutterBottom>
                Refresh this Page
            <Button 
            style={{marginLeft:"10px"}}
            variant="contained" size="large" color="primary" >
                Refresh
            </Button>
            </Typography>
        </div>
    )
}

export default NotFound;