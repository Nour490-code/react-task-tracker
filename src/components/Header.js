import  Button  from "./Button"

const Header = ({onAdd,showAdd}) => {

  let color = ''
  let text = ''
  if(showAdd){
    color = '#E3242B'
    text = 'Close'
  }else{
    color = 'green'
    text = 'Open' 
  }

return (
    <header className= 'header'>
        <h1>Task Tracker</h1>
        <Button 
        color = {color}
        text = {text}  
        onClick = {onAdd} />
    </header>
  )
}

export default Header