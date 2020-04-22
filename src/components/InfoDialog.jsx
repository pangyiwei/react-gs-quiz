import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

const InfoDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle id="alert-dialog-title">Info</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
