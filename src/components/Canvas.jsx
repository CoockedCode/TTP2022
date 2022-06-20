import React, { useRef, useEffect, useState } from 'react';

const Canvas = props => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        // canvas.width = window.innerWidth / 2;
        // canvas.height = window.innerHeight / 2;
        canvas.width = "500";
        canvas.height = "500";
        canvas.style.width = `100%`;
        canvas.style.border = "1px solid red";
        // canvas.style.height = `${window.innerHeight}px`;
        // -offsetLeft + window.scrollX
        // offsetTop + window.scrollY

        const context = canvas.getContext("2d");
        context.scale(1,1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        contextRef.current = context;

    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        console.log(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }
    
    const draw = ({nativeEvent}) => {
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    return <canvas
                ref={canvasRef}
                onMouseDown={startDrawing} 
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                {...props}
            />
}

export default Canvas