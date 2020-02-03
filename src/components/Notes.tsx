import React, { useState } from 'react';
import {StoreContext} from './GlobalVals'
import {Note} from './GlobalVals'
import {useObserver} from 'mobx-react'
import SingleNote from './SingleNote'
import { Grid, Container,Segment,Button,Card } from 'semantic-ui-react'


const Notes:React.FC = ()=>{
    const store = React.useContext(StoreContext);
    const [numOfColumns,setNumOfColumns] = useState<1|2|3>(window.innerWidth > 1300?3:window.innerWidth > 900?2:1)
    // const []

    window.onresize = ():void=>{
        let width = window.innerWidth;
            
        if(width>900){
            store.columns=2;
            store.carWidth = window.innerWidth*0.3;

        }else{
            store.columns=1;
            store.carWidth=window.innerWidth*0.9;
        }
      }

  
  
    return useObserver(()=>
    (
        
        <div>
            <Container>
            <Grid columns={store.columns}>
            {store.notes.map((note:Note,i:number)=>{
                return (<Grid.Column>
                        
                            <SingleNote note={note} index={i}  key={note.name + i.toString()}  />
                        
                    </Grid.Column>)
            
            })}
            </Grid>
            </Container>
        </div>
        
    ));
    
   
  }
export default Notes;
