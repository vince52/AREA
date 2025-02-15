import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {CssBaseline,Typography,ListItem,Button,MenuItem,Menu,Grid,Card,CardContent,CardActions, Box, List} from '@material-ui/core';
import NavigationBar from "../Components/navbar";
import { ImGoogle, ImFacebook, ImGithub, ImTwitch, ImTrello } from "react-icons/im";
import { FaDiscord } from "react-icons/fa";
import {GoogleButton, DiscordButton, FacebookButton, TrelloButton,GithubButton,TwitchButton} from '../Components/Buttons';
import { purple } from '@material-ui/core/colors';
import API from '../auth/requests';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {AddButton } from "../Components/Buttons";
import {useHistory} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#F1E6FF',
  },
  root2: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  test: {
    color: purple[500]
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function GlobalButton(props) {
  const classes = useStyles();
  const theme = useTheme();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  switch(props.service.type) {
    case 'google':
      return  (<GoogleButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small" >
        <ImGoogle className={classes.extendedIcon} />
        Login to google</GoogleButton>)
    case 'discord':
      return (<DiscordButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small">
        <FaDiscord className={classes.extendedIcon} />
        Login to Discord</DiscordButton>)
    case 'twitch':
      return (<TwitchButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small">
        <ImTwitch className={classes.extendedIcon} />
        Login to Twitch</TwitchButton>)
    case 'trello':
      return (<TrelloButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small">
      <ImTrello className={classes.extendedIcon} />
      Login to Trello</TrelloButton>)
    case 'github':
      return (<GithubButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small">
      <ImGithub className={classes.extendedIcon} />
      Login to Github</GithubButton>)
    case 'facebook':
      return (<FacebookButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + props.service.service_url + '/' + (localStorage.getItem("userID")) )} size="small">
      <ImFacebook className={classes.extendedIcon} />
      Login to Facebook</FacebookButton>)
    default:
      return (<div> error</div>)
  }
}

// /*export default*/ function PersistentDrawerLeft() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [auth, setAuth] = React.useState(true);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//   const bull = <span className={classes.bullet}>•</span>;

//   const isMenuOpen = Boolean(anchorEl);
  
//   const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
//   const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };

//   const openInNewTab = (url) => {
//     const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
//     if (newWindow) newWindow.opener = null
//   }

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <NavigationBar />
//       <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: open,
//         })}
//       >
//         <div className={classes.drawerHeader} />
//         <Grid container
//               direction="column"
//               spacing={2}
//               style={{ minHeight: '100vh' }}>
//           <Grid item xs={3} spacing={3}>
//               <Card  className={classes.root}>
//                 <CardContent>
//                   <Typography variant="h5" color="textSecondary" gutterBottom> Profile </Typography>
//                   <Typography variant="body1" component="h2"> First Name : {localStorage.getItem("firstname")} </Typography>
//                   <Typography variant="body1" component="h2"> Last Name : {localStorage.getItem("lastname")} </Typography>
//                   <Typography className={classes.pos} color="textSecondary"> Username : {localStorage.getItem("userID")} </Typography>
//                   <Typography variant="body1" component="p">
//                     Email : {localStorage.getItem("email")}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small">Change settings</Button>
//                 </CardActions>
//               </Card>
//           </Grid>
//         <List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                   <GoogleButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/go-login' + '/' + (localStorage.getItem("userID")) )} size="small"> 
//                   <ImGoogle className={classes.extendedIcon} />
//                   Login to google</GoogleButton>
//                   <LoginCheck/>
//                 </CardActions>
//               </Card>
//           </List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                   <DiscordButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/di-login' + '/' + (localStorage.getItem("userID")) )} size="small">
//                   <FaDiscord className={classes.extendedIcon} />
//                   Login to Discord</DiscordButton>
//                   <LoginCheck />
//                 </CardActions>
//               </Card>
//           </List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                 <FacebookButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/fb-login' + '/' + (localStorage.getItem("userID")) )} size="small">
//                 <ImFacebook className={classes.extendedIcon} />
//                   Login to Facebook</FacebookButton>
//                 <LoginCheck />
//                 </CardActions>
//               </Card>
//           </List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                   <TrelloButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/trello-login' + '/' + (localStorage.getItem("userID")) )} size="small">
//                   <ImTrello className={classes.extendedIcon} />
//                   Login to Trello</TrelloButton>
//                 </CardActions>
//               </Card>
//           </List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                   <GithubButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/gh-login' + '/' + (localStorage.getItem("userID")) )} size="small">
//                   <ImGithub className={classes.extendedIcon} />
//                   Login to Github</GithubButton>
//                 </CardActions>
//               </Card>
//           </List>
//           <List item xs={3} spacing={3}>
//               <Card className={classes.root}>
//                 <CardActions>
//                   <TwitchButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/twitch-login' + '/' + (localStorage.getItem("userID")) )} size="small">
//                   <ImTwitch className={classes.extendedIcon} />
//                   Login to Twitch</TwitchButton>
//                 </CardActions>
//               </Card>
//           </List>
//         </List>
//       </Grid>
//       </main>
//     </div>
//   );
// }


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const isMenuOpen = Boolean(anchorEl);
  const navigateToArea = () => history.push('/Area');

  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const menuId = 'primary-search-account-menu';
  const [myservices, setServices] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching Login...")
            API.getServiceAllStatus().then(res=>{
                console.log(res.data.services)
                if (res.data.services) {
                    setServices(res.data.services)
                    console.log(myservices)
                }
            }).catch(e=>{
                console.log(e)
            })
        };
        console.log("print 2")
        fetchAPI()
    }, []);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container
              direction="column"
              spacing={2}
              style={{ minHeight: '100vh' }}>
          <Grid item xs={3} spacing={3}>
              <Card  className={classes.root2}>
                <CardContent>
                  <Typography variant="h5" color="textSecondary" gutterBottom> Profile </Typography>
                  <Typography variant="body1" component="p">
                    {localStorage.getItem("email")}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
          <Grid item xs={3} spacing={3}>
            { myservices.map( (service) => (
              <li key={service.type}>
                <Card className={classes.root2} xs={4}>
                  <CardActions>
                    <GlobalButton service={service.service} />
                    {service.connected?<CheckCircleIcon style={{ color: green[500] }}/>:<div></div>}
                  </CardActions>
                </Card>
              </li>
            )
            )
            }
          </Grid>
      </Grid>
      </main>
    </div>
  );
}