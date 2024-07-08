import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Container, InputGroup, Table, Form, Modal, Button, Col, Row } from 'react-bootstrap';

const Todo = () => {
    const [showForm, setshowform] = useState(false); //add button state
    const [showDelete, setshowDelete] = useState(true); //delete
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null); //edit
    const [showList, setshowList] = useState(true);
    const [deleteMessage, setdeleteMessage] = useState(false);
    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [inputStatus, setinputStatus] = useState("");
    const [search, setSearch] = useState("");
    const [items, setitems] = useState([
        {
            id: "001",
            name: "Default Task",
            desc: "c",
            status: "Completed",
        },
        {
            id: "0012",
            name: "Default Task",
            desc: "To",
            status: "Todo",//"All," "To Do," "In Progress," "Done"
        },
        {
            id: "002",
            name: "Default Task",
            desc: "In",
            status: "In Progress",
        },
        {
            id: "004",
            name: "Default Task",
            desc: "In",
            status: "In Progress",
        },
        {
            id: "005",
            name: "Default Task",
            desc: "To",
            status: "Todo",
        },
        {
            id: "003",
            name: "Default Task",
            desc: "In",
            status: "In Progress",
        },
    ]);
    const [filteredItems, setFilteredItems] = useState(items)
    const [filteredTasks, setFilteredTasks] = useState(null)


    const status = Array.from(
        new Set(filteredItems.map((task) => task.status))
    )
    const statusOptions = status.map((status) => ({
        value: status,
        label: status
    }))
    const fiteredcTasks = filteredTasks ? filteredItems.filter((p) => p.status === filteredTasks.value) : filteredItems




    useEffect(() => { }, [])
    const filterByStatus = (status) => {
        // console.log(status)
        setFilteredItems(items.filter((task) => {
            return task.status === status;
        }))

        // console.log(first)
        // raja.filter(x=>x.status==="Todo")
    }

    //   HANDLING INPUT FIELDS
    const handleInput = (e) => {
        setinputTitle(e.target.value);
    };
    const handleInputdesc = (e) => {
        setinputDesc(e.target.value);
    };
    const handleInputStatus = (e) => {
        setinputStatus(e.target.value);
    };

    //   SUBMITTING FORM
    const handleSubmit = (e) => {
        setshowList(true);
        e.preventDefault();
        if (!inputTitle || !inputDesc) {
            alert("fill data");
            showList(false);
        } else if (inputTitle && !toggleSubmit) {
            setFilteredItems(
                filteredItems.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputTitle, desc: inputDesc,status:inputStatus };
                    }
                    return elem;
                })//edit
            );

            setinputTitle("");
            setinputDesc("");
            setinputStatus("");
            settoggleSubmit(true);
            setshowform(false);
            setshowDelete(true);
        } else {
            const allinputTitle = {
                id: new Date().getTime().toString(),
                name: inputTitle,
                desc: inputDesc,
                status:inputStatus
            };
            setFilteredItems([allinputTitle, ...filteredItems]);
            setinputTitle("");
            setinputDesc("");
            setinputStatus("");
            setshowform(false);//add
        }
    }

    //   DELETE
    const handleDelete = (index) => {
        const updatedItems = filteredItems.filter((elem) => {
            return index !== elem.id;
        });
        setdeleteMessage(true);
        setitems(updatedItems);
        setdeleteMessage(false);
        //    setTimeout(() => {
        //      setitems(updatedItems);
        //      setdeleteMessage(false);
        //    }, 2000);
    };

    //   EDIT
    const handleEdit = (id) => {
        setshowList(false);
        setshowDelete(false);
        setshowform(true);
        settoggleSubmit(false);
        let newEditItem = filteredItems.find((elem) => {
            return elem.id === id;
        });
        console.log(newEditItem)
        setinputTitle(newEditItem.name);
        setinputDesc(newEditItem.desc);
        setinputStatus(newEditItem.status);
        setisEditItem(id);
    };

    // ADD NEW TASK
    const handleAdd = () => {
        setshowform(true);
        setshowList(true);
    };

    return (

        <>
            <div className="d-flex">
                <div>
                    <button className="btn btn-primary " onClick={handleAdd}>
                        New
                    </button>
                </div>
                <div className="my-auto">
                    <Select
                        options={statusOptions}
                        isClearable
                        placeholder="Filter the Status"
                        onChange={(sele) => setFilteredTasks(sele)}
                        value={filteredTasks}
                    />
                </div>
            </div>
            {showForm && (
                <>
                    <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
                        <div className="row">
                            <div className="text-center">
                                <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
                            </div>
                            <form className="col-12 p-2" onSubmit={handleSubmit}>
                                <label htmlFor="title" className="my-2">
                                    Enter Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="title"
                                    className="w-100 my-1 p-2"
                                    onChange={handleInput}
                                    value={inputTitle}
                                />
                                <label className="my-2" htmlFor="description">
                                    Enter
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="w-100 my-1 p-2"
                                    onChange={handleInputdesc}
                                    value={inputDesc}
                                />
                                <label className="my-2" htmlFor="description">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    name="status"
                                    id="status"
                                    placeholder="status"
                                    className="w-100 my-1 p-2"
                                    onChange={handleInputStatus}
                                    value={inputStatus}
                                />

                                {/* <div className="text-center"> */}
                                {toggleSubmit ? (
                                    <button className="btn btn-primary my-2">Save</button>
                                ) : (
                                    <button className="btn btn-primary my-2">Update</button>
                                )}

                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                </>
                //     <>
                //     <Modal
                //       show={showForm}
                //       onHide={() => setshowform(false)}
                //       dialogClassName="modal-90w"
                //       aria-labelledby="example-custom-modal-styling-title"
                //     >
                //       <Modal.Header closeButton>
                //         <Modal.Title id="example-custom-modal-styling-title">
                //         {toggleSubmit ? "Add Task" : " Edit Task"}
                //         </Modal.Title>
                //       </Modal.Header>
                //       <Modal.Body>
                //         <Form noValidate onSubmit={handleSubmit}>

                //             <Form.Group as={Col} md="4" controlId="validationCustom01">
                //               <Form.Label>First name</Form.Label>
                //               <Form.Control
                //                 required
                //                 type="text"
                //                 placeholder="First name"
                //                 defaultValue={ inputTitle}
                //                 onChange={handleInput
                //                 }
                //               />
                //                <Form.Label>First name</Form.Label>
                //               <Form.Control
                //                 required
                //                 type="text"
                //                 placeholder="First name"
                //                 defaultValue={ inputDesc}
                //                 onChange={handleInputdesc
                //                 }
                //               />
                //             </Form.Group>


                //         </Form>
                //       </Modal.Body>
                //       <Modal.Footer> <Button onClick={handleSubmit}>Submit form</Button></Modal.Footer>
                //     </Modal>
                //   </>
            )}

            {showList ? (
                <div className="container py-2 ">
                    {deleteMessage ? (
                        <p className="text-center text-danger">Item Deleted Successfully</p>
                    ) : (
                        ""
                    )}
                    {fiteredcTasks.map((elem, index) => {
                        return (
                            <div
                                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                                key={elem.id}
                            >
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{elem.name}</h4>
                                        <p>{elem.desc}</p>
                                        <p>{elem.status}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary mx-2"
                                            onClick={() => handleEdit(elem.id)}
                                        >
                                            Edit
                                        </button>
                                        {showDelete ? (
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => handleDelete(elem.id)}
                                            >
                                                Delete
                                            </button>
                                        ) : (
                                            ""
                                        )}

                                    </div>

                                </div>
                            </div>

                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Todo;