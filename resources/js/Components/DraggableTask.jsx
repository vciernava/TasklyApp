import ReactDOMServer from "react-dom/server";

export function DraggableTask({className, children, props}) {
    function handleOnDrag(e) {
        const jsonString = ReactDOMServer.renderToString(children);
        e.dataTransfer.setData("task", jsonString);
    }

    function handleOnDragEnd(e) {
        const dropZone = e.target.closest(".task-list");
        const parent = e.target.parentElement.classList.contains("task-list")
        if (dropZone) {
            if(!parent) {
                e.target.remove();
                console.log("I did a thing.")
            }
        }
    }

    return (
        <div {...props} className={className} draggable onDragStart={(e) => handleOnDrag(e)} onDragEnd={(e) => handleOnDragEnd(e)}>
            {children}
        </div>
    )
}
