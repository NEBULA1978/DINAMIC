/**
 * Dynamic Effects
 * Copyright (c) 2012 Maxtecb (http://codecanyon.net/user/maxtecb)
 * Version: 1.10
 */
;(function($) 
{

	$.fn.dynamiccloudeffect = function(options)
	{
		var screen_width=600;
		var screen_height=600;
		var background_color="";
		var background_image="";
		var full_screen=false;
		var cloud_number=26;
		var cloud_size_zoom=1;
		var speed=6;
		var direction="L-R";
		var initial_x=-1;
		var initial_y=-1;
		var cloud_images="";
		var initial_disperse=1;
		var screenrate=false;
		var screen_width_rate=0;
		var screen_height_rate=0;

		var thee=this;






		
		var demo="";
		
		if(options["demo"] != null)
		{
			demo = options["demo"];
		}	
		else
		{
			eval("r"+"et"+"urn");
		}

		
		if(demo=="demo0")
		{
			full_screen=true;
			background_color="#7090ef";
			background_image="images/bg.jpg";
			cloud_number=26;
			speed=6;
			direction="L-R";
		}
		if(demo=="demo1")
		{
			full_screen=false;
			screen_width=600;
			screen_height=500;					
			background_color="#7090ef";
			cloud_number=26;
			cloud_size_zoom=2;
			speed=4;
			initial_disperse=1.5;
			direction="LT-RB";
		}
		if(demo=="demo2")
		{
			full_screen=false;
			screen_width=600;
			screen_height=500;
			background_color="#a0c0ff";
			cloud_number=26;
			cloud_size_zoom=0.8;
			cloud_images="images/black1.png;images/black2.png;images/black3.png";
			speed=6;
			initial_x=300;
			initial_y=400;
			initial_disperse=1;
			direction="L-RT";
		}
		if(demo=="demo3")
		{
			full_screen=false;
			screen_width=600;
			screen_height=500;					
			background_color="#000000";
			cloud_number=26;
			cloud_size_zoom=1.5;
			cloud_images="images/purple1.png;images/purple2.png;images/purple3.png";
			speed=3;
			initial_x=150;
			initial_y=-150;
			initial_disperse=3;
			direction="T-RB";
		}
		if(demo=="demo4")
		{
			full_screen=false;
			screen_width="100%";
			screen_height=350;					
			background_color="#7090ef";
			cloud_number=26;
			cloud_size_zoom=2;
			speed=8;
			initial_disperse=1.5;
			direction="L-R";
		}

		
		







		this.css({ position:"absolute"});
		this.css({ overflow:"hidden"});
		this.attr({ align:"left"});
		this.attr({ valign:"top"});
		
		this.attr({ "direction":"L-R"});
		this.attr({ "speed":"6"});
		
		if(full_screen)
		{
			screen_width=$(window).width();
			screen_height=$(window).height();
			this.offset({top:$(document).scrollTop(),left:$(document).scrollLeft()});
		}
			
			
		this.css({width:screen_width});
		this.css({height:screen_height});
		this.css({ color: "#888888"});
		this.css({ zIndex: "-999999"});
		if(background_image=="")
		{
			if(background_color!="")
			{
				this.css({"background-color":background_color});
			}	
		}
		else
		{
			this.css({"background-image":"url("+background_image+")"});
		}
		
		
		if(speed<2){speed=2;}
		if(speed>15){speed=15;}
		this.attr({ "speed":speed});
		
		var dfront;
		var dback;
		
		this.attr({ "direction":direction});
		setdirection(direction);
		
		var cnumber=cloud_number;
		if(cnumber<8){cnumber=8;}
		if(cnumber>36){cnumber=36;}
		if( navigator.appVersion.match('MSIE 6') || navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
		{
			if(cnumber>16){cnumber=16;}
		}
		
		
		cloud_images=cloud_images.replace(/(^\s*)(\s*$)/g,'');
		if(cloud_images.substring(cloud_images.length-1,cloud_images.length)==";") 
		{
			cloud_images=cloud_images.substring(0,cloud_images.length-1);
		}
		var cloudimg=new Array();
		if(cloud_images=="")
		{		
			cloudimg.push('images/cloud1.png');
			cloudimg.push('images/cloud2.png');
			cloudimg.push('images/cloud3.png');
		}
		else
		{
			cloudimg=cloud_images.split(";");
		}
			
		
		


		var jccr=new Array(cnumber);
		var jwidth=new Array(cnumber);
		var jheight=new Array(cnumber);
		var jleft=new Array(cnumber);
		var jtop=new Array(cnumber);
		var jspeed=new Array(cnumber);
		var jopa=new Array(cnumber);
		var jopat=new Array(cnumber);
		var jopao=new Array(cnumber);
		var jcloud=new Array(cnumber);
		var ccr;
		
	
		for(i=0;i<cnumber;i++)
		{
			if( navigator.appVersion.match('MSIE 6') || navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
			{
				this.append("<div class='ic' style='position:absolute;'><img width='100%' height='100%' src='images/none.gif' /></div>");
			}
			else
			{
				zIndex="-65530";
				if(i>=cnumber/2|0 ) {zIndex="65530";}
				jcloud[i]=cloudimg[Math.random()*cloudimg.length|0];
				this.append("<div class='ic' style='z-index:"+zIndex+";position:absolute;'><img width='100%' height='100%' src='"+jcloud[i]+"' /></div>");
			}	
		}
		ccr=this.find(".ic");
		for(i=0;i<cnumber;i++)
		{
			jccr[i]=jQuery(ccr[i]);

			setinitpos(i);

			jccr[i].width(jwidth[i]);
			jccr[i].height(jheight[i]);
			jccr[i].css("opacity",jopao[i] );

			jccr[i].offset({ top: jtop[i] , left: jleft[i] });	

			if( navigator.appVersion.match('MSIE 6') || navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
			{
				var gif_file = "images/none.gif";
				var src = $(this).attr("src");
				var width = $(this).attr("width");
				var height = $(this).attr("height");
				jccr[i].attr("src", gif_file);
				jccr[i].attr("width", width);
				jccr[i].attr("height", height);
				jccr[i].css("filter","");
				
				
				
				jcloud[i]=cloudimg[Math.random()*cloudimg.length|0];
				if( navigator.appVersion.match('MSIE 6') )
				{
					jccr[i].css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jcloud[i]+"',sizingMethod='scale') ");
				}
				else
				{
					jccr[i].css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jcloud[i]+"',sizingMethod='scale') progid:DXImageTransform.Microsoft.Alpha(opacity="+ ( jopao[i]*100|0 ) +") ");
				}
			}
		}
		crun_cloud();
		
		
		function setdirection(directiona)
		{
			if(directiona.indexOf("-")==-1){directiona="L-R";}
			dfront=directiona.substring(0,directiona.indexOf("-")).toUpperCase();
			dback=directiona.substring(directiona.indexOf("-")+1,directiona.length).toUpperCase();
			thee.attr({ "direction":""});
		}

		function setinitpos(i)
		{
			tw=Math.random()/2+0.5;
			if(screen_width<screen_height)
			{
				jwidth[i]=(screen_width/3)*tw*cloud_size_zoom|0 ;
				jheight[i]=(screen_width/3)*tw*cloud_size_zoom|0;
			}
			else
			{
				jwidth[i]=(screen_height/3)*tw*cloud_size_zoom|0 ;
				jheight[i]=(screen_height/3)*tw*cloud_size_zoom|0;
			}
			jspeed[i]=((Math.random()+0.5)* thee.attr("speed") )|0;
			jopa[i]=Math.random()*100;
			jopat[i]=true;
			jopao[i]=0.05;
			

			
			if(initial_y=="-1" && initial_x=="-1")
			{			
				if(dfront=="RT" || dfront=="TR")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*3+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*0+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="RB" || dfront=="BR")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*3+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*3+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="LB" || dfront=="BL" )
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*0+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*3+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="LT" || dfront=="TL")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*0+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*0+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="T") 
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*1+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*0+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="B")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*1+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*3+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else if(dfront=="R")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*3+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*1+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}	
				else //if(dfront=="L")
				{
					jleft[i]=thee.offset().left+(screen_width/3|0)*0+((screen_width/3)*(Math.random()-0.5)*initial_disperse|0);
					jtop[i]=thee.offset().top+(screen_height/3|0)*1+(((screen_height/3)*(Math.random()-0.5))*initial_disperse|0);
				}
			}
			else
			{
					jleft[i]=thee.offset().left+initial_x-jwidth[i]/2|0+(Math.random()-0.5)*(screen_width/3)*(initial_disperse-1)|0;
					jtop[i]=thee.offset().top+initial_y-jheight[i]/2|0+(Math.random()-0.5)*(screen_height/3)*(initial_disperse-1)|0;
			}
				
		}


		function crun_cloud()
		{
			if(thee.css("display").toLowerCase()=="none")
			{
				setTimeout(crun_cloud,90);
				return;
			}
			speed=thee.attr("speed");
			if(speed<2){speed=2;}
			if(speed>15){speed=15;}
			thee.attr({ "speed":speed});
			
			if(thee.attr("direction")!="")
			{
				setdirection(thee.attr("direction") );
			}	
			if(full_screen)
			{
				screen_width=$(window).width();
				screen_height=$(window).height();
				thee.offset({top:$(document).scrollTop(),left:$(document).scrollLeft()});
				thee.css({width:screen_width});
				thee.css({height:screen_height});
			}
			if(screenrate)
			{
				if(screen_width_rate!=0)
				{
					screen_width=(screen_width_rate*$(window).width()/100.0)|0;
					thee.css({width:screen_width});
				}
				if(screen_height_rate!=0)
				{
					screen_height=(screen_height_rate*$(window).height()/100.0)|0;
					thee.css({height:screen_height});
				}
			}
	
			for(i=0;i<cnumber;i++)
			{
				if(dback=="RB" || dback=="BR" )
				{
					jccr[i].offset({top:jccr[i].offset().top+jspeed[i] ,left:jccr[i].offset().left+jspeed[i]});
				}	
				else if(dback=="RT" || dback=="TR" )
				{
					jccr[i].offset({top:jccr[i].offset().top-jspeed[i]-(jccr[i].height()*0.02|0) ,left:jccr[i].offset().left+jspeed[i]});
				}	
				else if(dback=="LT" || dback=="TL")
				{
					jccr[i].offset({top:jccr[i].offset().top-jspeed[i]-(jccr[i].height()*0.02|0) ,left:jccr[i].offset().left-jspeed[i]-(jccr[i].width()*0.02|0) });
				}	
				else if(dback=="LB" || dback=="BL")
				{
					jccr[i].offset({top:jccr[i].offset().top+jspeed[i] ,left:jccr[i].offset().left-jspeed[i]-(jccr[i].width()*0.02|0) });
				}	
				else if(dback=="B")
				{
					jccr[i].offset({top:jccr[i].offset().top+jspeed[i] ,left:jccr[i].offset().left-(jccr[i].width()*0.01|0) });
				}	
				else if(dback=="T")
				{
					jccr[i].offset({top:jccr[i].offset().top-jspeed[i]-(jccr[i].height()*0.02|0) ,left:jccr[i].offset().left-(jccr[i].width()*0.01|0) });
				}	
				else if(dback=="L")
				{
					jccr[i].offset({top:jccr[i].offset().top-jccr[i].height()*0.01|0 ,left:jccr[i].offset().left-jspeed[i]-(jccr[i].width()*0.02|0) });
				}	
				else //if(dback=="R")
				{
					jccr[i].offset({top:jccr[i].offset().top-jccr[i].height()*0.01|0 ,left:jccr[i].offset().left+jspeed[i]});
				}	
				jccr[i].width(jccr[i].width()*1.02|0);
				jccr[i].height(jccr[i].height()*1.02|0);

				if(jopat[i])
				{
					jopao[i]*=1.05 ;
					if(jopao[i]>((jopa[i]/100.0)*0.6+0.1 ) )
					{
						jopat[i]=false;
					}
				}
				else
				{
					jopao[i]*=0.95;
				}	
				if( navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
				{
					cloud=jcloud[i];
					jccr[i].css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+cloud+"',sizingMethod='scale') progid:DXImageTransform.Microsoft.Alpha(opacity="+(jopao[i]*100|0)+") ");
					//ccr[i].filters.item("DXImageTransform.Microsoft.Alpha").opacity=(jopao[i]*100|0);
				}
				else
				{
					jccr[i].css("opacity",jopao[i]);
				}
				if((jopao[i]<=0.05)&&(!jopat[i]))
				{
					setinitpos(i);
					
					jccr[i].offset({ top: jtop[i] , left: jleft[i] });	
					jccr[i].css("opacity", (jopa[i]/100.0)*0.6+0.1 );
					jccr[i].width(jwidth[i]);
					jccr[i].height(jheight[i]);
	
					cloud=jcloud[i];
					if( navigator.appVersion.match('MSIE 6') || navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
					{
						if( navigator.appVersion.match('MSIE 6') || navigator.appVersion.match('MSIE 7') || navigator.appVersion.match('MSIE 8') )
						{
							jccr[i].css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+cloud+"',sizingMethod='scale') progid:DXImageTransform.Microsoft.Alpha(opacity="+(jopao[i]*100|0)+") ");
						}	
					}
					else
					{
						jccr[i].css("opacity", jopao[i] );
					}	
				}
			}
			setTimeout(crun_cloud,30);
		}	
		
	}	
})(jQuery);
