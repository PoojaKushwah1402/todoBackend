var i=0;
var todoarr=[];
var cmparr=[];
var remarr=[];
newtodo('pooja');
newtodo('saroj');

function ifchecked(divid)
{
  var x= document.getElementById(divid).checked;
  return x;
}

function comparry()
{
  var flag=1;

  
   for(var y=0;y<todoarr.length;y++)
   { 
  

       var x=ifchecked('checkboxround'+y);
       if(x==true)
       {   todoarr[y].complete=true;
          var i=todoarr[y];
          for(z=0;z<cmparr.length;z++)
            {
           if(todoarr[y].id == cmparr[z].id)
              {
               flag=0;
              }
            }
           if(flag==0)
            {
             flag=1;
            }
          else
          {
           cmparr.push(i);
           }
   
      }


    else
    {
    //remarr.push(i);
   
        var i=todoarr[y];
        for(z=0;z<remarr.length;z++)
        {
         if(todoarr[y].id == remarr[z].id)
         {
           flag=0;
          }
          }
         if(flag==0)
         {
          flag=1;
         }
          else
         {
           remarr.push(i);
          
         }

      } 

   }
 

}




function completed()
{ 
  comparry();
  var flag=0;
  for(var i=0;i<todoarr.length;i++)
  {
    for(j=0;j<cmparr.length;j++)
    {
     if(todoarr[i]==cmparr[j])
     {
      flag=1;
      break;
     }
    }
    if(flag==1)
    {
      flag=0;
      var id= todoarr[i].id;
      document.getElementById(id).style.display="block";
    }
    else
    { var id= todoarr[i].id;
      document.getElementById(id).style.display="none";
    }
  }
  
  itemleft(cmparr);

}



function active()
{  comparry();
   var flag=0;
  for(var i=0;i<todoarr.length;i++)
  {
    for(j=0;j<remarr.length;j++)
    {
     if(todoarr[i]==remarr[j])
     {
      flag=1;
      break;
     }
    }
    if(flag==0)
    {
      var id= todoarr[i].id;
      document.getElementById(id).style.display="none";
      
    }
    else
    { 
      flag=0;
      var id= todoarr[i].id;
      document.getElementById(id).style.display="block";
    }
  }
  itemleft(remarr);
}


function showAll() {
 for(var i=0;i<todoarr.length;i++)
 {
  var id= todoarr[i].id;
  document.getElementById(id).style.display="block";
 }
 itemleft(todoarr);
}


function complete_array()
{
  for(var i=0;i<cmparr.length;i++)
  {
    var id=cmparr[i].id;
    document.getElementById(id).style.display="none";
     
  }
   cmparr=[];
   todoarr=remarr;
   itemleft(todoarr);


  /* 
   for(var j=0;j<todoarr.length;j++)
     {
       if(todoarr[j] == cmparr[i])
       {
        for(k=j;k<todoarr.length;k++)
        {
          todoarr[k]=todoarr[k+1];
          break;
        }
        
       }
     }
  */
}




















function run(e)
 {
   if(e.keyCode==13)
   {
   	var name= document.getElementById("myInput").value;
   	
   	   if(name=="")
   	   {}

       else
       {
   	      newtodo(name);
         document.getElementById("myInput").value=null; 
       }
   }
}





function newtodo(todo)
{
   var x = new create(todo);
   todoarr.push(x);
   
   var newdiv= creatediv(todo);
   
   itemleft(todoarr);
   
   }





function itemleft(arry){

  if(arry.length != 0)
    {
      document.getElementById("first").style.display="block";
    }

    itemsprint(arry);

}






function creatediv(todo)
{var k= i-1;
  var newdiv = document.createElement('div');
  newdiv.className = 'injs';
  newdiv.id=  todo + k;
   newdiv.textContent = todo ;


   var parent = document.getElementById('listItem');
   var input = document.createElement('input');
   input.type = "checkbox";
   input.className='checkboxround';
   input.id='checkboxround'+ k;
   
   
   //input.textContent=todo;
   /*var label = document.createElement("LABEL");
   label.htmlFor="check"
   label.textContent = "todo";
*/
/*
  var x = document.createElement("LABEL");
 console.log(x);
  x.htmlFor="check"
  x.textContent = todo;
  input.appendChild(x);
   console.log(input);
 // var t = document.createTextNode(todo);
 // x.setAttribute("for", "check");
 // x.appendChild(t);

*/





   parent.appendChild(newdiv);

   newdiv.appendChild(input);
  return newdiv;
}






function itemsprint(arry)
{
	var x=arry.length;
	document.getElementById('second').innerHTML= x + " Item Left" 
}





function create(name)
{
   	var id;
   	var todoname;
   	var complete;
      //remarrindex.push(i);
   	  this.todoname=name;
   	  this.id=name + i++;
   	  this.complete=false; 
}
