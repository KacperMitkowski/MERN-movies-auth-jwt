import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";

interface AddMovieFormProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

const AddMovieForm = (props: AddMovieFormProps) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add new movie</DialogTitle>
            <div>TEST</div>
        </Dialog>
    );
}

export default AddMovieForm;