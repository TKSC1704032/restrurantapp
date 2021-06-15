import React  from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
 
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color:"#FF0000",
    textAlign:"center"
  },
  search: {
    position: 'relative',
    borderRadius: "35px 5px 5px 35px",
    backgroundColor: "white",
    borderBottom: "2px solid #C82333",
    margin: 0,
    padding: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    pointerEvents: 'none',
    background: '#C82333',
    borderRadius: "30px",
    textAlign: "center",
    height:"auto",
    position:"absolute",
    top:"0%",
    left:"0%",
    zIndex:"999"

  },
  inputRoot: {
    color: 'inherit',
    width:"100%",
    position:"relative",

  },
  inputInput: {
    // vertical padding + font size from searchIcon
    padding: '7px 10px 7px 80px',
    transition: theme.transitions.create('width'),
    width: '100%'
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={1} md={2}/>
      <Grid item container={true} xs={10} md={8} direction="column" justify="center">
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h4">
            Best food waiting for your belly!
          </Typography>
          <br/><br/>
        </Grid>
        <Grid item container xs={12} className={classes.search}>
           
           <div className={classes.inputRoot}>
            <IconButton className={classes.searchIcon}>
              <SearchIcon style={{color:"white"}} />
            </IconButton>
    
          <div style={{position:"relative"}}>
            <InputBase onChange={props.handleSearchItem} value={props.searchItem}
              placeholder="Search…"
              className={classes.inputInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={1} md={2} />
      <br/><br/><br/>
    </>
  );
};

export default SearchBar;