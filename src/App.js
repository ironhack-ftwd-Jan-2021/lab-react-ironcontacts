import './App.css'
import React, { Component } from "react";
import contacts from './contacts.json';

class App extends Component {

    state = {
         contacts : contacts.slice(0,5),
         allContacts: contacts.slice(5, contacts.length)
    }

     addRandomContact = () => {
        const contactsCopy = [...this.state.allContacts];
        const randomIndex = Math.floor(Math.random() * contacts.length);
        const randomContact = contactsCopy.splice(randomIndex, 1);
        const newArr = [...this.state.contacts]
        newArr.push(randomContact[0]);
        this.setState({ contacts: newArr, allContacts: contactsCopy })
    }

    sortNames = () => {
        const newArr = [...this.state.contacts]

        newArr.sort( (a,b) => {
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            else return 0
        })
        this.setState({ contacts: newArr })
    }

    sortPopularity = () => {
        const newSortedArr = [...this.state.contacts]
        newSortedArr.sort((a,b) => b.popularity - a.popularity)
        this.setState({ contacts: newSortedArr })
    }

    deleteContact = (index) => {
        const newSortedArr = [...this.state.contacts]
        const filteredArr = newSortedArr.filter((el, i, arr) => (arr[i].id !== arr[index].id))
        this.setState({ contact: filteredArr })
    }

  render (){
        return (
            <div className="App">

                <h1>Ironhack Contacts</h1>

                <button onClick={ this.addRandomContact } className='btn' >Add random contact</button>
                <button onClick={ this.sortNames } className='btn' >Sort by name</button>
                <button onClick={ this.sortPopularity } className='btn' >Sort by popularity</button>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Popularity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.contacts.map((contact, index) => {
                        return (
                            <tr key={contact.id}>
                                <td><img src={contact.pictureUrl} style={{height:'200px'}} alt='profilePicture' /></td>
                                <td>{contact.name}</td>
                                <td>{contact.popularity.toFixed(1)}</td>
                                <td> <button className='btn' onClick = { ()=> { this.deleteContact(index) }}>Delete</button></td>
                            </tr>
                        )
                    })}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;
