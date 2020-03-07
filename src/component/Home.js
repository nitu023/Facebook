import React from 'react'
import Navbar from './Navbar'
// import SignUpUser from './SignpUser';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>
           <Navbar props={this.props}/>
    
            </div>
        )
            
        
    }
}
export default Home