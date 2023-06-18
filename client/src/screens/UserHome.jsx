import React, { useContext } from 'react';
import { AuthContext } from '../App';
import fashionarr from '../items';

export default function UserHome() {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1 className='h1s'>Welcome, {user.username}</h1>
            <div className="content-wrapper text1">
                <div class="content">
                    <div id="gridThumbs" class="portfolio-grid-overlay grid-wrapper collection-content-wrapper" data-controller="GridImages" data-animation-role="section" data-controllers-bound="GridImages">
                        {fashionarr.slice(0, 6).map((item, index) => {
                            return (
                                <a class="grid-item" href={`/details/${item.id}`} key={index}>
                                    <div class="grid-image">
                                        <div class="grid-image-inner-wrapper">
                                            <img src={item.image} style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}/>
                                        </div>
                                    </div>
                                    <div class="portfolio-overlay"></div>
                                    <div class="portfolio-text">
                                        <h3 class="portfolio-name">{item.name}</h3>
                                        <h3 class="portfolio-price">{item.price}</h3>
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