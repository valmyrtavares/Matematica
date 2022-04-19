export default {
    name:'MathSomaUnidade',
    // el:"#app",
    template:`   <div class="main_content">
    <button @click="reset">Recomeçar</button>
        <h1 @click="liberaProximosExercicios">{{title}}</h1>   
        <div class="content" v-for="(item, index) in completeItem" :key="index">
            <div class="coeficientes">
                <p>{{item.firstValue}}</p>
                <p>{{signal}}</p>
                <p>{{item.secondValue}}</p>
                <p>=</p>
            </div>
            <input  :disabled="item.enabling" class="" :class="item.confirmClass" type="number" v-model="completeItem[index].writtenRestult"/>  
            <button v-if="item.writtenRestult!==false" @click="ReadingResult(index)" style="color:green">{{ item.Label }}</button>
            <p v-if="item.writtenRestult===false" style="color:red; min-width: 160px;">O resultado correto é {{item.result}}</p>            
        </div>      
        <div class="result" v-if="count > 10">
            <p>Acertos {{positive}}</p>
            <p>Erros {{negative}}</p>
            <p>Sua nota é {{avaliationScreem}} {{showAvaliation()}}</p>
        </div> 
        <p class="tempo">Feito {{seg}} Segundos</p>      
        </div>`,           
    data(){
        return{

            vueTeste:"Esse é um teste vue",
            completeItem:[
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar" },
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"},
                {firstValue:0, secondValue:0, result:0, writtenRestult:"", confirmClass:"",enabling:false, Label:"Enviar"}      
            ],
          lux:0,  
          itemQuestion:"Eu quero uma string",
          positive:0,          
          negative:0,
          disable:false,
          partial_answer:"1243",
          count:1,
          seg:0,
          avaliationScreem:0,
          mathSomaDezena:0,
          liberaTela:0         
        }       
    },       
    props:['primeira_variavel_numerica',
            'segundo_limite', 
            'terceiro_limite',
            'libera_exercicio',
            'title', 
            'first', 
            'second', 
            'third', 
            'fourth',
            'fifth',
            'signal',
            'polivariaveis',
            'call_reset',          
        ],
    methods:{
        showExerciceForEach(){            
            if(this.polivariaveis){
                this.completeItem.map((item) => {       
                    item.firstValue = Math.floor(Math.random() * this.primeira_variavel_numerica)
                    item.secondValue = Math.floor(Math.random() * this.primeira_variavel_numerica)
                    item.result =item.firstValue + item.secondValue            
                })
            }else{
                this.completeItem.map((item) => {       
                    item.a =  Math.floor(Math.random() * (this.segundo_limite - this.terceiro_limite)) + this.terceiro_limite;
                    item.b = Math.floor(Math.random() * this.primeira_variavel_numerica)
                    item.c =item.a - item.b            
                })  
            }
        },
        verificaEval(value1, operation, value2) {
            let op = {
              '+': (x, y) => x + y,
              '-': (x, y) => x - y,
              '/': (x, y) => x / y,
              '*': (x, y) => x * y
            }
            return op[operation](value1, value2)
        },
        ReadingResult(index){          
            if(this.verificaEval(this.completeItem[index].firstValue, this.signal, this.completeItem[index].secondValue) == parseInt(this.completeItem[index].writtenRestult)){           
                this.completeItem[index].confirmClass = "corectItem"
                this.completeItem[index].writtenRestult = true
                this.completeItem[index].Label = "Resposta Correta"
                this.positive++
            }else{           
                this.completeItem[index].confirmClass = "incorectItem"
                this.completeItem[index].writtenRestult = false
                this.completeItem[index].Label = ""
                this.negative++
            }
            this.completeItem[index].enabling = true;     
            this.count++
            if(this.seg==0){
                this.countTime()

            }
            if(this.count>10){
                clearInterval(this.finish)
                this.finalEvaluation()
            }
        },

        countTime(){
        this.finish =  setInterval(()=>{
            this.seg++
            },1000)
        },
        finalEvaluation(){         
            let timeCurrent = 0;
        let firstNote =    this.positive * .5
        
            if(this.seg < this.first){
                timeCurrent = 5
            }
            else if(this.seg < this.second){
                timeCurrent = 4
            }
            else if(this.seg < this.third){
                timeCurrent = 3
            }
            else if(this.seg < this.fourth){
                timeCurrent = 2
            }
            else if(this.seg < this.fifth){
                timeCurrent = 1
            }else{
                timeCurrent = 0
            }
            this.avaliationScreem = timeCurrent + firstNote 
            this.showAvaliation()
        }, 

        showAvaliation(){
            if(this.positive<5){
                return "Voce precisa voltar ao papel e caneta antes de tentar esse nível"
            }
            if(this.avaliationScreem<=3){
            return "Precisa praticar mais"
        }
            if(this.avaliationScreem<=5){
            return "Está quase acima da média"
            }
            if(this.avaliationScreem<=7){
                return "Seu desempenho é regular"
            }
            if(this.avaliationScreem>=8){
                this.liberaProximosExercicios()
                return "Você já pode tentar um exercício mais difícil"
            }
            if(this.avaliationScreem>=9){
                this.liberaProximosExercicios()
                return "Você já chegou ao ponto máximo desse nível"
            }
        },
        liberaProximosExercicios(){
            this.mathSomaDezena=true      
            this.$emit("liberaexercicio",this.libera_exercicio)
        },
        reset(){           
        this.showExerciceForEach()
        for(let i = 0; i<this.completeItem.length;i++){
            this.completeItem[i].confirmClass = ""
            this.completeItem[i].writtenRestult = ""
            this.completeItem[i].enabling = false
            this.completeItem[i].Label = "Enviar"
        }
           this.avaliationScreem =""
           clearInterval(this.finish)
           this.seg=0
           this.count=1
           this.positive=0
           this.negative=0
        }
     
    },
    computed:{
        res(){
           return (this.itemQuestion ? "corectItem" : "incorectItem")       
        }, 
        sinal(){
            this.signal==="+" ? "+" : "-" ;
        }      

    },  
    watch:{
        call_reset(){
            this.reset()
        }
    },
    mounted: function (){             
        this.reset()
    }
}
      
       
