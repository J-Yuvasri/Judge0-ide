import React from 'react';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 999,
        color: '#fff',
    },
    root: {
        width: "70rem",
        height: "15rem"
    },
    radio: {
        display: "inline",
        margin: 5
    },
}));
export default function Settings() {
    const [value, setValue] = React.useState('female');
    const [state, setState] = React.useState({
        gilad: false,
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };



    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleToggle}>
                <SettingsIcon /> Settings
  </Button>
            <Backdrop className={classes.backdrop} open={open} >
                <Card className={classes.root}>
                    <CardContent>
                        <SettingsIcon /> <h4 style={{ display: "inline", fontSize: "1.5rem" }}> Settings </h4>
                        <CloseIcon style={{ float: "right" }} onClick={handleClose} />
                        <br />
                        <br />
                        <hr />
                        <h3 className={classes.radio}  >Editor Mode </h3>
                        <RadioGroup className={classes.radio} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel className={classes.radio} value="normal" control={<Radio />} label="Normal" />
                            <FormControlLabel className={classes.radio} value="vim" control={<Radio />} label="Vim" />
                            <FormControlLabel className={classes.radio} value="other" control={<Radio />} label="Emacs" />
                        </RadioGroup>
                        <br />
                        <FormControlLabel
                            control={<Checkbox checked={state.gilad} onChange={handleCheck} name="gilad" />}
                            label="Redirect stderr to stdout"
                        />
                    </CardContent>

                </Card>
            </Backdrop>
        </div>
    )
}