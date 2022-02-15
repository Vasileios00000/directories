import { type } from '@testing-library/user-event/dist/type';
import React, { Component } from 'react';
import classes from './item.module.css';




class Item extends Component {


    item =this.props.item

    renderItemIcon(type)
    {
        if(type=='directory'){

            return(<span class="material-icons">folder_open</span>)
        }

        if(type=='image'){

            return(<span class="material-icons">image</span>)
        }
        if(type=='file'){

            return(<span class="material-icons">insert_drive_file</span>)
        }
        else
        {

            return(<span >Icon not found</span>)
        }
         
    }

    renderName(name){
        if (name.length>13){
            const name_cut=name.slice(0, 8)
            return (<span>{name_cut}...</span>)
        }
        else{
            return(<span>{name}</span>)
        }
    }

    



    render() {

        type='file';

        if(this.item.id){
            type='directory'
        }

        const photo_ext= this.item.name.substr(this.item.name.length - 4);

        if(photo_ext=='.jpg')
        {
            type='image'
        }


        return (
            <div className={classes.item}>
                <div>
                    {this.renderItemIcon(type)}
                </div>
                <div>
                     {this.renderName(this.item.name)}
                </div>
            </div>
        );
    }
}

export default Item;