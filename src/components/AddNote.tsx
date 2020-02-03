import React, {useState} from 'react'
import {StoreContext,Time,Note} from './GlobalVals'
import {Input} from 'semantic-ui-react';
import {useObserver} from 'mobx-react'
import './AddNote.css'

const AddNote:React.FC = ()=>{
    const store = React.useContext(StoreContext);
    const [inputVal,setInputVal] = useState('');
    const input: React.RefObject<any> = React.useRef(null);
  
    const addNote = ():void=>{
      const time = new Time;
      input.current.inputRef.current.value = '';
      store.addNote({name:inputVal, list:[],creationDate:time,lastUpdate:time})
      setInputVal('');
      
  
    }
  
    return  useObserver(()=>(
     
      <div>
        <Input 
        action={{
          className:'btn1',  
          color:'blue',
          size:'small',
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