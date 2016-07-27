//substution functions
function clearSubs()
{
	for(i=1; i<=26; i++)
	{ document.getElementById(i).value=""; }
	document.getElementById("substats").innerHTML="";
}

function buildSubs()
{
	var subs = new Array();
	for(i=1; i<=26; i++)
	{
		l = document.getElementById(i).value;
		if(l!="") //only if there is an entered value for the letter, if not, do nothing
		{
			n = betalpha(l);
			subs[i] = n;
			if(n==99)
			{ error=true; }
		}
	}
	return subs;
}

function validateSubs()
{ //if there was an invalid substitution
	return !error;
}

function substitute()
{ //substitute letters in the ciphertext according to input
	which = "substitute";
	error=false;
	document.getElementById("message").innerHTML = "";
	subs = buildSubs();
	if(validateSubs())
	{ //if all substitutions are valid
		var ct = document.getElementById("ciphertext").value;
		document.getElementById("message").innerHTML = "";
		document.getElementById("plaintext").value = "";
		ciphertext = new Array();
		plaintext = new Array();
		fillCTArray(ct);
		for(i=0; i<ciphertext.length; i++)
		{ //try to find substitutions for each letter in the ciphertext
			blank = createLetter();
			if(ciphertext[i].number == 99)
			{ //this is a special character, not a letter: do nothing to it
				blank = ciphertext[i];
			}
			else
			{ //is a letter
				j = ciphertext[i].number;
				if(subs[j] != undefined) //if there was an entry for this letter
				{
					blank.number = subs[j];
					blank.value = alphabet(subs[j]);
				}
				else //there was no substituion entered for this letter, make it a '-'
				{
					blank.number = 99;
					blank.value = '-';
				}
			}
			plaintext.push(blank);
		}
		print(plaintext);
		printSubStat(subs);
	}
	else //one of the substitutions was invalid
	{ document.getElementById("message").innerHTML = "Each substitution needs to be 1 letter only."; }
}

function substituteSwitch()
{
	subs = buildSubs();
	if(validateSubs())
	{
		for(j=1; j<=26; j++)
		{ document.getElementById(j).value = ""; }
		for(i=0; i<subs.length; i++)
		{ 
			n = subs[i];
			if(n != undefined)
			{
				l = alphabet(i);
				document.getElementById(n).value = l;
			}
		}
		/*document.getElementById("ciphertext").value = "";
		document.getElementById("plaintext").value = "";*/
	}
	else //one of the substitutions was invalid
	{ document.getElementById("message").innerHTML = "Each substitution needs to be 1 letter only."; }
}

function printSubStat(subs)
{ //print out statistics for the substitutions used
	ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	dup = false;
	stats = 'Letters you are using:<br><table>'
	for(i=0; i<13; i++)
	{
		stats += '<tr>'
		for(j=0; j<=1; j++)
		{
			k = ( j==0 ? i : i+13 );
			stats += '<td>' + ab[k] + '</td><td>';
			if(subs.indexOf(betalpha(ab[k])) != -1)
			{ //if a letter is being used as a substitution, give it a checkmark
				stats += '&#10003;';
			}
			stats += '</td>';
		}
		stats += '</tr>';
	}
	stats += '</table>';
	v = subs.sort();
	while(!dup)
	{ //if a letter is being used as a substitution more than once, print out an error message (only one message needed)
		for(m=0; m<subs.length; m++)
		{
			if(subs[m] == subs[m+1] && subs[m] != undefined)
			{ stats += '<br><span class="error">You are using a substitute<br> letter more than once!</span>';
				dup = true;}
		}
		break;
	}
	document.getElementById("substats").innerHTML = stats;
}