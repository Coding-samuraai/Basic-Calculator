//STACK
class Stack
{
  constructor()
  {
    this.arr=[];
    this.top=-1;
  }

  Push(x)
  {
    this.arr.push(x);
    this.top+=1;
  }

  Pop()
  {
    if(this.top==-1)
    return;

    this.arr.pop();
    this.top-=1;
  }

  Top()
  {
    if(this.top==-1)
    return -1;

    return this.arr[this.top];
  }

  Size()
  {
    return this.arr.length;
  }

  isEmpty()
  {
    return (this.top==-1)
  }
};
//Selecting Calc-Display
let onDisplay=document.querySelector('.on-display');

//Event listener for keyboard use
document.addEventListener('keydown',function(event){
  let curr=event.key;

  let text=onDisplay.innerText;

  if(curr==='Delete')
  onDisplay.innerText="";
  else if(curr==='Backspace' && text.length>0)
  onDisplay.innerText=text.slice(0,text.length-1);
  else if((curr>='0' && curr<='9') || (curr==='.'))
  onDisplay.innerText+=curr;
  else if((curr==='+' || curr==='-' || curr==='/' || curr==='*'))
  {
    if(text[text.length-1]==='+' || text[text.length-1]==='-' || text[text.length-1]==='/' || text[text.length-1]==='*')
    {
      text=text.slice(0,text.length-1);
      text+=curr;
      onDisplay.innerText=text;
    }
    else
    onDisplay.innerText+=curr;
  }
  else if(curr==='Enter')
  {
    if(onDisplay.innerText!='')
    onDisplay.innerText=solve(onDisplay.innerText);
  }
});
//Event listener for Touch
let allButtons=[];

allButtons=document.querySelectorAll('.button');
for(let it=0;it<allButtons.length;it++)
allButtons[it].addEventListener('click',onClick);

allButtons=document.querySelectorAll('.button-long');
for(let it=0;it<allButtons.length;it++)
allButtons[it].addEventListener('click',onClick);

function onClick(event)
{
  let curr=event.target.innerText;
  
  if(curr==='x')
    curr='*';
  
  let text=onDisplay.innerText;

  if(curr==='RESET')
  onDisplay.innerText="";
  else if(curr==='DEL' && text.length>0)
  onDisplay.innerText=text.slice(0,text.length-1);
  else if((curr>='0' && curr<='9') || (curr==='.'))
  onDisplay.innerText+=curr;
  else if((curr==='+' || curr==='-' || curr==='/' || curr==='*'))
  {
    if(text[text.length-1]==='+' || text[text.length-1]==='-' || text[text.length-1]==='/' || text[text.length-1]==='*')
    {
      text=text.slice(0,text.length-1);
      text+=curr;
      onDisplay.innerText=text;
    }
    else
    onDisplay.innerText+=curr;
  }
  else if(curr==='=')
  {
    if(onDisplay.innerText!='')
    onDisplay.innerText=solve(onDisplay.innerText);
  }
}

//solve an expression
function solve(expression)
{
  console.log(expression);
  let postFix=inFixToPostFix(expression);
  console.log(postFix);
  return solvePostFix(postFix);
}
//Convert InFixToPostFix
function inFixToPostFix(expression)
{
  let st=new Stack();

  let n=expression.length;

  let res='',i=0;

  while(i<n)
  {
    if((expression[i]>='0' && expression[i]<='9') || (expression[i]==='.'))
    {
      while(i<n && ((expression[i]>='0' && expression[i]<='9') || (expression[i]==='.')))
      {
        res+=expression[i];
        i++;
      }

      res+='$';
    }
    else
    {
      while(!st.isEmpty() && precedence(st.Top())>=precedence(expression[i]))
      {
        res+=st.Top();
        st.Pop();
      }

      st.Push(expression[i]);
      i++;
    }
  }

  while(!st.isEmpty())
  {
    res+=st.Top();
    st.Pop();
  }

  return res;

}

//Solves PostFix expression
function precedence(x)
{
  if(x==='+' || x==='-')
  return 1;
  if(x==='/' || x==='*')
  return 2;
}

function solvePostFix(postFix)
{
  let st=new Stack();
  let i=0;

  while(i<postFix.length)
  {
    if((postFix[i]>='0' && postFix[i]<='9') || (postFix[i]==='.'))
    {
      let number='';
      while(postFix[i]!='$')
      {
        number+=postFix[i];
        i++;
      }

      st.Push(Number(number));
    }
    else
    {
      let num1=st.Top();
      st.Pop();

      let num2=st.Top();
      st.Pop();

      switch(postFix[i])
      {
        case '+':num1=num2+num1;
        break;
        case '-':num1=num2-num1;
        break;
        case '/':num1=num2/num1;
        break;
        case '*':num1=num2*num1;
        break;
      }
      st.Push(num1);
    }
    i++;
  }
  return st.Top();
}
