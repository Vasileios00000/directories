import { type } from '@testing-library/user-event/dist/type';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './item.module.css';

class Item extends Component {

    getItemType(){
        type='';
        const photo_ext= this.props.item.name.substr(this.props.item.name.length - 4);

        if(this.props.item.id){
            type='directory'
        }
        else if(photo_ext=='.jpg')
        {
            type='image'
        }
        else{
            type='file'
        }
        return type


    }

    renderItemIcon(type)
    {
        if(type=='directory')
        {
            return(<span class="material-icons">folder_open</span>)
        }
        if(type=='image')
        {
            return(<span class="material-icons">image</span>)
        }
        if(type=='file')
        {
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

    renderItem(type){
        if(type=='directory' && this.props.currentPath=='/')
        { 
        return(<Link to={{pathname:`/${this.props.item.id}`}} className={classes.linkItem}>       
                    <div>
                        {this.renderItemIcon(type)}
                    </div>
                    <div>
                        {this.renderName(this.props.item.name)}
                    </div>
            </Link>)
        }
        if(type=='directory')
        {
        return(<Link to={{pathname:`${this.props.currentPath}/${this.props.item.id}`}} className={classes.linkItem}>       
                    <div>
                        {this.renderItemIcon(type)}
                    </div>
                    <div>
                        {this.renderName(this.props.item.name)}
                    </div>
            </Link>)
        }
        else
        {
        return(<div>
                    <div>
                        {this.renderItemIcon(type)}
                    </div>
                    <div>
                        {this.renderName(this.props.item.name)}
                    </div>
                </div>)
        }        
    }

    render() {
        return (  
            <div className={classes.item}>
                {this.renderItem(this.getItemType())}       
            </div>
        );
    }
}

export default Item;