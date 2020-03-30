// dbdemo/pages/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    choiceindex: 0,
    maxindex: 19,
    q1: ["virus", "me lavo; me pongo", "aparecido", "pospuesto", "No me queda batería."],
    q2: ["coronavirus", "lavo; me pongo", "avanzado", "supuesto", "No tengo batería."],
    q3: ["epidemia", "me lavo; pongo", "desarrollado", "expuesto", "No tiene batería."],
    answer: [],
    correct: ["díga", "coronavirus", "me lavo; me pongo", "urcié", "Según", "desarrollado", "en", "sepa", "contra", "protector", "a", "se ponga", "pospuesto", "por", "parece", "comenzará", "No me queda batería."],
    inputanswer: "",
    text: "",
    clickflag: 0,
    textarray: [
      "Alicia llama a Lola por teléfono. \nAlicia está en España para estudiar por una beca. \nLola está en China.",
      "L: ¿Sí,_____me(decir)?\nA: Hola, Lola.Soy Alicia.",
      "L: Ah, buenos días, Alicia. ¿Qué tal?\nA: Pues...Estoy un poco preocupada.\nHe escuchado sobre el nuevo_________.¿Estás bien ?",
      "L: Sí, estoy bien, gracias.\nTodos los días_______las manos por milésima vez.Cuando salgo de casa, mascarilla.",
      "A: ¿Dicen que el hospedador es el m_____lago?",
      "L: _____(preposición) las noticias, no han determinado en el hospedador, pero seguro que la epidemia tiene relación con un mercado de animales vivos. Allí se venden muchos animales silvestres, que es un delito.",
      "A: Qué horrible! \nAhora en España algunas persona han__________síntomas ya, pero la mayoría aún no lo toman en cuenta. ",
      "L: ¡Cuidado!¡Trata de evitar el contacto estrecho con cualquiera que muestra signo de afección respiratoria!Pues si lo contrae,la gente puede presentar síntomas de tos,fiebre,fatiga,dolor de garganta,opresión ___(preposición) el pecho...",
      "A: Gracias, yo lo haré. Espero que más gente _______(saber) la importancia de la prevención del coronavirus.",
      "L: Yo también. Aunque la lucha ____(preposición) la epidemia no termina ya,lo bueno es que han sido dados de alta muchos pacientes de cosas severos. Muchos se han recuperado...gracias a los médicos y las enfermeras...",
      "A: Tienes razón. \nDicen que trabajan con la insuficiencia de traje ________(proteger) y gafas de seguridad.Son honrados.",
      "L: De acuerdo. Ahora las zonas residenciales también toman medidas de seguridad. \nSirvo como voluntaria en nuestro barrio. \nMe encargo de medir la temperatura _______(preposición) las residentes que entran. ",
      "L:Además, requieren que los que vienen de otras provincias ______(poner(se)) en cuarentena en casa durante 14 días.",
      "A: Lo entiendo. ¿Y los estudiantes?\nL: Ya han______la apertura del semestre. ",
      "L:Los estudiantes van a tener clases _______(preposición) Internet.",
      "F: Bueno. Me _______(parecer) una buena manera.",
      "A: Sí. ECNU ______(comenzar) el semestre el 9 de marzo.",
      "A:Ah,________, tengo que colgar el teléfono. Hasta luego.\nF: Adiós. Hasta luego."
    ],
    reference: "palabras útiles:（相关单词）\n新型冠状病毒 el nuevo coronavirus/ 2019-nCoV\n肺 los pulmones\n肺炎 neumonía\n病毒性肺炎 neumonía viral\n口罩    mascarilla\n戴口罩 ponerse mascarilla\n试剂 reactivo\n防护服 traje protector\n护目镜 gafas de seguridad\n外科口罩 mascurilla quirúrgica\n方舱医院 hospital temporal\n洗手 lavarse las manos\n宿主 hospedador\n蝙蝠 murciélago\n果子狸 civeta de palma enmascarada\n易感的 vulnerable\n潜伏期 periodo de incubación\n人传人 transmisión entre seres humanos\n发病率 morbilidad\n死亡率 mortalidad\n重症 casos severos\n出现症状 desarrollar síntomas\n出院 ser dado de alta\n密切接触者 persona en contacto cercano con los infectados\n隔离治疗 tratamiento en cuarentena\n自行隔离 ponerse en cuarentena\n感染 infección\n发热 fiebre\n咳嗽 tos\n乏力 fatiga\n咽痛 dolor de garganta\n胸闷 opresión en el pecho\n防疫阻击战 lucha contra la epidemia\n国际关注的突发公共卫生事件 Emergencia de Salud Pública de Importancia Internacional/ ESPII\n国际卫生条例 Reglamiento Sanitario Internacional/ RSI\n世界卫生组织 la Organización Mundial de la Salud/ OMS\n国家卫健委 Comisión Nacional de Salud/ CNS\n中国疾控中心 Centro de Control y Prevención de Enfermedades de China/ CCPEC"

  },

  onShow: function (options) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 3
      })
    }
    //文字逐个显示
    var that = this
    var word = this.data.textarray[this.data.index];
    var i = 0;
    var text = word.substring(0, i);
    console.log("1")
    var time = setInterval(function () {
      text = word.substring(0, i);
      i++;
      that.setData({
        text: text
      });
      if (text.length == word.length || that.data.clickflag == 1) {
        //   console.log("定时器结束！");
        console.log("2")
        clearInterval(time);
        text = word
        that.setData({
          text: text
        });
      }
    }, 100)
  },


  firsthandle: function (e) {
    if (this.data.clickflag == 1) {
      var index = this.data.index + 1
      var choiceindex = this.data.choiceindex
      var answer = this.data.answer
      var clickflag = 0
      answer.push(this.data.q1[choiceindex])
      choiceindex = choiceindex + 1
      this.setData({ index: index, choiceindex: choiceindex, answer: answer, clickflag })
      if (index < this.data.maxindex - 1) {
        var that = this
        var word = this.data.textarray[this.data.index]
        var i = 0
        var text = word.substring(0, i)
        var time = setInterval(function () {
          console.log("1");
          text = word.substring(0, i)
          i++
          that.setData({
            text: text
          })
          if (text.length == word.length || that.data.clickflag == 1) {
            //   console.log("定时器结束！");
            console.log("2");
            clickflag = 1
            clearInterval(time)
            text = word
            that.setData({
              text,
              clickflag
            });
          }
        }, 100)
      }
    }
  },

  secondhandle: function (e) {
    if (this.data.clickflag == 1) {
      var index = this.data.index + 1
      var choiceindex = this.data.choiceindex
      var answer = this.data.answer
      var clickflag = 0
      answer.push(this.data.q2[choiceindex])
      choiceindex = choiceindex + 1
      this.setData({ index: index, choiceindex: choiceindex, answer: answer, clickflag })
      if (index < this.data.maxindex - 1) {
        var that = this
        var word = this.data.textarray[this.data.index]
        var i = 0
        var text = word.substring(0, i)
        var time = setInterval(function () {
          console.log("1");
          text = word.substring(0, i)
          i++
          that.setData({
            text: text
          })
          if (text.length == word.length || that.data.clickflag == 1) {
            //   console.log("定时器结束！");
            console.log("2");
            clickflag = 1
            clearInterval(time)
            text = word
            that.setData({
              text,
              clickflag
            });
          }
        }, 100)
      }
    }
  },

  thirdhandle: function (e) {
    if (this.data.clickflag == 1) {
      var index = this.data.index + 1
      var choiceindex = this.data.choiceindex
      var answer = this.data.answer
      var clickflag = 0
      answer.push(this.data.q3[choiceindex])
      choiceindex = choiceindex + 1
      this.setData({ index: index, choiceindex: choiceindex, answer: answer, clickflag })
      if (index < this.data.maxindex - 1) {
        var that = this
        var word = this.data.textarray[this.data.index]
        var i = 0
        var text = word.substring(0, i)
        var time = setInterval(function () {
          console.log("1");
          text = word.substring(0, i)
          i++
          that.setData({
            text: text
          })
          if (text.length == word.length || that.data.clickflag == 1) {
            //   console.log("定时器结束！");
            console.log("2");
            clickflag = 1
            clearInterval(time)
            text = word
            that.setData({
              text,
              clickflag
            });
          }
        }, 100)
      }
    }
  },

  answerinput: function (e) {
    this.setData({ inputanswer: e.detail.value })
  },

  confirmclick: function (e) {
    if (this.data.clickflag == 1) {
      var index = this.data.index + 1
      var answer = this.data.answer
      var clickflag = 0
      answer.push(this.data.inputanswer)
      this.setData({ index, answer, clickflag })
      this.setData({ inputanswer: "" })
      var that = this
      var word = this.data.textarray[this.data.index]
      var i = 0
      var text = word.substring(0, i)
      var time = setInterval(function () {
        text = word.substring(0, i)
        i++
        that.setData({
          text: text
        });
        if (text.length == word.length || that.data.clickflag == 1) {
          //   console.log("定时器结束！");
          clickflag = 1
          clearInterval(time)
          text = word
          that.setData({
            text,
            clickflag
          });
        }
      }, 100)
    }
  },

  nextpage: function (e) {
    var clickflag = this.data.clickflag
    if (clickflag == 0) {
      clickflag++
      this.setData({ clickflag })
    }
    else {
      if (this.data.index == 0) {
        var index = this.data.index + 1
        //console.log(index)
        clickflag = 0
        this.setData({ clickflag, index })
        var that = this
        var word = this.data.textarray[this.data.index]
        var i = 0
        var text = word.substring(0, i)
        var time = setInterval(function () {
          text = word.substring(0, i)
          i++
          that.setData({
            text: text
          });
          if (text.length == word.length || that.data.clickflag == 1) {
            //   console.log("定时器结束！");
            clickflag = 1
            clearInterval(time)
            text = word
            that.setData({
              text,
              clickflag
            });
          }
        }, 100)
      }
    }
  },




})