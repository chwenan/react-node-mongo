import {useState} from "react";
import { useNavigate } from "react-router-dom";


const AddUser =() => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name:"",
        image: "",
    });
    
    return(
        <div>
            <div>
                <imput placeholder="Enter Your name" type="text" name="name" value={data.name}/>
            </div>
            <div>
                <imput type="file" name="image" accept="image/*"/>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </div>
    );

};

export default AddUser;