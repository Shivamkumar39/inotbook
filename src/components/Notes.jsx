import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/Notes/noteContext'
import Noteitem from './noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
//import Home from './Home'
const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
         
        } else {
            navigate('/Login');
        }
    
        //eslint-disable-next-line
      }, [navigate]);



    const [note, setNote] = useState({id: '', etitle: "", edescription: "", etag: "" })
    // const { addNote } = context;
    const ref = useRef(null)
    const refClose = useRef()

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>


            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className=" container modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p >Min char required 5 for all 3 inputs</p>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength="5" required onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" minLength="5" required onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Updatae Notes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container row my-3'>
                <h2>Your Notes</h2>
                {notes.length === 0 && "No notes is available"}
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>

    )
}

export default Notes