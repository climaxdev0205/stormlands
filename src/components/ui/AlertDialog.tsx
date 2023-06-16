import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Box, Grid, Typography} from "@mui/material";
import Image from "next/image";
import logo from "../../../public/assets/stormlands-icon-rgb.png";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    text: string;
    open: boolean;
    handleClose: (confirmed: boolean) => void;
}

const AlertDialogSlide: React.FC<Props> = ({text, open, handleClose}) => {
    const handleConfirm = () => {
        handleClose(true);
    };

    const handleCancel = () => {
        handleClose(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Contact Support"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={2} sx={{ marginBottom: 4, height: 275 }}>
                            <Grid item xs={12}>
                                <Box display="block" style={{ height: 275 }}
                                >
                                    <Box style={{width: "100%"}} justifyContent="center" alignItems="center" display="flex">
                                        <Image alt="contact" src={logo}/>
                                    </Box>
                                    <Box style={{width: "100%", position:"relative", bottom: 275, height: 275}} justifyContent="center" alignItems="center" display="flex">
                                        <Typography variant="h6" gutterBottom component="div" textAlign="center">
                                            For more details please contact Stormlands
                                            <br/>
                                            <a href='' style={{color: "blue", fontSize: 18}}>support@stormlands.com</a>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialogSlide;