function vigEncrypt()
{ //encrypt a message using a vigenere square
	which = "vigenere";
	error = false;
	var key = matchKeyLength();
	var ct = document.getElementById("ciphertext").value;
	document.getElementById("message").innerHTML = "";
	document.getElementById("plaintext").value = "";
	ciphertext = fillCTArray(ct);
	plaintext = new Array();
	keytext = fillCTArray(key);
	for(i=0; i<ciphertext.length; i++)
	{ //transform each letter in the ciphertext
		blank = createLetter();
		if(ciphertext[i].number == 99)
		{ //this is a special character, not a letter: do nothing to it
			blank = ciphertext[i];
		}
		else
		{ //is a letter
			blank.number = (ciphertext[i].number + keytext[i].number -1) % 26;
			blank.value = alphabet(blank.number);
		}
		plaintext.push(blank);
	}
	print(plaintext);
}

function vigDecrypt()
{
	which = "vigenere";
	error = false;
	var key = matchKeyLength();
	var ct = document.getElementById("ciphertext").value;
	document.getElementById("message").innerHTML = "";
	document.getElementById("plaintext").value = "";
	ciphertext = fillCTArray(ct);
	plaintext = new Array();
	keytext = fillCTArray(key);
	for(i=0; i<ciphertext.length; i++)
	{ //transform each letter in the ciphertext
		blank = createLetter();
		if(ciphertext[i].number == 99)
		{ //this is a special character, not a letter: do nothing to it
			blank = ciphertext[i];
		}
		else
		{ //is a letter
			blank.number = (ciphertext[i].number - keytext[i].number +27) % 26;
			blank.value = alphabet(blank.number);
		}
		plaintext.push(blank);
	}
	print(plaintext);
}

function matchKeyLength()
{ //expand or limit the key to match the number of letters in the plaintext
	var key = document.getElementById("vkey").value;
	var ct = document.getElementById("ciphertext").value;
	var newkey = "";
	if(key.length < ct.length) { //key is shorter than ciphertext
		x = ct.length/key.length;
		for(i=0; i<Math.floor(x); i++) {
			newkey = newkey + key;
		}
		x = ct.length%key.length;
		newkey = newkey + key.substr(0,x);
		return newkey;
	}
	if(ct.length < key.length) { //ciphertext is shorter than key
		return key.substr(0,ct.length);
	}
	return key;
}