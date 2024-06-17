import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const {note, updateNote} = props
    return (
        <div className='col-md-3 py-1'>
            <div className="card my-3 ">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fi fi-rr-trash" onClick={() => {deleteNote(note._id)}}></i>
                    <i className="fi fi-rr-pen-square mx-2" onClick={() => {updateNote(note)}}></i>
                </div>
            
            </div>


        </div>

    )
}

export default Noteitem