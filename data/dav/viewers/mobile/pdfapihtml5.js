/**
 * === PDFAPI HTML5 JS  ===
 * Contributors for this file: UlmDesign - Francesco De Stefano
 * Tags: html5, pdf, hybrid apps, API filesystem, JavaScript, PDF Web Applications
 * Release: 1.1.2 - 2015 UlmDesign - http://mediamaster.eu
 * License: GPL 3.0 or later 
 * License: URI: http://www.gnu.org/copyleft/gpl.html
 * Description: Export image, html, text, canvas and svg in pdf and in others formats for Web Apps
 * This mini library should necessarily include: 
 * - Download jsdpdf.debug.js from https://github.com/MrRio/jsPDF 
 * - Download canvg project from https://code.google.com/p/canvg/
 * - Download html2canvas project from http://html2canvas.hertzen.com/
 * 
 * */
// library fn
function fndroidPdf(sel, mtop, mbottom, mleft, w) {
    var docpdf = new jsPDF('p', 'pt', 'letter'),
        source = document.getElementById(sel),
        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        }
    margins = {
        top: mtop,
        bottom: mbottom,
        left: mleft,
        width: w
    };
    docpdf.fromHTML(
    source, margins.left, margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        try {
            var inputFilename = prompt('Enter file name to convert and to save file in pdf in your external storage');
            if (inputFilename === "") {
                alert("You must enter name of file to save content in pdf");
            } else {
                docpdf.save(inputFilename + ".pdf")
            }
        } catch (e) {
            txt = "There was an error on save.\n\n";
            txt += "Error description: " + e.message + "\n\n";
            txt += "Click OK to continue.\n\n";
            alert(txt);
        }

    },
    margins)
};

function iframePdf(sel, mtop, mbottom, mleft, w) {
    var docpdf = new jsPDF('p', 'pt', 'letter'),
        source = document.getElementById(sel).contentWindow.document.body,
        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        }
    margins = {
        top: mtop,
        bottom: mbottom,
        left: mleft,
        width: w
    };
    docpdf.fromHTML(
    source, margins.left, margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        try {
            var inputFilename = prompt('Enter file name to convert and to save file in pdf in your external storage');
            if (inputFilename === "") {
                alert("You must enter name of file to save content in pdf");
            } else {
                docpdf.save(inputFilename + ".pdf")
            }
        } catch (e) {
            txt = "There was an error on save.\n\n";
            txt += "Error description: " + e.message + "\n\n";
            txt += "Click OK to continue.\n\n";
            alert(txt);
        }

    },
    margins)
};

//library fn
function fntxtpdf(titledoc, subjectdoc, authordoc, keywordsdoc, creatordoc, callbackfn, font, fontype, fontsize, orientation, unitmeasure, q1, q2) {
    var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
    pdfdoc.setProperties({
        title: titledoc,
        subject: subjectdoc,
        author: authordoc,
        keywords: keywordsdoc,
        creator: creatordoc
    });
    pdfdoc.setFont(font);
    pdfdoc.setFontType(fontype);
    pdfdoc.setFontSize(fontsize)
    pdfdoc.text(20, 20, callbackfn);
    try {
        var inputFilename = prompt("Enter file name to save");
        if (inputFilename === "") {
            alert("You must enter name of the file to save content in pdf");
        } else {
            pdfdoc.save(inputFilename + ".pdf");
        }
    } catch (e) {
        alert("Error description: " + e.message)
    }

};


// library fn
function fnformpdf(callback, titleform, font, fontype, fontsize, orientation, unitmeasure, q1, q2) {
    var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
    pdfdoc.setFont(font);
    pdfdoc.setFontType(fontype);
    pdfdoc.setFontSize(fontsize);
    pdfdoc.text(20, 20, titleform);
    pdfdoc.text(20, 30, callback);
    try {
        var inputFilename = prompt("Enter file name to save");
        if (inputFilename === "") {
            alert("You must enter name of folder and file to save content form in pdf");
        } else {
            pdfdoc.save(inputFilename + ".pdf");
        }
    } catch (e) {
        alert("Error description: " + e.message)
    }
};


