//matrix functions
function dims()
{
	var rows = document.getElementById("numrows").value;
	var cols = document.getElementById("numcols").value;
	var matrix = '<table>';
	rows = parseInt(rows);
	cols = parseInt(cols);
	matrix += '<input type="hidden" id="columns" value="' + cols + '"/>';
	matrix += '<input type="hidden" id="rows" value="' + rows + '"/>';
	matrix += '<tr><td></td>';
	for(k=1; k<=cols; k++)
		matrix += '<td><input id="x' + k + '" type="number" min="1" max="' + cols + '"></input></td>';
	matrix += '</tr>';
	for(i=1; i<=rows; i++)
	{
		matrix += '<tr><td><input id="y' + i + '" type="number" min="1" max="' + rows + '"></input></td>';
		for(j=1; j<=cols; j++)
		{
			matrix += '<td><input id="' + j + ',' + i + '" type="text" maxlength="1"></input></td>'
		}
		matrix += '</tr>';
	}
	matrix += '</table>';
	document.getElementById("matrix").className = "";
	document.getElementById("ask").className = "dontdisplay";
	document.getElementById("grid").innerHTML = matrix;
}

function transpose()
{
	var cols = document.getElementById("columns").value;
	var rows = document.getElementById("rows").value;
	if(validatePos())
	{
		document.getElementById("message").innerHTML = "";
		var ciphertext = "";
		var t;
		var x=1,y=1,i=0,j=0;
		for(l=0; l<cols; l++)
		{
			//for each column
			y=1;
			i=0;
			do{
				i++;
				t = 'x'+i.toString();
			}while(document.getElementById(t).value != x.toString());
			//i contains current column
			for(k=0; k<rows; k++)
			{
				//for each row
				j=0;
				do{
					j++;
					t = 'y'+j.toString();
				}while(document.getElementById(t).value != y.toString());
				//j contains current row
				t = i.toString() + ',' + j.toString();
				ciphertext += document.getElementById(t).value;
				y++;
			}
			x++;
		}
		document.getElementById("ciphertext").innerHTML = ciphertext.toUpperCase();
	}
	else {
		document.getElementById("message").innerHTML = "Not all of your inputs are valid.";
	}
}
function validatePos()
{
	//make sure that each of the input positions is within range and not a repeat
	var cols = document.getElementById("columns").value;
	var rows = document.getElementById("rows").value;
	var x = new Array();
	var y = new Array();
	var t;
	var good = true;
	//build arrays of values to validate
	for(i=1; i<=cols; i++)
	{
		t = 'x'+i.toString();
		x[i-1] = document.getElementById(t).value;
	}
	for(i=1; i<=rows; i++)
	{
		t = 'y'+i.toString();
		y[i-1] = document.getElementById(t).value;
	}
	
	//all are within range
	for(i=0; i<x.length; i++)
	{
		r = parseInt(x[i]);
		if(r>cols || r<1)
			good = false;
	}
	for(i=0; i<y.length; i++)
	{
		r = parseInt(y[i]);
		if(r>rows || r<1)
			good = false;
	}
	
	//no duplicates
	x.sort();
	y.sort();
	for(i=0; i<x.length-1; i++)
	{
		if(x[i] == x[i+1])
			good = false;
	}
	for(i=0; i<y.length-1; i++)
	{
		if(y[i] == y[i+1])
			good = false;
	}
	
	return good;
}