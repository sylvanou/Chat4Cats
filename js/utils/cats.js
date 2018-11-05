export const rdmCat = () => {
    const cat1 = "/img/Black.png";
    const cat2 = "/img/Calico.png";
    const cat3 = "/img/Scottish_Fold.png";
    const cat4 = "/img/Siamese.png";
    const cat5 = "/img/Snowshoe.png";
    const cat6 = "/img/Tabby.png";
    const cat7 = "/img/Tabby_Grey.png";
    const cat8 = "/img/Tuxedo.png";
    const cat9 = "/img/White.png";
    const cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9];
    let cat = Math.floor(Math.random() * 9);
    return cats[cat];
}

export const catImg = rdmCat();

