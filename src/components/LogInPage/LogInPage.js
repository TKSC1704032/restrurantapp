import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { LoginInfo } from "../../App";
import { Typography , Card} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    box: {
        width: "100%",
        minHeight: "100vh",
        background: "white",
    },
    logorsign: {
        color: "red",
        textDecorationLine: "underline",
        cursor: "pointer"
    },
    title:{
        textAlign:"center",
    },
    card:{
        maxWidth:"500px",
        padding:"20px",
        margin:"auto",
        marginTop:"20px",
        boxShadow:"2px 2px 10px black",
        '& div':{
            marginTop:"10px"
        },
        '& p':{
            marginTop:"15px"
        }
    }
}));

const LogInPage = () => {
    const { handleSignUp, handleLogIn } = useContext(LoginInfo);
    const [newUser, setnewUser] = useState({ fname: "", lname: "", email: "", password: "" });
    const [errInfo, setErrInfo] = useState({ emailError: "", passwordError: "" });
    const [hasAccount, sethasAccount] = useState(false);
    const classes = useStyles();
    const handleNewUser = (e) => {

        setnewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    return (
        <Box p={5} component="body">
            <Typography className={classes.title} color="secondary" variant="h4">{hasAccount?"Log In Here!!":"Sign Up Here!!"}</Typography>
            <Grid container >
                <Grid item xs={false} md={2} />
                <Grid item xs={12} md={8} >
                    <Card className={classes.card}>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogIn ? handleLogIn(newUser, setErrInfo) : handleSignUp(newUser, setErrInfo); }}>

                        {!hasAccount &&
                            (<><div>
                                <TextField id="fname" name="fname" label="First Name:" variant="outlined" fullWidth
                                    margin="normal" value={newUser.fname} onChange={handleNewUser} required />
                            </div>
                                <div>
                                    <TextField id="lname" name="lname" label="Last Name:" variant="outlined" value={newUser.lname} fullWidth
                                        margin="normal" onChange={handleNewUser} required />
                                </div></>)
                        }
                        <div>
                            <TextField id="email" name="email" label="Email:" fullWidth
                                margin="normal" error={errInfo.emailError === "" ? false : true} helperText={errInfo.emailError} variant="outlined" value={newUser.email} onChange={handleNewUser} required />
                        </div>
                        <div>
                            <TextField id="password" name="password" type="password" label="Password:" fullWidth
                                margin="normal" error={errInfo.passwordError === "" ? false : true} helperText={errInfo.passwordError} variant="outlined" value={newUser.password} onChange={handleNewUser} required />
                        </div>
                        <div>
                            {hasAccount ? (<Button type="submit" variant="contained" color="secondary" >Log In</Button>) :
                                (<Button type="submit" variant="contained" color="secondary"  >Sign up</Button>)
                            }
                        </div>
                        {hasAccount ? (<p>Haven't any account? Create a new account <span className={classes.logorsign} onClick={() => { sethasAccount(!hasAccount) }}>Sign Up</span></p>) :
                            (<p>Already has a account? <span className={classes.logorsign} onClick={() => { sethasAccount(!hasAccount) }}>Log In</span></p>)

                        }
                    </form>
                    </Card>

                </Grid>
                <Grid item xs={false} md={2} />

            </Grid>
        </Box>
    );
};


export default LogInPage;