// library fn
function saveimagePdf(selimage, orientation, unitmeasure, q1, q2, m1, m2) {
    try {
        var canvas = document.createElement("canvas");
        canvas.style.backgroundColor = "#fff";
        var ctx = canvas.getContext('2d');
        var image = document.getElementById(selimage);
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);
        var inputFilename = prompt("Enter file name to save");
        if (inputFilename === "") {
            alert("You must enter name of folder and file to save image in pdf");
        } else {
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
            pdfdoc.addImage(imgData, 'JPEG', m1, m2);
            pdfdoc.save(inputFilename + ".pdf");
        }
    } catch (e) {
        alert("Error description: " + e.message);
    }
};


// library fn
function savecanvasPdf(canvasId, orientation, unitmeasure, q1, q2, m1, m2) {
    try {
        var inputFilename = prompt("Enter file name to save");
        if (inputFilename === "") {
            alert("You must enter name of file to save image in pdf");
        } else {
            var canvas = document.getElementById(canvasId);
            var ctx = canvas.getContext('2d');
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
            pdfdoc.addImage(imgData, 'JPEG', m1, m2);
            pdfdoc.save(inputFilename + ".pdf");
        }
    } catch (e) {
        alert("Error description: " + e.message);
    }
};

// library fn
function savesvgPdf(svgid, orientation, unitmeasure, q1, q2, m1, m2) {
    try {
        var markupxml = document.getElementById(svgid);
        var strxml = markupxml.outerHTML;
        var inputFilename = prompt("Enter file name to save");
        if (inputFilename === "") {
            alert("You must enter name of folder and file to save svg in pdf");
        } else {
            var canvasvg = document.createElement("canvas");
            var ctx = canvasvg.getContext('2d');
            ctx.fillStyle = "#FFF";
            canvg(canvasvg, strxml);
            var imgData = canvasvg.toDataURL("image/jpeg", 1.0);
            var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
            pdfdoc.addImage(imgData, 'JPEG', m1, m2);
            pdfdoc.save(inputFilename + ".pdf");
        }
    } catch (e) {
        alert("Error description: " + e.message);
    }

};
// library fn
function imageConverter(imgid, link, ext) {
    var inputFilename = prompt("Enter file name to save");
    if (inputFilename === "") {
        alert("You must enter name of file to save image in " + ext);
    } else {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var image = document.getElementById(imgid);
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);
        downloadCanvas(link, canvas, inputFilename + "." + ext)
    }
};

// library fn
function canvastoImg(canvasid, link, ext) {
    var inputFilename = prompt("Enter file name to save");
    if (inputFilename === "") {
        alert("You must enter name of file to save image in " + ext);
    } else {
        var img = document.createElement("img");
        var canvas = document.getElementById(canvasid);
        var ctx = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;
        img.naturalWidth = w;
        img.naturalHeight = h;
        img.src = canvas.toDataURL();
        ctx.drawImage(img, 0, 0);
        downloadCanvas(link, canvas, inputFilename + "." + ext);
    }
};
// library fn	
function svgImg(svgid, link, ext) {
    var inputFilename = prompt("Enter file name to save");
    if (inputFilename === "") {
        alert("You must enter name of folder and file to save image in " + ext);
    } else {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var svg = document.getElementById(svgid);
        var strxml = svg.outerHTML;
        canvg(canvas, strxml);
        var dataUrl = canvas.toDataURL();
        downloadCanvas(link, canvas, inputFilename + "." + ext);
    }
};

// library fn
function HTMLPDFimg(idhtml, orientation, unitmeasure, q1, q2, m1, m2) {
    try {
        html2canvas(document.getElementById(idhtml), {
            onrendered: function (canvas) {
                try {
                    var inputFilename = prompt("Enter file name to save");
                    if (inputFilename === "") {
                        alert("You must enter name of file")
                    } else {
                        var dataUrl = canvas.toDataURL("image/png");
                        var pdfdoc = new jsPDF(orientation, unitmeasure, [q1, q2]);
                        pdfdoc.addImage(dataUrl, 'JPEG', m1, m2);
                        pdfdoc.save(inputFilename + ".pdf")
                    }
                } catch (e) {
                    alert("Error Description: " + e.message);
                }
            }
        });
    } catch (e) {
        alert("Error Description: " + e.message);
    }
};

// library fn
function exportHTMLImg(idhtml, link, ext) {
    html2canvas(document.getElementById(idhtml), {
        onrendered: function (canvas) {
            var inputFilename = prompt("Enter file name to save");
            if (inputFilename === "") {
                alert("You must enter name of file")
            } else {
                downloadCanvas(link, canvas, inputFilename + "." + ext);
            }
        }
    });
};

