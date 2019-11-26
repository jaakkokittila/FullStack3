import React, { useState, useEffect } from 'react'
import './index.css'
import Person from './components/Person.js'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import services from './services/server.js'
import server from './services/server.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)
 
  useEffect(() =>{
    
    services.getAll()
      .then(response =>{
        console.log(response.data)
        
        setPersons(response.data)
       
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
      setSearch(event.target.value)
      

  }


 const filterNames =  persons.filter(person => search.toLowerCase() === String(person.name).substring(0, search.length).toLowerCase())
  

  const addPerson = (event) =>{
    event.preventDefault()
    
    const newPerson = {
        "name": newName,
        "number": newNumber
      }
    const names = persons.map(person => person.name.toLowerCase())
    const contains = names.includes(newName.toLowerCase())

      if (contains === true){
           if(window.confirm(`${newName} löytyy jo luettelosta! Haluatko vaihtaa sen numeron?`)){
             const contact = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
             const updatedContact = {...contact, number: newNumber}
             server.update(updatedContact)
             .then(response =>{ 
             setNotification(<div id="notification">{`Yhteystiedon ${newName} numero muutettu!`}</div>)
             setTimeout(() =>{
               setNotification(null)
             }, 5000)
            }).catch(error =>{
              setNotification(<div id="error">{error.toString()}</div>)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
           }

      }else{
          services.create(newPerson)
          .then(response =>{
            
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
            setNotification(<div id="notification">{`${newName} lisätty!`}</div>)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }).catch(error => {
            setNotification(<div id="error">{error.toString()}</div>)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      })
      
  }
}

  const deletePerson = (props) =>{
    
    const newList = persons.filter(person => person.id !== props)

    if(window.confirm("Haluatko poistaa yhteystiedon?")){
      services.remove(props)
    .then(response =>{
      setPersons(newList)
      setNotification(<div id="notification">Yhteystieto poistettu!</div>)
      setTimeout(() =>{
        setNotification(null)
      }, 5000)
      
    })
    .catch(error =>{
      setNotification(<div id="error">Yhteystieto on jo poistettu serveriltä!</div>)
    })
    }
    
    
  }

  const personlist = (
    filterNames.map(person =><div> <Person key={person.name} name={person.name} number={person.number} /> <button onClick={() => deletePerson(person.id)}>Delete</button></div>)
)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>{notification}</div>
      <Filter value={search} onChange={handleSearchChange} />
     
     
     <AddPerson newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <div>
      {personlist}
      </div>
    </div>
  )

}


export default App