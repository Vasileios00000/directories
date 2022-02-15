import { type } from '@testing-library/user-event/dist/type';
import React, { Component } from 'react';
import classes from './item.module.css';




class Item extends Component {


    item =this.props.item



    render() {

        type='file';

        if(this.item.id){
            type='directory'
        }

        const photo_ext= this.item.name.substr(this.item.name.length - 4);

        if(photo_ext=='.jpg')
        {
            type='photo'
        }


        return (
            <div className={classes.item}>
                {type}
                
                {this.item.name}
                
            </div>
        );
    }
}

export default Item;