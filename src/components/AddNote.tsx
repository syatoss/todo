import React, {useState} from 'react'
import {StoreContext,Time,Note} from './GlobalVals'
import {Input} from 'semantic-ui-react';
import {useObserver} from 'mobx-react'
import './AddNote.css'

const AddNote:React.FC = ()=>{
    const store:Record<string, any> = React.useContext(StoreContext);
    const [inputVal,setInputVal] = useState('');
    const input: React.RefObject<any> = React.useRef(null);

  
    const addNote = ():void=>{
      const time:Time = new Time;
      input.current.inputRef.current.value = '';
      store.addNote({name:inputVal, list:[],creationDate:time,lastUpdate:time})
      setInputVal('');
      
  
    }
  
    return  useObserver(()=>(
     
      <div> 
        
        <Input 
        sticky
        size='big'
        action={{
          className:'btn1',  
          color:'blue',
          size:'big',
          icon:{name:'add',className:'icon1',color:'white'},
          onClick:addNote
        }}

        ref={input}
        placeholder='Add Note'
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setInputVal(e.target.value)}}
        />
        
      </div>
   
    ))
  }
  export default AddNote;