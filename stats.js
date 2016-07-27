//stats
function showStats()
{ //print out various statistics
	var ct = document.getElementById("ciphertext").value;
	output = "";
	//find letter frequencies
	freq = letterFreq(ct);
	output += "<table>";
	freq.sort(function(a,b) {return b.fq - a.fq;});
	for(h=0; h<freq.length/2; h++)
	{
		if( freq.length%2 == 0 )
		{ //even number
			h2 = h+freq.length/2;
		}
		else //odd number
		{
			h2 = h+Math.ceil(freq.length/2);
			freq.push({let: "", fq: ""}); //for the last cell
		}
		output += "<tr><td>" + freq[h].let + "</td><td>" + freq[h].fq + "</td><td>" + freq[h2].let + "</td><td>" + freq[h2].fq + "</td></tr>";
	}
	output += '<tr><td colspan="2">Total</td><td colspan="2">' + len + "</td></tr></table>";
	output += "<p>Total (including special chars): " + ct.length + "<br><br>";
	
	//find any series of 2,3,4 letters that repeat more than once
	minlength = 2; //minimum length of runs we want to locate
	maxlength = 4; //maximum length of runs we want to locate
	for(i=minlength; i<=maxlength; i++)
	{
		runs = new Array();
		if(ct.length >= (i*2))
		{
			runs = series(ct, i);
			if(runs.length > 0)
			{ //print out the runs
				output += 'Runs of ' + i + ": ";
				for(j=0; j<runs.length; j++)
				{
					output += runs[j];
					if(j+1<runs.length)
					{ output += ', '; }
					else { output += '<br>'; }
				}
			}
		}			
	}
	
	//find and print and doubles in the ciphertext
	pairs = new Array();
	pairs = doubles(ct);
	if(pairs.length > 0)
	{
		output += '<br>Pairs of letters: ';
		for(w=0; w<pairs.length; w++)
		{
			output += pairs[w];
			if(w+1<pairs.length)
			{ output += ', '; }
		}
	}
	
	//find any words consisting of a single letter
	wordsofone = singles(ct);
	if(wordsofone.length > 0)
	{
		output += '<br>One letter words: ';
		for(w=0; w<wordsofone.length; w++)
		{
			output += wordsofone[w];
			if(w+1<wordsofone.length)
			{ output += ', '; }
		}
	}
	
	//find any single letters occuring after an apostrophe
	sord = afterApos(ct);
	if(sord.length > 0)
	{
		output += "<br>Letters after apostrophe: ";
		for(w=0; w<sord.length; w++)
		{
			output += sord[w];
			if(w+1<sord.length)
			{ output += ', '; }
		}
	}
	
	//print all
	document.getElementById("statistics").innerHTML = output + '</p>';
}

function PlainCTArray(text)
{ //create an array of letters for each character in the ciphertext
	var pct = new Array();
	for(i=0; i<text.length; i++)
	{
		if(betalpha(text[i])!=99)
		{ //create an array of only text characters
			pct.push(text[i].toUpperCase());
		}
	}
	return pct;
}

function letterFreq(ct)
{ //count each letter
	pct = PlainCTArray(ct);
	len = pct.length;
	ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var freq = new Array();
	for(i=0; i<ab.length; i++)
	{
		f = 0;
		for(j=0; j<len; j++)
		{
			if(pct[j] == ab[i])
			{
				f++;
			}
		}
		if(f>0)
		{ //print out this line
			freq.push({let: ab[i], fq: f});
		}
	}
	return freq;
}

function series(ct, ln)
{ //find all the runs of length ln in the given text
	//make a list of all collections of the right length of characters
	potentials = new Array();
	for(k=0; (k+ln)<=ct.length; k++)
	{
		good = true;
		v = ct.slice(k, k+ln);
		for(n=0; n<ln; n++)
		{
			if(betalpha(v[n]) == 99)
			{ //one of these characters is not a letter, cannot be a run
				good = false;
			}
		}
		if(good)
		{ //all letters
			potentials.push(v);
		}
	}
	
	//order the list and check for duplicates, this should tell us if there is a series of characters that shows up more than once.
	list = potentials.sort();
	runs = [];
	freqs = [];
	results = [];
	prev = "";
	for(m=0; m<list.length; m++)
	{
		if(list[m] != prev)
		{
			runs.push(list[m]);
			freqs.push(1);
		}
		else
		{
			freqs[freqs.length-1]++;
		}
		prev = list[m];
	}
	
	for(n=0; n<runs.length; n++)
	{
		if(freqs[n] > 1)
		{ results.push(runs[n] + "(" + freqs[n] + ")"); }
	}
	return results;
}

function doubles(ct)
{ //find instances of double letters
	twos = [];
	for(k=0; (k+1)<=ct.length; k++)
	{
		a = ct[k];
		b = ct[k+1];
		if(betalpha(a) != 99 && a == b && twos.indexOf(a+a) == -1)
		{
			twos.push(a+a);
		}
	}
	return twos;
}

function singles(ct)
{ //find single letter words
	ones = [];
	for(k=0; (k+2)<ct.length; k++)
	{
		a = ct[k];
		b = ct[k+1];
		c = ct[k+2];
		if(k==0) //this is the first one
		{
			if( (betalpha(a) != 99 && ones.indexOf(a) == -1) //character is a letter, letter is not already listed
				&& (betalpha(b) == 99 && isNaN(parseInt(b))) ) //character to the right is non-numeric, non-alphabetic
			{ ones.push(a); }
		}
		else if(k+3 == ct.length) // this is the last one
		{
			if( (betalpha(c) != 99 && ones.indexOf(c) == -1) //character is a letter, letter is not already listed
				&& (betalpha(b) == 99 && isNaN(parseInt(b))) ) //character to the left is non-numeric, non-alphabetic
			{ ones.push(c); }
		}
		else
		{
			if( (betalpha(b) != 99 && ones.indexOf(b) == -1) //character is a letter, letter is not already listed
				&& (betalpha(a) == 99 && isNaN(parseInt(a))) && ( betalpha(c) == 99 && isNaN(parseInt(c))) //and character is surrounded by non-numeric, non-alphabetic characters
				&& (a != "'") ) //and the char to the left is not an apostrophe
			{ ones.push(b); }
		}
	}
	return ones;
}

function afterApos(ct)
{
	results = [];
	for(k=0; (k+2)<ct.length; k++)
	{
		a = ct[k];
		b = ct[k+1];
		c = ct[k+2];
		if( (a == "'") //a is an apostrophe
			&& (betalpha(b) != 99 && results.indexOf(b) == -1) //b is a letter and has not already been found
			&& (( betalpha(c) == 99 && isNaN(parseInt(c))) ) ) //c is a non-numeric, non-alphabetic
		{ results.push(b); }
	}
	return results;
}