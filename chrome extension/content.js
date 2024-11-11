function scrapeAmazonProductDetails() {
    let productDetails = {
        name: 'Product Name not found',
        price: 'Price not found',
        description: 'Description not found'
    };

    // Make sure it's a product page on Amazon
    if (window.location.hostname.includes('amazon') && window.location.pathname.includes('/dp/')) {
        let nameElement = document.querySelector('span#productTitle');
        if (nameElement) {
            productDetails.name = nameElement.innerText.trim();
        } else {
            console.log("Product name element not found on Amazon.");
        }

        let priceElement = document.querySelector('span#priceblock_ourprice') ||
                           document.querySelector('span#priceblock_dealprice') ||
                           document.querySelector('.a-price span.a-offscreen');
        if (priceElement) {
            productDetails.price = priceElement.innerText.trim();
        }

        let descriptionElement = document.querySelector('#productDescription');
        if (descriptionElement) {
            productDetails.description = descriptionElement.innerText.trim();
        }
    }

    console.log('Amazon Product Details Captured:', productDetails);
    return productDetails;
}


function scrapeInstamartProductDetails() {
    let productDetails = {
        name: 'Product Name not found',
        price: 'Price not found',
        description: 'Description not found'
    };

    // Ensure it's a product page on Swiggy Instamart
    if (window.location.hostname.includes('swiggy.com') && window.location.pathname.includes('/instamart/item/')) {
        
        // Scrape product name
        let nameElement = document.querySelector('[data-testid="item-name"]'); 
        if (nameElement) {
            productDetails.name = nameElement.innerText.trim();
        } else {
            console.log("Product name element not found on Instamart.");
        }

        // Scrape product price
        let priceElement = document.querySelector('[data-testid="item-price"]'); 
        if (priceElement) {
            productDetails.price = priceElement.innerText.trim();
        } else {
            console.log("Price element not found on Instamart.");
        }

        // Scrape product description
        // Assuming the description follows the "Description" label
        let descriptionLabel = document.querySelector('.sc-aXZVg.bzVIAg.-SSas'); // This finds the "Description" header
        if (descriptionLabel) {
            // Assuming the actual description is the next sibling
            let descriptionElement = descriptionLabel.nextElementSibling; 
            if (descriptionElement) {
                productDetails.description = descriptionElement.innerText.trim();
            } else {
                console.log("Description text element not found on Instamart.");
            }
        } else {
            console.log("Description label element not found on Instamart.");
        }
    } else {
        console.log('Not on a valid Swiggy Instamart product page.');
    }

    console.log('Instamart Product Details Captured:', productDetails);
    return productDetails;
}





// Main function to decide which scraper to run based on the current website
function scrapeProductDetails() {
    if (window.location.hostname.includes('amazon')) {
        return scrapeAmazonProductDetails();
    } else if (window.location.hostname.includes('swiggy.com') && window.location.pathname.includes('/instamart/item/')) {
        return scrapeInstamartProductDetails();
    } else {
        console.log('Unsupported website for product scraping.');
        return null;
    }
}


window.product = scrapeProductDetails();
console.log("Product details set:", window.product);

// Define the URL based on the product details
let product_name;
let url;

if (window.product && window.product.name) {
    product_name = window.product.name;
    url = `http://localhost:3000/shop/?product_name=${encodeURIComponent(product_name)}`;
    console.log("URL set:", url);

    // Store the URL in chrome storage
    chrome.storage.local.set({ productUrl: url }, () => {
        console.log("URL saved to storage.");
    });
} else {
    console.log("Product name not found!");
}