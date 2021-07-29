import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Searcher from "./Searcher";
import { useHistory } from "react-router";

const SearcherAddMovieBar = () => {
    const history = useHistory();
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));

    return (
        <Grid container spacing={3} alignItems="center" style={{marginBottom: "20px", marginTop: "80px"}}>
            {user?.result ?
                <Grid item xs={12} sm={4}>
                    <Button onClick={() => history.push('/addMovie')} color="secondary" variant="contained">Add movie</Button>
                </Grid>
                :
                <Grid item xs={12} sm={6}></Grid>}
            <Grid item xs={12} sm={8}><Searcher /></Grid>
        </Grid>
    )
}

export default SearcherAddMovieBar;