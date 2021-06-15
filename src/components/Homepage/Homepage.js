import React, { useState, createContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import SearchBar from './SearchBar';
import MenuItems from "./MenuItems";
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL}/Image/bannerbackground.png)`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: " fixed",
    backgroundSize: "cover",
    backgroundPositionX: "-100px"
  },
});
const SearchItem = createContext();
const Homepage = () => {

  const [searchItem, setsearchItem] = useState("");
  const classes = useStyles();
  const handleSearchItem = (e) => {
    setsearchItem(e.target.value);
  }
  return (

    <>
      <SearchItem.Provider value={searchItem}>
        <Grid container component="body" className={classes.root}>
          <Grid item container xs={12} >
            <Header />
          </Grid>
          <Grid item container xs={12} style={{ margin: "10% 0 10% 0" }}>
            <SearchBar handleSearchItem={handleSearchItem} searchItem={searchItem} />
          </Grid>
          <Grid item container xs={12}>
            <MenuItems searchItem={searchItem} />
          </Grid>
        </Grid>
      </SearchItem.Provider>
    </>
  );
};

export default Homepage;
export { SearchItem };