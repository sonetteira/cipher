//shift key functions
function validateC(keys)
{ //make sure the key input for a shift is within the range of the alphabet
	var good = true;
	for(i=0; i<keys.length; i++)
	{
		t = keys[i];
		if(t>26 || t<-26 || !Number.isInteger(t))
		{good = false;}
	}
	return good;
}

function keyShift()
{ //make a key shift
    document.getElementById("message").innerHTML = "here";
	which = "key";
	var key = document.getElementById("skey").value;
	var ct = document.getElementById("ciphertext").value;
	var keys = key.split(" ");
	for(m=0; m<keys.length; m++)
		keys[m] = parseInt(keys[m]);
	if(validateC(keys))
	{ //if the requested shift is valid, make the shift
		document.getElementById("message").innerHTML = "";
		document.getElementById("plaintext").value = "";
		ciphertext = new Array();
		plaintext = new Array();
		fillCTArray(ct);
		var k=0;
		for(i=0; i<ciphertext.length; i++)
		{ //for each letter in the ciphertext, make the shift and add the new letter object to the plaintext array
			blank = createLetter();
			if(ciphertext[i].number == 99)
			{ //this is a special character, not a letter: do nothing to it
				blank = ciphertext[i];
			}
			else
			{ //is a letter
				j = ciphertext[i].number + keys[k++];
				blank.number = j;
				blank.value = alphabet(j);
			}
			plaintext.push(blank);
			if(k == keys.length)
				k = 0;
		}
		print(plaintext);
	}
	else //the shift number was invalid
	{ document.getElementById("message").innerHTML = "The shift numbers need to be between -26 and 26"; }
}

function keySwitch()
{
	var number = document.getElementById("cnumber").value; //get the number from the 
	var newNumber;
	number = parseInt(number);
	if(validateC(number))
	{ //calculate a new number (positive), replace cnumber with it
		if(number > 0) //positive
		{ newNumber = 26 - number; }
		else //negative
		{ newNumber = -number; }
		document.getElementById("cnumber").value = newNumber;
		/*document.getElementById("ciphertext").value = "";
		document.getElementById("plaintext").value = "";*/
	}
	else //the shift number was invalid
	{ document.getElementById("message").innerHTML = "The shift number needs to be between -26 and 26"; }
}