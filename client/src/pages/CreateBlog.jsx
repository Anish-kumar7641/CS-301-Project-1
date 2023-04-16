import React, { useState } from "react";
import Footer from "../Components/Main/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, {
  modules,
  formats,
} from "../Components/TextEditor/EditorToolbar";
import Demo from "../pages/Demo";
import Navbar from "../Components/Main/Navbar";

// function makeResizableDiv() {
//   const element = document.getElementById("main");
//   const currentResizer = document.getElementById("hold");

//   currentResizer.addEventListener("mousedown", function (e) {
//     e.preventDefault();
//     window.addEventListener("mousemove", resize);
//     window.addEventListener("mouseup", stopResize);
//   });

//   function resize(e) {
//     element.style.width = e.pageX - element.getBoundingClientRect().left + "px";
//   }

//   function stopResize() {
//     window.removeEventListener("mousemove", resize);
//   }
// }

function CreateBlog() {
  // const [initialPos, setInitialPos] = React.useState(null);
  // const [initialSize, setInitialSize] = React.useState(null);

  // const initial = (e) => {
  //   let resizable = document.getElementById("main");

  //   setInitialPos(e.clientX);
  //   setInitialSize(resizable.offsetWidth);
  // };

  // const resize = (e) => {
  //   let resizable = document.getElementById("main");

  //   resizable.style.width = `${
  //     parseInt(initialSize) + parseInt(e.clientX - initialPos)
  //   }px`;
  // };
  const [activeTab, setActiveTab] = useState(0);

  const [state, setState] = useState({ value: null });
  const [message, setMessage] = useState('')
  const [heading,setHeading]=useState('');
  const [desc,setDesc]=useState('');
  const handleChange = (value) => {
    setState({ value });
    // console.log(state.value);
  };

  const replaceImage = async () => {
    let count = 0;
    let modified = false; // Flag to indicate if any replacement was made
    do {
      // console.log('hiii from client')
      modified = false;
      const imageIndex = state.value.indexOf("<img src=", count);
      if (imageIndex !== -1) {
        modified = true;
        const startIndex = state.value.lastIndexOf("<p>", imageIndex);
        const endIndex = state.value.indexOf("</p>", imageIndex) + 4;
        const imageTag = state.value.slice(startIndex, endIndex);
        const srcIndex = imageTag.indexOf("src=") + 5;
        const srcEndIndex = imageTag.indexOf('"', srcIndex);
        const baseUrlImage = imageTag.slice(srcIndex, srcEndIndex);
        const cloudinaryUrl = await uploadOnCloudinary(baseUrlImage);
        const replacedImageTag = imageTag.replace(baseUrlImage, cloudinaryUrl);
        state.value = state.value.slice(0, startIndex) +
          replacedImageTag +
          state.value.slice(endIndex);
      }
      count = imageIndex + 1; // Update count to the next character after the image tag
    } while (modified && count < state.value.length);
    // console.log(state.value);
  };



  const uploadOnCloudinary = async (pic) => {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "tkjwrmag");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/da7gxivyc/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const responseData = await response.json();
      return responseData.secure_url;
    } catch (error) {
      console.log("Not uploaded in cloudinary");
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    replaceImage();
    console.log(heading,desc,state)
    const response = await fetch("/htmlBlog", {
      method: "POST",
      body: JSON.stringify({
        heading,
        desc,
        state,
      }),
      headers: { "Content-type": "application/json" },
    });
    const json2 = response.json();
    if (json2.err === "FAILED") {
      setMessage(json2.msg);
    }
    else {
      // var hrefUrl=new URL('http://localhost:3000/home')
      // window.location.replace(hrefUrl)
    }
  };

  const tabs = [
    {
      label: "Write Blog",
      content: (
        <form onSubmit={submitBlog} className="w-full h-fit min-h-[30rem]">
          <div className="dark:text-white text-xl">Heading</div>
          <input type='text' className="p-3 bg-slate-800 rounded mb-5" contentEditable="true" value={heading} onChange={(e)=>setHeading(e.target.value)}></input>
          <div className="dark:text-white text-xl">Description</div>
          <input  type="text" className="p-3 bg-slate-800 rounded mb-5" contentEditable="true" value={desc} onChange={(e)=>setDesc(e.target.value)}></input>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={state.value}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
          {message && (
            <p className="text-red-500 text-xs">{message}</p>
          )}
          <button type="submit" className="z-[1] cursor-pointer mt-8 rounded-md font-semibold hover:outline-none hover:bg-blue-500 bg-blue-600 py-3 px-5 text-slate-200">
            Submit Blog
          </button>
        </form>
      ),
    },
    {
      label: "Preview",
      content: (
        <div className="w-full flex min-h-[30rem]">
          <Demo Data={state.value} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-[100vh] bg-[url('https://wallpaperaccess.com/full/3298375.jpg')] dark:bg-bg2 bg-cover bg-center bg-fixed ">
      <Navbar />
      {/* Demo of the blog  */}
      <div className="w-full p-6 flex justify-center">
        <div className="w-full dark:text-slate-300 bg-[#fefeff] dark:bg-[#0c1116] md:w-2/3 lg:w-4/5 xl:w-3/5 flex flex-col gap-4 rounded-md">
          <div className="flex px-3 pt-4 border-b-[1px] border-[#d1d9de] dark:border-[#31373d] bg-[#f6f8fa] dark:bg-[#171b23] rounded -mb-px">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                className={`${activeTab === index
                  ? "border-x-[1px] border-t-[1px] text-slate-800 font-semibold dark:text-white border-b-transparent border-[#d1d9de] dark:border-[#31373d] rounded-t bg-[#fefeff] dark:bg-[#0c1116]"
                  : "border-b border-transparent"
                  } px-4 py-2 text-sm -mb-[2px] font-medium text-[#646d77] dark:text-gray-500 dark:hover:text-white focus:outline-none `}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-8 p-3">
            <p>{tabs[activeTab].content}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );

}

export default CreateBlog;
