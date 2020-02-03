import  {useLocalStore} from 'mobx-react'
import React from 'react';


/*
constant varivables:
*/
const MAX_NOTES:number = 10;
export const MAX_SINGLE_WORD:number = 20;




export const StoreContext:React.Context<any> = React.createContext(null);



export const currectString = (str:string):string=>{
  let i:number = MAX_SINGLE_WORD -1;
  while(i < str.length){
      str = str.slice(0,i+1)+'\n' + str.slice(i+1,str.length);
      i += MAX_SINGLE_WORD+2;
  }
  return str;
}

export const dealWithLongString = (str:string):string=>{
  let tempArr:string[]= str.split(' ');
  let finalString:string = '';
  for(let i:number = 0;i< tempArr.length;i++){
      if(tempArr[i].length > MAX_SINGLE_WORD){
          tempArr[i] = currectString(tempArr[i]);
      }
      finalString += tempArr[i]+' ';
  }
  return finalString;

}


export const StoreProvider:React.FC = ({children})=>{
    const store:Record<string, any> = useLocalStore(()=>({
      notes:[],
      get numberOfNotes():number{
        return store.notes.lengh;
      },
      addNote: (note:Note):void=>{
        if(store.notes.length < MAX_NOTES){
          store.notes.unshift(note);
        }else{
          
        }
      },
      tuggleDone: (noteIndex:number,ToDoIndex:number):void=>{
        store.notes[noteIndex].list[ToDoIndex].done = !store.notes[noteIndex].list[ToDoIndex].done;
      },
      deleteNote:(noteIndex:number):void=>{
        store.notes.splice(noteIndex,1);
      },
      notesInLine:window.innerWidth < 900?1:2,
      columns:window.innerWidth > 900?2:1,
      cardWidth:window.innerWidth > 900?window.innerWidth*0.3:window.innerWidth*0.9,
    }));


  
    return(
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    )
  
  }

export const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
export class Time{
    year:number;
    month:number;
    day:number;
    hours: number;
    minuts:number;
    weekDay:string;
    fullDate: string;
    preatiefy: Function;
    constructor(){
      this.preatiefy= (n:number):string=>{
        if(n <10){
          return `0${n}`;
        }else{
          return `${n}`;
        }
      }
      let d = new Date;
      this.year = d.getFullYear();
      this.month = d.getMonth() + 1;
      this.day = d.getDate();
      this.hours = d.getHours();
      this.minuts = d.getMinutes();
      this.weekDay = days[d.getDay()];
      this.fullDate = `${this.weekDay}, ${this.preatiefy(this.day)}/${this.preatiefy(this.month)}/${this.year}, ${this.preatiefy(this.hours)}:${this.preatiefy(this.minuts)}`;
    }
  
  }

  export interface ToDo{
    done:boolean;
    description:string;
  }
  export interface Note{
    name:string;
    list: ToDo[];
    creationDate:Time;
    lastUpdate: Time;
  }