// library fn
function sumvalues() {
    for (var i = 0, result = ""; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

function downloadCanvas(link, canvas, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
}

function styleDropzone(zonaDrop) {
    var style = "min-height: 300px; max-width: 100%; padding: 15px; border: 4px dashed #d3d3d3; display:block; margin: 0 auto; border-radius:10px; text-align:center";
    zonaDrop.setAttribute("style", style);
    return style;
}

function dragdropPDF(zonaDrop) {
    var style = "min-height: 300px; max-width: 100%; padding: 15px; border: 4px dashed #d3d3d3; display:block; margin: 0 auto; border-radius:10px; border-color:#333; background: #ddd; text-align:center";
    zonaDrop.addEventListener("dragover", function (e) {
        e.preventDefault();
        zonaDrop.setAttribute("style", style);
    }, false);
    zonaDrop.addEventListener("drop", function (e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        var fileCount = files.length;
        var i;
        if (fileCount > 0) {
            for (i = 0; i < fileCount; i = i + 1) {
                var file = files[i];
                var name = file.name;
                var size = bytesToSize(file.size);
                var type = file.type;
                var lastModified = file.lastModifiedDate;
                var reader = new FileReader();
                var ext = name.split(".")[1];
                var styledef = "min-height: 300px; max-width: 100%; padding: 15px; border: 4px dashed #d3d3d3; display:block; margin: 0 auto; border-radius:10px; text-align:center";
                zonaDrop.setAttribute("style", styledef);
                var progress = document.createElement("progress");
                progress.max = "100";
                var loader = document.createElement("div");
                loader.appendChild(progress);
                zonaDrop.appendChild(loader);
                reader.onload = function (e) {
                    if (ext.toLowerCase() != "pdf") {
                        zonaDrop.innerHTML = "That doesn't appear to be an PDF file. <hr/>";
                    } else {
                        loader.innerHTML = "";
                        zonaDrop.innerHTML += '<div><object data="' + e.target.result.replace('data:binary/octet-stream', 'data:application/pdf') + '" width="100%" height="auto" ></object></br>' + name + ', ' + type + ', ' + lastModified + ', ' + size + ' bytes <br/> <a data-role="button" data-ajax="false" href="' + e.target.result.replace('data:binary/octet-stream', 'data:application/pdf') + '" target="_blank">Full Screen</a><hr/></div>';

                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }, false);
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


function pdfFilesystem(resultZone) {
    resultZone.insertAdjacentHTML('afterend', "<input style='margin-top:10px; visibility:collapse; width:0px;' id='getfilepdf' type='file'/>");
    resultZone.insertAdjacentHTML('afterend', '<button id="openpdf">Open PDF</button>');
    var inputfile = document.getElementById("getfilepdf"),
        btnopen = document.getElementById("openpdf");
    btnopen.addEventListener("click", simulateclick, false);

    function simulateclick() {
        inputfile.click();
    }
    inputfile.addEventListener("change", function (e) {
        e.preventDefault();
        var files = e.target.files;
        var fileCount = files.length;
        var i;
        if (fileCount > 0) {
            for (i = 0; i < fileCount; i = i + 1) {
                var file = files[i];
                var name = file.name;
                var size = bytesToSize(file.size);
                var type = file.type;
                var lastModified = file.lastModifiedDate;
                var ext = name.split(".")[1];
                var reader = new FileReader();
                var progress = document.createElement("progress");
                progress.max = "100";
                var loader = document.createElement("div");
                loader.appendChild(progress);
                resultZone.appendChild(loader);
                reader.onload = function (e) {
                    if (ext.toLowerCase() != "pdf") {
                        resultZone.innerHTML = "That doesn't appear to be an PDF file. <hr/>";
                    } else {
                        loader.innerHTML = "";
                        resultZone.innerHTML += '<div><object data="' + e.target.result.replace('data:binary/octet-stream', 'data:application/pdf') + '" width="100%" height="auto" ></object></br>' + name + ', ' + type + ', ' + lastModified + ', ' + size + ' bytes <br/> <a data-role="button" data-ajax="false" href="' + e.target.result.replace('data:binary/octet-stream', 'data:application/pdf') + '" target="_blank">Full Screen</a><hr/></div>';
                    }
                };
                reader.readAsDataURL(file);
            }
        }

    }, false);

}