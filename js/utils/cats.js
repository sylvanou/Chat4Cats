export const rdmCat = () => {
    const cat1 = "http://image-cdn.neatoshop.com/styleimg/62464/none/darkgray/default/360960-19;1502479794i.jpg";
    const cat2 = "https://ih0.redbubble.net/image.120694437.1442/flat,800x800,075,f.u1.jpg";
    const cat3 = "https://ih1.redbubble.net/image.120695052.1766/flat,800x800,075,f.u1.jpg";
    const cat4 = "https://img.etsystatic.com/il/3d55ec/1238198642/il_570xN.1238198642_izuf.jpg";
    const cat5 = "https://ih0.redbubble.net/image.186261692.0061/flat,800x800,075,f.u3.jpg";
    const cat6 = "https://orig00.deviantart.net/8491/f/2015/047/5/7/kawaii_cat_png_pack_by_kawaiianimeneko2-d8i9sin.jpg";
    const cats = [cat1, cat2, cat3, cat4, cat5, cat6];
    let cat = Math.floor(Math.random() * 6);
    return cats[cat];
}
