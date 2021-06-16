import React ,{useState,useContext,useEffect}from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import falseMenuList from '../../FalseData/falseMenuList';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Cart } from '../../App';
const useStyles = makeStyles({
    container:{
        marginTop:"30px",
    },
    root:{
        boxShadow:"none"
    },
    
    title:{
        textAlign:"center"
    },
    img:{
        maxWidth:"400px",
        height:"auto"
    },
    cardactions:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"nowrap",
        '& > input':{
            textAlign:"center"
        }

    }
});

const FoodMenuPage = () => {
    const { index } = useParams();
    const id = index - 1;
    const { cartItems, setcartItems,settotalItems }=useContext(Cart);
    const cartId=(cartItems!==[ ])?cartItems.findIndex((val)=>val.id===id):-1;
    const itemQuantity=(cartId===-1)?0:cartItems[cartId].quantity;
    const [quantity ,setquantity]=useState(itemQuantity);
    const price=quantity*falseMenuList[id].price;
    const classes = useStyles();
    const handleUpdateCart=(e)=>{
        setquantity(e.target.value);
    }
    
    useEffect(()=>{
        setcartItems((Item)=>{
             if(cartId===-1){
                 Item[Item.length]={
                    id:id,name:falseMenuList[id].title,quantity:quantity,pricePerItem:falseMenuList[id].price,totalPrice:price,image:falseMenuList[id].item
                 }
                 return (Item);
             }
            else{
                Item[cartId]={
                    id:id,name:falseMenuList[id].title,quantity:quantity ,pricePerItem:falseMenuList[id].price,totalPrice:price, image:falseMenuList[id].item
                 }
                 return (Item);

            } 
        }
            
        );
        const quantityList=cartItems.map((val,id)=>val.quantity);
        // const total =quantityList.reduce((acc,val)=>acc+val);
        settotalItems(quantityList.length!==0? quantityList.reduce((acc,val)=>acc+val) : 0 );
    },[quantity,cartId,cartItems,id,price,setcartItems,settotalItems]);

    console.log(cartItems);
    return (

        <Grid container component="body" className={classes.container}>
            <Grid item xs={1}/>
            <Grid item container xs={10} justify="center" alignItems="center">
                <Grid item xs={12} style={{margin:"auto"}}>
                    <Typography className={classes.title} variant='h5'>{falseMenuList[id].catagory} Item </Typography>
                </Grid>
                <br /><br /><br />
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {falseMenuList[id].title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {falseMenuList[id].description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Price: {falseMenuList[id].price}$
                            </Typography>
                        </CardContent>

                        <CardActions className={classes.cardactions}>
                            <span>Quantity:  </span>
                            <IconButton size="small" color="primary" variant="contained" onClick={()=>{setquantity(quantity+1)}}>
                                <AddIcon/>
                            </IconButton>
                            <input type="number" id="quantity" onChange={handleUpdateCart} value={quantity} name="quantity" min="0" max="999"></input>
                            <IconButton size="small" color="primary" variant="contained" onClick={()=>{setquantity(quantity-1)}} disabled={quantity<=0?true:false}>
                                <RemoveIcon/>
                            </IconButton>
                        </CardActions>
                        <Typography variant="h6" component="p">
                               Total Price for this Item: {price}$
                            </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardMedia className={classes.img}
                            component="img"
                            alt={falseMenuList[id].title}
                            image={process.env.PUBLIC_URL + falseMenuList[id].item}
                            title={falseMenuList[id].title}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
}

export default FoodMenuPage;