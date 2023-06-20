import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function ListedItems() {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3001/listeditems?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                console.log("data: ", data);
                setItems(data);
            })
    }, [])

    return (
        <div className="content-wrapper">
            <div class="content text1">
                <div id="gridThumbs" class="portfolio-grid-overlay grid-wrapper collection-content-wrapper" data-controller="GridImages" data-animation-role="section"
                    data-controllers-bound="GridImages"
                >
                    {items.map((item, index) => {
                        return (
                            // we need to navigate to details and pass in the entire item object
                            <a class="grid-item" key={index} onClick={() => {
                                navigate(`/edititems/${item.slug}`, { state: { item: {...item, description: item.brandName } } })
                            }}>
                                <div class="grid-image">
                                    <div class="grid-image-inner-wrapper">
                                        {/* change this later */}
                                        <img src={`http://localhost:3001/uploads/${item.images[0].name}`} style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}/>
                                    </div>
                                </div>
                                <div class="portfolio-overlay"></div>
                                <div class="portfolio-text">
                                    <h3 class="portfolio-name">{item.name}</h3>
                                    <h3 class="portfolio-price">${item.price}</h3>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}