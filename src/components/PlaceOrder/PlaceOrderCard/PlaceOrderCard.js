import React, { useContext, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CancelIcon from '@material-ui/icons/Cancel';
import { Grid ,Typography} from '@material-ui/core';
import { Cart } from '../../../App';
const useStyles = makeStyles((theme) => ({
    
    typography: {
        textAlign: "center ",
        '& span': {
            color: "red"
        }
    },
    card: {
        padding:"10px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        [theme.breakpoints.down('md')]:{
            padding:"5px",
            flexWrap: "wrap",
        }
    },
    cardcontent:{
        textAlign:"center"
    },
    cardactions: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        margin:"auto",
        '& > input': {
            textAlign: "center"
        }

    }
}));
const PlaceOrderCard = (props) => {
    const { cartItems, setcartItems, totalItems, settotalItems } = useContext(Cart);
    const [quantityInfo,setquantityInfo] = useState(cartItems[props.index].quantity);
    const [priceInfo,setpriceInfo] = useState(cartItems[props.index].totalPrice);
    const classes = useStyles();

    useEffect(()=>{
        setpriceInfo(cartItems[props.index].pricePerItem*quantityInfo)
        setcartItems(
            (items)=>{
                items[props.index]={
                  ...items[props.index], totalPrice:priceInfo ,quantity:quantityInfo
                }
            
                return(items);
            }
       )
         if(cartItems.length>0){
       const quantityList=cartItems.map((val,id)=>val.quantity);
        settotalItems(quantityList.length!==0?quantityList.reduce((acc,val)=>acc+val):0);
        const totalPriceList=cartItems.map((val,id)=>val.totalPrice);
        const totalPrice=totalPriceList.reduce((acc,val)=>acc+val);
        props.settotalPriceInfo(totalPrice);

       }
       console.log(cartItems);
    },[props.index,quantityInfo,setquantityInfo,setcartItems,cartItems,priceInfo,props.settotalPriceInfo,props,settotalItems])
    return (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Card className={classes.card}>

                <CardMedia
                    className={classes.media}
                    image={process.env.PUBLIC_URL + cartItems[props.index].image}
                    style={{ width: "90px", height: "90px", display: "block",margin:"auto" }}
                    title={cartItems[props.index].name}
                />
                <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h6">
                        {cartItems[props.index].name}
                    </Typography>
                    <Typography variant="body2" color="secondary" component="span">
                        {priceInfo}$
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardactions}>
                    <IconButton size="small" color="primary" variant="contained" onClick={() => { setquantityInfo(quantityInfo+1) }}>
                        <AddIcon />
                    </IconButton>
                    <input type="number" id="quantityInfo" value={quantityInfo} name="quantityInfo" min="0" max="999"></input>
                    <IconButton size="small" color="primary" variant="contained" onClick={() => { setquantityInfo(quantityInfo-1) }} disabled={quantityInfo<=1?true:false} >
                        <RemoveIcon />
                    </IconButton>
                    <IconButton variant="contained" color="secondary" onClick={() => { props.handlecancleOrder(props.index) }}><CancelIcon /></IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PlaceOrderCard;