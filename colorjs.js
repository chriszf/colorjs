var __avgcolorjs_buffer = document.createElement("canvas");

/*
 * Doesn't work because it doesn't wait for the image to finish downloading 
function analyze_color_from_url(url) {
    var img = document.createElement("img");
    img.src = image_url;
    return analyze_color(img);
}
*/

function analyze_color(img) {
    var ctx = __avgcolorjs_buffer.getContext("2d");
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
    var imgdata = ctx.getImageData(0,0, img.width, img.height);

    var avgcolor = [0, 0, 0];
    var numpixels = imgdata.width * imgdata.height;
    // Calculate average color
    var r,g,b;
    for (var i = 0; i < imgdata.width * imgdata.height * 4; i+=4) {
        r = imgdata.data[i];
        g = imgdata.data[i+1];
        b = imgdata.data[i+2];
        avgcolor[0] += r;
        avgcolor[1] += g;
        avgcolor[2] += b;
    }

    avgcolor[0] = avgcolor[0] / numpixels;
    avgcolor[1] = avgcolor[1] / numpixels;
    avgcolor[2] = avgcolor[2] / numpixels;

    var lum = 0.3 * avgcolor[0] + 0.59 * avgcolor[1] + 0.11 * avgcolor[2];
    
    r = Math.floor(avgcolor[0]);
    g = Math.floor(avgcolor[1]);
    b = Math.floor(avgcolor[2]);

    return {
        avg: avgcolor,
        color_style: "rgb(" + r + "," + g + ", " + b + ")",
        lum: lum
    };
}

