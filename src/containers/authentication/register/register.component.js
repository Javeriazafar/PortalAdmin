import React from 'react';
import PropTypes, { bool } from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import axios from 'axios';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles } from '@material-ui/core/styles';
import themeStyles from './register.theme.style';
import scss from './register.module.scss';
import logoImage from '../../../assets/images/portal-logo.png';
import { FacebookLoginButton } from "react-social-login-buttons";

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form:{
        firstName:'',
         lastName:'',
         email:'',
          password:'',
           confirmPassword:'' 
      },
      
      clientId:'77nw4dkri3xbxe',
      sign: false,
      showPassword: false,
      sign1:false,
      sign2:false,
      addressmain:'',
      addresssec:'',
      password:'',
      comapny:'',
      vat:'',
      shipments:'',
      zipcode:'',
      province:'',
      city:'',
      telephone:'',
      country:'',
      platform:'',
      
      
    }
    
  }
handleMouseDownPassword = event => {
  event.preventDefault();
};

handleClickShowPassword = () => {
  this.setState({ showPassword: !this.state.showPassword });
};

handleChange = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  this.setState({form: {...this.state.form, [name]: value}});

}
handleChanges=(e)=>{
  const target = e.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]:[value]
  })
}
onOpenModal = () => {
  this.setState({ sign: true });
  
  
};
onOpenModalOne=(e)=>{
  e.preventDefault();
  this.setState({ sign1:true, sign: false});
  
}
onOpenModaltwo=(e)=>{
  e.preventDefault();
  this.setState({ sign2:true, sign1: false});  
  
}
onCloseModal = (e) => {
  e.preventDefault();
  //this.props.history.push('/welcome');
  
};
//  getURLWithQueryParams = (base, params) => {
//   const query = Object.entries(params)
//     .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
//     .join('&')
//  const linkquery= `${base}?${query}`;
//   return linkquery;
// }
// getProvidersUrls = () => (
//   this.getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
//     response_type: 'code',
//     client_id: '77nw4dkri3xbxe',
//     redirect_uri: 'http://localhost:3000/register?provider=linkedin',
//     scope: 'r_liteprofile r_emailaddress'
// })
 

