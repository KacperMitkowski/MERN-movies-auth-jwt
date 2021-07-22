import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Searcher from "./Searcher";
import AddMovieForm from "./AddMovieForm";

const SearcherAddMovieBar = () => {
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <Grid container spacing={3} alignItems="center">
            {user?.result ?
                <Grid item xs={12} sm={9}>
                    <Button onClick={() => setOpen(true)} color="secondary" variant="contained">Add movie</Button>
                </Grid>
                :
                <Grid item xs={12} sm={9}></Grid>}
            <Grid item xs={12} sm={3}><Searcher /></Grid>
            <AddMovieForm selectedValue={selectedValue} open={open} onClose={handleClose} />
        </Grid>
    )
}

export default SearcherAddMovieBar;