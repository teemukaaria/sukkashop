var Jimp = require('jimp');
var fs = require('fs');

const heros = ['hero-1.jpg', 'hero-2.jpg'];
const gallery = ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg'];
 
// hero images
for (let i = 0; i < heros.length; i++) {
  Jimp.read(`img/${heros[i]}`, (err, pic) => {
    if (err) throw err;
    pic
      .resize(1000, Jimp.AUTO)
      .quality(80)
      .write(`build/img/${heros[i]}`);
  });
}

// gallery images
for (let i = 0; i < gallery.length; i++) {
  Jimp.read(`img/${gallery[i]}`, (err, pic) => {
    if (err) throw err;
    pic
      .resize(600, Jimp.AUTO)
      .quality(80)
      .write(`build/img/${gallery[i]}`);
  });
}

// thread color images
fs.readdir("img/sock_models/colors", (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    Jimp.read(`img/sock_models/colors/${files[i]}`, (err, pic) => {
      if (err) throw err;
      pic
        .resize(300, Jimp.AUTO)
        .quality(80)
        .write(`build/img/sock_models/colors/${files[i]}`);
    });
  }
});

// model images
fs.readdir("img/sock_models", (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    if (!files[i].match(/.png$/)) continue;
    Jimp.read(`img/sock_models/${files[i]}`, (err, pic) => {
      if (err) throw err;
      pic
        .resize(600, Jimp.AUTO)
        .quality(80)
        .write(`build/img/sock_models/${files[i]}`);
    });
  }
});