// )
  onSignIn=(googleUser)=> {

          var profile = googleUser.getBasicProfile();
          const id=profile.getId();
          const name=profile.getName();
          const image=profile.getImageUrl();
          const email=profile.getEmail();

  
          console.log('Email: ' + profile.getEmail()); 
          fetch(`http://localhost:5000/auth/go`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({id,name,email,image})
            
          })

          this.onOpenModal();
    
  }


  componentDidMount=()=>{

    window.FB.logout();
  
    window.fbAsyncInit = () => {
      window.FB.logout();
      window.FB.init({
        appId: '445248313376989', //Change with your Facebook app id
        cookie: true,
        xfbml: true,
        version: 'v3.0'
      });

      window.FB.Event.subscribe('auth.statusChange', response => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('[FacebookLoginButton] User cancelled login or did not fully authorize.');
        }
      });
    };


          window.onbeforeunload=(e)=>{
            window.gapi.auth2.getAuthInstance().signOut();
            window.FB.logout();
          }
          window.onLoadCallback = function(){
            window.gapi.auth2.getAuthInstance().signOut();
            window.FB.logout();
            window.gapi.auth2.init({
                client_id: '256967444631-ou13l5eqseb7ojh6p0dp1abqlcps6mov.apps.googleusercontent.com', //Change with your GOOGLE app id
                scope: 'profile'
              });
          }
            console.log('this mounted')
            window.gapi.signin2.render('g-signin2', {
                'scope': 'profile email',
                'width': 250,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.onSignIn
            });
  }
  checkLoginState() {
      window.FB.getLoginStatus(function(response) {
      //this.statusChangeCallback(response);
      if (response.status === 'connected') {

        const{authResponse:{accessToken,userID}}=response;
        fetch(`http://localhost:5000/auth/fb`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({accessToken,userID})
          
        }).then((res)=>{
        console.log(res);
        })
        
        this.onOpenModal();
        
          } else if (response.status === 'not_authorized') {
            console.log("[FacebookLoginButton] Person is logged into Facebook but not your app");
          } else {
            console.log("[FacebookLoginButton] Person is not logged into Facebook");
          }
    }.bind(this))
  }

  login(){
    
        window.FB.login(this.checkLoginState(), {
          scope: 'email'
        });
      }

  handleSubmit = async(e) => {

          e.preventDefault();
          
          await axios.post(`http://192.168.1.107:5000/user/signup`,this.state.form
          ).then(response => { 
            console.log(response);
            
          })
          .catch(error => {
              console.log(error.response);
          });
          this.onOpenModal();  
              
 
  };
 
  

  
  render(){
    const panelDirection = width === 'xs' ? 'column' : 'row'; 
    const providersUrls = this.getProvidersUrls;
    const {
          classes,
          width,
          history,
          location
        } = this.props;
        const {form, sign,sign1,sign2,company,platform,vat,telephone,province,city,shipments,zipcode,addressmain,addresssec,password,country}=this.state;
        const ITEM_HEIGHT = 48;
        
    return (
    
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.background}
      >
        <Grid item sm={10} xs={12} className={scss.panel}>
          <Grid direction={panelDirection} container spacing={0}>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <Card className={classNames(scss.card, classes['primary-card'])}>
                <CardContent className={scss['signup-content']}>
                  <img src={logoImage} className={scss['signup-logo']} alt="logo" />
                  <Typography variant="headline" component="h2" gutterBottom>
                    Register
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Welcome It takes a couple of minutes to sign up for a free account. Just fill in your details to gain access the admin panel and view the dashboard. By creating an account, you agree to our Terms & Conditions and Privacy Policy.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth href="/login" color="secondary" variant="raised">I'm already registered</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <Card className={scss.card}>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <CardContent>
                  
                  <Grid container>
                  
                    <Grid item sm={6} xs={12}>
                      <TextField
                      name="firstName"
                        label="Firstname"
                        value={form.firstName}
                        required={true}
                       onChange={this.handleChange}
                        fullWidth
                      />
                      
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                            name="lastName"
                            label="Lastname"
                            value={form.lastName}
                            onChange={this.handleChange}
                            required={true}
                            fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                            name="email"
                            type="email"
                            label="Email Address"
                            value={form.email}
                            onChange={this.handleChange}
                            required={true}
                            fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            required={true}
                            name="password"
                            label="Password"
                            value={form.password}
                            onChange={this.handleChange}

                            fullWidth
                            InputProps={{ // <-- This is where the toggle button is added.
                              endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            required
                            name="confirmPassword"
                            label="Repeat Password"
                            value={form.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                            InputProps={{ // <-- This is where the toggle button is added.
                              endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    
                  </Grid>
                  
                </CardContent>
                <CardActions>
                  <Button  fullWidth color="primary"  type="submit" variant="raised" >Register</Button>
                </CardActions>

                <span style={{paddingLeft:250, textAlign:'center'}}>or</span>

               
                <CardActions>
                <div id="g-signin2"  style={{paddingLeft:100}} data-onsuccess={this.onSignIn}> </div>
                </CardActions>

                <CardActions>
                <div style={{paddingLeft:100}}>
                  <FacebookLoginButton style={{'width': 250,'fontSize':15,
                  'height': 50,'alignContent':'center', 'textAlign':'center'}} onClick={()=>this.login()} >
                  <span>Continue With Facebook</span>
                  </FacebookLoginButton>
                </div>
                </CardActions>

               
                {/* <Button href={providersUrls()}
                 className={scss.linkedinbutton}
                >
<div style={{minWidth:26}} >  <Icon className="fa faLinkedin"></Icon>
</div>
               <div style={{textAlign:'left'}}><span >Continue With Linkedin</span></div> </Button>
                 */}
                           </form>
   
          
               <Menu
                className={scss.modalbody}
                open={sign}
                onClose={() => this.setState({ sign:false})}
                PaperProps={{
                style: {
                // maxHeight: ITEM_HEIGHT * 4.5,
                width: '50ch',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:110,
                transition: 0.3,
                borderRadius: 7,          
                }
                
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
          //style={{top: 170}}
        >
                     
                      <h2 style={{paddingLeft:35}}>Get Started Absolutely<span> Free!</span></h2>
                       <form className={classes.form} onSubmit={this.handleSubmit}>
                       <MenuItem>  
                       <TextField
                          name="company"
                          label="What are you?(Company or private)"
                          value={company}
                          onChange={this.handleChanges}
                          fullWidth
                          required
                      /></MenuItem> 
                       <MenuItem> 
                          <TextField
                          required
                          name="firstname"
                          label="Name"
                          value={form.firstName}
                          onChange={this.handleChanges}
                          fullWidth
                          />  
                      </MenuItem>
                      <MenuItem>  
                          
                          <TextField
                          name="lastName"
                          label="Surname"
                          value={form.lastName}
                          onChange={this.handleChanges}
                          required
                          fullWidth
                          /> 
                      </MenuItem>
                       <MenuItem>  
                          
                          <TextField
                          id="adornment-password"
                          type={this.state.showPassword ? 'text' : 'password'}
                          name="password"
                          label="password"
                          required
                          value={password}
                          InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                  onMouseDown={this.handleMouseDownPassword}
                                 
                                >
                                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          onChange={this.handleChanges}
                          fullWidth
                          /> 
                          
                      </MenuItem>
                            <MenuItem>   
                          
                          <TextField
                          name="telephone"
                          label="Telephone"
                          value={telephone}
                          onChange={this.handleChanges}
                           required
                          fullWidth
                          />
                          
                      </MenuItem>
                            <MenuItem> 
                            
                            <TextField
                            name="country"
                            label="Country"
                            value={country}
                            onChange={this.handleChanges}
                             required
                            fullWidth
                            />
                            
                            </MenuItem>
                            <div><Button  fullWidth color="primary"  type="submit" variant="raised" onClick={this.onOpenModalOne}>Next</Button></div>
                        </form>
                        
                   
          
        </Menu>
        <Menu
            className={scss.modalbody}
            open={sign1}
            //onClose={() => this.setState({ sign1:false, sign2: true})}
            PaperProps={{
            style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: '50ch',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:110,
            transition: 0.3,
            borderRadius: 7,

            }

              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
          //style={{top: 170}}
        >
                      
                        <h2 style={{paddingLeft:35}}>Get Started Absolutely<span> Free!</span></h2>
                        <span className="subtitle"></span>
                       <form className={classes.form} onSubmit={()=>{console.log('hello1')}}>
                       <MenuItem>  
                       <TextField
                          name="company"
                          label="Company Name"
                          value={company}
                          onChange={this.handleChanges}
                          required={true}
                          fullWidth
                      /></MenuItem> 
                       <MenuItem> 
                          
                          <TextField
                          name="vat"
                          label="VAT Number"
                          value={vat}
                          onChange={this.handleChanges}
                          required={true}
                          fullWidth
                          />  
                      </MenuItem>
                      <MenuItem>  
                          
                          <TextField
                          name="platform"
                          label="In how many platforms do you sell?"
                          value={platform}
                          onChange={this.handleChanges}
                           required={true}
                          fullWidth
                          /> 
                      </MenuItem>
                       
                       <MenuItem>  
                          
                          <TextField
                          name="shipments"
                          label="How many shipments do you make per month?"
                          value={shipments}
                          onChange={this.handleChanges}
                          required={true}
                          fullWidth
                          /> 
                          
                     </MenuItem>
                            <div><Button  fullWidth color="primary"  type="submit" variant="raised" onClick={this.onOpenModaltwo}>Next</Button></div>
                        </form>
                        
                   
          
        </Menu>
        <Menu
            className={scss.modalbody}
            open={sign2}
            //onClose={this.onCloseModal}
            PaperProps={{
            style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: '50ch',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:110,
            transition: 0.3,
            borderRadius: 7,

            }

              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
          //style={{top: 170}}
        >
                      
                        <h2 style={{paddingLeft:35}}>Get Started Absolutely<span> Free!</span></h2>
                        
                       <form className={classes.form} onSubmit={()=>{console.log('hello1')}}>
                       <MenuItem>  
                       <TextField
                          name="addressmain"
                          required={true}
                          label="Main Address "
                          value={addressmain}
                          onChange={this.handleChanges}
                          fullWidth
                      /></MenuItem> 
                       <MenuItem> 
                          
                          <TextField
                          name="addresssec"
                          label="Secondary Address"
                          value={addresssec}
                          required={true}
                          onChange={this.handleChanges}
                          fullWidth
                          />  
                      </MenuItem>
                      <MenuItem>  
                          
                          <TextField
                           required={true}
                          name="zipcode"
                          label="Zipcode"
                          value={zipcode}
                          onChange={this.handleChanges}
                          fullWidth
                          /> 
                      </MenuItem>
                       <MenuItem>  
                          
                          <TextField
                          name="province"
                          label="Province"
                          value={province}
                          required={true}
                          onChange={this.handleChanges}
                          fullWidth
                          /> 
                          
                     </MenuItem>
                     <MenuItem>  
                          
                          <TextField
                          name="city"
                          label="City"
                          value={city}
                          required={true}
                          onChange={this.handleChanges}
                          fullWidth
                          /> 
                          
                     </MenuItem>
                            <div><Button  fullWidth color="primary"  type="submit" variant="raised" onClick={(e)=> {e.preventDefault();this.props.history.push('/')}} >Finish</Button></div>
                        </form>
                        
                    
          
        </Menu>
              </Card>
           
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      
       
    );
  }
  }

  

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};
// connect(null,mapDispatchToProps)

export default compose(withWidth(), withRouter,withStyles(themeStyles, { withTheme: true }))(Register);

