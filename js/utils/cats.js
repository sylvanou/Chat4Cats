export const rdmCat = () => {
    const cat1 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Black.png";
    const cat2 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Calico.png";
    const cat3 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Scottish_Fold.png";
    const cat4 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Siamese.png";
    const cat5 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Snowshoe.png";
    const cat6 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Tabby.png";
    const cat7 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Tabby_Grey.png";
    const cat8 = "http://sumbac.fvi-grad.com/Chat4Cats/img/Tuxedo.png";
    const cat9 = "http://sumbac.fvi-grad.com/Chat4Cats/img/White.png";
    const cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9];
    let cat = Math.floor(Math.random() * 9);
    return cats[cat];
}

export const catImg = rdmCat();

