import React from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class ChatBox extends React.Component{

    constructor(props){
        console.log(props);
        super(props)
        this.state = {
            open: false
        }
        
    }

    

    render(){
        return(
            <div>
                <Card>
                    <CardText>
                    {this.props.messages.map((chat, i)=>{
                        return(

                            <Chip style={styles.chip} 
                            key={i}>
                            <p>{chat.text}</p>
                            </Chip>
                        )
                    })}
                    </CardText>

                    <TextField
                    fullWidth ={true}
                    floatingLabelText="Your message"
                    />

                    <CardActions>
                        <FlatButton label="Send" />
                        <FlatButton label="Cancel" />
                    </CardActions>
                </Card>



                
                
            </div>
        )
    }

}