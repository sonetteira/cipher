//general functions
function manualMenu()
{
	//show manual option, hide caesar option
	document.getElementById("manual").className = "";
	document.getElementById("caesar").className = "dontdisplay";
	which = "substitute";
}
function caesarMenu()
{
	//show caesar option, hide manual option
	document.getElementById("caesar").className = "";
	document.getElementById("manual").className = "dontdisplay";
	which = "caesar";
}


function clearAll()
{
	//hide all menus, clear input boxes
	which = "";
	document.getElementById("caesar").className = "dontdisplay";
	document.getElementById("manual").className = "dontdisplay";
	document.getElementById("ciphertext").value="";
	document.getElementById("plaintext").value="";
	document.getElementById("message").innerHTML="";
	document.getElementById("cnumber").value="";
	for(i=1; i<=26; i++)
	{ document.getElementById(i).value=""; }
	document.getElementById("substats").innerHTML = "";
	document.getElementById("statistics").innerHTML = "";
	document.getElementById("ctlabel").innerHTML = "CipherText";
	document.getElementById("ptlabel").innerHTML = "PlainText";
}

function alphabet(n)
{ //given a number, return the letter
	ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	if(n>26) //if past z, start again at a
	{
		n = n-26;
	}
	if(n<=0) //in reverse, if past a, start again at z
	{
		n = n+26;
	}
	return ab[n-1];
}

function betalpha(letter)
{ //given a letter, return a number
	letter = letter.toUpperCase();
	ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	num = ab.indexOf(letter);
	if(num == -1) //if the given character is not a letter, return 99
	{return 99;}
	return num+1;
}

function createLetter()
{
	//create a letter object with value (the letter) and number (its number in the alphabet)
	var letter = {
		value:'',
		number:0 };
	return letter;
}

function fillCTArray(text)
{ //create an array of letter items for each character in the ciphertext
	for(i=0; i<text.length; i++)
	{
		blank = createLetter();
		blank.value = text[i];
		blank.number = betalpha(text[i]);
		ciphertext.push(blank);
	}
}

function print(product)
{ //arrange the value of letters in the plaintext into a string and print it in the plaintext textbox
	text = "";
	for(i=0; i<product.length; i++)
	{
		text = text.concat(product[i].value);
	}
	document.getElementById("plaintext").value = text;
}

function DEswitch()
{ //reverse the decryption scheme to encrypt text in the same way as the original ciphertext
	//determine if data for switch exists, determine which switch to make
	if (which=="")
	{	document.getElementById("message").innerHTML = "You do not have a decryption scheme to switch."; }
	else if(which == "substitute")
	{	substituteSwitch();
		document.getElementById("ctlabel").innerHTML = "PlainText";
		document.getElementById("ptlabel").innerHTML = "CipherText";
		document.getElementById("substats").innerHTML = "";}
	else if(which == "caesar")
	{	caesarSwitch();
		document.getElementById("ctlabel").innerHTML = "PlainText";
		document.getElementById("ptlabel").innerHTML = "CipherText"; }
}

function rightToLeft()
{ //copy text from right textbox into left textbox, clear left textbox
	document.getElementById("ciphertext").value = document.getElementById("plaintext").value;
	document.getElementById("plaintext").value = "";
}

function blocksFive()
{ //arrange text in right textbox into groups of 5 characters, remove non alphabet characters
	//retreive text to be altered
	text = document.getElementById("plaintext").value;
	//remove all non alphabet characters
	text1 = text.split("");
	for(i=0; i<text1.length; i++)
	{
		if(betalpha(text1[i]) == 99)
		{ //character is not a letter, remove
			text1.splice(i, 1);
			i--;
		}
		if((i+1)%6==0) //multiple of 6, add a space
		{
			text1.splice(i, 0, ' ');
			i++;
		}
	}
	//print out new text
	newtext = "";
	for(i=0; i<text1.length; i++)
	{
		newtext = newtext.concat(text1[i]);
	}
	document.getElementById("plaintext").value = newtext;
}

function randomAB()
{ //create a randomized substitution alphabet
	manualMenu();
	var rab = new Array();
	for(i=1; i<=26; i++)
	{ //create an array of integers 1 to 26
		rab.push(i);
	}
	rab = shuffle(rab); //randomize
	for(i=0; i<26; i++)
	{ //print associated letters
		document.getElementById(i+1).value = alphabet(rab[i]);
	}
}

function shuffle(array) 
{ //Fisher-Yates Snuffle https://raw.githubusercontent.com/coolaj86/knuth-shuffle/master/index.js
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex)
	{
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}