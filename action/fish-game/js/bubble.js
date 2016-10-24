//气泡对象
function bubbleObj(){
	this.bubArr=[];
};
//气泡数量
bubbleObj.prototype.num=5;
//气泡初试化
bubbleObj.prototype.init=function(){
		for(var i=0;i<this.num;i++){
		this.bubArr[i]=new Image();
		var bubble=this.bubArr[i];
		bubble.src='./img/pao.png';
		if(Math.random()<.5){
			bubble.alive=true;
		}
		this.state(i);
	};
}
//气泡产生
bubbleObj.prototype.born=function(index){
	//初始生存状态
		this.bubArr[index].alive=true;
		this.state(index);
};
//画气泡，上升速度
bubbleObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		var bubble=this.bubArr[i];
		(bubble.y1<=0)&&(bubble.alive=false);
		if(bubble.alive){
			bubble.y1-=bubble.spdY;
			bubble.ang+=0.02;
			var dis=bubble.amp*Math.sin(bubble.ang);
			// console.log(bubble.x1+dis);
			ctx1.drawImage(bubble,bubble.x1+dis,bubble.y1,bubble.width1,bubble.height1);
		}		
	}
};
//随机产生大小不同气泡
bubbleObj.prototype.state=function(index){
		var bubble=this.bubArr[index];
		bubble.x1=Math.random()*canWidth;
		bubble.y1=canHeight;
		bubble.width1=Math.random()*13+3;
		bubble.height1=this.bubArr[index].width1;
		bubble.spdY=this.bubArr[index].width1*.125;
		bubble.amp=20+Math.random()*10;
		bubble.ang=0;
}