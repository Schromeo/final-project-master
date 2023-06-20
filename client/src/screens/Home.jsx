import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../assets/css/home.css';

export default function Home() {
    const { user } = useContext(AuthContext)
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/getallitems')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data);
            })
    }, [])

    return (
        <div>
            {user && <h1 className='h1s'>Welcome, {user.username}</h1>}
            <div className="content-wrapper text1">
                <div className="content">
                    <div id="gridThumbs" className="portfolio-grid-overlay grid-wrapper collection-content-wrapper" data-controller="GridImages" data-animation-role="section" data-controllers-bound="GridImages">
                        {items.map((item, index) => {
                            console.log("item", item)
                            return (
                                <a className="grid-item"
                                    onClick={() => {
                                        navigate(`/details/${item.slug}`, 
                                            { state: { 
                                                item: {...item, images: item.images.map((image) => `localhost:3001/uploads/${image.name}`), 
                                                    seller: item.seller.username
                                                }
                                            } }
                                        )
                                    }}
                                    key={index}>
                                    <div className="grid-image">
                                        <div className="grid-image-inner-wrapper">
                                            <img src={item.link ? `https://${item.link}` :
                                                `http://localhost:3001/uploads/${item.images[0].name}`} alt='itemimg'
                                                style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="portfolio-overlay"></div>
                                    <div className="portfolio-text">
                                        <h3 className="portfolio-name">{item.name}</h3>
                                        <h3 className="portfolio-price">{item.price}</h3>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}