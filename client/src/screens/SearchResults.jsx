import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchResults() {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { items } = location.state;
    console.log("items: ", items);
    const navigate = useNavigate();

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
                                navigate(`/details/${item.productCode}`, { state: 
                                    { item: {...item, images: [item.imageUrl], 
                                        description: item.brandName, price: item.price.current.text, newused: false,
                                        seller: "MainSeller"
                                    }}
                                });
                            }}>
                                <div class="grid-image">
                                    <div class="grid-image-inner-wrapper">
                                        {/* change this later */}
                                        <img src={`https://${item.imageUrl}`} style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}/>
                                    </div>
                                </div>
                                <div class="portfolio-overlay"></div>
                                <div class="portfolio-text">
                                    <h3 class="portfolio-name">{item.name}</h3>
                                    <h3 class="portfolio-price">{item.price.current.text}</h3>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}