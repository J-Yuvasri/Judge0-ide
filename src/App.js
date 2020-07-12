import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Topbar from './components/Topbar';
import Settings from './components/Settings';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import More from './components/More';
import AceEditor from "react-ace";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  div: {
    marginLeft: "0.3rem",
    padding: "0.5rem",
    height: "0.3rem"

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));
var Marquee = require('react-marquee');
function App() {
  const [count, setCount] = useState(false);
  const [lang, setLang] = useState([]);
  const [prog, setProg] = useState("");
  const [lid, setLid] = useState(0);
  const [code, setcode] = React.useState("");
  const [input, setInput] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [stdout, setStdout] = React.useState("");
  const [stderr, setStderr] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [compile, setCompile] = React.useState("");
  const [stou, setStou] = React.useState(false);
  const [ster, setSter] = React.useState(false);
  const [co, setCo] = React.useState(false);
  const [sm, setSm] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const apikey = "**********************";

  const classes = useStyles();

  const handleTabs = (event, newValue) => {

    // newValue = Math.floor(newValue / 2);
    console.log(newValue);
    setValue(newValue);
  }
  useEffect(() => {
    setOpen(true);
    axios({
      "method": "GET",
      "url": "https://judge0.p.rapidapi.com/languages",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key":apikey,
        "useQueryString": true
      }
    })
      .then((response) => {
        console.log(response.data);
        setLang(response.data);
        setCount(true);
        setOpen(false);
      })
      .catch((error) => {
        setOpen(false);
        window.alert(error.message);
      })
  }, [])

  const get = (id) => {
    axios({
      "method": "GET",
      "url": `https://judge0.p.rapidapi.com/submissions/${id}`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": apikey,
        "useQueryString": true
      }
    })
      .then((response) => {
        console.log(response);
        setOpen(false);
        if (response.data.status.description !== "Accepted") {
          window.alert(`The status is ${response.data.status.description}  So Please try again or check your code.`

          );
        }
        else {
          window.alert("Compiled Succesfully");
        }

        if (response.data.stdout !== null) {
          setStou(true);
          setStdout(response.data.stdout);
        }
        if (response.data.stderr !== null) {
          setSter(true);
          setStderr(response.data.stderr);
        }
        if (response.data.message !== null) {
          setCo(true);
          setMessage(response.data.message);
        }
        if (response.data.compile_output !== null) {
          setSm(true);
          setCompile(response.data.compile_output);
        }


        setLoad(true);


      })
      .catch((error) => {
        console.log(error)
      })
  }



  const submit = (e) => {
    if (prog === "") {
      window.alert("Choose the language");
    }
    else {
      setOpen(true);
      e.preventDefault();
      let id = "";
      axios({
        "method": "POST",
        "url": "https://judge0.p.rapidapi.com/submissions",
        "headers": {
          "content-type": "application/json",
          "x-rapidapi-host": "judge0.p.rapidapi.com",
          "x-rapidapi-key": apikey,
          "accept": "application/json",
          "useQueryString": true
        }, "data": {
          "language_id": lid, "source_code": code,
          "stdin": input
        }
      })
        .then((response) => {
          console.log(response.data)
          id = response.data.token;
          setStdout("");
          setStderr("");
          setMessage("");
          setCompile("");
          setStou(false);
          setSter(false);
          setCo(false);
          setSm(false);
          get(id);
        })
        .catch((error) => {
          console.log(error);
          setOpen(false);
        })
      console.log(id);
    }
  }



  return (
    <div className="App">
      <Backdrop className={classes.backdrop} open={open} onClick={() => setOpen(false)}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Grid container >
        <Grid item xs={1} className={classes.div} style={{ marginTop: "-0.4rem" }}>
          <h2>IDE</h2>
        </Grid>
        <Grid item xs={1} className={classes.div} style={{ marginTop: "0.4rem", color: "#ffffff" }}>
          <Topbar />
        </Grid>
        <Grid item xs={1} className={classes.div} style={{ paddingTop: "1rem" }} >
          <Settings />
        </Grid>
        <Grid item xs={1} style={{ marginTop: "-0.4rem" }}>
          <div style={{ marginTop: "0.8rem", marginBottom: "0.1rem" }}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Languages</InputLabel>
              <Select
                native
                variant="standard"
                value={prog}
                onChange={(e) => {
                  setProg(e.target.value);
                  console.log(e.target.value);
                  var l_id = "";
                  for (var i = 0; i < lang.length; i++) {
                    if (lang[i].name === e.target.value) {
                      l_id = lang[i].id;
                      break;
                    }
                  }

                  console.log(l_id);
                  setLid(l_id)
                }
                }
                inputProps={{
                  name: 'Languages',
                }}
              >
                <option aria-label="None" value="" />
                {count && lang.map((value, key) => {
                  return (
                    <option id={value.id} key={value.id}>{value.name}</option>
                  )
                })}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={1.5} className={classes.div}>
          <TextField id="outlined-basic" label="Compiler options" variant="outlined" style={{ marginRight: "0.5rem", height: "0.3rem" }} size="small" />
        </Grid>
        <Grid item xs={1.5} className={classes.div} >
          <TextField id="outlined-basic1" label="Command line arguments" variant="outlined" style={{ marginLeft: "0.5rem" }} size="small" />
        </Grid>
        <Grid item xs={1} className={classes.div} >
          <Button style={{ background: "#0c71bb", borderRadius: "5px", color: "#ffffff" }} onClick={submit} > <ArrowRightIcon /> Run(F9)</Button>
        </Grid>
        <Grid item xs={2} className={classes.div} style={{ margin: "0.5rem", padding: "0.5rem", display: "inline" }}>
          <Marquee text="Judge0 goes premium check out here!       Be a patreon!    Donate us in paypal!" hoverToStop={true} loop={true} />

        </Grid>
        <Grid item xs={1} className={classes.div}>
          <More style={{ display: "inline-block" }} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <AceEditor
            style={{
              width: '100%',
              height: 870
            }}
            mode="java"
            theme="monokai"
            onChange={(e) => setcode(e)}
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            name="editor"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
            }}
          />
        </Grid>
        <Grid item xs={6} style={{ display: "inline", backgroundColor: "#272822" }}>
          <AceEditor
            style={{
              width: '100%',
              height: 450
            }}
            mode="java"
            theme="monokai"
            onChange={(e) => setInput(e)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={input}
            name="editor"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
            }}
          />
          <br />
          <div style={{ color: "#ffffff", border: "#cccccc solid 1px", height: 400 }}>
            <Tabs value={value} onChange={handleTabs} aria-label="simple tabs example">
              <Tab label="STDOUT" {...a11yProps(0)} />
              <Badge color="secondary" style={{ margin: "0.3rem" }} variant="dot" invisible={!stou}>
              </Badge>
              <Tab label="STDERR" {...a11yProps(2)} />
              <Badge color="secondary" style={{ margin: "0.3rem" }} variant="dot" invisible={!ster}>

              </Badge>
              <Tab label="COMPILE OUTPUT" {...a11yProps(4)} />
              <Badge color="secondary" style={{ margin: "0.3rem" }} variant="dot" invisible={!sm}>

              </Badge>
              <Tab label="SANDBOX MESSAGE" {...a11yProps(6)} />
              <Badge color="secondary" style={{ margin: "0.3rem" }} variant="dot" invisible={!co}>

              </Badge>
            </Tabs>
            <TabPanel value={value} index={0}>
              {load && stdout}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {load && stderr}
            </TabPanel>
            <TabPanel value={value} index={4}>
              {load && compile}
            </TabPanel>
            <TabPanel value={value} index={6}>

              {load && message}
            </TabPanel>
          </div>
        </Grid>
      </Grid>
      <div style={{ display: "inline-block", backgroundColor: "#0e6eb8", width: "100vw" }}>
        <h6 style={{ display: "inline" }}>Become a patreon . Donate in paypal</h6>
        <h6 style={{ display: "inline", marginLeft: "40rem", textAlign: "center", float: "center" }}>@2021 All rights reserved. An open source Code editor</h6>
      </div>
    </div>
  );
}

export default App;
