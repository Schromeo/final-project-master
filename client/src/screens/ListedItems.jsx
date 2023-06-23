import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, fetchlink } from '../App';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export default function ListedItems() {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${fetchlink}/listeditems?username=${user.username}`)
            .then(res => res.json())
            .then(async(data) => {
                console.log("data: ", data);
                // we also need to add downloadURL from firebase storage
                await Promise.all(data.map(async (item) => {
                    item.images = [];
                    const imagefolder = ref(storage, `images/${item._id}`);
                    // iterate through the images in the referenced folder
                    const imagesRef = await listAll(imagefolder);
                    await Promise.all(imagesRef.items.map(async (imageRef) => {
                        const downloadURL = await getDownloadURL(imageRef);
                        item.images.push({ name: downloadURL });
                    }));
                }));
                console.log("new data: ", data);
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
                                        <img
                                            src={item.images[0] ? `${item.images[0].name}` : "https://th.bing.com/th/id/OIP.ysUCmaO4nRgDuP991HxwegHaHa?pid=ImgDet&rs=1"}
                                            style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}
                                        />
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