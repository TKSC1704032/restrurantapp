import React, { useContext, useState } from 'react';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Cart } from '../../App';
import PlaceOrderCard from './PlaceOrderCard/PlaceOrderCard';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    rapper: {
        paddingTop: "30px"
    },

    root: {
        display: 'flex',
        flexDirection: "column",
        flexWrap: 'wrap',
        '& > div': {
            width: '100%',
            margin: "10px 0 10px 0"
        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
   
}));



const PlaceOrderPage = () => {
    const { cartItems, setcartItems ,totalItems} = useContext(Cart);
    const [userDetails, setuserDetails] = useState({ city: "", road: "", flat: "", businessname: "", instructor: "" })
    const [fillInfo, setfillInfo] = useState(false);
    const [totalPriceInfo,settotalPriceInfo] = useState();
    const classes = useStyles();
    const handleUserDetails = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value });

    }
    const handlecancleOrder=(index)=>{
        const Items=cartItems.filter((val,id)=>id!==index);
        setcartItems(Items);
    }
    return (
        <Grid container className={classes.rapper}>
            <Grid item xs={1} />
            <Grid item container xs={10} spacing={2} justify="space-between">
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" component="h1">Edit Delivary Details</Typography>
                    <Divider />
                    <form onSubmit={(e) => { e.preventDefault(); setfillInfo(true); }}>
                        <div className={classes.root}>
                            <div>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="Your City"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    required
                                    variant="filled"
                                    value={userDetails.city}
                                    onChange={handleUserDetails}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="road"
                                    name="road"
                                    label="Road No"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    required
                                    variant="filled"
                                    value={userDetails.road}
                                    onChange={handleUserDetails}

                                />
                            </div>
                            <div>
                                <TextField
                                    id="flat"
                                    name="flat"
                                    label="Flat, Suite or Floor"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    required
                                    variant="filled"
                                    value={userDetails.flat}
                                    onChange={handleUserDetails}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="businessname"
                                    name="businessname"
                                    label="Business Name"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    required
                                    variant="filled"
                                    value={userDetails.businessname}
                                    onChange={handleUserDetails}

                                />
                            </div>
                            <div>
                                <TextField
                                    id="instructor"
                                    name="instructor"
                                    label="Add Delivery Instructor"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    required
                                    variant="filled"
                                    value={userDetails.instructor}
                                    onChange={handleUserDetails}

                                />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" type="submit">Save & Continue</Button>
                            </div>
                        </div>
                    </form>


                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography className={classes.typography} variant="h5" component="h3" >From Red Onion Restaurent!</Typography>
                    <Typography className={classes.typography} component="p" >Your adress is given below!</Typography>
                    <Typography className={classes.typography} component="h3" >Your City:{fillInfo && <Typography variant="h5" color="secondary" component="span">{userDetails.city}</Typography>} </Typography>
                    <Typography className={classes.typography} component="h3" >Road No.:{fillInfo && <Typography variant="h5" color="secondary" component="span">{userDetails.road}</Typography>} </Typography>
                    <Typography className={classes.typography} variant="h4" >Ordered Items:</Typography>
                    <br /><br />
                    <br />
                    <Grid container direction="column" wrap="nowrap">
                        {(cartItems.length > 0) && cartItems.map((val,index) => {

                           return ( val.quantity>0 &&<PlaceOrderCard index={index} handlecancleOrder={handlecancleOrder} settotalPriceInfo={settotalPriceInfo}/> )

                        })

                        }
                    </Grid>
                    <Typography className={classes.typography} variant="h5" >Total Price:{totalPriceInfo}</Typography>
                
                   <Button variant="contained" color="secondary" disabled={(fillInfo&&totalItems>0)?false:true}><Link to="/placeorder/ordercomplete/" style={{textDecoration:"none"}}>Place Order</Link></Button>
                </Grid>

            </Grid>
            <Grid item xs={1} />

        </Grid>
    )
};

export default PlaceOrderPage;