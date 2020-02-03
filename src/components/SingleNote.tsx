import React, { useState ,ReactElement} from 'react'
import  {useObserver } from 'mobx-react'
import {Note,ToDo} from './GlobalVals'
import {StoreContext,Time,MAX_SINGLE_WORD,currectString,dealWithLongString} from './GlobalVals'
import {  Segment,Divider,Button,Card,Input,Icon,Accordion,AccordionTitleProps,Header,List,ListContent } from 'semantic-ui-react'
import './SingleNote.css'
import ToDos from './ToDos'

interface Props{
    note:Note;
    index:number;
    key:string;
  }

const SingleNote:React.FC<Props> = ({note,index})=>{
    const {name,creationDate,lastUpdate} = note;//destructuring the note prop
    const store:Record<string, any> = React.useContext(StoreContext);
    const [activeIndex,setActiveIndex] = useState(-1);
    const [hover,setHover] = useState(false);//does the user hovers over the delete button
    const [inputVal,setInptVal] = useState('');//the value in the input field
    const btnRef:React.RefObject<any> = React.useRef();//a ref to the button that adds the other task
    const inptRef:React.RefObject<any> = React.useRef();//a ref to the input that adds another task
    const DEFAULT_EMPTY_MESSAGE:string = 'Currnty no tasks';


    const colorTuggle=():void=>{
        setHover(!hover);
    }
    const getColor=():'red'|'grey'=>{
        if(hover === true){
            return 'red';
        }else{
            return 'grey';
        }
    }

    const acordionAction = (e:React.MouseEvent<HTMLDivElement, MouseEvent>,titleProps:AccordionTitleProps):void=>{
        console.log(e);
        console.log(titleProps);
        setActiveIndex(titleProps.index === activeIndex?-1: Number(titleProps.index))
    }

    /*
    mission for to morrow:
    to finish wrrghting the function that adds tasks - remembeer her main part should be in global!!
    
    */
    const addTask = ():void=>{
        if(inputVal !== ''){
            let TaskToAdd:string = dealWithLongString(inputVal);
            let currentTime = new Time;
            store.notes[index].lastUpdate = currentTime;
            store.notes[index].list.push({done:false,description:TaskToAdd});
            inptRef.current.inputRef.current.value= '';
            setInptVal('');
        }

    }
    const listRend = ():ReactElement|JSX.Element[]=>{
        if(note.list.length !== 0){
            return note.list.map((todo:ToDo,i:number)=>{
                return <ToDos todo={todo} listIndex={i} noteIndex={index} key={`todo${i}`}/>
        })}else{
            return <List.Item ><Header as='h6' color='grey'>{DEFAULT_EMPTY_MESSAGE}</Header></List.Item>
        }
    } 

    const backgroundColorStyle=():string=>{
        if(index%2===0){
            return 'rgb(255,255,255)'
        }else{
            return 'rgb(250,250,250)'
        }
    }
    
  
    return useObserver(()=>(
      
      <div className='SingleNote'>
        
        <Card
            centered
            style={{
                width:store.cardWidth,
                backgroundColor:backgroundColorStyle()
            }}         
         >
        <Card.Content>
            <Card.Header size='small'>
        
             
            <Header color='grey' floated='left' textAlign='left' style={{fontSize:'0.7rem'}}>
                    Created At: {creationDate.fullDate} 
            </Header>
                <Button 
                floated='right'
                style={{backgroundColor:'transparent'}} 
                size='big' 
                circular
                icon={{
                    name:'delete',
                    color:getColor()
                }} 
                onMouseEnter={colorTuggle}
                onMouseLeave={colorTuggle}
                ref={btnRef}
                onClick={()=>{store.deleteNote(index)}}
                 />

            <br/>
            <Header textAlign='left' color='grey' as='h2' >
                <Icon name='edit' />
                {name}
            </Header>
            <Input
                floated='right'
                size='small'
                fluid
                action={{
                    icon:'add',
                    onClick:addTask,    
                }}
                onChange={()=>{
                        setInptVal(inptRef.current.inputRef.current.value);
                }}
                style={{
                    backgroundColor:backgroundColorStyle()
                    
                }} 
                placeholder='Add task'
                ref={inptRef}
            />
            

            </Card.Header>
            <br/>
            <Divider />

            
            <div className='singleNoteContent'>

                <br/>
                <Accordion className='acordion'>
                <Accordion.Title 
                    className='acordion'
                    active={activeIndex === 0}
                    index={0}
                    onClick={acordionAction}
                    textAlign='left'
                    floated='left'
                    
                >
                    <Icon className='acordion' name='dropdown' />
                    <span>My Tasks:</span>
                </Accordion.Title>
                <Accordion.Content className='acordion' active={activeIndex === 0}>
                <List textAlign='left' floated='left'>
                    {listRend()} 
                </List>
                </Accordion.Content>
                </Accordion>
                <br/>

                <Header as='h6' color='grey' floated='right' textAlign='right' className='lastUpdate'>
                    last update: {lastUpdate.fullDate}
                </Header>
                
            </div>
        </Card.Content> 
        </Card>
      </div>
      
    ))
  }
  export default SingleNote;
