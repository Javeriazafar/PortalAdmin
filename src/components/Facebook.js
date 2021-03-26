import React from 'react';
import {FacebookLogin} from 'react-facebook-login';

class Facebook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedin:false
        }
    }

    render(){
        let fbContent;

        if(this.state.isLoggedin){
            fbContent=null
        }
        else{
            fbContent=(<FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                onClick={()=>{console.log('heelo')}}
                callback={()=>{console.log('fail')}} />);
        }

        return(
            <div>
                {fbContent}
            </div>
        )
    }
}

export default Facebook;