import { useState } from 'react'
import Select from 'react-select'

export default function CreateItem() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [newused, setNewused] = useState('new')
    const [image, setImage] = useState('')

    const options = [
        {value: 'Brand New', label: 'Brand New'},
        {value: 'Open Box', label: 'Open Box'},
        {value: 'Used', label: 'Used'},
        {value: 'Refurbished', label: 'Refurbished'}
    ]

    return (
        <div>
            <h1>Create Item</h1>
            <div className="globaldiv">
                <div className="labeldiv">
                    <label>Name</label>   
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="labeldiv">
                    <label>Price</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="labeldiv">
                    <label>Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />    
                </div>
                <div className="labeldiv">
                    <label>New/Used</label>
                    <Select options={options} onChange={(val) => setNewused(val)} />
                </div>
                <div className="labeldiv">
                    <label>Image</label>
                    {/* upload button */}
                    <input type="file" value={image} onChange={e => setImage(e.target.value)} />
                </div>

            </div>
        </div>
    )
}