import React, { useContext } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import falseMenuList from "../../../FalseData/falseMenuList";
import { makeStyles } from '@material-ui/core/styles';
import { SearchItem } from '../Homepage';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    
     card:{
         minHeight:"320px",
     },
    imgFood: {
        maxWidth: "200px",
        height: "auto",
        margin: "auto"
    },
    link:{
        textDecoration:"none"
    }
});
const MenuCard = (props) => {
    const searchItem = useContext(SearchItem);
    const classes = useStyles();

    return (
        <Grid container spacing={1} justify="center" alignItems="center">

            {
                falseMenuList.map((value, index) => {
                    if (props.type === value.catagory && value.title.toLowerCase().includes(searchItem.toLowerCase())) {
                        return (
                            <>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Link to={`/menu/${value.id}/`} className={classes.link}>
                                        <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia className={classes.imgFood}
                                                component="img"
                                                alt={value.title}
                                                image={process.env.PUBLIC_URL + value.item}
                                                title={value.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    {value.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {value.detail}
                                                </Typography>
                                                <Typography gutterBottom component="p">
                                                    Price: {value.price}$
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    </Link>
                                </Grid>
                            </>

                        )

                    }
                }
                )
            }
        </Grid>
    );
};

export default MenuCard;