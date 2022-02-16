import { type } from '@testing-library/user-event/dist/type';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './item.module.css';
import Main from './Main';




class Test extends Component {


    componentDidMount(){
        console.log('ID',this.props.params);

    }





    render() {



        return (
            <div>
                
                TEST
            </div>
        );
    }
}

export default Test;