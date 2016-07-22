//caesar functions
function validateC(t)
{ //make sure the number input for a caesar shift is within the range of the alphabet
	if(t>26 || t<-26 || !Number.isInteger(t))
	{return false;}
	return true;
}

function caesar()
{ //make a caesar shift
	which = "caesar";
	var number = document.getElementById("cnumber").value;
	var ct = document.getElementById("ciphertext").value;
	number = parseInt(number);
	if(validateC(number))
	{ //if the requested shift is within range, make the shift
		document.getElementById("message").innerHTML = "";
		document.getElementById("plaintext").value = "";
		ciphertext = new Array();
		plaintext = new Array();
		fillCTArray(ct);
		for(i=0; i<ciphertext.length; i++)
		{ //for each letter in the ciphertext, make the shift and add the new letter object to the plaintext array
			blank = createLetter();
			if(ciphertext[i].number == 99)
			{ //this is a special character, not a letter: do nothing to it
				blank = ciphertext[i];
			}
			else
			{ //is a letter
				j = ciphertext[i].number + number;
				blank.number = j;
				blank.value = alphabet(j);
			}
			plaintext.push(blank);
		}
		print(plaintext);
	}
	else //the shift number was invalid
	{ document.getElementById("message").innerHTML = "The shift number needs to be between -26 and 26"; }
}

function caesarSwitch()
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