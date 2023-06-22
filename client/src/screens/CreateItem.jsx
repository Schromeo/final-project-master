import { useContext, useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext, fetchlink } from '../App'
import '../assets/css/createitem.css'

export default function CreateItem() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [newused, setNewused] = useState('new')
    const [image, setImage] = useState('')
    const [finalfiles, setFinalfiles] = useState([])
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const options = [
        {value: 'Brand New', label: 'Brand New'},
        {value: 'Open Box', label: 'Open Box'},
        {value: 'Used', label: 'Used'},
        {value: 'Refurbished', label: 'Refurbished'}
    ]

    useEffect(() => {
        console.log("image is: ", image)
    }, [image])

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
            <h1 className='h1s'>Create Item</h1>
            <iframe name="dummyframe" id="dummyframe" style={{display: "none"}}></iframe>
            <form className="globaldiv text1" id='createitemdiv' encType="multipart/form-data"
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("e.target: ", e.target);
                    // if any of the fiels are empty, toast.error("Please fill out all fields"), if not, proceed
                    if (e.target.name.value === '' || e.target.price.value === '' || e.target.description.value === '' ||
                        finalfiles.length === 0 || e.target.newused.value === ''
                    ) {
                        console.log(`name: ${e.target.name.value}, price: ${e.target.price.value}, description: ${e.target.description.value},
                            finalfiles: ${finalfiles.length}, newused: ${e.target.newused.value}`)
                        toast.error("Please fill out all fields!", {
                            position: "top-center",
                            colored: true,
                        });
                        return;
                    } else {
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", `${fetchlink}/createitem`);
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
                    }
                  }}
            >
                <div className="labeldiv">
                    <label><h4 className='text1'>Product Name:</h4></label>   
                    <input type="text" name='name' />
                </div>
                <div className="labeldiv">
                    <label>Price</label>
                    <input type="number" name='price' step='0.01' />
                </div>
                <div className="labeldiv" id='newuseddiv'>
                    <label>New/Used</label>
                    <Select options={options} onChange={(val) => setNewused(val)} />
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
                        // value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                {/* invisible input for passing username */}
                <input type="text" name='username' value={user.username} style={{display: 'none'}} />
                <input type="submit" className='btn btn-outline-success my-2 my-sm-0' value='List Item' />
            </form>
        </div>
    )
}