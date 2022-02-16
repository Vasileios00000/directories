
import React, { Component } from 'react';
import http from '../services/httpService';
import classes from './main.module.css';
import Item from './Item';

class Main extends Component {

    state = {
        name:'',
        directories:[],
        files:[],
      } 


    async componentDidMount()
    {

     console.log('location', this.props.location.pathname);


      if(this.props.match.params.id)
        {
          let api = `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${this.props.match.params.id}`
          if(!this.props.match.params.id){api = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'};
          const { data: res } = await http.get(api); 
          this.setState({directories:res.directories,files:res.files,name:res.name});    
      }
      else
      {
      const api_root = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'
      const { data: res } = await http.get(api_root);
      this.setState({directories:res.directories,files:res.files,name:res.name});

      }
   
    }


    //// this works from the 2nd time the components mounts and on..
    async componentDidUpdate(prevProps)
    {
        if (this.props.match.params.id!== prevProps.match.params.id) 
        {

            let api = `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${this.props.match.params.id}`
            if(!this.props.match.params.id){api = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'}
            const { data: res } = await http.get(api); 
            this.setState({directories:res.directories,files:res.files,name:res.name});    
        }
    }

  createArrayToRender(){

    return [...this.state.directories,...this.state.files]
  }


    render() { 

        const array=this.createArrayToRender();
        return (
            <div className={classes.container}>
                <h1 className={classes.header}>{this.props.location.pathname}</h1>
                <div className={classes.itemsContainer}>

                          {array.map((el,i) => {
                              {console.log(el.name)}
                             return(<Item key={i} item={el} currentPath={this.props.location.pathname}/>)                              
                          })}
                </div>
            </div>

        );
    }
}
 
export default Main;