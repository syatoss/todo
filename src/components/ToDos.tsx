import React, { useState } from 'react'
import {Note,ToDo} from './GlobalVals'
import {StoreContext,MAX_SINGLE_WORD,currectString,dealWithLongString} from './GlobalVals'
import { useObserver } from 'mobx-react';
import {Button,TextArea,List, Container, Segment, Input} from 'semantic-ui-react'

import './ToDo.css'
interface Props{
    todo:ToDo;
    listIndex:number;
    noteIndex:number;
    key:string;
}


const ToDos:React.FC<Props> = ({todo,listIndex,noteIndex})=>{

    const icon:('check circle outline'|'circle outline')[] = ['check circle outline','circle outline'];
    const button:('green'|'grey')[] = ['green','grey'];
    const underline:('line-through'|'none')[] = ['line-through','none'];
    const store:Record<string, any> = React.useContext(StoreContext);
    const [btnColor,setBtnColor] = useState(store.notes[noteIndex].list[listIndex].done?button[0]:button[1]);
    const [currentText,setCurrentText] = useState(todo.description)
    const [textStyle,setTextStyle] = useState(todo.done?underline[0]:underline[1])
    const [iconName,setIconName] = useState(todo.done?icon[0]:icon[1]);
    const btnRef:React.RefObject<any> = React.useRef();
    const textRef:React.RefObject<any> = React.useRef();
    const [todoText,setTodoText] = useState('p');



    const handleClick = ():void=>{
        if(todoText === ''){
            return
        }
        store.notes[noteIndex].list[listIndex].done= !store.notes[noteIndex].list[listIndex].done;
        
        if(store.notes[noteIndex].list[listIndex].done){
            setBtnColor('green');
            setTextStyle('line-through')
            setIconName(icon[0]);
        }else{
            setBtnColor('grey');
            setTextStyle('none')
            setIconName(icon[1]);
        }
    }


    return useObserver(()=>(
        <List.Item >
        
            
                <List.Icon
                name= {iconName}
                ref={btnRef} 
                style={{color:btnColor}}
                onClick={handleClick}             
                >
                </List.Icon>
                <List.Content textAlign='left'>
                    <TextArea
                        
                        ref={textRef}
                        as={todoText} 
                        className='textPart'
                        onClick={(e:Event)=>{
                            setTodoText('')
                            setIconName(icon[1]);
                            setBtnColor(button[1]);
                            setTextStyle(underline[1])
                            
                        }}  
                        onBlur={()=>{
                            if(textRef.current.ref.current.value !== '' &&
                             textRef.current.ref.current.value !== currentText){

                                store.notes[noteIndex].list[listIndex].description = dealWithLongString(textRef.current.ref.current.value);
                                setCurrentText(store.notes[noteIndex].list[listIndex].description);
                                store.notes[noteIndex].list[listIndex].done = false;                                
                            }
                            else if(store.notes[noteIndex].list[listIndex].done){
                                setIconName(icon[0]);
                                setBtnColor(button[0]);
                                setTextStyle(underline[0])
                            }
                            setTodoText('p')
                            
                        }}
                        style={{
                            textDecoration:textStyle,
                            width:store.cardWidth*0.8,
                            resize:'none'
                        }}>
                            {todo.description}
                    </TextArea>
                </List.Content>
        </List.Item>
    ))
}

export default ToDos
