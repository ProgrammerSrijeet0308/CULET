files=
[
	[Math02,Math03,Math04,Math05,Math06,Math07,Math08,Math09]
]
Qns=[]
Options=[]
CorrOpts=[]
availQns=[]
for(i=0;i<files.length;i++)
{
	availQns.push([])
	for(j=0;j<files[i].length;j++)
	{
		availQns[i].push([])
		for(k=0;k<files[i][j].length;k++)
			availQns[i][j].push(k)
	}
}
for(i=0;i<30;i++)
{
	n=Math.floor(Math.random()*files.length)
	file=files[n]
	m=Math.floor(Math.random()*file.length)
	subtopic=file[m]
	o=Math.floor(Math.random()*availQns[n][m].length)
	qnEntry= files[n][m][availQns[n][m][o]]
	Qns.push(qnEntry.question)
	Options.push(qnEntry.options)
	CorrOpts.push(qnEntry.correct_answer)
	availQns[n][m].splice(o, 1)
}


start=document.querySelector("#Start")
stop=document.querySelector("#Stop")
select=document.querySelector("#Select")

hour= document.querySelector("#hour")
min= document.querySelector("#min")
sec= document.querySelector("#sec")

number= document.querySelector("#Number")
text= document.querySelector("#Text")
res= document.querySelector("#Result")
qns=[]
selected=[]
for(i=1;i<31;i++)
{
	qns.push(document.querySelector("#qn"+i))
	selected.push(0)
}

currQn=1
currOpt=0

opts=[]
optTexts=[]
for(i=1;i<6;i++)
{
	opts.push(document.querySelector("#op"+i))
	optTexts.push(document.querySelector("#op"+i+"text"))
}

function end() {
	cor=[]
	incor=[]
	unatt=[]
	for(i=0;i<30;i++)
	{
		if(selected[i]==0)
			unatt.push(i)
		else if(selected[i]==CorrOpts[i])
		{
			cor.push(i)
		}
		else
			incor.push(i)
	}
	txt="Correct: "+(cor.length)+" Incorrect: "+(incor.length)+" Score: "+(cor.length-0.25*incor.length)+"<br> Correct: "+cor +"<br> Incorrect: "+incor+"<br> Not-Attempted: "+unatt
	res.innerHTML=txt
}

start.addEventListener("click",function(){
	setInterval(function(){
		hour_i=hour.innerHTML
		min_i=min.innerHTML
		sec_i=sec.innerHTML
		if(parseInt(sec_i)==0)
		{
			sec.innerHTML=59
			if(parseInt(min_i)==0)
			{
				min.innerHTML=59
				hour.innerHTML=parseInt(hour.innerHTML)-1
			}	
			else
				min.innerHTML=parseInt(min.innerHTML)-1
		}
		else
			sec.innerHTML=parseInt(sec.innerHTML)-1		
		},1000)
	setTimeout(end,7200000)
	qns[0].click()
	})

stop.addEventListener("click", end)

select.addEventListener("click", function(){
	selected[currQn-1]=currOpt
	if (currOpt==0)
		qns[currQn-1].style.color="black"
	else
	{
		qns[currQn-1].style.color="red"
	}	
	selected[currQn-1]=currOpt
})

for(let i=0;i<30;i++)
{
	qns[i].addEventListener("click",function(){
		currQn=i+1
		number.innerHTML=i+1 
		for(let j=0;j<5;j++)
			opts[j].checked=false
		if(selected[i]!=0)
		{
			opts[selected[i].charCodeAt(0)-97].checked=true
		}
		currOpt=selected[i]
		ThisQn=Qns[i]
		ThisOptions=Options[i]
		text.innerHTML=ThisQn
		optTexts[0].innerHTML=ThisOptions.a
		optTexts[1].innerHTML=ThisOptions.b
		optTexts[2].innerHTML=ThisOptions.c
		optTexts[3].innerHTML=ThisOptions.d
		optTexts[4].innerHTML=ThisOptions.e
	})
}

for(let i=0;i<5;i++)
{
	opts[i].addEventListener("click",function(){
		if(currOpt==0)
			currOpt=opts[i].value
		else if(currOpt==opts[i].value)
			currOpt=0
		else
		{
			opts[currOpt.charCodeAt(0)-97].checked=false
			currOpt=opts[i].value
		}
	})
}
