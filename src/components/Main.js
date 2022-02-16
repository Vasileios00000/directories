
import React, { Component } from 'react';
import http from '../services/httpService';
import classes from './main.module.css';
import Item from './Item';
import { Link } from 'react-router-dom';

class Main extends Component {

    state = {
        name:'',
        directories:[],
        files:[],
        url1stParam:'root',
        url2ndParam:'',
        url2ndParamName:'',

        url3rdParam:'',
        url3rdParamName:'',
      } 


    async getPathName()
    {
      let path = this.props.location.pathname;
      let urlParts = path.split('/')
      console.log('path',path,urlParts)
      if(urlParts[1]=='')
      {
      this.setState({url2ndParam:'',
                    url3rdParam:'',
                    url2ndParamName:'',
                    url3rdParamName:''})
      }
      if(urlParts[1]!='' && urlParts.length==2)
      {
      let api = `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${urlParts[1]}`
      const { data: res } = await http.get(api); 
      this.setState({url2ndParamName:res.name,
                      url3rdParamName:'',
                      url2ndParam:urlParts[1],
                      url3rdParam:''})
      }
      if(urlParts.length==3)
      {
        let api = `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${urlParts[1]}`
        let { data: res } = await http.get(api); 
        this.setState({url2ndParamName:res.name,
                      url2ndParam:urlParts[1]})
        api = `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${urlParts[2]}`
        let { data: res2 } = await http.get(api); 
        this.setState({url3rdParamName:res2.name,
                      url3rdParam:urlParts[2]})   
      }
    }


    async componentDidMount()
    {
      this.getPathName()
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
            if(!this.props.match.params.id)
            {
              api = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'
            }
            const { data: res } = await http.get(api); 
            this.setState({directories:res.directories,files:res.files,name:res.name}); 
            this.getPathName()
        }
    }

    createArrayToRender()
    {
      return [...this.state.directories,...this.state.files]
    }

    renderPathName()
    {
      if(this.state.url2ndParam=='' && this.state.url3rdParam=='')
      {
        return (<Link to={{pathname:`/`}} className={classes.pathItem}>root</Link>)
      }
      if(this.state.url2ndParam!='' && this.state.url3rdParam=='')
      {
        return (<div>
        <Link to={{pathname:`/`}} className={classes.pathItem}>root</Link>/
        <Link to={{pathname:`${this.state.url2ndParam}`}} className={classes.pathItem}>{this.state.url2ndParamName}</Link>
        </div>)
      }
      if(this.state.url2ndParam!='' && this.state.url3rdParam!='')
      {
        return (<div>
        <Link to={{pathname:`/`}} className={classes.pathItem}>root</Link>/
        <Link to={{pathname:`/${this.state.url2ndParam}`}} className={classes.pathItem}>{this.state.url2ndParamName}</Link>/
        <Link to={{pathname:`/${this.state.url2ndParam}/${this.state.url3rdParam}`}} className={classes.pathItem}>{this.state.url3rdParamName}</Link>
        </div>)
      }

    }


    render() { 

        const array=this.createArrayToRender();
        return (
            <div className={classes.container}>
                <h1 className={classes.header}>{this.renderPathName()}</h1>
                <div className={classes.itemsContainer}>

                          {array.map((el,i) => {
                             return(<Item key={i} item={el} currentPath={this.props.location.pathname}/>)                              
                          })}
                </div>
            </div>

        );
    }
}
 
export default Main;