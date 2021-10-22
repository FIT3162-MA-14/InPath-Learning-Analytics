import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { GrGraphQl } from "react-icons/gr";
import styled from "styled-components";
import logo from "../images/inpath.png";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://delineseyo.xyz/"
                target="_blank"
            >
                InPath
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

// CSS style for Material UI form
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#47597E",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// Wrapper to make the form vertically centered
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(
        180deg,
        rgba(128, 194, 237, 1) 21%,
        rgba(54, 80, 108, 1) 100%
    );
`;

const Img = styled.img`
    width: 50%;
    margin-bottom: 10px;
`;

const SignIn = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            window.location.replace("http://localhost:3000/dashboard");
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = (e) => {
        // Keep the page from refreshing when the form is submitted
        e.preventDefault();

        // Create a user object
        const user = {
            email: email,
            password: password,
        };

        // Fetch request
        // TODO: Change the url before hosting
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    // data.token will return token from api

                    localStorage.clear();
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.id);
                    window.location.replace("http://localhost:3000/dashboard");
                } else {
                    setEmail("");
                    setPassword("");
                    localStorage.clear();
                    setErrors(true);
                }
            })
            .catch((err) => {
                console.log("ERROR: " + err);
            });
    };

    return (
        <Wrapper>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {/* <GrGraphQl /> */}
                    <Img className="sidebarimg" src={logo} alt="inpath-logo" />
                    {loading === false && (
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    )}
                    {errors === true && (
                        <h3 style={{ padding: "15px" }}>Please Try Again</h3>
                    )}
                    {loading === false && (
                        <form className={classes.form} onSubmit={onSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    )}
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </Wrapper>
    );
};

export default SignIn;
