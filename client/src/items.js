import React from "react";
import { faker } from '@faker-js/faker';

// create a 100 object long array of fake data of fashion

let fashionarr = [];

for (let i = 0; i < 100; i++) {
    fashionarr.push({
        id: i,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        // image: faker.image.urlLoremFlickr({ category: 'fashion' }),
        image: 'https://images.squarespace-cdn.com/content/v1/624b3c6dd142742980614c6d/1649097839453-WMZXVL1V1YL2K1DQQP4F/illo-portrait-numbers-copy.jpg'
    });
}

export default fashionarr;