// main function javascript
$(document).ready(function() {
	$('#tosaveImg').click(savefileSystem);
	$('#tosaveTxt').click(saveinTxt)
	$('#tosaveCanvas').click(canvasToImage);
	$('#exportpdf').click(savedata);
	$('#tosavePdf').click(saveNotesPdf);
	saveTmp($('#mynotes').val());
	$('#sharenotes').click(sharemyNotes);
	$('#openNotes').change(loadFileAsText);
	$('#btnuploadNotes').click(simulateclicknotes);
});


function sharemyNotes(){
		try{
			var mynotes = document.getElementById('mynotes').value;
			var subject = "My Notes about Image: ";
			shareContent(subject, mynotes);			
		} catch(e) {
			alert("Error description: " + e.message);
		}
	}

function saveNotesPdf(){
	var pdf = new jsPDF();
	var regex = /(<([^>]+)>)/ig;
	var notes = $('#mynotes').val();
	pdf.text(20, 20, notes.replace(regex, ""));
	try {
		var inputFilename = 'MyNotes';
		if(inputFilename == "" || document.getElementById('mynotes').value=="") {	    			
			alert('Please, enter file name to save result in pdf and field notes is required')
		} else {
			pdf.save(inputFilename + ".pdf");
		}
	} catch(e){
		alert("Error description: " + e.message)
	}
}


  function saveTextAsFile(input, output) {
    			var textToWrite = input;
    			var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    			var fileNameToSaveAs = output;
    			var downloadLink = document.createElement("a");
    			downloadLink.download = fileNameToSaveAs;
    			downloadLink.innerHTML = "<a class='btn'>Download File</a>";
    			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    			downloadLink.onclick = destroyClickedElement;
    			downloadLink.style.display = "none";
    			document.body.appendChild(downloadLink);
    			downloadLink.click();
    			return [input, output];		
      }
      
  function destroyClickedElement(event) {
        	document.body.removeChild(event.target);
      }

	
	function savefileSystem() {
		try {
			var textToWrite = document.getElementById('mynotes').value;
			var contenutoSalvato = textToWrite;
			var fileNameToSaveAs = document.getElementById('inputsaveImg').value + ".html";
			if(contenutoSalvato == "" || fileNameToSaveAs == "") {
				alert("All fields is required");
			} else {
			  saveTextAsFile(contenutoSalvato, fileNameToSaveAs);
			}
		} catch(e) {
			 txt="There was an error on save.\n\n";
			 txt+="Error description: " + e.message + "\n\n";
			 txt+="Click OK to continue.\n\n";
			 alert(txt);
		}
	}
	
	function saveinTxt() {
		try {
			var textToWrite = document.getElementById('mynotes').value;
			var contenutoSalvato = textToWrite;
			var fileNameToSaveAs = document.getElementById('inputsaveImg').value + ".txt";
			if(contenutoSalvato == "" || fileNameToSaveAs == "") {
				alert("All fields is required");
			} else {
			  saveTextAsFile(contenutoSalvato, fileNameToSaveAs);
			}
		} catch(e) {
			 txt="There was an error on save.\n\n";
			 txt+="Error description: " + e.message + "\n\n";
			 txt+="Click OK to continue.\n\n";
			 alert(txt);
		}
		
	}
	
	
	function canvasToImage(){
		try {
  		  var link = document.getElementById("tosaveCanvas");
  			var nameFileimg = document.getElementById('inputsaveCanvas').value;
  			var canvas1 = document.getElementById('imageLayer');
  			var canvas2 = document.getElementById('drawLayer');
  			var canvas = document.getElementById("tempLayer");
  			var width = canvas1.width;
  			var height = canvas1.height;
  			canvas.width = width;
  			canvas.height = height;
  			var ctx = canvas.getContext('2d');
  			ctx.drawImage(canvas1, 0, 0);
  			ctx.drawImage(canvas2, 0, 0);
		    downloadCanvas(link, canvas, nameFileimg + ".png");
			} catch(e) {
				 txt="There was an error on save.\n\n";
				 txt+="Error description: " + e.message + "\n\n";
				 txt+="Click OK to continue.\n\n";
				 alert(txt);
			}
		}
	  function downloadCanvas(link, canvas, filename) {
      link.href = canvas.toDataURL();
      link.download = filename;
    }   
		function canvasToPdf(){
			try {
				var namefilepdf = 'DICOM-pdf';
				if(namefilepdf === "") {
					alert("Please, enter name of file to save dicom image in pdf");
				} else {
					var canvas1 = document.getElementById('imageLayer');
					var canvas2 = document.getElementById('drawLayer');
					var canvas = document.getElementById("tempLayer");
					var width = canvas1.width;
					var height = canvas1.height;
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext('2d');
					ctx.drawImage(canvas1, 0, 0);
					ctx.drawImage(canvas2, 0, 0);
					var imgData = canvas.toDataURL("image/jpeg", 1.0);
					var pdf = new jsPDF('p', 'pt', [width, height]);
					pdf.addImage(imgData, 'JPEG', 5, 5);
					pdf.save(namefilepdf + ".pdf");
				}				
			} catch(e){
				alert("Error description: " + e.message);
			}
		}
  function saveTmp(inputData) {
  	$(inputData).blur(function() {
  		localStorage.setItem('htmlData', this.value);
  	});
  		if (localStorage.getItem('htmlData')) {
  		inputData.value = localStorage.getItem('htmlData'); 
  	}
  }

	
  function loadFileAsText() {
  	var fileToLoad = document.getElementById("openNotes").files[0];
  	var fileReader = new FileReader();
  	fileReader.onload = function(fileLoadedEvent) {
  		var textFromFileLoaded = fileLoadedEvent.target.result;
  		document.getElementById('mynotes').value = textFromFileLoaded;
  	};
  	fileReader.readAsText(fileToLoad, "UTF-8");
  }
  function simulateclicknotes(){
  	document.getElementById("openNotes").click();
  }


  function shareContent(subject, content) {
      var a = "mailto:me@example.com?cc=myCCaddress@example.com&subject=" + escape(subject) + "&body=" + escape(content);
      window.location.href = a;
  }
  
  


