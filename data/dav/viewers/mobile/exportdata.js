function savedata() {
		try {
			var textToWrite = document.getElementById('tags').innerHTML;
			var contenutoSalvato = textToWrite;
			var fileNameToSaveAs = 'Tags';
			if(contenutoSalvato == "" || fileNameToSaveAs == "") {
				alert("All fields is required");
			} else {
			  saveTextAsFile(contenutoSalvato, fileNameToSaveAs + ".html");
			}
		} catch(e) {
			 txt="There was an error on save.\n\n";
			 txt+="Error description: " + e.message + "\n\n";
			 txt+="Click OK to continue.\n\n";
			 alert(txt);
		}
		
	}