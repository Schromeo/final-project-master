import { useContext, useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../App'
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

    async function uploadImages() {
        const formData = new FormData();

        for (let i = 0; i < finalfiles.length; i++) {
            // console.log("i is: ", i)
            // console.log("finalfiles[i] is: ", finalfiles[i])
            formData.append('images', finalfiles[i]);
        }
        // console.log("formData in func: ", formData)

        // for (const entry of formData.entries()) {
        //     console.log("entry: ", entry)
        //     const [name, value] = entry;
        //     if (value instanceof File) {
        //         console.log(`File name: ${value.name}`);
        //     }
        // }
        formData.append('data', JSON.stringify({name, price, description, newused, username: user.username}))
        return formData;
    }

    return (
        <div>
            <h1 className='h1s'>Create Item</h1>
            <div className="globaldiv text1" id='createitemdiv'>
                <div className="labeldiv">
                    <label><h4 className='text1'>Product Name:</h4></label>   
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="labeldiv">
                    <label>Price</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="labeldiv" id='newuseddiv'>
                    <label>New/Used</label>
                    <Select options={options} onChange={(val) => setNewused(val)} />
                </div>
                <div className="labeldiv" id='createimagediv'>
                    <label>Image</label>
                    {/* upload button for multiple images */}
                    <input type="file" multiple onChange={(e) => setFinalfiles(e.target.files)} />
                    <div id="imagesdiv"></div>
                </div>
                <div className="labeldiv" id='descriptiondiv'>
                    <label>Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                        style={{border: '2px solid gray', borderRadius: '8px'}}
                    />
                </div>
                <button
                    className='btn btn-outline-success my-2 my-sm-0'
                    onClick={async () => {
                        let formData = await uploadImages();

                        // pass both formdata and user.username to backend
                        fetch('http://localhost:3001/createitem', {
                            method: 'POST',
                            body: formData,
                        })
                            .then(res => res.json())
                            .then(data => {
                                // navigate('/listeditems')
                                toast.success('Item listed successfully!', {
                                    position: 'top-center',
                                    colored: true,
                                })
                            })
                            .catch(err => {
                                toast.error('Error listing item!', {
                                    position: 'top-center',
                                    colored: true,
                                })
                            })
                    }}
                >
                    List Item
                </button>
            </div>
        </div>
    )
}