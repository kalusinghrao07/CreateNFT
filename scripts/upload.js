const { File, NFTStorage } = require('nft.storage')
const mime = require('mime')
const fs = require('fs')
const path = require('path')

const NFT_STORAGE_KEY = ""; // Use Own NFT Storage Key

async function fileFromPath(filePath){
    const content = await fs.promises.readFile(filePath);
    const type = mime.getType(filePath);
    return new File([content], path.basename(filePath), { type });
}

async function storeNFT(imagePath, name, description){
    const image = await fileFromPath(imagePath);
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY});

    return nftStorage.store({ image, name, description});
}

async function main(imagePath, name, description){
    return await storeNFT(imagePath, name, description);
}

if (require.main == module){
    try{
        main("MonaLisa.jpg", "Mona Lisa NFT", "The Mona Lisa is one of the most valuable paintings in the world.");
    }
    catch(err){
        console.log("Error", err);
    }
}

module.exports = main;