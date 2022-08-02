export default {
  name: "challenge",
  template: `
  <div class="challenge_container">
  <button @click="winChallenge">Desenv</button>
  <button @click="CloseChallenge">Fecha o Menu"</button>
    <h1>Bem vindo ao desafio</h1>  
    <h2 class=timeCurrent>{{seg}} Segundos</h2>
    <div v-if="mensagem_inicial" class="msg_exercise">
    <p>{{mensagem_inicial}}</p>
    </div>
    <p>{{estagio}}</p>
    <div class="sum_sequence" >
     {{showSum}} <input type="number" v-model="written"/>
     <button :disabled="disabledBtn" @click=showResult>Enviar</button>    
    </div>
    <div v-if="guideMessage">
      <p >{{guideMessage}}</p> 
      <p>{{estagio}}</p>
      <button @click="upNewLevel">Vamos para o próximo estágio</button>
    </div>
    <div v-if="guideErrorMessage">
    <p >{{guideErrorMessage}}</p> 
    <button @click="createAddNumbers">Tente Novamente</button>
    </div>
  </div>
  ` ,
  data(){
    return{
      numbersList:[],
      showSum:"",
      result:0,
      written:"",
      disabledBtn:false,
      nivel:0,
      guideMessage:"",
      guideErrorMessage:"",
      estagio:"",
      lastResult:0,
      seg:0
    }
  },
  props:[
    "first_message",
    "second_message",
    "third_message",
    "fourth_message",
    "fifth_message",
    "sixth_message",
    "seventh_message",
    "eighth_message",
    "nineth_message",    
    "mensagem_inicial",
    "tenth_message"
  ],
  watch:{
    seg(){
      if(this.seg>30){       
        clearInterval(this.finish)
        this.seg = 0;      
        this.numbersList=[];
        this.showSum="";
        this.result=0;
        this.written= 0;
        this.nivel=0;
        this.guideErrorMessage ="Infelizmente o seu tempo acabou tente novamente"
      }
    }
  },
  methods:{
    winChallenge(){
    this.written = this.result
    this.lastResult = this.result
    this.showResult();
    },
    countTime() {
      this.finish = setInterval(() => {
        this.seg++
      }, 1000)
    },    
    CloseChallenge(){    
      this.$emit("closechallenge", false)
    },
    upNewLevel(){
      if(this.nivel<10){
        this.guideMessage="";
        this.guideErrorMessage="";
        this.numbersList=[];
        this.disabledBtn=false
        this.showSum="";
        this.written="";
        this.mensagem_inicial=""
        this.createAddNumbers()
      }else{
        this.CloseChallenge()
      }

    },
    createAddNumbers(){      
      this.disabledBtn=false;
      this.guideMessage="";
      this.guideErrorMessage="";
      let indexWhile = 0
      while(indexWhile <= 10){      
        indexWhile++;
        this.numbersList.push( Math.floor(Math.random() *(1-9))+9)
      }
      this.printArrayScreen()
    },

    printArrayScreen(){    
      debugger
      this.countTime();  
      if(this.lastResult){
          this.numbersList.map((item, index)=>{
          if(this.numbersList.length!= index+1){
            this.showSum += item + " + "
          }else{
            this.showSum += item + "+ ultimo resultado = "
          }
          this.result += item 
        })
      }else{
          this.numbersList.map((item, index)=>{
          if(this.numbersList.length!= index+1){
            this.showSum += item + " + "
          }else{
            this.showSum += item + " = "
          }
          this.result += item
        })
      }
        this.showSum
        this.result
        if(this.lastResult){
          this.result+=lastResult
        }  
    },
    showResult(){    
      this.disabledBtn=true;
      if(this.result==this.written){                      
        this.nivel++
        clearInterval(this.finish)
        this.seg = 0;
        switch(this.nivel){
          case 1:
            this.guideMessage = this.first_message;
            this.estagio = "Primeiro Estágio"
            this.lastResult = this.result
            break;
          case 2:
            this.guideMessage = this.second_message;  
            this.estagio = "Segundo estágio";
            break;
          case 3:
            this.guideMessage = this.third_message;  
            this.estagio = "Terceiro estágio";
            break;
          case 4:
            this.guideMessage = this.fourth_message;  
            this.estagio = "Quarto estágio";
            break;
          case 5:
            this.guideMessage = this.fifth_message;  
            this.estagio = "Quinto estágio";
            break;
          case 6:
            this.guideMessage = this.sixth_message;  
            this.estagio = "Sexto estágio";
            break;
          case 7:
            this.guideMessage = this.seventh_message;  
            this.estagio = "Sétimo estágio";
            break;
          case 8:
            this.guideMessage = this.eighth_message;  
            this.estagio = "Oitavo estágio";
            break;
          case 9:
            this.guideMessage = this.nineth_message;  
            this.estagio = "Nono estágio";
            break;
          case 10:
            this.guideMessage = this.tenth_message;  
            this.estagio = "Décimo estágio";
            break;
        }
        }else{
          if(this.nivel>0){
            this.guideErrorMessage = `Infelizmente o resultado está errado, o resultado correto é ${this.result},voce terá que recomeçar do início`
            this.nivel=0;
            this.estagio="";
            this.lastResult=0;
          }else{
            this.guideErrorMessage = `Infelizmente o resultado está errado, o resultado correto é ${this.result}, tente novamente`
          }
          clearInterval(this.finish)
          this.seg=0;
          this.numbersList=[];
          this.showSum="";
          this.result=0;
          this.written= 0;
          this.nivel=0;
        }
    }
  },
  mounted:function(){
    this.createAddNumbers(); 
  }
}
