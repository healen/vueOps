const createPie = function(data,initConfig){
  let names=[];
  let styleNormal= {
    formatter: ' {b|{b}} \n {c|{c}} \n {per|{d}%} \n',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#eee',
    backgroundColor: '#fefefe',
    rich: {
      a: {
        color: '#999',
        lineHeight: 18,
        align: 'center'
      },
      cda:{
        padding:[5,5,5,5]
      },
      c:{
        align: 'center',
        fontSize: 14,
        lineHeight:33,
        color:"#444"
      },
      hr: {
        borderColor: '#eee',
        width: '100%',
        borderWidth: 0.5,
        height: 0
      },
      b: {
        fontSize: 16,
        align:'center',
        color:"#444",
        padding:[5,5,5,5]
      },
      per: {
        align:'left',
        fontSize: 12,
        lineHeight:18,
        color:"#ffffff",
        backgroundColor:"#ee2c36",
        // margin:[2,2,2,2],
        padding:[3,3,3,3],
        borderRadius:3
      }
    }
  };
  let total = 0;
  let titleo = {
    textStyle: {
      fontSize: 14,
      color:"#666"
    }
  };
  for(var i=0;i<data.length;i++){
    total+=data[i].value;
    names.push(data[i].name)
  }
  if(initConfig.title){
    titleo.text=initConfig.title;
    titleo.top="bottom";
    titleo.left='center';
  }
  let options = {
    title:titleo,
    graphic:{
      type:'text',
      left:'center',
      top:'58%',
      z:2,
      style:{
        text:'Total:'+total,
        width:100,
        height:100,
        fontSize:16
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: " {b}: {c} ({d}%)"
    },
    legend: {
      data:names,
    },
    series: [
      {
        name:'',
        type:'pie',
        radius: ['40%', '60%'],
        center:['50%','60%'],
        label: {
          position:'inner',
          normal:{
            formatter: '{c|{c} }\n {c|{d}}%',
            rich:{
              c:{
                align: 'center',
              }
            },
          }
        },
        data:data
      }
    ]
  };
  if(initConfig.colors){
    options.color=initConfig.colors;
  }
  return options;
};


const createPieBasic = function(data,initConfig){
  let names = [];
  let total = 0;
  for(var i=0;i<data.length;i++){
    total+=data[i].value;
    names.push({name:data[i].name,icon:'circle'})
  }

  let option = {
    total:total,
    legend: {
      data:names,
      orient: 'vertical',
      x: '40%',
      y:"center",
      selectedMode:false,
      textStyle:{
        color:'rgba(0,0,0,1)',
        fontFamily:'Microsoft Yahei'
      }
    },
    title: {
      text: initConfig.title,
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      min: 600,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series : [
      {
        name:'访问来源',
        type:'pie',
        radius : '38%',
        center: ['20%', '50%'],
        data:data.sort(function (a, b) { return a.value - b.value; }),
        label:false,
        labelLine: false,
        itemStyle: {
          normal: {
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 100;
        }
      }
    ]
  };

  return option



};

const createBar = function(data,initConfig){
  let [legend,xAxis,series,labelOption] = [[],[],[],{
      normal: {
        show: true,
        position: 'insideBottom',
        distance:  '5',
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c} {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }}];
  for(let key in data){
    legend.push(key);
    let serie = {
      type: "bar",
      label: labelOption,
      stack:'og',
      barWidth:50,
      data: [],
      itemStyle: {
        normal:{
          color: initConfig.colors.pop()
        }
      }
    };
    for(let key$1 in data[key]){
      serie.name = key;
      if(xAxis.indexOf(key$1) === -1)xAxis.push(key$1);
      serie.data.push(data[key][key$1]);
    }
    series.push( serie );
  }
  let option = {

    grid:{
      x:50,
      x2:20
    },
    title: {
      text: initConfig.title || '标题',
      top:"bottom",
      left:"center",
      textStyle: {
        fontSize: 14,

      }
    },
    //鼠标触发提示数量
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data:legend
    },
    //x轴显示
    xAxis: {
      data: xAxis,
      splitLine:{
        show:false
      }
    },
    //y轴显示
    yAxis: {
      splitLine:{
        show:true
      }
    },
    series: series
  };
  return option;

};

export {
  createPie,
  createBar,
  createPieBasic
}