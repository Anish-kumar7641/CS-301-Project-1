import React ,{useState}from "react";
import Card from "./Card";
const cards = [
  {
    title: "Technology",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
  {
    title: "Finance",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
  {
    title: "Food and Cooking",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
  {
    title: "Personal Development",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
  {
    title: "Health and Wellness",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
  {
    title: "Travel",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      Selected:false
  },
];
function Interests(props) { 
  const [flag,setFlag]=useState(false)
  const user=props.presentuser

  if(flag===false)
  {
    props.setcontinuebutton(false)
  }
  const changeSelected=(index,isselected)=>{
    cards[index].Selected=isselected

  }

  const handleinterests=async(e)=>{
    e.preventDefault()
    console.log("entered handleinterests")
    const response = await fetch("/handleinterests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        cards
      }),
    });

    const json=await response.json()
    if(json.mssg==="SUCCESS")
    {
      window.alert("Interests added")
      props.setcontinuebutton(true)
      setFlag(true)
    }
    else{
      window.alert("error in adding interests")
    }
   


  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-xl font-semibold px-2">Choose your Interests</h1>
      <button
          type="button"
          onClick={handleinterests}
          className="bg-blue-600 mt-3 px-3 w-fit py-2 text-sm rounded-md text-slate-300 hover:bg-blue-700"
          >
          Submit Interests
      </button>
      <div className="h-full p-2  w-full overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card key={index} {...card} onSelect={(isselected)=>changeSelected(index,isselected)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interests;
