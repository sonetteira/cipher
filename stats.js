//stats
function PlainCTArray(text)
{ //create an array of letter items for each character in the ciphertext
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

function showStats()
{ 
	var ct = document.getElementById("ciphertext").value;
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
	var table = "<table>";
	freq.sort(function(a,b) {return b.fq - a.fq;});
	for(h=0; h<freq.length; h++)
	{
		table += "<tr><td>" + freq[h].let + "</td><td>" + freq[h].fq + "</td></tr>";
	}
	table += "<tr><td>Total</td><td>" + len + "</td></tr></table>";
	table += "<p>Total (including special chars): " + ct.length + "</p>";
	document.getElementById("statistics").innerHTML = table;
}