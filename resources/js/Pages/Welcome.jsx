import {Head} from '@inertiajs/react';
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export default function Welcome() {
    const BoardTitles = [
        "Completed Tasks",
        "New Tasks",
        "On hold Tasks"
    ]
    const TemplateBoard = [
        [
            {
                id: "1",
                title: "First Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            },
            {
                id: "2",
                title: "Second Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            },
            {
                id: "3",
                title: "Third Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            },
        ],
        [
            {
                id: "4",
                title: "Fourth Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            },
        ],
        [
            {
                id: "5",
                title: "Fifth Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            },
        ],
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
            const items = reorder(Board[sInd], source.index, destination.index);
            const newState = [...Board];
            newState[sInd] = items;
            updateBoard(newState);
        } else {
            const result = move(Board[sInd], Board[dInd], source, destination);
            const newState = [...Board];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            updateBoard(newState.filter(group => group.length));
        }
    }

    const getListStyle = isDraggingOver => {
        return isDraggingOver ? "bg-orange-50 border-orange-200" : "bg-slate-50 border-gray-100"
    }

    const getItemStyle = isDragging => {
        return isDragging ? "opacity-80" : "opacity-100"
    }

    return (
        <>
            <Head title="Todos" />
            <section className="flex items-start justify-center gap-6 bg-gray-50 pt-40 px-10 h-screen w-screen">
                    <DragDropContext onDragEnd={handleTasks}>
                        {
                            Board.map((board, ind) => (
                                <div className="w-1/5 min-h-[40rem] max-h-fit">
                                    <h1 className="text-lg text-black font-bold mb-4">{BoardTitles[ind]}</h1>
                                    <Droppable key={ind} droppableId={`${ind}`}>
                                        {(provided, snapshot) => (
                                            <ul className={`border rounded-lg px-6 py-4 min-h-[40rem] transition-all ${getListStyle(snapshot.isDraggingOver)}`} {...provided.droppableProps} ref={provided.innerRef}>
                                                {board.map(({id, title, description}, index) => {
                                                    return (
                                                        <Draggable key={id} draggableId={id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <li className={`${getItemStyle(snapshot.isDragging)} relative bg-white rounded-sm px-6 py-4 my-2 border border-gray-200 transition-border-rd ${index === 0 ? "rounded-t-lg" : ""} ${index === board.length-1 ? "rounded-b-lg" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <h2 className="text-lg font-bold text-black">{title}</h2>
                                                                    <p className="text-slate-600">
                                                                        { description }
                                                                    </p>
                                                                    <span className="absolute bottom-2 right-2 text-xs text-slate-600">id:{id}</span>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </div>
                            ))
                        }
                    </DragDropContext>
            </section>
        </>
    );
}
