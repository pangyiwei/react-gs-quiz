import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

const SubmitConfirmationDialog = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle id="alert-dialog-title">Submit</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to submit?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onNo} color="primary">
                    No
                </Button>
                <Button onClick={props.onYes} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SubmitConfirmationDialog
