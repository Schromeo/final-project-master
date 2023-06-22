import { useContext, useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext, fetchlink } from '../App'

export default function EditItem() {
    const location = useLocation()
    const navigate = useNavigate()
    // get item from navigate(`/details/${item.id}`, { state: { item: item } })
    const { item } = location.state
    console.log("item: ", item)

    const { user } = useContext(AuthContext)
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)
    const [newused, setNewused] = useState({value: item.newused, label: item.newused})
    // const [image, setImage] = useState(item.images)
    const [finalfiles, setFinalfiles] = useState([])

    const options = [
        {value: 'Brand New', label: 'Brand New'},
        {value: 'Open Box', label: 'Open Box'},
        {value: 'Used', label: 'Used'},
        {value: 'Refurbished', label: 'Refurbished'}
    ]

    // useEffect(() => {
    //     console.log("image is: ", image)
    // }, [image])

    useEffect(() => {
        console.log("finalfiles: ", finalfiles)
        
        // Clear existing images
        document.getElementById('imagesdiv').innerHTML = '';

        const imagesarr = Array.from(finalfiles);
        console.log("imagesarr: ", imagesarr)

        imagesarr.forEach(async (image) => {
            const reader = new FileReader();

            reader.onload = async (e2) => {
                const imagePreview = document.createElement('img');
                imagePreview.src = e2.target.result;
                document.getElementById('imagesdiv').appendChild(imagePreview);
            }

            reader.readAsDataURL(image);
        })
    }, [finalfiles])

    return (
        <div>
            <h1 className='h1s'>Edit Item</h1>
            <iframe name="dummyframe" id="dummyframe" style={{display: "none"}}></iframe>
            <form className="globaldiv text1" id='createitemdiv' encType="multipart/form-data"
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("e.target: ", e.target);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", `${fetchlink}/edititem`);
                    xhr.onload = function (event) {
                      if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            toast.success("Item listed successfully!", {
                                position: "top-center",
                                colored: true,
                            });
                            navigate("/listeditems");
                        } else {
                            toast.error("Error listing item!", {
                                position: "top-center",
                                colored: true,
                            });
                        }
                      } else {
                        toast.error(`HTTP request error: " + ${xhr.status}`, {
                            position: "top-center",
                            colored: true,
                        });
                      }
                    };
                    var formData = new FormData(e.target);
                    // get username from formdata
                    console.log(formData.get("username"));
                    console.log("formData: ", formData);
                    xhr.send(formData);
                  }}
            >
                <div className="labeldiv">
                    <label><h4 className='text1'>Product Name:</h4></label>   
                    <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="labeldiv">
                    <label>Price</label>
                    <input type="number" name='price' value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="labeldiv" id='newuseddiv'>
                    <label>New/Used</label>
                    <Select options={options} onChange={(val) => setNewused(val)} value={newused} />
                    {/* invisible input */}
                    <input type="text" name='newused' value={newused.value} style={{display: 'none'}} />
                </div>
                <div className="labeldiv" id='createimagediv'>
                    <label>Image</label>
                    {/* upload button for multiple images */}
                    <input type="file" name='images' multiple onChange={(e) => setFinalfiles(e.target.files)} accept='image/*' />
                    <div id="imagesdiv"></div>
                </div>
                <div className="labeldiv" id='descriptiondiv'>
                    <label>Description</label>
                    <textarea name='description' style={{border: '2px solid gray', borderRadius: '8px'}}
                        value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                {/* invisible input for passing username */}
                <input type="text" name='username' value={user.username} style={{display: 'none'}} />
                <input type="submit" className='btn btn-outline-success my-2 my-sm-0' value='List Item' />
            </form>
        </div>
    )
}