
import dov, { Component } from "react";
import http from '../services/httpService';
import classes from './home.module.css';


class Home extends Component {

    state = {
        name:'',
        directories:[],
        files:[]

      } 


    async componentDidMount() {


  
    //  const apiEndpoint =config.apiEndpoint_GetPlayers+'/'+this.props.match.params.id
    //  const apiEndpoint =config.apiEndpoint_GetPlayers+'/'+this.props.match.params.id

      const api_root = 'https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories'
      const { data: res } = await http.get(api_root);
      console.log(res);
      this.setState({name:res.name});
    //   this.setState({isLoading:false});
  
  
  }


    render() { 
        return (
            <div className={classes.container}>
                <h1 className={classes.header}>{this.state.name}</h1>
                          <h1>homeee</h1>  
            </div>

        );
    }
}
 
export default Home;