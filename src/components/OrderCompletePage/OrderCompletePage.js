import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleLoc } from '../../App';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { User } from '../../App';

const useStyles = makeStyles({
    root: {
        paddingTop: "30px"
    },

    card: {
        padding: "5px",
        '& img': {
            margin: "auto"
        }
    }
});

const containerStyle = {
    width: '100%',
    height: '500px'
};
const time = new Date().toLocaleTimeString('en-US');


const OrderCompletePage = () => {
    const { position, positionError } = useContext(GoogleLoc);
    const user = useContext(User);
    const classes = useStyles();
    const center = {
        lat: position.lat,
        lng: position.lng
    };
    return (
        <Grid container className={classes.root}>
            <Grid item xs={1} />
            <Grid item container xs={10} justify="space-between" alignItems="center">
                <Grid item container xs={12} md={6} spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12}><Typography variant="h4" color="secondary">Your Current Location</Typography></Grid>
                    <Grid item xs={12}> {position && <LoadScript
                        googleMapsApiKey="AIzaSyAUV6irjCw2zBQguD1_iHMa3QDob8PxBtg"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={17}
                        >
                            <Marker position={position} />
                        </GoogleMap>
                    </LoadScript>
                    }
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} >
                    <Typography variant="h5" color="secondary"> Hot Onion Restaurent</Typography>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                image={process.env.PUBLIC_URL + '/Image/rider.png'}
                                component="img"
                                style={{ maxWidth: "210px", height: "200px", }}
                                title="Parcel Order"
                            />
                            <CardContent>
                                {(user && user.providerData[0]) && <Typography variant="h6">{user.providerData[0].displayName}</Typography>}

                                <Typography variant="body2" color="primary" component="h4">Your ordered time :: {time}</Typography>
                                <Typography variant="body2" color="secondary" component="p">
                                    You will be recieved you parcel within 30 min after your order
                                </Typography>
                                <Typography variant="h6" color="primary"> Delivery Person Details:</Typography>
                                <Typography variant="h6" color="primary"> NAME: Faizal</Typography>
                                <Typography variant="h6" color="primary"> PHONE NO: 017XXXXXXXX</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" variant="contained" color="secondary">
                                Contact
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>



            </Grid>

            <Grid item xs={1} />

        </Grid>
    );
};

export default OrderCompletePage;