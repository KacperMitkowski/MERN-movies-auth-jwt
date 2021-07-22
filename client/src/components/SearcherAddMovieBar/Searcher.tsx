import { Button, TextField } from "@material-ui/core";
import React from "react";


const Searcher = () => {
    return (
        <div style={{display: "flex"}}>
            <TextField id="standard-search" label="Search field" type="search" variant="outlined" color="secondary" />
            <Button variant="contained" color="secondary">Search</Button>
        </div>
    )
}

export default Searcher;