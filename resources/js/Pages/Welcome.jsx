import {Head} from '@inertiajs/react';
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export default function Welcome() {
    const TemplateTasks = {
        Completed: [
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
            }
        ],
        New: [
            {
                id: "4",
                title: "Fourth Task",
                description: "amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc"
            }
        ]
    }

    const [Tasks, updateTasks] = useState(TemplateTasks)
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

    const getList = id => Tasks[id];

    const handleCompletedTasks = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'New') {
                updateTasks({
                    Completed: Tasks.Completed,
                    New: items
                })
            } else {
                updateTasks({
                    Completed: items,
                    New: Tasks.New
                })
            }

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            updateTasks({
                Completed: result.Completed,
                New: result.New
            });
        }
    };

    const getListStyle = isDraggingOver => {
        return isDraggingOver ? "bg-amber-50" : "bg-slate-50"
    }

    const getItemStyle = isDragging => {
        return isDragging ? "opacity-80" : "opacity-100"
    }

    return (
        <>
            <Head title="Todos" />
            <section className="flex items-start justify-center gap-6 bg-gray-50 pt-40 h-screen w-screen">
                    <DragDropContext onDragEnd={handleCompletedTasks}>
                        <div className="w-1/3 min-h-[40rem] max-h-fit">
                            <h1 className="text-4xl py-4">Completed Tasks</h1>
                            <Droppable droppableId="Completed">
                                {(provided, snapshot) => (
                                    <ul className={`${getListStyle(snapshot.isDraggingOver)} border border-gray-100 rounded-lg px-6 py-4 min-h-[40rem] transition-all`} {...provided.droppableProps} ref={provided.innerRef}>
                                        {Tasks.Completed.map(({id, title, description}, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li className={`${getItemStyle(snapshot.isDragging)} relative bg-white rounded-sm px-6 py-4 my-2 border border-gray-200 transition-border-rd ${index === 0 ? "rounded-t-lg" : ""} ${index === Tasks.Completed.length-1 ? "rounded-b-lg" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                        <div className="w-1/3 min-h-[40rem] max-h-fit">
                            <h1 className="text-4xl py-4">New Tasks</h1>
                            <Droppable droppableId="New">
                                {(provided, snapshot) => (
                                    <ul className={`${getListStyle(snapshot.isDraggingOver)} border border-gray-100 rounded-lg px-6 py-4 min-h-[40rem] transition-all`} {...provided.droppableProps} ref={provided.innerRef}>
                                        {Tasks.New.map(({id, title, description}, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li className={`${getItemStyle(snapshot.isDragging)} relative bg-white rounded-sm px-6 py-4 my-2 border border-gray-200 transition-border-rd ${index === 0 ? "rounded-t-lg" : ""} ${index === Tasks.New.length-1 ? "rounded-b-lg" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                    </DragDropContext>
            </section>
        </>
    );
}
