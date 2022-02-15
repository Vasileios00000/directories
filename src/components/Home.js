
import React, { Component } from 'react';
import http from '../services/httpService';
import classes from './home.module.css';
import Item from './Item';

class Home extends Component {

    state = {
        name:'',
        directories:[],
        files:[],
        

      } 


    async componentDidMount() {


  
    //  const apiEndpoint =config.apiEndpoint_GetPlayers+'/'+this.props.match.params.id
    //  const apiEndpoint =config.apiEndpoint_GetPlayers+'/'+this.props.match.params.id

      const api_root = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'
      const { data: res } = await http.get(api_root);
      console.log(res);
      this.setState({directories:res.directories,files:res.files,name:res.name});
   
  }

  createArrayToRender(){

    return [...this.state.directories,...this.state.files]
  }


    render() { 
        //arrayToRender=
      //  console.log('final array:',this.createArrayToRender())
        const array=this.createArrayToRender();
        console.log('finale array', array)
        return (
            <div className={classes.container}>
                <h1 className={classes.header}>{this.state.name}</h1>
                <div className={classes.itemsContainer}>

                          {array.map(el => {
                              {console.log(el.name)}
                             return(<Item item={el}/>)

                              
                          })}
                </div>
            </div>

        );
    }
}
 
export default Home;