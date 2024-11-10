import React, { useEffect, useRef, useState } from "react";
import Camera from "./camera";


const Demo = () => {
    return (
    <>
    <div className="w-full h-[100vh] flex  justify-center items-center">
        <div className = "bg-blue-50 p-10">
            <Camera />
        </div>
    </div>
    </>
    );
};

export default Demo;