export default {
  name: "challenge",
  template: `
  <div>
    <h1>Bem vindo ao desafio</h1>  
    <div class="msg_exercise">
    <p>Você tem 20 segundos para somar 10 números menores que 10 e digitar o valor no input que está ao final da soma e clicar em Enviar</p>
    </div>
    
    <div class="sum_sequence" >
     {{showSum}} <input type="number" v-model="written"/>
     <button @click=showResult>Enviar</button>
    </div>
  </div>
  ` ,
  data(){
    return{
      numbersList:[],
      showSum:"",
      result:0,
      written:0,
      nivel:0,
      guideMessage:""
    }
  },
  props:{
props:[
  "firstMessage",
  "secondMessage"
]
  },
  methods:{
    createAddNumbers(){
      let indexWhile = 0
      while(indexWhile <= 10){      
        indexWhile++;
        this.numbersList.push( Math.floor(Math.random() *(1-9))+9)
      }     
      this.  printArrayScreen()
    },
    printArrayScreen(){
      this.numbersList.map((item, index)=>{
        if(this.numbersList.length!= index+1){
          this.showSum += item + " + "
        }else{
          this.showSum += item + " = "
        }
        this.result += item
      })  
      console.log(this.showSum)   
      console.log(this.result)   
    },
    showResult(){
      if(this.result==this.written){
        this.nivel++
        switch(this.nivel){
          case 1:
            this.guideMessage = this.firstMessage;
            break;
          case 2:
            this.guideMessage = this.firstMessage;
        }

      
      }else{
        console.log("Vc está errado o valor é " + this.result)
      }
    }
  },
  mounted:function(){
    this.createAddNumbers();
  }
}
