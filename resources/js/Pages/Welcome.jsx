import {Head} from '@inertiajs/react';
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export default function Welcome() {
    const TemplateBoard = [
        {
            title: "Completed Tasks",
            tasks: [
                {
                    id: "1",
                    title: "First Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: [
                        {
                            id: "1",
                            title: "Website",
                            color: "rgb(62, 192, 224)"
                        }
                    ],
                },
                {
                    id: "2",
                    title: "Second Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: [
                        {
                            id: "2",
                            title: "Android",
                            color: "rgb(238,148,12)"
                        }
                    ],
                },
                {
                    id: "3",
                    title: "Third Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: []
                }
            ],
        },
        {
            title: "New Tasks",
            tasks: [
                {
                    id: "4",
                    title: "Fourth Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: []
                },
                {
                    id: "5",
                    title: "Fifth Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: [
                        {
                            id: "2",
                            title: "Android",
                            color: "rgb(238,148,12)"
                        },
                        {
                            id: "3",
                            title: "iOS App",
                            color: "rgb(74,192,76)"
                        }
                    ],
                },
                {
                    id: "6",
                    title: "Sixth Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: []
                }
            ],
        },
        {
            title: "On hold Tasks",
            tasks: [
                {
                    id: "7",
                    title: "Seventh Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: []
                },
                {
                    id: "8",
                    title: "Eighth Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: [
                        {
                            id: "1",
                            title: "Website",
                            color: "rgb(62, 192, 224)"
                        }
                    ],
                },
                {
                    id: "9",
                    title: "Ninth Task",
                    description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc",
                    categories: [
                        {
                            id: "1",
                            title: "Website",
                            color: "rgb(62, 192, 224)"
                        }
                    ],
                }
            ],
        },
    ]

    const [Board, updateBoard] = useState(TemplateBoard)
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };
    const handleTasks = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(Board[sInd].tasks, source.index, destination.index);
            const newState = [...Board];
            newState[sInd].tasks = items;
            updateBoard(newState);
        } else {
            const result = move(Board[sInd].tasks, Board[dInd].tasks, source, destination);
            const newState = [...Board];
            newState[sInd].tasks = result[sInd];
            newState[dInd].tasks = result[dInd];
        }
    }

    const getListStyle = isDraggingOver => {
        return isDraggingOver ? `bg-none` : "bg-none"
    }

    const getItemStyle = isDragging => {
        return isDragging ? "border-darkSlate-light" : "border-darkSlate-400"
    }

    const changeAlpha = (color, alpha) => {
        const rgbValues = color.match(/\d+/g); // Extract the RGB values
        const [r, g, b] = rgbValues;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <>
            <Head title="Todos" />
            <div className="bg-red-200 text-red-600 font-bold p-4 text-center">
                <p>This application is only for development purposes!</p>
            </div>
            <section className="flex items-start justify-center gap-6 pt-32 px-10 h-[100%]">

                    <DragDropContext onDragEnd={handleTasks}>
                        {
                            Board.map((board, ind) => (
                                <div key={ind} className="w-1/5 min-h-[40rem] max-h-fit">
                                    <Droppable  droppableId={`${ind}`}>
                                        {(provided, snapshot) => (<>
                                            <div>
                                                <h1 className={`inline-block text-lg text-white font-bold mb-4`}>{board.title}
                                                    <span className="text-darkSlate-light text-base font-normal ml-1">{board.tasks.length > 0 && ( board.tasks.length < 10 ? `/0${board.tasks.length}` : `/${board.tasks.length}`)}</span></h1>
                                            </div>
                                            <ul className={`rounded-lg min-h-[40rem] transition-all ${getListStyle(snapshot.isDraggingOver)}`} {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    board.tasks.map(({id, title, description, categories}, index) => {
                                                        return (
                                                            <Draggable key={id} draggableId={id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <li className={`relative bg-darkSlate-400 border ${getItemStyle(snapshot.isDragging)} hover:border-darkSlate-light px-6 py-4 my-2 transition-border-rd transition-colors rounded-sm ${index === 0 ? "rounded-t-lg" : ""} ${index === board.tasks.length-1 ? "rounded-b-lg" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                        <h2 className="text-lg font-bold text-white">{title}</h2>
                                                                        <p className="text-sm text-darkSlate-light">
                                                                            { description.substring(0, 60) }
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-2 relative mt-4">
                                                                            {
                                                                                categories.map((category) => (
                                                                                    <div key={category.id} className={`text-xs font-bold uppercase px-4 py-2 w-max rounded align-middle text-center`} style={{color: category.color, backgroundColor: changeAlpha(category.color, 0.15)}}>
                                                                                        {category.title}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })
                                                }
                                                {provided.placeholder}
                                            </ul>
                                        </>)}
                                    </Droppable>
                                </div>
                            ))
                        }
                    </DragDropContext>
            </section>
        </>
    );
}
