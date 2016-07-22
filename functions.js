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
	document.getElementById("1").value="";
	document.getElementById("2").value="";
	document.getElementById("3").value="";
	document.getElementById("4").value="";
	document.getElementById("5").value="";
	document.getElementById("6").value="";
	document.getElementById("7").value="";
	document.getElementById("8").value="";
	document.getElementById("9").value="";
	document.getElementById("10").value="";
	document.getElementById("11").value="";
	document.getElementById("12").value="";
	document.getElementById("13").value="";
	document.getElementById("14").value="";
	document.getElementById("15").value="";
	document.getElementById("16").value="";
	document.getElementById("17").value="";
	document.getElementById("18").value="";
	document.getElementById("19").value="";
	document.getElementById("20").value="";
	document.getElementById("21").value="";
	document.getElementById("22").value="";
	document.getElementById("23").value="";
	document.getElementById("24").value="";
	document.getElementById("25").value="";
	document.getElementById("26").value="";
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
	if(n<=0) //in reverse, if past a, start again a z
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
{ //determine if data for switch exists, determine which switch to make
	if (which=="")
	{	document.getElementById("message").innerHTML = "You do not have a decryption scheme to switch."; }
	else if(which == "substitute")
	{	substituteSwitch();
		document.getElementById("ctlabel").innerHTML = "PlainText";
		document.getElementById("ptlabel").innerHTML = "CipherText"; }
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