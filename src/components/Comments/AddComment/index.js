import React, { Component } from 'react';

import { Icon, List, NavBar, TextareaItem } from 'antd-mobile'
import { comments } from "../../Firebase/upload";
import withAuthentication from "../../Session/withAuthentication";

class AddComment extends Component {
    state = {
        content:'',
        postId:this.props.match.params.id

    }
    contentRef =  React.createRef();
    add = ()=>{
        let {addPost} = this.props
        let content = this.contentRef.current.value;
        const postObj = {id:4,userName:'Jack',time:'10:31 10/10/2019',content: content, pics:[], likes:0}
        addPost(postObj)
        this.setState({
            content:'',
            pics:[],
            multiple:true
        })

    }
    onChange = event => {
        this.setState({ content: event });
    };
    onConfirm = ()=>{

        comments(this.props.firebase, this.props.firebase.auth.currentUser.uid,this.props.firebase.auth.currentUser.displayName,this.props.firebase.auth.currentUser.photoURL,this.state.content,this.state.postId,()=>{
            this.props.history.goBack();
        });


    }


    render() {


        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross-circle" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    rightContent={
                        <div onClick={this.onConfirm}><Icon key="0" type="check-circle-o"  />
                        </div>
                    }
                >Text</NavBar>
                <List>
                    <TextareaItem

                        placeholder={"Comment"}
                        autoHeight
                        labelNumber={5}
                        onChange={this.onChange}
                        rows={5}
                        count={300}
                    />
                </List>


            </div>

        );
    }
}
export default withAuthentication(AddComment);