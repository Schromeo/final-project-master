import { useContext, useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../App'
import '../assets/css/itemdetails.css'

export default function ItemDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const { item } = location.state;

    const { user } = useContext(AuthContext)

    console.log(item)
    return (
        <div>
            <h1 className='h1s'>Item Details</h1>
            <div className="globaldiv text1" id='createitemdiv'>
                <p>Product Name: {item.name}</p>
                <Link to={`/profile/${item.seller}`} style={{textDecoration: 'underline', color: 'blue'}}>
                    <p>Seller: {item.seller}</p>
                </Link>
                <p>Price: {item.price}</p>
                {item.newused && <p>New/Used: {item.newused}</p>}
                <p style={{maxWidth: '55vw'}}>
                    <span style={{textDecoration: 'underline', display: 'block', textAlign: 'center'}}>Description</span>
                    <br />
                    {item.description}
                </p>
                <p>
                    <span style={{textDecoration: 'underline', textAlign: 'center', width: '100%', display: 'block'}}>Images</span>
                    <br />
                    {item.link ? 
                        <img src={`https://${item.link}`} alt='itemimg'
                            style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}} 
                        />
                    :
                        item.images.map((image, index) => (
                            <img key={index} src={`http${item.brandName ? "s" : ''}://${image}`} alt={'item'} style={{width: '600px', height: '600px'}} />
                        ))
                    }
                </p>
            </div>
            <button
                id='addtocartbutton'
                style={{display: user && user.role === 'Seller' && 'none'}}
                className='btn btn-outline-success my-2 my-sm-0' onClick={() => 
                    user ?
                        user.role === "Buyer" &&
                            item.brandName ?
                                // first make call to the backend to add this item to 'Main Seller'
                                fetch('http://localhost:3001/addtoseller', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        username: user.username,
                                        name: item.name,
                                        // cut off the $ sign
                                        price: item.price.substring(1),
                                        newused: item.newused,
                                        description: item.description,
                                        link: item.imageUrl
                                    })
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        toast.success("Item added to cart successfully!", {
                                            position: "top-center",
                                            colored: true,
                                        });
                                    } else {
                                        toast.error("Error adding item to cart!", {
                                            position: "top-center",
                                            colored: true,
                                        });
                                    }
                                })
                            :
                                // then make call to the backend to add this item to the user's cart
                                fetch('http://localhost:3001/addtocart', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        item: item,
                                        username: user.username
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.success) {
                                            toast.success("Item added to cart successfully!", {
                                                position: "top-center",
                                                colored: true,
                                            });
                                        } else {
                                            toast.error("Error adding item to cart!", {
                                                position: "top-center",
                                                colored: true,
                                            });
                                        }
                                    })
                    :
                        navigate('/login')
            }>
                {user ? 
                    user.role === "Buyer" && 
                    "Add to Cart"
                :
                    "Log In to Add to Cart"
                }
            </button>
        </div>
    )
}